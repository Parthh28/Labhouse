// Initialize EmailJS with Public Key
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("np-QtM3vU8tOHqXlj");
    }
})();

// --- Main Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    const ease = "power2.out";

    const initPillNav = () => {
        const pills = document.querySelectorAll('.pill');
        pills.forEach((pill, index) => {
            const circle = pill.querySelector('.hover-circle');
            const label = pill.querySelector('.pill-label');
            const labelHover = pill.querySelector('.pill-label-hover');
            
            if (!circle) return;

            const rect = pill.getBoundingClientRect();
            const { width: w, height: h } = rect;
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;

            gsap.set(circle, {
                width: D,
                height: D,
                bottom: -delta,
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`
            });

            if (label) gsap.set(label, { y: 0 });
            if (labelHover) gsap.set(labelHover, { y: h + 12, opacity: 0 });

            const tl = gsap.timeline({ paused: true });
            tl.to(circle, { scale: 1.2, duration: 0.6, ease }, 0);
            if (label) tl.to(label, { y: -(h + 8), duration: 0.6, ease }, 0);
            if (labelHover) tl.to(labelHover, { y: 0, opacity: 1, duration: 0.6, ease }, 0);

            pill.addEventListener('mouseenter', () => tl.play());
            pill.addEventListener('mouseleave', () => tl.reverse());
        });
    };

    // 2. Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mobileMenuPopover = document.querySelector('.mobile-menu-popover');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenuPopover) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenuPopover.classList.add('is-open');
                gsap.to(hamburgerLines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(hamburgerLines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                mobileMenuPopover.classList.remove('is-open');
                gsap.to(hamburgerLines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(hamburgerLines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        });

        mobileMenuPopover.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenuPopover.classList.remove('is-open');
                gsap.to(hamburgerLines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(hamburgerLines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            });
        });
    }

    // 2. Quote Modal Logic
    const quoteBtns = document.querySelectorAll(".quote-btn");
    const quoteModal = document.getElementById("quote-modal");
    const closeQuoteBtn = document.getElementById("close-quote-btn");
    const quoteForm = document.getElementById("quote-form");
    const quoteSuccessMessage = document.getElementById("quote-success-message");

    if (quoteBtns.length > 0 && quoteModal) {
        quoteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                quoteModal.classList.remove("hidden");
                quoteModal.classList.add("flex");
                document.body.style.overflow = "hidden";
            });
        });

        const closeModal = () => {
            quoteModal.classList.add("hidden");
            quoteModal.classList.remove("flex");
            document.body.style.overflow = "";
        };

        if (closeQuoteBtn) closeQuoteBtn.addEventListener("click", closeModal);
        quoteModal.addEventListener("click", closeModal);

        if (quoteForm) {
            quoteForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const submitBtn = quoteForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerText = "Sending...";
                    submitBtn.disabled = true;
                }

                emailjs.sendForm('service_pvgpq91', 'template_quote', quoteForm)
                    .then(() => {
                        quoteForm.classList.add("hidden");
                        quoteSuccessMessage.classList.remove("hidden");
                    }, (error) => {
                        console.error("EmailJS Error:", error);
                        alert("Failed to send request. Please try again.");
                        if (submitBtn) {
                            submitBtn.innerText = "Submit Request";
                            submitBtn.disabled = false;
                        }
                    });
            });
        }
    }

    // 3. Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    const contactSuccessMessage = document.getElementById("contact-success-message");

    if (contactForm && contactSuccessMessage) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;
            }

            emailjs.sendForm('service_pvgpq91', 'template_a2qxj4n', contactForm)
                .then(() => {
                    contactForm.classList.add("hidden");
                    contactSuccessMessage.classList.remove("hidden");
                }, (error) => {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again.");
                    if (submitBtn) {
                        submitBtn.innerText = "Send Message";
                        submitBtn.disabled = false;
                    }
                });
        });
    }

    // 4. Category Filter System
    const initFilterSystem = () => {
        // Reviews/Clients Page
        const clientFilters = document.getElementById('client-filters');
        const clientGrid = document.getElementById('client-grid');

        if (clientFilters && clientGrid) {
            const filterBtns = clientFilters.querySelectorAll('.filter-btn');
            const clientCards = clientGrid.querySelectorAll('.border-glow-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-primary', 'text-white', 'border-primary');
                        b.classList.add('border-slate-200', 'dark:border-slate-800');
                    });
                    btn.classList.add('bg-primary', 'text-white', 'border-primary');
                    btn.classList.remove('border-slate-200', 'dark:border-slate-800');

                    gsap.to(clientCards, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.2,
                        onComplete: () => {
                            clientCards.forEach(card => {
                                const category = card.getAttribute('data-category');
                                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
                            });
                            gsap.to(clientCards, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.01 });
                        }
                    });
                });
            });
        }

        // Services Page
        const serviceFilters = document.getElementById('service-filters');
        const serviceSections = document.querySelectorAll('.service-section');

        if (serviceFilters) {
            const serviceBtns = serviceFilters.querySelectorAll('.service-filter-btn');
            serviceBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');
                    serviceBtns.forEach(b => {
                        b.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
                        b.classList.add('text-slate-700', 'dark:text-slate-300');
                    });
                    btn.classList.add('bg-primary/10', 'text-primary', 'font-bold');
                    btn.classList.remove('text-slate-700', 'dark:text-slate-300');

                    serviceSections.forEach(section => {
                        const category = section.getAttribute('data-category');
                        if (filter === 'all' || category === filter) {
                            gsap.set(section, { display: 'block' });
                            gsap.to(section, { opacity: 1, y: 0, duration: 0.4 });
                        } else {
                            gsap.to(section, { opacity: 0, y: 20, duration: 0.3, onComplete: () => gsap.set(section, { display: 'none' }) });
                        }
                    });
                });
            });
        }
    };



    // Run Initializations
    initPillNav();
    initFilterSystem();

    window.addEventListener('resize', initPillNav);
});
