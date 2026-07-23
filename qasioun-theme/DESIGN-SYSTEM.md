# نظام التصميم — Qasioun Design System

مرجع لمطوّر الواجهة ومطوّر ربط الـCMS. كل القيم هنا **tokens** مُعرّفة في `css/base.css` تحت `:root` — التعديل يتم هناك فقط، ممنوع كتابة قيم literal في أنماط جديدة.

---

## 1. الألوان (Color Tokens)

### ألوان الهوية (من دليل الهوية البصرية الرسمي)
| Token | القيمة | الاستخدام |
|---|---|---|
| `--navy` | `#24326B` | اللون الأساسي: عناوين، تنقّل، خلفيات مؤسسية |
| `--orange` | `#EB6224` | **لون الفعل حصراً**: CTA، روابط أفعال، مؤشرات نشطة |
| `--blue` | `#287EAB` | ثانوي: تصنيف "إحاطة"، تنويع بصري |
| `--line-3` | `#D2D4D4` | رمادي الهوية: حدود ثقيلة |

### مشتقات
| Token | القيمة | الاستخدام |
|---|---|---|
| `--navy-2` / `--navy-deep` / `--navy-tile` | `#1B2755` / `#141F49` / `#2A3A7A` | تدرجات الكحلي (بانرات/فوتر) |
| `--orange-2` / `--orange-soft` | `#FF7635` / `#FFB48C` | hover الفعل / نص برتقالي على كحلي |
| `--text` / `--text-2` / `--muted` / `--muted-2` | `#3D4763` / `#5A6480` / `#6F7891` / `#8A93AB` | سلّم نص 4 درجات |
| `--bg-soft` / `--bg-soft-2` | `#F7F9FC` / `#F4F6FA` | خلفيات فاتحة (bands / inputs) |
| `--line` / `--line-2` | `#EEF1F6` / `#E4E8F0` | حدود خفيفة / حدود كروت |

### لوحات التصنيفات (semantic badges)
| التصنيف | `bg` / `fg` |
|---|---|
| تقدير موقف | `--pal-orange-bg` `#FDEFE7` / `#EB6224` |
| إحاطة دورية | `--pal-blue-bg` `#EEF3FF` / `#287EAB` |
| تحليل استراتيجي | `--pal-navy-bg` `#EBEEF8` / `#24326B` |
| ترجمة نوعية | `--pal-gray-bg` `#F0F1F4` / `#4A5474` |
| إنفوغرافيك | `--pal-amber-bg` `#FDF3E7` / `#C2711B` |
| خريطة | `--pal-green-bg` `#EAF5EE` / `#2E7D4F` |

> نفس الخريطة موجودة للـJS في `js/data/publications.js → typeColors` و`js/util.js → typeClass()`.

**قاعدة البرتقالي:** برتقالي مصمت `#EB6224` = زر/فعل/خلفيات/نقاط. النص البرتقالي الصغير (<18px) يستخدم `--orange-text: #C2410C` (تباين AA ≥4.5:1 على الأبيض)، وبادج البرتقالي على الخوخي يستخدم `--pal-orange-fg: #B0400F`.

---

## 2. الخطوط (Typography)

| Token | القيمة |
|---|---|
| `--font` | `'Neo Sans Arabic', 'Cairo', 'Roboto', sans-serif` |
| `--font-num` | `'Roboto', …` — **كل رقم/تاريخ/وقت يلف بـ`.num`** (Roboto + `direction:ltr`) |

الخطوط self-hosted في `fonts/` (تعريفات `css/fonts.css`). Neo Sans Arabic مرخّص — يُضاف يدوياً (راجع `fonts/neo-sans-arabic/README.txt`)، وCairo هو الفallback المرفق.

**الأيقونات:** Font Awesome 6 Free — self-hosted في `vendor/fontawesome/` (solid + brands + regular). الاستخدام: `<i class="fa-solid fa-…">` داخل حاويات الأيقونات؛ المقاس يُضبط من حاوية الأيقونة لا من الـ`i` مباشرة (راجع بلوك "Font Awesome sizing" في pages.css).

### سلّم الأحجام
| الدور | الحجم | الوزن |
|---|---|---|
| عنوان البانر (hero-scale) | 32px | 700 |
| **عنوان سكشن — موحّد** | **30px** | 700 |
| عنوان صفحة داخلية (h1) | 38px | 700 |
| عنوان المقال المميز | 29px | 700 |
| عنوان بطاقة | 14.5–17px | 700 |
| نص جسم | 14.5–16.5px | 400–600 / line-height 1.9–2.15 |
| ميتا/تواريخ | 11.5–13px | 500–700 |
| رقم إحصائي | 52px | 700 |

**قاعدة:** مسافة رأس السكشن عن محتواه = **30px** (`.sec-head` margin-bottom) — موحّدة.

