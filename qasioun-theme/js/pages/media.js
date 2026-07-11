/* Media page — quote/card carousel. */
(function () {
  "use strict";
  var cards = [
    {
      quote: "التحليل الجيد لا يكتفي بوصف الحدث، بل يسبقه ويستشرف تداعياته قبل أن تتحول إلى وقائع.",
      source: "من منهجية مركز قاسيون للدراسات الاستراتيجية",
      title: "منهجية الاستشراف قبل الحدث",
      summary: "بطاقة تعريفية بمنهجية المركز في الجمع بين السرعة في الرصد والعمق في التحليل، مصممة بصرياً للمشاركة على منصات التواصل."
    },
    {
      quote: "سوريا ما بعد الأسد ليست صفحة بيضاء، بل ساحة تتقاطع فيها إرادات إقليمية ودولية تُعيد رسم حدود النفوذ.",
      source: "من تحليل: مسارات إعادة بناء الدولة — تموز 2026",
      title: "مقتطف من تحليل استراتيجي",
      summary: "اقتباس مختار من أحدث تحليلات وحدة الدراسات السورية حول موازين النفوذ في مرحلة إعادة بناء الدولة."
    },
    {
      quote: "حصر السلاح بيد الدولة في العراق لم يعد شعاراً سياسياً، بل استحقاقاً تفرضه موازين ما بعد التصعيد الإقليمي.",
      source: "من إحاطة العراق الشهرية — حزيران 2026",
      title: "مقتطف من الإحاطة العراقية",
      summary: "خلاصة مكثفة من الإحاطة الشهرية حول مستقبل الفصائل المسلحة ومتطلبات الدولة الوطنية."
    }
  ];

  var idx = 0;
  var q = document.getElementById("cardQuote");
  var src = document.getElementById("cardSource");
  var title = document.getElementById("cardTitle");
  var summary = document.getElementById("cardSummary");
  var dots = document.getElementById("cardDots");
  var shared = document.getElementById("cardShared");
  if (!q) return;

  function render() {
    var c = cards[idx];
    q.textContent = c.quote;
    src.textContent = c.source;
    title.textContent = c.title;
    summary.textContent = c.summary;
    shared.hidden = true;
    dots.innerHTML = "";
    cards.forEach(function (_, i) {
      var b = document.createElement("button");
      b.className = "quote-dot" + (i === idx ? " is-active" : "");
      b.setAttribute("aria-label", "بطاقة " + (i + 1));
      b.addEventListener("click", function () { idx = i; render(); });
      dots.appendChild(b);
    });
  }

  document.getElementById("cardPrev").addEventListener("click", function () {
    idx = (idx - 1 + cards.length) % cards.length; render();
  });
  document.getElementById("cardNext").addEventListener("click", function () {
    idx = (idx + 1) % cards.length; render();
  });
  document.getElementById("cardShare").addEventListener("click", function () {
    shared.hidden = false;
  });

  render();
})();
