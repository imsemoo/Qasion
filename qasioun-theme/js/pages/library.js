/* Library page — searchable/filterable grid of downloadable publications. */
(function () {
  "use strict";
  var Q = window.QASIOUN;
  var pubs = Q.publications, types = Q.types, files = Q.files;

  var state = { q: "", month: "all", type: "الكل", file: "الكل", downloaded: {} };

  var grid = document.getElementById("libGrid");
  var empty = document.getElementById("libEmpty");
  var count = document.getElementById("libCount");
  var typeChips = document.getElementById("libTypeChips");
  var fileChips = document.getElementById("libFileChips");
  var search = document.getElementById("libSearch");
  var month = document.getElementById("libMonth");

  function filtered() {
    var list = pubs.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (state.type !== "الكل") list = list.filter(function (p) { return p.type === state.type; });
    if (state.file !== "الكل") list = list.filter(function (p) { return p.file === state.file; });
    if (state.month !== "all") list = list.filter(function (p) { return p.date.indexOf(state.month) === 0; });
    var q = state.q.trim();
    if (q) list = list.filter(function (p) {
      return (p.title + " " + p.summary + " " + p.type + " " + p.file).indexOf(q) !== -1;
    });
    return list;
  }

  function cardHTML(p) {
    var done = !!state.downloaded[p.id];
    return '' +
'<article class="book-card">' +
'  <div class="book-card__cover hatch hatch--navy">' +
'    <span class="ph-badge ph-badge--dark">غلاف الإصدار</span>' +
'    <span class="badge ' + Q.typeClass(p.type) + ' book-card__badge">' + Q.esc(p.type) + '</span>' +
'  </div>' +
'  <div class="book-card__body">' +
'    <div class="book-card__meta">' +
'      <span class="badge--file">الملف ' + Q.esc(p.file) + '</span>' +
'      <span class="book-card__date">' + Q.esc(p.dateLabel) + '</span>' +
'    </div>' +
'    <a href="article.html" class="book-card__title">' + Q.esc(p.title) + '</a>' +
'    <div class="book-card__foot">' +
'      <button class="btn btn--navy btn--sm book-card__dl' + (done ? ' is-done' : '') + '" data-id="' + p.id + '">' +
         (done ? '✓ تم التحميل' : 'تحميل PDF') + '</button>' +
'      <span class="book-card__views"><span class="num">' + Q.num(p.views) + '</span> زيارة</span>' +
'    </div>' +
'  </div>' +
'</article>';
  }

  function render() {
    var list = filtered();
    count.textContent = list.length;
    grid.innerHTML = list.map(cardHTML).join("");
    empty.hidden = !(pubs.length > 0 && list.length === 0);

    Q.buildChips(typeChips, types, state.type, function (v) { state.type = v; render(); });
    Q.buildChips(fileChips, files, state.file, function (v) { state.file = v; render(); });

    grid.querySelectorAll(".book-card__dl").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.downloaded[btn.getAttribute("data-id")] = true;
        btn.textContent = "✓ تم التحميل";
        btn.classList.add("is-done");
      });
    });
  }

  search.addEventListener("input", function () { state.q = search.value; render(); });
  month.addEventListener("change", function () { state.month = month.value; render(); });

  render();
})();
