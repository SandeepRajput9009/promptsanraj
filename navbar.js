// Navigation Bar Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navbar script loaded');
    
    // DOM Elements
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileDropdownBtn = document.getElementById('mobileDropdownBtn');
    const mobileDropdownContent = document.getElementById('mobileDropdownContent');
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // DEBUG: Check if elements exist
    console.log('Dropdown button exists:', !!dropdownBtn);
    console.log('Dropdown menu exists:', !!dropdownMenu);
    console.log('Theme toggle exists:', !!themeToggle);
    
    // Create backdrop for mobile menu
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-backdrop';
    document.body.appendChild(backdrop);
    console.log('Backdrop created');
    
    // Dropdown Menu Functionality - FIXED
    function toggleDropdown(e) {
        if (e) e.stopPropagation();
        console.log('Toggle dropdown called');
        dropdownBtn.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    }
    
    // Add click event to dropdown button
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            console.log('Dropdown button clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown();
        });
    } else {
        console.error('Dropdown button not found!');
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        console.log('Document click');
        if (dropdownBtn && dropdownMenu) {
            // Check if click is outside dropdown
            const isClickInsideDropdown = dropdownBtn.contains(e.target) || dropdownMenu.contains(e.target);
            
            if (!isClickInsideDropdown) {
                console.log('Click outside dropdown - closing');
                dropdownBtn.classList.remove('active');
                dropdownMenu.classList.remove('active');
            }
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function(e) {
            console.log('Dropdown menu click');
            e.stopPropagation();
        });
    }
    
    // Mobile Menu Functionality
    function openMobileMenu() {
        console.log('Opening mobile menu');
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        console.log('Closing mobile menu');
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileDropdownContent) mobileDropdownContent.classList.remove('active');
        if (mobileDropdownBtn) mobileDropdownBtn.classList.remove('active');
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            openMobileMenu();
        });
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    backdrop.addEventListener('click', closeMobileMenu);
    
    // Mobile Dropdown Functionality
    if (mobileDropdownBtn) {
        mobileDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileDropdownContent.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('active') && !this.parentElement.classList.contains('mobile-dropdown')) {
                closeMobileMenu();
            }
        });
    });
    
    // Active Navigation Link Management
    function setActiveLink(links, clickedLink) {
        links.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveLink(navLinks, this);
        });
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.parentElement.classList.contains('mobile-dropdown')) {
                e.preventDefault();
                setActiveLink(mobileLinks, this);
            }
        });
    });
    
    // Dark/Light Theme Toggle - FIXED
    function toggleTheme() {
        console.log('Toggle theme called');
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('span');
        
        if (isDarkMode) {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
            console.log('Switched to light mode');
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleTheme();
        });
    } else {
        console.error('Theme toggle button not found!');
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            const themeIcon = themeToggle.querySelector('i');
            const themeText = themeToggle.querySelector('span');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        }
        console.log('Loaded dark theme from localStorage');
    }
    
    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // Close dropdown with Escape key
        if (e.key === 'Escape') {
            console.log('Escape key pressed');
            if (dropdownBtn) dropdownBtn.classList.remove('active');
            if (dropdownMenu) dropdownMenu.classList.remove('active');
            closeMobileMenu();
        }
        
        // Navigate dropdown with arrow keys when focused
        if (dropdownMenu && dropdownMenu.classList.contains('active')) {
            const focusableElements = dropdownMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add("ripple");
        
        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to main buttons
    const buttons = document.querySelectorAll('.dropdown-trigger, .theme-btn, .mobile-dropdown-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple effect if not already added
    if (!document.querySelector('style[data-ripple]')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.setAttribute('data-ripple', 'true');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .dropdown-trigger, .theme-btn, .mobile-dropdown-btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);
        console.log('Ripple styles added');
    }
    
    // Add animation to brand logo on page load
    window.addEventListener('load', function() {
        const logoPlaceholder = document.querySelector('.logo-placeholder');
        if (logoPlaceholder) {
            logoPlaceholder.style.animation = 'none';
            setTimeout(() => {
                logoPlaceholder.style.animation = 'bounce 1s ease';
            }, 500);
        }
    });
    
    // Add bounce animation for logo if not already added
    if (!document.querySelector('style[data-bounce]')) {
        const bounceStyle = document.createElement('style');
        bounceStyle.setAttribute('data-bounce', 'true');
        bounceStyle.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                40% {transform: translateY(-10px);}
                60% {transform: translateY(-5px);}
            }
        `;
        document.head.appendChild(bounceStyle);
    }
    
    // Sticky navbar effect on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.boxShadow = 'var(--shadow-lg)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.backgroundColor = 'var(--bg-primary)';
            } else {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.backdropFilter = 'none';
            }
            
            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Add tooltip for contact info on mobile
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const contactType = this.querySelector('i').classList.contains('fa-phone-alt') ? 'Phone' : 'Email';
                const contactValue = this.querySelector('.contact-text').textContent;
                
                alert(`${contactType}: ${contactValue}\n\nThis is a demo. In production, this would:\n- Call the number directly (for phone)\n- Open email client (for email)`);
            }
        });
    });
    
    // Initialize with console log
    console.log('Navigation bar initialized successfully!');
    console.log('All features ready:');
    console.log('- ✅ Dropdown menu functionality');
    console.log('- ✅ Mobile responsive menu');
    console.log('- ✅ Dark/light theme toggle');
    console.log('- ✅ Active link tracking');
    console.log('- ✅ Smooth animations');
    console.log('- ✅ Keyboard navigation support');
    
    // Force dropdown to show for testing (optional - remove in production)
    setTimeout(() => {
        console.log('Test: Dropdown should work now');
        console.log('Click the "More" button with chevron icon');
    }, 1000);
});
// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

// Validation functions
function validateName() {
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    
    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        nameInput.style.borderColor = 'var(--error-color)';
        return false;
    } else if (nameValue.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.style.borderColor = 'var(--error-color)';
        return false;
    } else {
        nameError.textContent = '';
        nameInput.style.borderColor = 'var(--light-gray)';
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        emailInput.style.borderColor = 'var(--error-color)';
        return false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.style.borderColor = 'var(--error-color)';
        return false;
    } else {
        emailError.textContent = '';
        emailInput.style.borderColor = 'var(--light-gray)';
        return true;
    }
}

function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    const phoneError = document.getElementById('phoneError');
    
    // Phone validation is optional, but if provided, validate format
    if (phoneValue !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phoneValue.replace(/[\s\-\(\)]/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneInput.style.borderColor = 'var(--error-color)';
            return false;
        }
    }
    
    phoneError.textContent = '';
    phoneInput.style.borderColor = 'var(--light-gray)';
    return true;
}

function validateMessage() {
    const messageValue = messageInput.value.trim();
    const messageError = document.getElementById('messageError');
    
    if (messageValue === '') {
        messageError.textContent = 'Message is required';
        messageInput.style.borderColor = 'var(--error-color)';
        return false;
    } else if (messageValue.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.style.borderColor = 'var(--error-color)';
        return false;
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = 'var(--light-gray)';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
messageInput.addEventListener('blur', validateMessage);

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            // Show success message
            const submitButton = contactForm.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});