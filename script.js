// Initialize EmailJS with Public Key
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("np-QtM3vU8tOHqXlj");
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenuBtn = document.getElementById("close-menu-btn");

    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("hidden");
            // Optional: add slide-in animation class here
        });

        closeMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    }

    // 2. Global "Get a Quote" Modal
    const quoteBtns = document.querySelectorAll(".quote-btn");
    const quoteModal = document.getElementById("quote-modal");
    const closeQuoteBtn = document.getElementById("close-quote-btn");

    if (quoteModal) {
        quoteBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                quoteModal.classList.remove("hidden");
                quoteModal.classList.add("flex");
            });
        });

        if (closeQuoteBtn) {
            closeQuoteBtn.addEventListener("click", () => {
                quoteModal.classList.add("hidden");
                quoteModal.classList.remove("flex");
            });
        }

        // Close on clicking outside the modal content
        quoteModal.addEventListener("click", (e) => {
            if (e.target === quoteModal) {
                quoteModal.classList.add("hidden");
                quoteModal.classList.remove("flex");
            }
        });

        // Handle Quote Form Submission
        const quoteForm = document.getElementById("quote-form");
        const quoteSuccessMessage = document.getElementById("quote-success-message");
        if (quoteForm) {
            quoteForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const submitBtn = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;

                emailjs.sendForm('service_pvgpq91', 'template_a2qxj4n', quoteForm)
                    .then(() => {
                        quoteForm.classList.add("hidden");
                        if (quoteSuccessMessage) {
                            quoteSuccessMessage.classList.remove("hidden");
                        }

                        // Auto close after 3 seconds
                        setTimeout(() => {
                            quoteModal.classList.add("hidden");
                            quoteModal.classList.remove("flex");

                            // Reset form for next time
                            quoteForm.reset();
                            quoteForm.classList.remove("hidden");
                            if (quoteSuccessMessage) {
                                quoteSuccessMessage.classList.add("hidden");
                            }
                            submitBtn.innerText = originalText;
                            submitBtn.disabled = false;
                        }, 3000);
                    }, (error) => {
                        console.error("Failed to send quote request:", error);
                        alert("Failed to send request. Please try again later.");
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }
    }

    // 3. Contact Page Form Validation
    const contactForm = document.getElementById("contact-form");
    const contactSuccessMessage = document.getElementById("contact-success-message");

    if (contactForm && contactSuccessMessage) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;
            }

            emailjs.sendForm('service_pvgpq91', 'template_a2qxj4n', contactForm)
                .then(() => {
                    // Hide form, show success message
                    contactForm.classList.add("hidden");
                    contactSuccessMessage.classList.remove("hidden");
                    if (submitBtn) {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    }
                }, (error) => {
                    console.error("Failed to send contact message:", error);
                    alert("Failed to send message. Please try again later.");
                    if (submitBtn) {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    }
                });
        });
    }
});