---

## 3. المسافات (Spacing)

| السياق | القيمة |
|---|---|
| Gutter الصفحة `--pad-x` | 48px → 28px (≤1024) → 18px (≤600) → 14px (≤400) |
| بين السكاشن `.section` | 64px (موبايل 44px) |
| bands (شرائط بخلفية) | `padding-block: 56px` |
| gap الشبكات | 18–26px حسب كثافة البطاقة |
| حشو بطاقة قياسية | 22–26px (موبايل يقل درجة) |

---

## 4. الزوايا (Radius) — سلّم من 4 درجات

| Token/قيمة | الاستخدام |
|---|---|
| `8px` | chips ميكرو (امتداد PDF) |
| `10px` | أزرار، inputs، tabs، مربعات أيقونات |
| `--radius: 14px` | **كل الكروت وحاويات الصور** |
| `--radius-lg: 18px` | حاويات كبيرة، widgets، بانرات |
| `100px` (pill) | badges، chips فلترة، CTA pill، أفاتار/أيقونات دائرية |

---

## 5. الظلال (Shadows) — عائلتان فقط

| Token | القيمة | متى |
|---|---|---|
| `--shadow-card` | `0 12px 28px rgba(36,50,107,.12)` | hover البطاقات |
| `--shadow-lift` | `0 16px 36px rgba(36,50,107,.16)` | hover العناصر الكبيرة/الصور |
| عائلة CTA | `rgba(235,98,36,…)` | أزرار برتقالية فقط |

**قاعدة:** حالة الراحة = **flat + border** (بلا ظل). الظل يظهر عند الـhover فقط. استثناء وحيد: البانرات الداكنة الكبيرة.

---

## 6. الحركة (Motion)

| Token/سلوك | القيمة |
|---|---|
| `--ease-out` | `cubic-bezier(.22,.61,.36,1)` |
| hover بطاقة | `translateY(-4px)` + shadow — **موحّد** |
| hover صف/قائمة | `translateX(-4px)` (اتجاه RTL) |
| hover زر | `translateY(-1px)` / active: `scale(.98)` |
| hover صورة داخل بطاقة | `scale(1.04–1.06)` بمدة .6–.7s |
| zoom أيقونة دائرية | تصميت بلون البراند (bg-flip) |
| Scroll reveal | `js/motion.js` — stagger 70ms، يحترم `prefers-reduced-motion`، وبدون JS المحتوى ظاهر |
| لمعة اللوجو | `qLogoShine` 6s — شريط ضوء (أبيض→برتقالي هوية→أبيض) يمسح خطوط الشعار عبر mask بألفا اللوجو؛ يمر ~1.9s ثم يستريح؛ يتوقف عند hover |

---

## 7. جرد المكونات (Component Inventory)

### مشتركة (`components.css`)
| المكوّن | الكلاس | Variants | الحالات |
|---|---|---|---|
| رأس سكشن | `.sec-head` | `--sm`, `--light` | — |
| Badge | `.badge` | `--orange/blue/navy/gray/amber/green/solid/outline` | ارتفاع موحّد 11.5px/4px |
| Tag نصي | `.tag` | `--orange/blue/navy/gray` | — |
| زر | `.btn` | `--navy`, `--outline`, `--sm` | hover ↑1px، active ضغطة، `:disabled` |
| CTA pill | `.pill-link` | — | الزر الأساسي الوحيد بهذا الشكل |
| Input | `.input/.textarea/.select` | `--ltr` | focus برتقالي |
| Chip فلترة | `.chip` | `.is-active` | hover/active |
| إشعار | `.notice` | `--success/--error` | — |
| Breadcrumb / empty / hatch / ph-badge / round-btn / head-split | … | | |

### الرئيسية (`pages.css`)
update-card (newswire bar) · featured + issue-card (قسم مقالات) · brief-note (تحليلات موجزة) · assess + wire (مرقّمة) · **dossier** (tabs تفاعلية) · trans-card (اقتباس) · maps + data-tile · brief (غلاف+محتوى) · mostread (دوائر مرتّبة) · **agenda-card** (تقويم) · **pub-card** (إصدار بكعب + hover قلب كامل) · special (بانر) · zz-row (زجزاج) · **monitor** (غرفة رصد: ساعة + progress يوم + أيقونات تصنيف) · **versus** (مواجهة) · **offers** (بلاطات أيقونات) · **bignums** (عدّادات) · newsletter

### الصفحات الداخلية
page-hero · filter-bar (بحث+chips) · result-row · book-card · prod-card · file-card · vm/method/member-card · contact-* · article-* (progress قراءة، اقتباس، سيناريوهات، related)

---

## 8. حالات التفاعل (States)

