/* قالب الوحدة البحثية/الكاتب — author.html?u=<الاسم مُرمَّز>
   يعرض منشورات الوحدة من بيانات المنشورات. */
(function () {
  "use strict";
  var Q = window.QASIOUN;

  var authors = [];
  Q.publications.forEach(function (p) {
    if (authors.indexOf(p.author) === -1) authors.push(p.author);
  });

  var name = authors[0] || "الوحدة البحثية";
  try {
    var u = new URLSearchParams(location.search).get("u");
    if (u && authors.indexOf(u) !== -1) name = u;
  } catch (e) {}

  document.title = name + " — مركز قاسيون للدراسات الاستراتيجية";
  document.getElementById("auName").textContent = name;

  var pubs = Q.publications
    .filter(function (x) { return x.author === name; })
    .sort(function (a, b) { return b.date.localeCompare(a.date); });

  document.getElementById("auCount").textContent = pubs.length;

  function rowHTML(x) {
    return '' +
'<a href="article.html" class="result-row">' +
'  <div class="result-row__img hatch hatch--light"><span class="ph-badge">صورة</span></div>' +
'  <div class="result-row__body">' +
'    <div class="result-row__meta">' +
'      <span class="badge ' + Q.typeClass(x.type) + '">' + Q.esc(x.type) + '</span>' +
'      <span class="badge--file">الملف ' + Q.esc(x.file) + '</span>' +
'      <span class="result-row__date">' + Q.esc(x.dateLabel) + '</span>' +
'    </div>' +
'    <div class="result-row__title">' + Q.esc(x.title) + '</div>' +
'    <div class="result-row__summary">' + Q.esc(x.summary) + '</div>' +
'    <div class="result-row__foot">' +
'      <span><span class="num">' + x.minutes + '</span> دقيقة قراءة</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span><span class="num">' + Q.num(x.views) + '</span> زيارة</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span class="result-row__more">القراءة الكاملة ←</span>' +
'    </div>' +
'  </div>' +
'</a>';
  }

  document.getElementById("auPubs").innerHTML = pubs.map(rowHTML).join("");
  document.getElementById("auEmpty").hidden = pubs.length > 0;
})();
