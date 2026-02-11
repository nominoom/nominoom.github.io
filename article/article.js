// Smooth scroll enhancement and interactive elements
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeInteractiveElements();
});

/**
 * Initialize scroll-based animations
 */
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.article-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fade-in-up 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Add interactive enhancements
 */
function initializeInteractiveElements() {
    // Add click animation to headings
    const headings = document.querySelectorAll('.article-section h2');
    
    headings.forEach(heading => {
        heading.style.cursor = 'pointer';
        heading.addEventListener('mouseenter', () => {
            heading.style.color = '#ffffff';
            heading.style.transition = 'color 0.3s ease';
        });
        
        heading.addEventListener('mouseleave', () => {
            heading.style.color = '#e8e8ea';
        });
    });
}

/**
 * Add a reading progress bar at the top
 */

function updateReadingTime() {
    const content = document.querySelector('.main-content');
    const wordCount = content.innerText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    const readTimeElement = document.querySelector('.read-time');
    
    if (readTimeElement) {
        readTimeElement.textContent = `${readingTime} min read`;
    }
}

// Update reading time on page load
window.addEventListener('load', updateReadingTime);

/**
 * Keyboard navigation enhancement
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

/**
 * Add subtle animation on page load
 */
window.addEventListener('load', () => {
    const header = document.querySelector('.article-header');
    header.style.animation = 'fade-in-up 0.8s ease-out forwards';
});
