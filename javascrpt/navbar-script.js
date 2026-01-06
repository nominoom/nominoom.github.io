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

// STEP 2: Initialize all nav items on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get ALL nav containers and apply animation to each
    const navContainers = document.querySelectorAll('.nav-container');
    
    navContainers.forEach(container => {
        const navTop = container.querySelector('.nav-top a');
        const navBottom = container.querySelector('.nav-bottom a');
        
        splitTextToLetters(navTop);
        splitTextToLetters(navBottom);
    });

    // MOBILE MENU FUNCTIONALITY
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
        });

        // Close menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
