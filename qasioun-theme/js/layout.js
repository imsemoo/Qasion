/* ==========================================================================
   Qasioun Theme — layout.js
   Single source of truth for the shared header & footer. Injected into every
   page so markup stays DRY. Set the active nav item with `data-page` on <body>
   (e.g. <body data-page="research">). Works from the file system (no fetch).

   IA per client notes (2026-07): dropdown submenus, logo right & small,
   Instagram everywhere, EN-readiness stub. `labelEn` fields are the i18n
   hooks for the future English build (see DESIGN-SYSTEM.md → الإنجليزية).
   ========================================================================== */
(function () {
  "use strict";

  var NAV = [
    { key: "home", label: "الرئيسية", labelEn: "Home", href: "index.html" },
    {
      key: "research", label: "إصدارات المركز", labelEn: "Publications", href: "research.html",
      children: [
        { label: "تقديرات موقف",  href: "research.html?type=" + encodeURIComponent("تقدير موقف") },
        { label: "مقالات",        href: "research.html" },
        { label: "ترجمات",        href: "research.html?type=" + encodeURIComponent("ترجمة نوعية") },
        { label: "تحليلات",       href: "research.html?type=" + encodeURIComponent("تحليل استراتيجي") }
      ]
    },
    {
      key: "files", label: "ملفات", labelEn: "Dossiers", href: "files.html",
      children: [
        { label: "ملف سوريا",  href: "file.html?f=sy" },
        { label: "ملف لبنان",  href: "file.html?f=lb" },
        { label: "غزة",        href: "file.html?f=ps" },
        { label: "إيران",      href: "files.html" }
      ]
    },
    {
      key: "library", label: "المكتبة", labelEn: "Library", href: "library.html",
      children: [
        { label: "كل الإصدارات", href: "library.html" }
      ]
    },
    {
      key: "media", label: "الميديا", labelEn: "Media", href: "media.html",
      children: [
        { label: "انفوغراف", href: "media.html#infographics" },
        { label: "خرائط",    href: "media.html#maps" },
        { label: "كاروسيل",  href: "media.html#cards" }
      ]
    },
    { key: "contact", label: "تواصل معنا", labelEn: "Contact", href: "contact.html" },
    { key: "about", label: "عن المركز", labelEn: "About", href: "about.html" }
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

  function navItemHTML(n, active) {
    var isActive = n.key === active;
    var cls = "nav-item" + (n.children ? " nav-item--sub" : "") + (isActive ? " is-open-ready" : "");
    var a = '<a href="' + n.href + '"' + (isActive ? ' class="is-active"' : "") +
      (n.children ? ' aria-haspopup="true" aria-expanded="false"' : "") + ">" + n.label +
      (n.children ? '<svg class="nav-caret" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>' : "") +
      "</a>";
    var sub = "";
    if (n.children) {
      sub = '<button class="nav-sub-toggle" aria-expanded="false" aria-label="فتح قائمة ' + n.label + '"><svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>' +
        '<div class="nav-sub">' +
        n.children.map(function (c) { return '<a href="' + c.href + '">' + c.label + "</a>"; }).join("") +
        "</div>";
    }
    return '<div class="' + cls + '">' + a + sub + "</div>";
  }

  function socialHTML() {
    return '' +
      '<a href="contact.html" class="social__btn" title="تيلجرام" aria-label="تيلجرام"><i class="fa-brands fa-telegram"></i></a>' +
      '<a href="contact.html" class="social__btn" title="إكس (X)" aria-label="إكس"><i class="fa-brands fa-x-twitter"></i></a>' +
      '<a href="contact.html" class="social__btn" title="فيسبوك" aria-label="فيسبوك"><i class="fa-brands fa-facebook-f"></i></a>' +
      '<a href="contact.html" class="social__btn" title="انستغرام" aria-label="انستغرام"><i class="fa-brands fa-instagram"></i></a>';
  }
  var LANG_HTML =
    '<div class="lang-toggle num" data-cms="locale-switch" title="التبديل إلى الإنجليزية — يُفعَّل مع النسخة الإنجليزية" role="group" aria-label="اللغة">' +
    '<span class="lang-toggle__opt is-active" aria-current="true">ع</span>' +
    '<span class="lang-toggle__opt">EN</span>' +
    '</div>';

  function headerHTML(active) {
    var links = NAV.map(function (n) { return navItemHTML(n, active); }).join("");

    return '' +
'<header class="site-header" dir="rtl">' +
'  <div class="site-header__top">' +
'    <a class="site-header__logo" href="index.html">' +
'      <img src="assets/img/logo-horizontal.png" alt="مركز قاسيون للدراسات الاستراتيجية">' +
'    </a>' +
'    <span class="site-header__date"><span class="diamond diamond--sm"></span>' + today() + '</span>' +
'    <div class="site-header__side">' +
'      <div class="social social--light">' + socialHTML() + '</div>' +
'      <a class="site-header__cta" href="index.html#newsletter">اشترك بالنشرة</a>' +
'    </div>' +
'  </div>' +
'  <nav class="site-nav" aria-label="التنقل الرئيسي">' +
'    <button class="nav-toggle" aria-label="القائمة" aria-expanded="false"><span></span><span></span><span></span></button>' +
'    <div class="site-nav__links">' + links +
'      <div class="nav-panel-foot">' + socialHTML() + LANG_HTML + '</div>' +
'    </div>' +
'    <div class="site-nav__right">' +
'      <form class="searchbox" role="search" action="research.html">' +
'        <input type="search" name="q" placeholder="ادخل كلمة البحث…" aria-label="بحث">' +
'        <button class="searchbox__btn" type="submit" aria-label="بحث">' +
'          <i class="fa-solid fa-magnifying-glass"></i>' +
'        </button>' +
'      </form>' +
'      <span class="site-nav__divider">|</span>' +
'      ' + LANG_HTML +
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
'      <h3>إصدارات المركز</h3>' +
'      <div class="site-footer__links">' +
'        <a href="research.html?type=%D8%AA%D9%82%D8%AF%D9%8A%D8%B1%20%D9%85%D9%88%D9%82%D9%81">تقديرات موقف</a>' +
'        <a href="research.html">مقالات</a>' +
'        <a href="research.html?type=%D8%AA%D8%B1%D8%AC%D9%85%D8%A9%20%D9%86%D9%88%D8%B9%D9%8A%D8%A9">ترجمات</a>' +
'        <a href="research.html?type=%D8%AA%D8%AD%D9%84%D9%8A%D9%84%20%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A">تحليلات</a>' +
'      </div>' +
'    </div>' +
'    <div class="site-footer__col">' +
'      <h3>ملفات</h3>' +
'      <div class="site-footer__links">' +
'        <a href="file.html?f=sy">ملف سوريا</a>' +
'        <a href="file.html?f=lb">ملف لبنان</a>' +
'        <a href="file.html?f=ps">غزة</a>' +
'        <a href="files.html">إيران</a>' +
'      </div>' +
'    </div>' +
'    <div class="site-footer__col">' +
'      <h3>المركز</h3>' +
'      <div class="site-footer__links">' +
'        <a href="about.html">عن المركز</a>' +
'        <a href="library.html">المكتبة</a>' +
'        <a href="media.html">الميديا</a>' +
'        <a href="contact.html">تواصل معنا</a>' +
'      </div>' +
'      <div class="site-footer__email">info@qasiounstudies.com</div>' +
'    </div>' +
'  </div>' +
'  <div class="site-footer__bottom">' +
'    <span class="site-footer__copy">© 2026 مركز قاسيون للدراسات الاستراتيجية — جميع الحقوق محفوظة<span class="site-footer__legal"><a href="privacy.html">سياسة الخصوصية</a><a href="terms.html">شروط الاستخدام</a></span></span>' +
'    <div class="site-footer__meta">' +
'      <span>زيارات الموقع: <span class="num" data-cms="visits">—</span></span>' +
'      <div class="dot-row"><span></span><span></span><span></span></div>' +
'    </div>' +
'  </div>' +
'</footer>';
  }

  function mount() {
    var active = document.body.getAttribute("data-page") || "";
    var head = document.getElementById("site-header");
    var foot = document.getElementById("site-footer");
    if (head) head.innerHTML =
      '<a class="skip-link" href="#main">تخطي إلى المحتوى</a>' + headerHTML(active);
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

    // Submenus: caret button toggles (mobile accordion + keyboard on desktop)
    function syncAria(item, open) {
      var a = item.querySelector("a[aria-haspopup]");
      var b = item.querySelector(".nav-sub-toggle");
      if (a) a.setAttribute("aria-expanded", String(open));
      if (b) b.setAttribute("aria-expanded", String(open));
    }
    document.querySelectorAll(".nav-item--sub").forEach(function (item) {
      var btn = item.querySelector(".nav-sub-toggle");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var open = item.classList.toggle("is-open");
        syncAria(item, open);
        // أغلق البقية
        document.querySelectorAll(".nav-item--sub.is-open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            syncAria(other, false);
          }
        });
      });
    });
    // Escape يقفل أي قائمة مفتوحة (كيبورد)
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".nav-item--sub.is-open").forEach(function (item) {
        item.classList.remove("is-open");
        syncAria(item, false);
      });
    });
    // إغلاق القوائم عند النقر خارجها
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-item--sub")) {
        document.querySelectorAll(".nav-item--sub.is-open").forEach(function (item) {
          item.classList.remove("is-open");
          syncAria(item, false);
        });
      }
    });
  }

  // زر الرجوع لأعلى الصفحة
  function mountToTop() {
    var b = document.createElement("button");
    b.className = "to-top";
    b.setAttribute("aria-label", "العودة إلى أعلى الصفحة");
    b.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(b);
    b.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    var t;
    window.addEventListener("scroll", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        b.classList.toggle("is-visible", window.scrollY > 600);
      }, 80);
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mount(); mountToTop(); });
  } else {
    mount();
    mountToTop();
  }
})();
