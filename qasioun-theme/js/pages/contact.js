/* Contact page — client-side validation + success state (demo only). */
(function () {
  "use strict";
  var form = document.getElementById("contactForm");
  if (!form) return;
  var err = document.getElementById("contactError");
  var ok = document.getElementById("contactSuccess");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var msg = form.msg.value.trim();

    if (name && email && msg) {
      err.hidden = true;
      form.hidden = true;
      ok.hidden = false;
    } else {
      err.hidden = false;
    }
  });

  // Clear the error as the user fills required fields
  ["name", "email", "msg"].forEach(function (n) {
    form[n].addEventListener("input", function () { err.hidden = true; });
  });
})();
