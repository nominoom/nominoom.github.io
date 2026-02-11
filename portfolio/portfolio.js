// Portfolio Page JavaScript
// Handles interactions and animations for the portfolio page

document.addEventListener('DOMContentLoaded', () => {
    initializePortfolioInteractions();
});

/**
 * Initialize portfolio interactions and animations
 */
function initializePortfolioInteractions() {
    // Fade in cards on scroll
    const cards = document.querySelectorAll('.portfolio-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Add cursor effects to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });
    });
}

// Animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
