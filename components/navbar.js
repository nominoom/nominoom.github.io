// STEP 1: Split text into individual letter spans
function splitTextToLetters(element) {
    // If element already has letter spans, skip
    if (element.querySelector('.letter')) return;

    const text = element.textContent;
    element.textContent = ''; // Clear original text
    
    // Create a span for each letter
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        span.style.transitionDelay = `${index * 0.02}s`; // 20ms delay per letter
        span.classList.add('letter');
        element.appendChild(span);
    });
}

// STEP 2: Dynamically resolve relative navbar links based on current page location
function updateNavbarHrefs() {
    const scriptTag = document.querySelector('script[src*="navbar.js"]');
    let rootPath = '';
    if (scriptTag) {
        const src = scriptTag.getAttribute('src');
        rootPath = src.replace(/components\/navbar\.js.*$/, '');
    }

    const currentPath = window.location.pathname.toLowerCase();
    let currentPage = currentPath.split('/').pop().toLowerCase();
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        const rawHref = link.getAttribute('data-href') || link.getAttribute('href');
        if (!rawHref) return;

        if (!link.getAttribute('data-href')) {
            link.setAttribute('data-href', rawHref);
        }

        if (!rawHref.startsWith('http') && !rawHref.startsWith('mailto:') && !rawHref.startsWith('tel:') && !rawHref.startsWith('#')) {
            const cleanRaw = rawHref.replace(/^\//, '');
            link.setAttribute('href', rootPath + cleanRaw);
        }

        // Highlight current active nav item
        const targetPage = rawHref.replace(/^(\.\.\/|\.\/|\/)/, '').split('#')[0].toLowerCase();
        link.classList.remove('active');
        const container = link.closest('.nav-container');
        if (container) container.classList.remove('active');

        if (targetPage === currentPage || 
            (currentPage === 'index.html' && (targetPage === 'index.html' || targetPage === '')) ||
            (currentPath.includes('/portfolio') && targetPage.includes('projects')) ||
            (currentPath.includes('/gachiakuta') && targetPage.includes('projects')) ||
            (currentPath.includes('/project_baymax') && targetPage.includes('projects')) ||
            (currentPath.includes('/article') && targetPage.includes('recommends'))) {
            link.classList.add('active');
            if (container) container.classList.add('active');
        }
    });
}

// STEP 3: Initialize navbar - call this after navbar HTML is loaded
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const isAlreadyInitialized = navbar.dataset.initialized === 'true';
    navbar.dataset.initialized = 'true';

    // Always update hrefs in case navbar content was freshly injected
    updateNavbarHrefs();

    // Get ALL nav items and apply letter splitting
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => splitTextToLetters(item));

    if (isAlreadyInitialized) return;

    // MOBILE MENU FUNCTIONALITY
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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
