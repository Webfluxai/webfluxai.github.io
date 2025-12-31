// Form validation and submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    const formMessage = document.getElementById('formMessage');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone validation regex (accepts various formats)
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

    // Validate individual field
    const validateField = (field) => {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;

        // Remove previous error state
        formGroup.classList.remove('error');

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        // Validate email
        if (field.type === 'email' && value && !emailRegex.test(value)) {
            isValid = false;
        }

        // Validate phone
        if (field.type === 'tel' && value && !phoneRegex.test(value)) {
            isValid = false;
        }

        // Add error state if invalid
        if (!isValid) {
            formGroup.classList.add('error');
        }

        return isValid;
    };

    // Real-time validation on blur
    const formFields = contactForm.querySelectorAll('.form-input, .form-textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));

        // Remove error on input
        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Show message
    const showMessage = (message, type) => {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;

        // Scroll message into view
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    };

    // Handle form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Disable submit button
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success simulation
            console.log('Form data:', data);

            showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');

            // Reset form
            contactForm.reset();

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Optional: Send actual data to backend
            // fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => {
            //   showMessage('Thank you! We\'ll get back to you soon.', 'success');
            //   contactForm.reset();
            // })
            // .catch(error => {
            //   showMessage('Something went wrong. Please try again.', 'error');
            // })
            // .finally(() => {
            //   submitBtn.disabled = false;
            //   submitBtn.textContent = originalText;
            // });

        }, 1500); // Simulate network delay
    });

    // Prevent form resubmission on page reload
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    // Auto-format phone number (optional enhancement)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            // Format as US phone number: (XXX) XXX-XXXX
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }

            e.target.value = value;
        });
    }
});
