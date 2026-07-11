/* Small shared helpers used by the data-driven pages (library, research). */
window.QASIOUN = window.QASIOUN || {};

/* Map a publication type to a badge color modifier class. */
window.QASIOUN.typeClass = function (type) {
  switch (type) {
    case "تقدير موقف":      return "badge--orange";
    case "إحاطة دورية":     return "badge--blue";
    case "تحليل استراتيجي": return "badge--navy";
    case "ترجمة نوعية":     return "badge--gray";
    case "إنفوغرافيك":      return "badge--amber";
    case "خريطة":           return "badge--green";
    default:                return "badge--gray";
  }
};

/* Escape text for safe insertion into innerHTML. */
window.QASIOUN.esc = function (s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

/* Format a number with English digits + thousands separators. */
window.QASIOUN.num = function (n) {
  return Number(n).toLocaleString("en-US");
};

/* Build the type/file filter chips into a container and wire clicks. */
window.QASIOUN.buildChips = function (container, values, current, onPick) {
  container.innerHTML = "";
  ["الكل"].concat(values).forEach(function (v) {
    var b = document.createElement("button");
    b.className = "chip" + (v === current ? " is-active" : "");
    b.textContent = v;
    b.addEventListener("click", function () { onPick(v); });
    container.appendChild(b);
  });
};
