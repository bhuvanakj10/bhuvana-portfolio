const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');
const backToTopBtn = document.querySelector('.back-to-top');
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (form) {
  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    subject: form.querySelector('#subject'),
    message: form.querySelector('#message')
  };

  const setError = (fieldName, message) => {
    const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorEl) {
      errorEl.textContent = message;
    }
    if (fields[fieldName]) {
      fields[fieldName].setAttribute('aria-invalid', message ? 'true' : 'false');
    }
  };

  const validateField = (fieldName) => {
    const value = fields[fieldName].value.trim();

    if (fieldName === 'email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setError(fieldName, isValid ? '' : 'Please enter a valid email address.');
      return isValid;
    }

    if (!value) {
      const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      setError(fieldName, `${label} is required.`);
      return false;
    }

    setError(fieldName, '');
    return true;
  };

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener('blur', () => validateField(fieldName));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    });

    if (!isValid) {
      if (successMessage) {
        successMessage.textContent = '';
      }
      return;
    }

    form.reset();
    Object.keys(fields).forEach((fieldName) => {
      setError(fieldName, '');
      fields[fieldName].setAttribute('aria-invalid', 'false');
    });

    if (successMessage) {
      successMessage.textContent = 'Your message has been sent successfully.';
    }
  });
}
