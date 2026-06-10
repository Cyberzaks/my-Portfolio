// ============================================
// DOM ELEMENTS
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');

// ============================================
// MOBILE MENU TOGGLE
// ============================================
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLLING & NAVBAR EFFECTS
// ============================================
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// TYPING TEXT ANIMATION
// ============================================
const typingText = document.querySelector('.typing-text');
const textVariations = [
    'Computer Science Student',
    'Web Developer',
    'AI Developer'
];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = textVariations[currentIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % textVariations.length;
            setTimeout(typeText, 500);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
    }
    
    setTimeout(typeText, isDeleting ? 50 : 100);
}

// Start typing animation
if (typingText) {
    typeText();
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal
document.querySelectorAll('.skill-category, .project-card, .service-card, .counter, .why-card, .about-item').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        
        // Check if element is in viewport
        const observerCounter = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCount();
                observerCounter.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        observerCounter.observe(counter);
    });
}

// Call counter animation on load
window.addEventListener('load', animateCounters);

// ============================================
// CONTACT FORM
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:Zakarabduharbo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Optional: Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 30px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        successMessage.textContent = 'Message opened in your email client!';
        document.body.appendChild(successMessage);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        
        // Reset form
        this.reset();
    });
}

// ============================================
// PROGRESS BAR ANIMATION
// ============================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.animation = `progressFill 1.5s ease-out forwards`;
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

window.addEventListener('load', animateProgressBars);

// ============================================
// SMOOTH ANIMATIONS ON PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ============================================
// MOUSE FOLLOW EFFECT (Optional)
// ============================================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});

// ============================================
// INTERSECTION OBSERVER FOR FADE IN
// ============================================
const fadeInElements = document.querySelectorAll('.about-item, .about-highlights');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    fadeInObserver.observe(el);
});

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ============================================
// UTILITY FUNCTION: DEBOUNCE
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
const handleResize = debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ENHANCED CLICK HANDLERS
// ============================================
document.querySelectorAll('.project-btn, .project-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// PREFETCH LINKS
// ============================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
});

// ============================================
// FORM VALIDATION
// ============================================
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.target.style.borderColor = '#ef4444';
    });
    
    input.addEventListener('valid', (e) => {
        e.target.style.borderColor = 'var(--border-color)';
    });
    
    input.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            e.target.style.borderColor = 'var(--border-color)';
        }
    });
});

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Alt + Home to go to top
    if (e.altKey && e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// PERFORMANCE: REQUEST ANIMATION FRAME
// ============================================
let scrollTimeout;
function updateScrollPosition() {
    // Update any scroll-dependent animations here
    scrollTimeout = null;
}

window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = requestAnimationFrame(updateScrollPosition);
    }
}, { passive: true });

// ============================================
// CONSOLE GREETING
// ============================================
console.log('%c👋 Welcome to Zakariyya Abdullahi\'s Portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML5, CSS3, and Vanilla JavaScript', 'color: #8b5cf6; font-size: 14px;');
console.log('%cGitHub: https://github.com/Cyberzaks', 'color: #10b981; font-size: 12px;');

// ============================================
// RIPPLE ANIMATION CSS (Dynamic)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INITIALIZE PAGE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    console.log('✅ Portfolio initialized and ready!');
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});
