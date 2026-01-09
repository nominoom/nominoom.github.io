// STEP 1: Split text into individual letter spans
function splitTextToLetters(element) {
    const text = element.textContent;
    element.textContent = ''; // Clear original text
    
    // Create a span for each letter
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        span.style.transitionDelay = `${index * 0.02}s`; // 50ms delay per letter
        span.classList.add('letter');
        element.appendChild(span);
    });
}

// STEP 2: Initialize navbar - call this after navbar HTML is loaded
function initNavbar() {
    // Get ALL nav items and apply letter splitting
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => splitTextToLetters(item));

    // MOBILE MENU FUNCTIONALITY
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking a link
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// If DOM is already loaded, initialize immediately, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
