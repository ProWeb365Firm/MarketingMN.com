document.addEventListener('DOMContentLoaded', function () {
  /* Mobile navigation toggle */
  var header = document.querySelector('.site-header');
  var navToggle = document.getElementById('nav-toggle');

  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    document.querySelectorAll('.main-nav .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      });
    });
  }

  /* FAQ accordion */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';

      faqItems.forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Open first FAQ by default, matching the mockup */
  var firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    firstFaq.querySelector('.faq-question').click();
  }

  /* Consultation request form: checks the fields, then submits to the lead
     handler, which sends the visitor back here with ?sent=1 (or ?sent=0). */
  var consultForm = document.getElementById('consultation-form');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      if (!consultForm.checkValidity()) {
        e.preventDefault();
        consultForm.reportValidity();
        return;
      }
      var btn = consultForm.querySelector('.form-submit');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
    });

    var sent = new URLSearchParams(window.location.search).get('sent');
    var card = consultForm.closest('.form-card');
    if (sent === '1' && card) {
      var heading = card.querySelector('h3');
      if (heading) heading.style.display = 'none';
      consultForm.style.display = 'none';
      var success = document.createElement('div');
      success.className = 'form-success';
      success.innerHTML =
        '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>' +
        '<h4>Thanks &mdash; your inquiry is on its way.</h4>' +
        '<p>We review every request personally and will follow up soon to schedule your Growth Strategy Consultation.</p>';
      card.appendChild(success);
      card.scrollIntoView({ block: 'center' });
    } else if (sent === '0' && card) {
      var err = document.createElement('p');
      err.className = 'form-error';
      err.setAttribute('role', 'alert');
      err.style.cssText = 'color:#ff6b4a;margin:0 0 16px;font-weight:600';
      err.textContent = 'Sorry, your inquiry could not be sent. Please check the form and try again, or call us.';
      consultForm.insertBefore(err, consultForm.firstChild);
      card.scrollIntoView({ block: 'center' });
    }
  }
});
