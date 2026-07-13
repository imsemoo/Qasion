/* Scroll-reveal micro-interactions.
   Adds .reveal (hidden) then .in-view (shown) via IntersectionObserver, with a
   small stagger between siblings. Progressive enhancement: without JS — or with
   prefers-reduced-motion — no class is ever added, so content stays visible. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  var SELECTORS = [
    ".update-card", ".featured", ".issue-card", ".assess-lead", ".wire__item",
    ".dossier", ".trans-card", ".map-wide", ".data-tile", ".map-small",
    ".brief", ".mostread__item", ".agenda-card", ".pub-card", ".special",
    ".zz-row", ".monitor", ".versus__side", ".offer", ".bignum",
    ".newsletter", ".about-strip",
    /* other pages reuse the same file harmlessly */
    ".method-card", ".member-card", ".vm-card", ".prod-card", ".file-card",
    ".book-card", ".result-row", ".related-card", ".media-card", ".contact-card"
  ];

  var els = [];
  SELECTORS.forEach(function (s) {
    document.querySelectorAll(s).forEach(function (el) { els.push(el); });
  });
  if (!els.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px" });

  els.forEach(function (el) {
    el.classList.add("reveal");
    // Stagger within the same parent row/grid (capped)
    var sibs = Array.prototype.filter.call(
      el.parentElement.children,
      function (c) { return c.classList.contains("reveal"); }
    );
    var idx = sibs.indexOf(el);
    el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
    io.observe(el);
  });
})();
