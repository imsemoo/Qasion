/* Home page — stat count-up, newsletter form, "quick tour" Swiper slider. */
(function () {
  "use strict";

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
