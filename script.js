// Run JavaScript after the HTML is loaded
document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------
     Mobile navigation toggle
  ---------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("nav-links--open");
    });
  }

  /* ---------------------------
     Smooth scrolling for nav links
  ---------------------------- */
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  navAnchors.forEach(function (anchor) {        // ✅ use "anchor" here
    anchor.addEventListener("click", function (event) {
      event.preventDefault(); // stop default jump

      var targetId = anchor.getAttribute("href").substring(1);
      var targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth"
        });
      }

      // close mobile menu after clicking a link
      if (navLinks) {
        navLinks.classList.remove("nav-links--open");
      }
    });
  });

  /* ---------------------------
     FAQ accordion
  ---------------------------- */
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var questionButton = item.querySelector(".faq-question");

    if (questionButton) {
      questionButton.addEventListener("click", function () {
        // Close all other items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle current item
        item.classList.toggle("active");
      });
    }
  });

  /* ---------------------------
     Contact form validation
  ---------------------------- */
  var contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // stop form from actually submitting

      // Clear previous error messages
      var errorSpans = contactForm.querySelectorAll(".error-message");
      errorSpans.forEach(function (span) {
        span.textContent = "";
      });

      // Get input fields (scoped to the form is a bit safer)
      var nameInput = contactForm.querySelector("#name");
      var emailInput = contactForm.querySelector("#email");
      var messageInput = contactForm.querySelector("#message");

      var hasError = false;

      // Simple empty checks
      if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your name.");
        hasError = true;
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, "Please enter your email address.");
        hasError = true;
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, "Please write a message.");
        hasError = true;
      }

      if (!hasError) {
        alert("Thank you for contacting ABC. We will get back to you soon.");
        contactForm.reset();
      }
    });
  }

  // Helper function to show error under an input
  function showError(inputElement, message) {
    var container = inputElement.parentElement;
    var errorSpan = container.querySelector(".error-message");

    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }
});