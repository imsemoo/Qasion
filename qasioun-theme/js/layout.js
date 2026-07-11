/* ==========================================================================
   Qasioun Theme — layout.js
   Single source of truth for the shared header & footer. Injected into every
   page so markup stays DRY. Set the active nav item with `data-page` on <body>
   (e.g. <body data-page="research">). Works from the file system (no fetch).
   ========================================================================== */
(function () {
  "use strict";

  var NAV = [
    { key: "home",     label: "الرئيسية",      href: "index.html" },
    { key: "about",    label: "عن المركز",     href: "about.html" },
    { key: "research", label: "الإنتاج البحثي", href: "research.html" },
    { key: "files",    label: "الملفات",       href: "files.html" },
    { key: "library",  label: "المكتبة",       href: "library.html" },
    { key: "media",    label: "الميديا",       href: "media.html" },
    { key: "contact",  label: "تواصل معنا",    href: "contact.html" }
  ];

  function today() {
    try {
      return new Intl.DateTimeFormat("ar", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      }).format(new Date());
    } catch (e) {
      return "";
    }
  }

  function headerHTML(active) {
    var links = NAV.map(function (n) {
      var cls = n.key === active ? ' class="is-active"' : "";
      return '<a href="' + n.href + '"' + cls + '>' + n.label + "</a>";
    }).join("");

    return '' +
'<header class="site-header" dir="rtl">' +
'  <div class="site-header__top">' +
'    <a class="site-header__logo" href="index.html">' +
'      <img src="assets/img/logo-horizontal.png" alt="مركز قاسيون للدراسات الاستراتيجية">' +
'    </a>' +
'    <span class="site-header__date"><span class="diamond diamond--sm"></span>' + today() + '</span>' +
'    <a class="site-header__cta" href="index.html#newsletter">اشترك بالنشرة</a>' +
'  </div>' +
'  <nav class="site-nav" aria-label="التنقل الرئيسي">' +
'    <button class="nav-toggle" aria-label="القائمة" aria-expanded="false"><span></span><span></span><span></span></button>' +
'    <div class="site-nav__links">' + links + '</div>' +
'    <div class="site-nav__right">' +
'      <form class="searchbox" role="search" onsubmit="return false">' +
'        <input type="search" placeholder="ادخل كلمة البحث…" aria-label="بحث">' +
'        <button class="searchbox__btn" aria-label="بحث">' +
'          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#fff" stroke-width="1.8"></circle><line x1="11" y1="11" x2="15" y2="15" stroke="#fff" stroke-width="1.8" stroke-linecap="round"></line></svg>' +
'        </button>' +
'      </form>' +
'      <span class="site-nav__divider">|</span>' +
'      <div class="social">' +
'        <a href="contact.html" title="تيلجرام">t</a>' +
'        <a href="contact.html" title="إكس">X</a>' +
'        <a href="contact.html" title="فيسبوك">f</a>' +
'      </div>' +
'    </div>' +
'  </nav>' +
'</header>';
  }

  function footerHTML() {
    return '' +
'<footer class="site-footer" dir="rtl">' +
'  <div class="site-footer__grid">' +
'    <div>' +
'      <img class="site-footer__logo" src="assets/img/logo-horizontal-white.png" alt="مركز قاسيون">' +
'      <p class="site-footer__about">مركز بحثي متخصص يقدّم رؤى استباقية تُسهم في دعم نخب الأمة وصانعي القرار، ويبني جسراً بين المعرفة الأكاديمية ومتطلبات الواقع المتسارع.</p>' +
'    </div>' +
'    <div class="site-footer__col">' +
'      <h3>الإنتاج البحثي</h3>' +
'      <div class="site-footer__links">' +
'        <a href="research.html">تقديرات الموقف</a>' +
'        <a href="research.html">الإحاطات الدورية</a>' +
'        <a href="research.html">التحليلات الاستراتيجية</a>' +
'        <a href="media.html">الإنفوغرافيك والخرائط</a>' +
'      </div>' +
'    </div>' +
'    <div class="site-footer__col">' +
'      <h3>الملفات</h3>' +
'      <div class="site-footer__links">' +
'        <a href="files.html">الملف السوري</a>' +
'        <a href="files.html">الملف العراقي</a>' +
'        <a href="files.html">الملف اللبناني</a>' +
'        <a href="files.html">القرن الإفريقي</a>' +
'        <a href="files.html">الشأن الفلسطيني-الإسرائيلي</a>' +
'      </div>' +
'    </div>' +
'    <div class="site-footer__col">' +
'      <h3>المركز</h3>' +
'      <div class="site-footer__links">' +
'        <a href="about.html">عن المركز</a>' +
'        <a href="library.html">المكتبة</a>' +
'        <a href="media.html">وسائط</a>' +
'        <a href="contact.html">تواصل معنا</a>' +
'      </div>' +
'      <div class="site-footer__email">info@qasiounstudies.com</div>' +
'    </div>' +
'  </div>' +
'  <div class="site-footer__bottom">' +
'    <span class="site-footer__copy">© 2026 مركز قاسيون للدراسات الاستراتيجية — جميع الحقوق محفوظة</span>' +
'    <div class="site-footer__meta">' +
'      <span>زيارات الموقع: <span class="num">1,284,930</span></span>' +
'      <div class="dot-row"><span></span><span></span><span></span></div>' +
'    </div>' +
'  </div>' +
'</footer>';
  }

  function mount() {
    var active = document.body.getAttribute("data-page") || "";
    var head = document.getElementById("site-header");
    var foot = document.getElementById("site-footer");
    if (head) head.innerHTML = headerHTML(active);
    if (foot) foot.innerHTML = footerHTML();

    // Mobile nav toggle
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
