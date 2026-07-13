/* Home page — news ticker, stat count-up, newsletter form, "quick tour" Swiper slider. */
(function () {
  "use strict";

  /* ---- News ticker: self-healing infinite marquee ----
     build() clones the base group until the strip covers ≥ 2× the track,
     then the CSS -50% loop is pixel-exact and can never show a gap.
     Idempotent (clears old clones first) and re-audited after fonts/resize,
     so late layout, slow fonts or a resize can't leave the strip empty. */
  (function tickerModule() {
    var inner = document.querySelector(".ticker__inner");
    if (!inner) return;
    var track = inner.parentElement;

    function covered() {
      var t = track.getBoundingClientRect().width;
      return t > 0 && inner.getBoundingClientRect().width >= t * 2 - 2;
    }

    function build() {
      var base = inner.querySelector(".ticker__group:not([aria-hidden])");
      if (!base || !base.children.length) return false;
      inner.querySelectorAll(".ticker__group[aria-hidden]").forEach(function (c) { c.remove(); });
      var g = base.getBoundingClientRect().width;
      var t = track.getBoundingClientRect().width;
      if (!g || !t) return false;
      // نسخ كافية لتغطية المسار ×1.25 في كل نصف — النصفان متطابقان دائماً
      var perHalf = Math.max(1, Math.ceil((t * 1.25) / g));
      for (var i = 1; i < perHalf * 2; i++) {
        var clone = base.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        inner.appendChild(clone);
      }
      // سرعة ثابتة ≈ 70px/ث مهما بلغ عدد الأخبار
      inner.style.animationDuration = Math.max(18, Math.round((perHalf * g) / 70)) + "s";
      return true;
    }

    // ابنِ فور توفر أبعاد، وأعد المحاولة لو اللياوت لسه بيتكوّن
    var tries = 0;
    function ensure() {
      if (build()) return;
      if (++tries < 24) setTimeout(ensure, 250);
    }
    ensure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (!covered()) build(); });
    }
    window.addEventListener("load", function () { if (!covered()) build(); });

    // تدقيق ذاتي: تغيّر المقاس أو أي حالة غير مغطاة → إعادة بناء
    var resizeT;
    window.addEventListener("resize", function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { if (!covered()) build(); }, 200);
    });
    setTimeout(function () { if (!covered()) build(); }, 3000);
  })();

  /* ---- Dossier tabs (من الملفات) ---- */
  var dossierTabs = document.querySelectorAll(".dossier__tab");
  dossierTabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-panel");
      dossierTabs.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      document.querySelectorAll(".dossier__panel").forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-panel") === id);
      });
    });
  });

  /* ---- Monitor clock + day progress (نبض المنطقة) ---- */
  var clock = document.getElementById("pulseClock");
  var dayBar = document.getElementById("dayProgress");
  if (clock) {
    var tickClock = function () {
      var d = new Date();
      clock.textContent =
        String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
      if (dayBar) {
        var pct = Math.round(((d.getHours() * 60 + d.getMinutes()) / 1440) * 100);
        dayBar.style.width = pct + "%";
      }
    };
    tickClock();
    setInterval(tickClock, 30000);
  }

  /* ---- Animated stat counters ---- */
  var stats = document.querySelectorAll(".stat__num[data-count]");
  function runCounters() {
    var dur = 1600, start = performance.now();
    function step(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      stats.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var val = Math.round(target * e).toLocaleString("en-US");
        el.innerHTML = val + (suffix ? '<span class="accent">' + suffix + "</span>" : "");
      });
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (stats.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { runCounters(); io.disconnect(); }
      }, { threshold: 0.4 });
      io.observe(stats[0]);
    } else {
      runCounters();
    }
  }

  /* ---- Newsletter form ---- */
  var form = document.getElementById("newsletterForm");
  if (form) {
    var success = document.getElementById("nlSuccess");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("nlEmail").value.trim();
      if (!email) return;
      var freq = form.querySelector('input[name="freq"]:checked').value;
      var label = freq === "weekly" ? "أسبوعياً" : "شهرياً";
      form.hidden = true;
      success.hidden = false;
      success.textContent = "تم الاشتراك بنجاح — ستصلك النشرة " + label + " على بريدك.";
    });
  }

  /* ---- Quick-tour slider (Swiper) ---- */
  function initTour() {
    if (window.Swiper && document.getElementById("tourSwiper")) {
      new window.Swiper("#tourSwiper", {
        slidesPerView: "auto",
        spaceBetween: 18,
        grabCursor: true,
        keyboard: { enabled: true },
        navigation: { nextEl: "#tourNext", prevEl: "#tourPrev" }
      });
      return true;
    }
    return false;
  }
  if (!initTour()) {
    var tries = 0;
    var timer = setInterval(function () {
      if (initTour() || ++tries > 40) clearInterval(timer);
    }, 150);
  }
})();
