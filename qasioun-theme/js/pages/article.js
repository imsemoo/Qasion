/* Article page — reading-progress bar, "remaining" pill, share/copy button. */
(function () {
  "use strict";
  var body = document.getElementById("article-body");
  var bar = document.getElementById("readBar");
  var pill = document.getElementById("readPill");
  var remaining = document.getElementById("readRemaining");
  var copyBtn = document.getElementById("copyBtn");
  var views = document.getElementById("articleViews");

  function onScroll() {
    if (!body || !bar || !remaining || !pill) return;
    var rect = body.getBoundingClientRect();
    var winH = window.innerHeight;
    var total = rect.height - winH * 0.4;
    var passed = Math.min(Math.max(-rect.top + winH * 0.6, 0), Math.max(total, 1));
    var p = Math.round((passed / Math.max(total, 1)) * 100);
    p = Math.min(100, Math.max(0, p));
    bar.style.width = p + "%";
    remaining.textContent = 100 - p;
    var visible = p > 2 && p < 100;
    pill.classList.toggle("is-visible", visible);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // Simulate a live visit counter
  setTimeout(function () {
    if (views) views.textContent = (4820 + 1).toLocaleString("en-US");
  }, 4000);

  // Share buttons
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var url = location.href;
      if (navigator.clipboard) { navigator.clipboard.writeText(url).catch(function () {}); }
      copyBtn.textContent = "✓ تم نسخ الرابط";
      copyBtn.classList.add("is-done");
    });
  }
})();
