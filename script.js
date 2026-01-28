// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for the hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Contact Form Modal Functionality
const contactModal = document.getElementById('contactModal');
const confirmModal = document.getElementById('confirmModal');
const openFormBtn = document.getElementById('openFormBtn');
const closeModalBtn = document.getElementById('closeModal');
const backBtn = document.getElementById('backBtn');
const contactForm = document.getElementById('contactForm');
const cancelLeaveBtn = document.getElementById('cancelLeave');
const confirmLeaveBtn = document.getElementById('confirmLeave');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

let formDirty = false;

// Track form changes
if (contactForm) {
    contactForm.addEventListener('input', function() {
        formDirty = true;
    });
}

// Open modal when button is clicked
if (openFormBtn) {
    openFormBtn.addEventListener('click', function() {
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal functions
function closeContactModal() {
    if (formDirty) {
        confirmModal.classList.add('show');
    } else {
        contactModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeContactModal);
}

if (backBtn) {
    backBtn.addEventListener('click', closeContactModal);
}

// Close modal when clicking outside
if (contactModal) {
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
}

// Confirmation modal - Cancel
if (cancelLeaveBtn) {
    cancelLeaveBtn.addEventListener('click', function() {
        confirmModal.classList.remove('show');
    });
}

// Confirmation modal - Confirm leave
if (confirmLeaveBtn) {
    confirmLeaveBtn.addEventListener('click', function() {
        confirmModal.classList.remove('show');
        contactModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        contactForm.reset();
        formDirty = false;
    });
}

// Form submission with Formspree
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const formData = new FormData(contactForm);
            
            // Log form data for debugging (remove in production)
            console.log('Form data being sent:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (response.ok) {
                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();
                formDirty = false;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Auto-close modal after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    contactModal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }, 3000);
            } else {
                // Try to get error details
                const errorData = await response.json().catch(() => ({}));
                console.error('Form submission error:', errorData);
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (confirmModal && confirmModal.classList.contains('show')) {
            confirmModal.classList.remove('show');
        } else if (contactModal && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    }
});