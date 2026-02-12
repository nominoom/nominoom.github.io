// Portfolio Split-Screen Carousel
// Left: Featured project details, Right: Clickable carousel of projects

const projects = [
    {
        id: 0,
        location: 'Writing',
        title: 'The Villain: Architecture of Opposition',
        description: 'An exploration of Anakin Skywalker\'s transformation and redemption through the lens of villainy. A narrative essay analyzing character design and storytelling.',
        link: '../article/',
        linkText: 'Read Article',
        bgImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80)'
    },
    {
        id: 1,
        location: 'Design',
        title: 'Interactive Web Experience',
        description: 'A creative exploration into modern web design principles, animations, and user interaction patterns. Built with cutting-edge technologies and responsive design practices.',
        link: '#',
        linkText: 'View Project',
        bgImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80)'
    },
    {
        id: 2,
        location: 'Development',
        title: 'Full-Stack Application',
        description: 'A comprehensive full-stack application demonstrating modern development practices, clean architecture, and scalable solutions. Features real-time updates and seamless performance.',
        link: '#',
        linkText: 'View Code',
        bgImage: 'url(https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&q=80)'
    },
    {
        id: 3,
        location: 'Creative',
        title: 'Digital Art & Animation',
        description: 'Exploring the boundaries of digital creativity through innovative animation techniques and visual storytelling. A journey into immersive digital experiences.',
        link: '#',
        linkText: 'Explore',
        bgImage: 'url(https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80)'
    }
];

let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideDisplay = document.getElementById('currentSlide');

// Featured content elements
const featuredLocation = document.getElementById('featuredLocation');
const featuredTitle = document.getElementById('featuredTitle');
const featuredDescription = document.getElementById('featuredDescription');
const featuredCTA = document.getElementById('featuredCTA');
const featuredBg = document.getElementById('featuredBg');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    setupEventListeners();
    updateFeatured(0);
});

/**
 * Initialize carousel
 */
function initializeCarousel() {
    setActive(0);
}

/**
 * Set active slide
 */
function setActive(index) {
    // Clamp index
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;

    currentSlide = index;

    // Update all cards
    carouselItems.forEach((item, i) => {
        const card = item.querySelector('.carousel-card');
        if (i === currentSlide) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    // Update featured section
    updateFeatured(currentSlide);

    // Update counter
    updateCounter();

    // Scroll carousel
    scrollCarousel();
}

/**
 * Update featured project section with smooth background transition
 */
function updateFeatured(index) {
    const project = projects[index];
    
    // Fade out content
    const content = document.querySelector('.featured-content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    // Update background with image or gradient
    featuredBg.style.backgroundImage = project.bgImage;
    featuredBg.style.backgroundColor = 'rgba(16, 16, 20, 0.5)';
    
    // Update text content after a brief delay
    setTimeout(() => {
        featuredLocation.textContent = project.location;
        featuredTitle.textContent = project.title;
        featuredDescription.textContent = project.description;
        featuredCTA.textContent = project.linkText;
        featuredCTA.href = project.link;
        
        // Fade in content
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 300);
}

/**
 * Update counter display
 */
function updateCounter() {
    const slideNum = String(currentSlide + 1).padStart(2, '0');
    currentSlideDisplay.textContent = slideNum;
}

/**
 * Scroll carousel to show active item
 */
function scrollCarousel() {
    const activeItem = carouselItems[currentSlide];
    const containerWidth = carouselTrack.offsetWidth;
    const itemWidth = activeItem.offsetWidth;
    const itemLeft = activeItem.offsetLeft;

    // Calculate scroll position to center the active item
    const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;
    
    carouselTrack.style.scrollBehavior = 'smooth';
    carouselTrack.scrollLeft = scrollPosition;
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        setActive(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        setActive(currentSlide + 1);
    });

    // Click on carousel items
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActive(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            setActive(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            setActive(currentSlide + 1);
        }
    });

    // Touch/swipe support
    let startX = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselTrack.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                setActive(currentSlide + 1);
            } else {
                setActive(currentSlide - 1);
            }
        }
    });
}

/**
 * Handle window resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        scrollCarousel();
    }, 250);
});

/**
 * Scroll carousel on load
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        scrollCarousel();
    }, 100);
});
