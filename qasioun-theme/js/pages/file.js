/* قالب الملف الواحد — file.html?f=sy|iq|lb|af|ps|intl
   يملأ الترويسة والمحاور وفيد أحدث إنتاج الملف من بيانات المنشورات. */
(function () {
  "use strict";
  var Q = window.QASIOUN;
  var slug = "sy";
  try {
    var p = new URLSearchParams(location.search).get("f");
    if (p && Q.fileSlugs[p]) slug = p;
  } catch (e) {}

  var fileName = Q.fileSlugs[slug];
  var meta = Q.fileMeta[fileName] || { title: fileName, desc: "", axes: [] };

  document.title = meta.title + " — مركز قاسيون للدراسات الاستراتيجية";
  document.getElementById("fileCrumb").textContent = meta.title;
  document.getElementById("fileTitle").textContent = meta.title;
  document.getElementById("fileDesc").textContent = meta.desc;

  // المحاور
  var axes = document.getElementById("fileAxes");
  axes.innerHTML = meta.axes.map(function (a) {
    return '<div class="axis"><span class="diamond diamond--sm"></span>' + Q.esc(a) + "</div>";
  }).join("");

  // رابط الأرشيف المفلتر
  document.getElementById("fileArchiveLink").href =
    "research.html?file=" + encodeURIComponent(fileName);

  // أحدث المنشورات المرتبطة بالملف
  var pubs = Q.publications
    .filter(function (x) { return x.file === fileName; })
    .sort(function (a, b) { return b.date.localeCompare(a.date); })
    .slice(0, 6);

  document.getElementById("fileCount").textContent =
    pubs.length ? "أحدث " + pubs.length + " منشورات" : "";

  function rowHTML(x) {
    return '' +
'<a href="article.html" class="result-row">' +
'  <div class="result-row__img hatch hatch--light"><span class="ph-badge">صورة</span></div>' +
'  <div class="result-row__body">' +
'    <div class="result-row__meta">' +
'      <span class="badge ' + Q.typeClass(x.type) + '">' + Q.esc(x.type) + '</span>' +
'      <span class="result-row__date">' + Q.esc(x.dateLabel) + '</span>' +
'    </div>' +
'    <div class="result-row__title">' + Q.esc(x.title) + '</div>' +
'    <div class="result-row__summary">' + Q.esc(x.summary) + '</div>' +
'    <div class="result-row__foot">' +
'      <span class="result-row__author">' + Q.esc(x.author) + '</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span><span class="num">' + x.minutes + '</span> دقيقة قراءة</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span class="result-row__more">القراءة الكاملة ←</span>' +
'    </div>' +
'  </div>' +
'</a>';
  }

  var list = document.getElementById("filePubs");
  list.innerHTML = pubs.map(rowHTML).join("");
  document.getElementById("fileEmpty").hidden = pubs.length > 0;
})();
