// Portfolio Split-Screen Carousel
// Left: Featured project details, Right: Clickable carousel of projects

const projects = [
    {
        id: 0,
        location: 'Manga Vault',
        title: 'Gachiakuta Manga Reader',
        description: 'A custom, full-featured digital manga reader application for Kei Urana\'s Gachiakuta. Features 175 chapters (3,300+ pages), dual reading modes (Vertical Webtoon & Horizontal Page Flip), chapter search/filters, keyboard navigation, and local storage progress tracking.',
        link: '../gachiakuta/',
        linkText: 'Open Reader',
        bgImage: 'url(../gachiakuta/chapters/c001/001.jpg)'
    },
    {
        id: 1,
        location: 'Writing',
        title: 'The Villain: Architecture of Opposition',
        description: 'An exploration of Anakin Skywalker\'s transformation and redemption through the lens of villainy. A narrative essay analyzing character design and storytelling.',
        link: '../article/',
        linkText: 'Read Article',
        bgImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80)'
    },
    {
        id: 2,
        location: 'Robotics',
        title: 'Project: Baymax',
        description: 'Creating a real life Baymax. A personal project focused on building a healthcare companion robot inspired by the beloved character from Big Hero 6. Combining robotics, AI, and compassionate design.',
        link: '../Project_Baymax/index.html',
        linkText: 'View Project',
        bgImage: 'url(images/baymax-structure.jpg)'
    },
    {
        id: 3,
        location: 'Development',
        title: 'Full-Stack Application',
        description: 'A comprehensive full-stack application demonstrating modern development practices, clean architecture, and scalable solutions. Features real-time updates and seamless performance.',
        link: '#',
        linkText: 'View Code',
        bgImage: 'url(https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&q=80)'
    },
    {
        id: 4,
        location: 'Film Analysis',
        title: 'A Few Good Men: Truth Under Fire',
        description: 'A cinematic breakdown of duty, authority, and the logic of the courtroom through the atmosphere of the film.',
        link: '../article/article2.html',
        linkText: 'Read Article',
        bgImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80)'
    },
    {
        id: 5,
        location: 'Systems Architecture',
        title: 'Hacker Zine Index',
        description: 'A retro-styled, terminal-themed index for an underground zine. Built with a focus on keyboard navigation and 80-character ASCII aesthetics.',
        link: '#',
        linkText: 'Coming Soon',
        bgImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80)'
    },
    {
        id: 6,
        location: 'Machine Learning',
        title: 'Neural Network Visualizer',
        description: 'An interactive exploration of weights and biases in a deep neural network, visualized through dynamic SVG paths and real-time data flow.',
        link: '#',
        linkText: 'Under Development',
        bgImage: 'url(https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80)'
    },
    {
        id: 7,
        location: 'Director Spotlight',
        title: 'The Architect of Time',
        description: 'How Christopher Nolan masterfully manipulates temporality in cinema. An analysis of his approach to non-linear storytelling.',
        link: '../article/article3.html',
        linkText: 'Read Article',
        bgImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80)'
    },
    {
        id: 8,
        location: 'Director Spotlight',
        title: 'Laughter in the Crossfire',
        description: 'How Shawn Levy injects humor into high-intensity scenes. A look at balancing action and comedy on screen.',
        link: '../article/article4.html',
        linkText: 'Read Article',
        bgImage: 'url(https://images.unsplash.com/photo-1627856013091-fed6e4e048c5?w=1200&q=80)'
    }
];

let currentSlide = 0;
let carouselItems = [];
let carouselTrack;
let prevBtn;
let nextBtn;
let currentSlideDisplay;
let totalSlidesDisplay;

// Featured content elements
let featuredLocation;
let featuredTitle;
let featuredDescription;
let featuredCTA;
let featuredBg;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    carouselTrack = document.getElementById('carouselTrack');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    currentSlideDisplay = document.getElementById('currentSlide');
    totalSlidesDisplay = document.getElementById('totalSlides');

    featuredLocation = document.getElementById('featuredLocation');
    featuredTitle = document.getElementById('featuredTitle');
    featuredDescription = document.getElementById('featuredDescription');
    featuredCTA = document.getElementById('featuredCTA');
    featuredBg = document.getElementById('featuredBg');

    renderCarouselTrack();
    initializeCarousel();
    setupEventListeners();
    updateFeatured(0);
});

/**
 * Render Carousel Cards Dynamically
 */
function renderCarouselTrack() {
    if (!carouselTrack) return;
    carouselTrack.innerHTML = '';

    projects.forEach((proj, idx) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.dataset.index = idx;
        
        item.innerHTML = `
            <div class="carousel-card ${idx === 0 ? 'active' : ''}" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), ${proj.bgImage}; background-size: cover; background-position: center;">
                <div class="card-label">
                    <span class="featured-location" style="font-size: 0.65rem; display: block; margin-bottom: 4px; color: rgba(255,255,255,0.7);">${proj.location}</span>
                    <h4 style="font-size: 0.85rem; text-transform: uppercase; color: #fff; line-height: 1.2; font-family: 'Source Code Pro', monospace;">${proj.title}</h4>
                </div>
            </div>
        `;
        carouselTrack.appendChild(item);
    });

    carouselItems = document.querySelectorAll('.carousel-item');
    if (totalSlidesDisplay) {
        totalSlidesDisplay.textContent = String(projects.length).padStart(2, '0');
    }
}

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
    if (projects.length === 0) return;

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
    if (!project) return;
    
    // Fade out content
    const content = document.querySelector('.featured-content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
    }
    
    // Update background with image or gradient
    if (featuredBg) {
        featuredBg.style.backgroundImage = project.bgImage;
        featuredBg.style.backgroundColor = 'rgba(16, 16, 20, 0.5)';
    }
    
    // Update text content after a brief delay
    setTimeout(() => {
        if (featuredLocation) featuredLocation.textContent = project.location;
        if (featuredTitle) featuredTitle.textContent = project.title;
        if (featuredDescription) featuredDescription.textContent = project.description;
        if (featuredCTA) {
            featuredCTA.textContent = project.linkText;
            featuredCTA.href = project.link;
        }
        
        // Fade in content
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }
    }, 300);
}

/**
 * Update counter display
 */
function updateCounter() {
    if (currentSlideDisplay) {
        const slideNum = String(currentSlide + 1).padStart(2, '0');
        currentSlideDisplay.textContent = slideNum;
    }
}

/**
 * Scroll carousel to show active item in the center
 */
function scrollCarousel() {
    if (!carouselItems[currentSlide]) return;
    const activeItem = carouselItems[currentSlide];
    const container = document.querySelector('.carousel-container');
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const itemWidth = activeItem.offsetWidth;
    const itemCenter = activeItem.offsetLeft + (itemWidth / 2);
    
    // Centering math: Center of container - Center of active item
    const translateX = (containerWidth / 2) - itemCenter;
    
    carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            setActive(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            setActive(currentSlide + 1);
        });
    }

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
    if (carouselTrack) {
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
