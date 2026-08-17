/* HonanSafe — site interactions */

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      document.body.classList.toggle("no-scroll", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 18px rgba(11,37,69,.12)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Contact form (mailto fallback, no backend) ---------- */
  var form = document.querySelector("#rfq-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector("#f-name") || {}).value || "";
      var company = (form.querySelector("#f-company") || {}).value || "";
      var email = (form.querySelector("#f-email") || {}).value || "";
      var country = (form.querySelector("#f-country") || {}).value || "";
      var product = (form.querySelector("#f-product") || {}).value || "";
      var msg = (form.querySelector("#f-message") || {}).value || "";

      var subject = encodeURIComponent("[RFQ] " + product + " — " + company + " / " + country);
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Company: " + company + "\n" +
        "Email: " + email + "\n" +
        "Country / Market: " + country + "\n" +
        "Product interest: " + product + "\n\n" +
        "Message:\n" + msg + "\n"
      );
      window.location.href = "mailto:zwanl@hongan119.com?subject=" + subject + "&body=" + body;

      var note = document.querySelector("#form-feedback");
      if (note) {
        note.textContent = "Your email client should open — if not, send your RFQ directly to zwanl@hongan119.com or WhatsApp +86 152 5942 8489.";
        note.style.display = "block";
      }
    });
  }

  /* ---------- Year in footer ---------- */
  var yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