- **Focus:** `:focus-visible` → outline برتقالي 2px + offset — على كل عنصر تفاعلي.
- **Disabled:** `.btn:disabled` → opacity .45 + تعطيل الحركة.
- **Active nav:** `data-page` على `<body>` → `layout.js` يعلّم الرابط بخط برتقالي سفلي.
- **Hover:** راجع جدول الحركة — لا تخترع حركة جديدة لمكوّن جديد.

---

## 9. نقاط الكسر (Breakpoints)

| العرض | التحوّل |
|---|---|
| ≤1024px | شبكات 4→2/3، gutter 28 |
| ≤860px | هامبرغر منيو، هيرو عمود، dossier tabs صف أفقي |
| ≤760px | شبكات →1/2، versus عمود، offers صفوف أفقية |
| ≤600px | باس الموبايل الشامل (عناوين/حشوات/بانر مكدّس) |
| ≤400px | gutter 14، تكثيف نهائي |

---

## 10. نقاط ربط الـCMS

| العنصر | الملف | ملاحظة |
|---|---|---|
| التنقّل | `js/layout.js → NAV[]` | مصفوفة واحدة لكل الصفحات |
| المنشورات | `js/data/publications.js` | تُستبدل بـAPI — الشكل موثّق بالكائنات الحالية |
| ~~ticker~~ | — | **حُذف بقرار العميل (2026-07)** |
| dossier | `index.html .dossier__tab/__panel` | ربط `data-panel` |
| الأرقام | `data-count` / `data-suffix` | العدّاد تلقائي |
| أرقام مزيفة | زيارات الفوتر، "منذ X دقيقة"، عدّاد المقال | placeholders — تُربط أو تُشال |
| البحث | فعّال — الهيدر يرسل إلى `research.html?q=…` والأرشيف يقرأ `q` و`type` من الرابط | جاهز للـCMS |

---

## 11. بنية التنقّل (2026-07 — حسب ملاحظات العميل)

قوائم منسدلة معرّفة في `js/layout.js → NAV[]` (تعديل واحد يسري على كل الصفحات):

| الأب | الفروع | الروابط |
|---|---|---|
| الرئيسية | — | index.html |
| إصدارات المركز | تقديرات موقف · مقالات · ترجمات · تحليلات | research.html?type=… (فلترة تلقائية) — «مقالات» بلا فلتر حتى يُعرَّف نوعها في الـCMS |
| ملفات | ملف سوريا · ملف لبنان · غزة · إيران | files.html#file-sy/-lb/-ps (إيران: بانتظار محتوى CMS) |
| المكتبة | كل الإصدارات | library.html |
| الميديا | انفوغراف · خرائط · كاروسيل | media.html#infographics/#maps/#cards |
| تواصل معنا / عن المركز | — | contact.html / about.html |

سلوك: سطح المكتب hover/focus-within يفتح لوحة بيضاء؛ الموبايل أكورديون بزر سهم (aria-expanded). البحث في الهيدر يرسل فعلياً إلى `research.html?q=…`.

## 12. جاهزية اللغة الإنجليزية (بنية تحتية)

- زر **EN** في الهيدر (`.lang-switch`, `data-cms="locale-switch"`) — placeholder حتى تفعيل النسخة.
- كل عناصر `NAV` تحمل `labelEn` جاهزة.
- خطة التفعيل مع الـCMS: نسخ الصفحات تحت `/en/` بـ`lang="en" dir="ltr"`، وتحويل الخصائص الفيزيائية المتبقية (right/left) إلى خصائص منطقية (inline-start/end) — أغلب الحديث منها منطقي بالفعل.
- الأرقام أصلاً بخط Roboto عبر `.num` فلا تتأثر.

> ملاحظة: قسم "موجز اليوم" (ticker) حُذف نهائياً بطلب العميل — أزيلت أكواده من HTML/CSS/JS.

## 13. قوالب مكتملة (2026-07-22)

| القالب | الملف | التغذية |
|---|---|---|
| الملف الواحد | `file.html?f=sy|iq|lb|af|ps|intl` | `fileSlugs` + `fileMeta` في publications.js — ترويسة + محاور + فيد مفلتر + رابط أرشيف `?file=` |
| وسائط منفردة | `media-item.html` | قالب static بعلامات `data-cms` (عنوان/ملف/تحميلات/وصف) + ذات صلة |
| وحدة/كاتب | `author.html?u=<الاسم>` | فلترة publications بالكاتب — العدّاد والفيد تلقائيان |
| 404 | `404.html` | ثابتة — توجيه الخادم إليها مطلوب عند الربط |
| قانونية | `privacy.html` / `terms.html` | نص placeholder بعلامة `data-cms="legal-content"` + روابط بالفوتر |

روابط عميقة مدعومة في الأرشيف: `?q=` و`?type=` و`?file=` (تتراكب).
