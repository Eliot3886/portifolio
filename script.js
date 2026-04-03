const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeInElements.forEach(el => observer.observe(el));

const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// Dark mode toggle
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Contact Form AJAX Submission
const contactForm = document.querySelector('form[action^="https://formspree.io"]');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        btn.innerHTML = 'Message Sent Successfully!';
        btn.classList.replace('btn-primary', 'btn-success');
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.replace('btn-success', 'btn-primary');
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      btn.innerHTML = 'Error! Please try again.';
      btn.classList.replace('btn-primary', 'btn-danger');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.replace('btn-danger', 'btn-primary');
        btn.disabled = false;
      }, 4000);
    }
  });
}

