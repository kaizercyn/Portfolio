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
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
});
// Contact Form Modal Functionality
const contactModal = document.getElementById('contactModal');
const confirmModal = document.getElementById('confirmModal');
const emailContact = document.getElementById('emailContact');
const closeModalBtn = document.getElementById('closeModal');
const backBtn = document.getElementById('backBtn');
const contactForm = document.getElementById('contactForm');
const cancelLeaveBtn = document.getElementById('cancelLeave');
const confirmLeaveBtn = document.getElementById('confirmLeave');

let formDirty = false;

// Track form changes
contactForm.addEventListener('input', function() {
    formDirty = true;
});

// Open modal when email is clicked
emailContact.addEventListener('click', function(e) {
    e.preventDefault();
    contactModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Close modal functions
function closeContactModal() {
    if (formDirty) {
        confirmModal.classList.add('show');
    } else {
        contactModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

closeModalBtn.addEventListener('click', closeContactModal);
backBtn.addEventListener('click', closeContactModal);

// Close modal when clicking outside
contactModal.addEventListener('click', function(e) {
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// Confirmation modal - Cancel
cancelLeaveBtn.addEventListener('click', function() {
    confirmModal.classList.remove('show');
});

// Confirmation modal - Confirm leave
confirmLeaveBtn.addEventListener('click', function() {
    confirmModal.classList.remove('show');
    contactModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    contactForm.reset();
    formDirty = false;
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('senderName').value,
        email: document.getElementById('senderEmail').value,
        company: document.getElementById('company').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Create mailto link with form data
    const mailtoLink = `mailto:kaizergura@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'N/A'}\n\n` +
        `Message:\n${formData.message}`
    )}`;
    
    // Open user's email client
    window.location.href = mailtoLink;
    
    // Close modal and reset
    setTimeout(() => {
        contactModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        contactForm.reset();
        formDirty = false;
    }, 500);
});

// Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (confirmModal.classList.contains('show')) {
            confirmModal.classList.remove('show');
        } else if (contactModal.classList.contains('show')) {
            closeContactModal();
        }
    }
});