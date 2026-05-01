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

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
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

// Typing Effect
const typingText = document.getElementById('typing-text');
const words = [

  "Software Engineer",
  "Full Stack Developer",
  "Backend Engineer",
  "Computer Scientist",
  "Frontend Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Network & IT Support Technician",
  "Tech Enthusiast",
  "Systems Developer"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

document.addEventListener('DOMContentLoaded', type);

// Counter Animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      let count = 0;
      const updateCount = () => {
        const speed = 2000 / target;
        if (count < target) {
          count++;
          entry.target.innerText = count + (target === 3 || target === 15 ? "+" : "");
          setTimeout(updateCount, speed);
        } else {
          entry.target.innerText = target + (target === 3 || target === 15 ? "+" : "");
        }
      };
      updateCount();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 1 });

stats.forEach(stat => statsObserver.observe(stat));



// Contact Form AJAX Submission
const contactForm = document.querySelector('form[action*="flowform.to"]');
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

// --- OUTSTANDING FEATURES LOGIC ---

// 1. Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = document.querySelector('.theme-icon-dark');
const lightIcon = document.querySelector('.theme-icon-light');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        darkIcon.classList.add('d-none');
        lightIcon.classList.remove('d-none');
    } else {
        lightIcon.classList.add('d-none');
        darkIcon.classList.remove('d-none');
    }
};

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// 2. Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.classList.add('hide'), 400);
            }
        });
    });
});

// 3. Back to Top Progress Circle
const backToTopBtn = document.getElementById('backToTop');
const progressPath = document.querySelector('.progress-circle path');
const pathLength = progressPath.getTotalLength();

progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
progressPath.style.strokeDashoffset = pathLength;

const updateProgress = () => {
    const scroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;

    if (scroll > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
};

window.addEventListener('scroll', updateProgress);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 4. Smooth Reveal on Scroll (Enhanced)
const revealElements = document.querySelectorAll('.fade-in');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
