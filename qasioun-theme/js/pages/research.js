/* Research archive — search, sort, filter (type/file/month/day) over publications. */
(function () {
  "use strict";
  var Q = window.QASIOUN;
  var pubs = Q.publications, types = Q.types, files = Q.files;

  var state = { q: "", sort: "newest", month: "all", day: "", type: "الكل", file: "الكل" };

  // روابط عميقة من القوائم المنسدلة والبحث: research.html?type=…&q=…
  try {
    var params = new URLSearchParams(location.search);
    var pType = params.get("type"), pQ = params.get("q"), pFile = params.get("file");
    if (pType && types.indexOf(pType) !== -1) state.type = pType;
    if (pQ) state.q = pQ;
    if (pFile && files.indexOf(pFile) !== -1) state.file = pFile;
  } catch (e) {}

  var list = document.getElementById("resList");
  var empty = document.getElementById("resEmpty");
  var count = document.getElementById("resCount");
  var typeChips = document.getElementById("resTypeChips");
  var fileChips = document.getElementById("resFileChips");
  var search = document.getElementById("resSearch");
  var sort = document.getElementById("resSort");
  var month = document.getElementById("resMonth");
  var day = document.getElementById("resDay");
  var dayClear = document.getElementById("resDayClear");

  function filtered() {
    var l = pubs.slice();
    if (state.type !== "الكل") l = l.filter(function (p) { return p.type === state.type; });
    if (state.file !== "الكل") l = l.filter(function (p) { return p.file === state.file; });
    if (state.month !== "all") l = l.filter(function (p) { return p.date.indexOf(state.month) === 0; });
    if (state.day) l = l.filter(function (p) { return p.date === state.day; });
    var q = state.q.trim();
    if (q) l = l.filter(function (p) {
      return (p.title + " " + p.summary + " " + p.type + " " + p.file).indexOf(q) !== -1;
    });
    if (state.sort === "newest") l.sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (state.sort === "oldest") l.sort(function (a, b) { return a.date.localeCompare(b.date); });
    if (state.sort === "views")  l.sort(function (a, b) { return b.views - a.views; });
    return l;
  }

  function rowHTML(p) {
    return '' +
'<a href="article.html" class="result-row">' +
'  <div class="result-row__img hatch hatch--light"><span class="ph-badge">صورة</span></div>' +
'  <div class="result-row__body">' +
'    <div class="result-row__meta">' +
'      <span class="badge ' + Q.typeClass(p.type) + '">' + Q.esc(p.type) + '</span>' +
'      <span class="badge--file">الملف ' + Q.esc(p.file) + '</span>' +
'      <span class="result-row__date">' + Q.esc(p.dateLabel) + '</span>' +
'    </div>' +
'    <div class="result-row__title">' + Q.esc(p.title) + '</div>' +
'    <div class="result-row__summary">' + Q.esc(p.summary) + '</div>' +
'    <div class="result-row__foot">' +
'      <span class="result-row__author">' + Q.esc(p.author) + '</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span><span class="num">' + p.minutes + '</span> دقيقة قراءة</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span><span class="num">' + Q.num(p.views) + '</span> زيارة</span>' +
'      <span class="diamond diamond--sm"></span>' +
'      <span class="result-row__more">القراءة الكاملة ←</span>' +
'    </div>' +
'  </div>' +
'</a>';
  }

  function render() {
    var l = filtered();
    count.textContent = l.length;
    list.innerHTML = l.map(rowHTML).join("");
    empty.hidden = !(pubs.length > 0 && l.length === 0);
    dayClear.hidden = !state.day;

    Q.buildChips(typeChips, types, state.type, function (v) { state.type = v; render(); });
    Q.buildChips(fileChips, files, state.file, function (v) { state.file = v; render(); });
  }

  search.value = state.q;
  search.addEventListener("input", function () { state.q = search.value; render(); });
  sort.addEventListener("change", function () { state.sort = sort.value; render(); });
  month.addEventListener("change", function () { state.month = month.value; render(); });
  day.addEventListener("change", function () { state.day = day.value; render(); });
  dayClear.addEventListener("click", function () { state.day = ""; day.value = ""; render(); });

  render();
})();
