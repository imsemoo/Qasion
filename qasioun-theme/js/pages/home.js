/* Home page — news ticker, stat count-up, newsletter form, "quick tour" Swiper slider. */
(function () {
  "use strict";

  /* ---- News ticker: seamless infinite marquee ----
     Clones the group until the strip is ≥ 2× the track width (never an empty
     gap, whatever the CMS provides), then animates by exactly -50% so the
     loop restart is pixel-identical. Speed is constant (px/s), not fixed-time. */
  function initTicker() {
    var inner = document.querySelector(".ticker__inner");
    if (!inner || inner.dataset.ready) return;
    var group = inner.querySelector(".ticker__group");
    var track = inner.parentElement;
    if (!group || !group.children.length) return;

    var g = group.getBoundingClientRect().width;
    var t = track.getBoundingClientRect().width;
    if (!g || !t) return;
    inner.dataset.ready = "1";

    // copies per half-strip: enough to cover the track with a 25% buffer
    var perHalf = Math.max(1, Math.ceil((t * 1.25) / g));
    var total = perHalf * 2;
    for (var i = 1; i < total; i++) {
      var clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      inner.appendChild(clone);
    }
    // constant speed ≈ 70px/s (min 18s so short strips don't race)
    inner.style.animationDuration = Math.max(18, Math.round((perHalf * g) / 70)) + "s";
  }
  // measure after brand fonts load (widths change), with a load-event safety net
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initTicker);
  }
  window.addEventListener("load", initTicker);

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
