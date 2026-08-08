const hero = document.getElementById('hero');
const bgLayer = document.getElementById('bgLayer');

// Spotlight effect (desktop / mouse-capable devices only)
hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bgLayer.style.webkitMaskImage = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
    bgLayer.style.maskImage = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
});

hero.addEventListener('mouseleave', () => {
    const transparentMask = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 100%)';
    bgLayer.style.webkitMaskImage = transparentMask;
    bgLayer.style.maskImage = transparentMask;
});

// Lightweight touch support: reveal spotlight where the user taps/drags
hero.addEventListener('touchmove', (e) => {
    if (!e.touches || !e.touches.length) return;
    const rect = hero.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    bgLayer.style.webkitMaskImage = `radial-gradient(circle 140px at ${x}px ${y}px, black 0%, transparent 100%)`;
    bgLayer.style.maskImage = `radial-gradient(circle 140px at ${x}px ${y}px, black 0%, transparent 100%)`;
}, { passive: true });

hero.addEventListener('touchend', () => {
    const transparentMask = 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 100%)';
    bgLayer.style.webkitMaskImage = transparentMask;
    bgLayer.style.maskImage = transparentMask;
});

// Mobile hamburger menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after tapping a link (mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Contact form: submit to Formspree via fetch so the page doesn't reload
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
                formStatus.classList.add('form-status--success');
                contactForm.reset();
            } else {
                const data = await response.json().catch(() => null);
                const errMsg = data && data.errors
                    ? data.errors.map((err) => err.message).join(', ')
                    : 'Something went wrong. Please try again or email me directly.';
                formStatus.textContent = errMsg;
                formStatus.classList.add('form-status--error');
            }
        } catch (err) {
            formStatus.textContent = 'Network error — please check your connection and try again.';
            formStatus.classList.add('form-status--error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}
