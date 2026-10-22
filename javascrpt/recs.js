/* ==================================================================
   RECS.JS — DEDICATED CURATED RECOMMENDATIONS & DISCORD FORUM GALLERY
   Featuring Auto-Shuffle Carousel, TikTok/Instagram Bubble Ovals &
   Dynamic Add-Pick Template System (Placeholder Cards Removed)
   ================================================================== */

'use strict';

/**
 * USER RECOMMENDATIONS DATA STORE
 * ------------------------------------------------------------------
 * Drop your recommendations into this object, or use the interactive
 * "+ Add Recommendation" button on recommends.html to add them!
 *
 * Example template:
 * 
 * 'sample-id': {
 *     id: 'sample-id',
 *     category: 'anime', // anime | film | music | books | tech | other
 *     categoryLabel: 'Manga & Anime',
 *     badge: '★ TOP PICK',
 *     tags: ['#Tag1', '#Tag2'],
 *     title: 'Title Here',
 *     excerpt: 'Short 2-3 line excerpt for the forum card preview...',
 *     images: [
 *         { url: 'images/your-image-1.jpg', alt: 'Alt text', caption: 'Caption 1' },
 *         { url: 'images/your-image-2.jpg', alt: 'Alt text', caption: 'Caption 2' }
 *     ],
 *     quickInfo: {
 *         creator: 'Author / Director / Band',
 *         format: 'Book / Manga / Film / Album / Tool',
 *         genre: 'Genre / Domain',
 *         status: 'Active / Completed / On Air'
 *     },
 *     whyRecommend: 'Your personal thoughts on why you recommend this...',
 *     description: [
 *         'Paragraph 1 explaining why this is worth checking out...',
 *         'Paragraph 2...'
 *     ],
 *     buttons: [
 *         { text: 'Official Website →', url: 'https://...', type: 'primary' },
 *         { text: 'Read / Listen / View ↗', url: 'https://...', type: 'secondary' }
 *     ]
 * }
 */
const recommendationsData = {
    // Clean slate: Add your own recommendations here!
};

// STORAGE KEY FOR USER CUSTOM PICKS IN BROWSER
const RECS_STORAGE_KEY = 'nominoom_custom_recommendations_v1';

function getMergedRecommendations() {
    let stored = {};
    try {
        const local = localStorage.getItem(RECS_STORAGE_KEY);
        if (local) {
            stored = JSON.parse(local);
        }
    } catch (e) {
        console.warn('Could not read local recommendations:', e);
    }
    return { ...recommendationsData, ...stored };
}

// CAROUSEL & MODAL STATE
const RecsCarouselState = {
    currentId: null,
    currentIndex: 0,
    totalImages: 0,
    isAutoPlaying: true,
    progressInterval: null,
    autoPlayDelay: 4200, // 4.2 seconds per slide
    progressTick: 50,
    progressValue: 0,
    isHovered: false
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderRecommendationsGrid();
    initRecsFilters();
    initRecsModalKeyboard();
    initRecAddModal();
});

// RENDER CARDS GRID OR EMPTY STATE
function renderRecommendationsGrid(activeFilter = 'all') {
    const grid = document.getElementById('recs-grid');
    if (!grid) return;

    const allRecs = getMergedRecommendations();
    const items = Object.values(allRecs);

    // Update filter counts
    updateFilterCounts(items);

    if (items.length === 0) {
        // EMPTY STATE: Discord Forum Empty State with Add Button
        grid.innerHTML = `
            <div class="recs-empty-state">
                <div class="empty-icon-wrap">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <path d="M3 9h18M9 21V9" />
                    </svg>
                </div>
                <h3 class="empty-title">Your Curated Vault is Ready</h3>
                <p class="empty-desc">
                    All placeholder cards have been cleared. You can now add your own recommendations using the form below or directly in <code>javascrpt/recs.js</code>.
                </p>
                <div class="empty-action-row">
                    <button type="button" class="btn-pill-white" onclick="openAddRecModal()">
                        + Add First Recommendation
                    </button>
                </div>
            </div>
        `;
        return;
    }

    // Filter items
    const filtered = items.filter(item => activeFilter === 'all' || item.category === activeFilter);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="recs-empty-state">
                <p class="empty-desc">No recommendations in this category yet.</p>
                <button type="button" class="btn-pill-outline" onclick="openAddRecModal()">+ Add One Now</button>
            </div>
        `;
        return;
    }

    // Render cards
    grid.innerHTML = filtered.map(item => `
        <article class="forum-rec-card" data-category="${item.category}" onclick="openRecModal('${item.id}')" tabindex="0" role="button" aria-label="View ${item.title}">
            <div class="forum-card-media">
                <img src="${(item.images && item.images[0]) ? item.images[0].url : 'images/guita.jpg'}" alt="${item.title}" class="forum-card-img" loading="lazy" onerror="this.onerror=null;this.src='images/guita.jpg';">
                <div class="forum-media-overlay"></div>
                <div class="forum-badge-row">
                    <span class="forum-badge-pin">${item.badge || '★ PICK'}</span>
                    <span class="forum-media-count">📷 ${(item.images ? item.images.length : 1)} Media</span>
                </div>
            </div>
            <div class="forum-card-content">
                <div class="forum-tags-row">
                    ${(item.tags || []).map(t => `<span class="forum-pill-tag">${t}</span>`).join('')}
                </div>
                <h3 class="forum-card-title">${item.title}</h3>
                <p class="forum-card-desc">${item.excerpt || ''}</p>
            </div>
            <div class="forum-card-footer">
                <div class="forum-footer-author">
                    <img src="images/guita.jpg" alt="Nominoom" class="forum-author-pip">
                    <span class="forum-author-name">Nominoom's Pick</span>
                </div>
                <span class="forum-expand-prompt">View Gallery &rarr;</span>
            </div>
        </article>
    `).join('');
}

function updateFilterCounts(items) {
    const counts = {
        all: items.length,
        anime: items.filter(i => i.category === 'anime').length,
        film: items.filter(i => i.category === 'film').length,
        music: items.filter(i => i.category === 'music').length,
        tech: items.filter(i => i.category === 'tech').length,
        books: items.filter(i => i.category === 'books').length
    };

    document.querySelectorAll('.recs-filter-btn').forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        const countSpan = btn.querySelector('.recs-filter-count');
        if (countSpan && counts[filter] !== undefined) {
            countSpan.textContent = counts[filter];
        }
    });
}

// FILTER CONTROLLER
function initRecsFilters() {
    const filterButtons = document.querySelectorAll('.recs-filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRecommendationsGrid(filter);
        });
    });
}

// OPEN RECOMMENDATION POPUP MODAL
function openRecModal(id) {
    const allRecs = getMergedRecommendations();
    const data = allRecs[id];
    if (!data) return;

    RecsCarouselState.currentId = id;
    RecsCarouselState.currentIndex = 0;
    RecsCarouselState.totalImages = (data.images && data.images.length) ? data.images.length : 1;
    RecsCarouselState.isAutoPlaying = true;
    RecsCarouselState.progressValue = 0;
    RecsCarouselState.isHovered = false;

    // Right Column content
    document.getElementById('recs-modal-category').textContent = data.categoryLabel || data.category;
    document.getElementById('recs-modal-badge').textContent = data.badge || '★ PICK';
    document.getElementById('recs-modal-title').textContent = data.title;

    // Tags
    const tagsRow = document.getElementById('recs-modal-tags');
    tagsRow.innerHTML = (data.tags || []).map(t => `<span class="forum-pill-tag">${t}</span>`).join('');

    // Quick info
    const info = data.quickInfo || {};
    document.getElementById('modal-info-creator').textContent = info.creator || 'Nominoom';
    document.getElementById('modal-info-format').textContent = info.format || 'Media';
    document.getElementById('modal-info-genre').textContent = info.genre || 'Curated';
    document.getElementById('modal-info-status').textContent = info.status || 'Recommended';

    // Quote
    const quoteEl = document.getElementById('recs-modal-quote');
    quoteEl.textContent = data.whyRecommend ? `"${data.whyRecommend}"` : '"Highly recommended to explore."';

    // Description
    const descContainer = document.getElementById('recs-modal-desc');
    if (Array.isArray(data.description)) {
        descContainer.innerHTML = data.description.map(p => `<p>${p}</p>`).join('');
    } else {
        descContainer.innerHTML = `<p>${data.description || data.excerpt || ''}</p>`;
    }

    // Go-to Buttons
    const btnContainer = document.getElementById('recs-modal-buttons');
    const buttons = data.buttons || [];
    btnContainer.innerHTML = buttons.map(b => {
        const isExternal = b.url.startsWith('http');
        const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        const btnClass = b.type === 'primary' ? 'rec-btn-primary' : 'rec-btn-secondary';
        return `<a href="${b.url}" class="${btnClass}" ${target}>${b.text}</a>`;
    }).join('') + `
        <button type="button" class="rec-btn-copy" onclick="copyRecShareLink('${id}')" title="Copy share link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            <span class="copy-rec-label">Share Pick</span>
        </button>
    `;

    // Left Column Carousel Slides
    const images = (data.images && data.images.length) ? data.images : [{ url: 'images/guita.jpg', alt: data.title }];
    const slidesTrack = document.getElementById('recs-carousel-slides');
    slidesTrack.innerHTML = images.map(img => `
        <div class="gallery-slide-item">
            <img src="${img.url}" alt="${img.alt || data.title}" class="gallery-slide-img" loading="eager" onerror="this.onerror=null;this.src='images/guita.jpg';">
        </div>
    `).join('');

    // TikTok / Instagram Post Bubble / Oval Navigation
    const bubbleNav = document.getElementById('recs-carousel-bubbles');
    bubbleNav.innerHTML = images.map((img, idx) => `
        <button type="button" class="carousel-bubble-oval ${idx === 0 ? 'active' : ''}" 
                onclick="goToRecSlide(${idx})" 
                aria-label="Jump to slide ${idx + 1}"
                title="${img.caption || `Image ${idx + 1}`}"></button>
    `).join('');

    updateCarouselVisuals();

    // Show modal
    const backdrop = document.getElementById('recs-modal-backdrop');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hover listeners for pause
    const galleryViewport = document.getElementById('recs-gallery-viewport');
    galleryViewport.onmouseenter = () => {
        RecsCarouselState.isHovered = true;
        updateAutoplayBadgeState();
    };
    galleryViewport.onmouseleave = () => {
        RecsCarouselState.isHovered = false;
        updateAutoplayBadgeState();
    };

    startRecsAutoplay();
}

function closeRecModal(e) {
    if (e && e.target !== document.getElementById('recs-modal-backdrop') && !e.target.closest('.recs-modal-close')) {
        return;
    }
    const backdrop = document.getElementById('recs-modal-backdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    stopRecsAutoplay();
}

// SLIDE NAVIGATION
function goToRecSlide(index) {
    const total = RecsCarouselState.totalImages;
    if (total <= 0) return;

    RecsCarouselState.currentIndex = (index + total) % total;
    RecsCarouselState.progressValue = 0;
    updateCarouselVisuals();
    resetAutoplayTimer();
}

function nextRecSlide() {
    goToRecSlide(RecsCarouselState.currentIndex + 1);
}

function prevRecSlide() {
    goToRecSlide(RecsCarouselState.currentIndex - 1);
}

function updateCarouselVisuals() {
    const curr = RecsCarouselState.currentIndex;
    const total = RecsCarouselState.totalImages;

    const track = document.getElementById('recs-carousel-slides');
    if (track) {
        track.style.transform = `translateX(-${curr * 100}%)`;
    }

    const bubbles = document.querySelectorAll('#recs-carousel-bubbles .carousel-bubble-oval');
    bubbles.forEach((bubble, idx) => {
        if (idx === curr) {
            bubble.classList.add('active');
        } else {
            bubble.classList.remove('active');
        }
    });

    const counterBadge = document.getElementById('recs-counter-badge');
    if (counterBadge) {
        counterBadge.textContent = `${curr + 1} / ${total}`;
    }

    const progressFill = document.getElementById('recs-progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
}

// AUTO-SHUFFLE SLIDESHOW CONTROLLER
function startRecsAutoplay() {
    stopRecsAutoplay();
    RecsCarouselState.progressValue = 0;

    RecsCarouselState.progressInterval = setInterval(() => {
        if (!RecsCarouselState.isAutoPlaying || RecsCarouselState.isHovered) return;

        RecsCarouselState.progressValue += (RecsCarouselState.progressTick / RecsCarouselState.autoPlayDelay) * 100;

        const progressFill = document.getElementById('recs-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${Math.min(100, RecsCarouselState.progressValue)}%`;
        }

        if (RecsCarouselState.progressValue >= 100) {
            RecsCarouselState.progressValue = 0;
            nextRecSlide();
        }
    }, RecsCarouselState.progressTick);

    updateAutoplayBadgeState();
}

function stopRecsAutoplay() {
    if (RecsCarouselState.progressInterval) {
        clearInterval(RecsCarouselState.progressInterval);
        RecsCarouselState.progressInterval = null;
    }
}

function resetAutoplayTimer() {
    RecsCarouselState.progressValue = 0;
    const progressFill = document.getElementById('recs-progress-fill');
    if (progressFill) progressFill.style.width = '0%';
}

function toggleRecsAutoplay() {
    RecsCarouselState.isAutoPlaying = !RecsCarouselState.isAutoPlaying;
    updateAutoplayBadgeState();
    if (RecsCarouselState.isAutoPlaying) resetAutoplayTimer();
}

function updateAutoplayBadgeState() {
    const badge = document.getElementById('recs-autoplay-badge');
    const label = document.getElementById('recs-autoplay-label');
    if (!badge || !label) return;

    if (!RecsCarouselState.isAutoPlaying) {
        badge.classList.add('paused');
        label.textContent = 'Auto: Paused (Click to play)';
    } else if (RecsCarouselState.isHovered) {
        badge.classList.add('paused');
        label.textContent = 'Auto: Hover Paused';
    } else {
        badge.classList.remove('paused');
        label.textContent = 'Auto-Shuffling';
    }
}

function copyRecShareLink(id) {
    const url = `${window.location.origin}${window.location.pathname}#rec-${id}`;
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            if (typeof showToast === 'function') showToast('Copied share link to clipboard!');
        }).catch(() => fallbackRecShareCopy(url));
    } else {
        fallbackRecShareCopy(url);
    }
}

function fallbackRecShareCopy(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        if (typeof showToast === 'function') showToast('Copied share link!');
    } catch (e) {
        if (typeof showToast === 'function') showToast(`Share Link: ${text}`);
    }
}

function initRecsModalKeyboard() {
    document.addEventListener('keydown', (e) => {
        const backdrop = document.getElementById('recs-modal-backdrop');
        if (!backdrop || !backdrop.classList.contains('active')) return;

        if (e.key === 'Escape') closeRecModal();
        else if (e.key === 'ArrowRight') nextRecSlide();
        else if (e.key === 'ArrowLeft') prevRecSlide();
        else if (e.key === ' ') {
            e.preventDefault();
            toggleRecsAutoplay();
        }
    });

    window.addEventListener('load', () => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#rec-')) {
            const recId = hash.replace('#rec-', '');
            const allRecs = getMergedRecommendations();
            if (allRecs[recId]) {
                setTimeout(() => openRecModal(recId), 400);
            }
        }
    });
}

// ------------------------------------------------------------------
// INTERACTIVE "+ ADD RECOMMENDATION" CREATOR MODAL
// ------------------------------------------------------------------
function initRecAddModal() {
    const addBtn = document.getElementById('open-add-rec-btn');
    if (addBtn) {
        addBtn.addEventListener('click', openAddRecModal);
    }
}

function openAddRecModal() {
    let modal = document.getElementById('add-rec-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'add-rec-modal';
        modal.className = 'recs-modal-backdrop active';
        modal.onclick = (e) => {
            if (e.target === modal) closeAddRecModal();
        };

        modal.innerHTML = `
            <div class="recs-modal-dialog add-rec-dialog" onclick="event.stopPropagation()">
                <button type="button" class="recs-modal-close" onclick="closeAddRecModal()">&times;</button>
                <div class="add-rec-form-container">
                    <div class="add-rec-header">
                        <span class="modal-category-badge">+ NEW RECOMMENDATION</span>
                        <h2>Add Pick to Your Vault</h2>
                        <p>Fill out the details below to add a card. You can also export the ready-to-paste code for <code>javascrpt/recs.js</code>.</p>
                    </div>

                    <form id="add-rec-form" onsubmit="handleSaveRecommendation(event)">
                        <div class="form-row-2col">
                            <div class="form-group">
                                <label for="rec-form-title">Title *</label>
                                <input type="text" id="rec-form-title" class="recs-input" placeholder="e.g. Serial Experiments Lain" required>
                            </div>
                            <div class="form-group">
                                <label for="rec-form-category">Category *</label>
                                <select id="rec-form-category" class="recs-input" required>
                                    <option value="anime">Manga &amp; Anime</option>
                                    <option value="film">Cinema &amp; Film</option>
                                    <option value="music">Music &amp; Audio</option>
                                    <option value="tech">Engineering &amp; Tools</option>
                                    <option value="books">Books &amp; Literature</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row-2col">
                            <div class="form-group">
                                <label for="rec-form-badge">Badge</label>
                                <input type="text" id="rec-form-badge" class="recs-input" placeholder="e.g. ★ TOP PICK or 📌 PINNED" value="★ TOP PICK">
                            </div>
                            <div class="form-group">
                                <label for="rec-form-tags">Tags (comma-separated)</label>
                                <input type="text" id="rec-form-tags" class="recs-input" placeholder="#Anime, #SciFi, #Cyberpunk">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="rec-form-excerpt">Excerpt / Preview (Short 2-line summary) *</label>
                            <input type="text" id="rec-form-excerpt" class="recs-input" placeholder="A brief one or two sentence hook for the forum card..." required>
                        </div>

                        <div class="form-group">
                            <label for="rec-form-images">Image URLs (comma-separated for multi-image carousel) *</label>
                            <input type="text" id="rec-form-images" class="recs-input" placeholder="images/sample1.jpg, images/sample2.jpg" required>
                        </div>

                        <div class="form-row-2col">
                            <div class="form-group">
                                <label for="rec-form-creator">Creator / Author</label>
                                <input type="text" id="rec-form-creator" class="recs-input" placeholder="e.g. Chiaki J. Konaka">
                            </div>
                            <div class="form-group">
                                <label for="rec-form-format">Format / Medium</label>
                                <input type="text" id="rec-form-format" class="recs-input" placeholder="e.g. 13-Episode Anime Series">
                            </div>
                        </div>

                        <div class="form-row-2col">
                            <div class="form-group">
                                <label for="rec-form-genre">Genre / Domain</label>
                                <input type="text" id="rec-form-genre" class="recs-input" placeholder="e.g. Psychological Cyberpunk">
                            </div>
                            <div class="form-group">
                                <label for="rec-form-status">Status / Year</label>
                                <input type="text" id="rec-form-status" class="recs-input" placeholder="e.g. 1998 / Completed">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="rec-form-why">Why You Recommend This (Highlight Quote) *</label>
                            <textarea id="rec-form-why" class="recs-input" rows="2" placeholder="What makes this stand out to you?" required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="rec-form-desc">Full In-depth Description *</label>
                            <textarea id="rec-form-desc" class="recs-input" rows="4" placeholder="Detailed commentary, thoughts, or background notes..." required></textarea>
                        </div>

                        <div class="form-row-2col">
                            <div class="form-group">
                                <label for="rec-form-btn-text">Action Button Text</label>
                                <input type="text" id="rec-form-btn-text" class="recs-input" placeholder="e.g. Visit Website →" value="Visit Website →">
                            </div>
                            <div class="form-group">
                                <label for="rec-form-btn-url">Action Button URL</label>
                                <input type="text" id="rec-form-btn-url" class="recs-input" placeholder="e.g. https://example.com" value="#">
                            </div>
                        </div>

                        <div class="form-actions-row">
                            <button type="submit" class="btn-pill-white">Save &amp; Add Card</button>
                            <button type="button" class="btn-pill-outline" onclick="closeAddRecModal()">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeAddRecModal() {
    const modal = document.getElementById('add-rec-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSaveRecommendation(e) {
    e.preventDefault();

    const title = document.getElementById('rec-form-title').value.trim();
    const category = document.getElementById('rec-form-category').value;
    const badge = document.getElementById('rec-form-badge').value.trim() || '★ PICK';
    const tagsRaw = document.getElementById('rec-form-tags').value;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean).map(t => t.startsWith('#') ? t : `#${t}`);
    const excerpt = document.getElementById('rec-form-excerpt').value.trim();

    const imgRaw = document.getElementById('rec-form-images').value;
    const images = imgRaw.split(',').map(url => url.trim()).filter(Boolean).map((url, i) => ({
        url,
        alt: `${title} media ${i + 1}`,
        caption: `${title} - Image ${i + 1}`
    }));

    const creator = document.getElementById('rec-form-creator').value.trim();
    const format = document.getElementById('rec-form-format').value.trim();
    const genre = document.getElementById('rec-form-genre').value.trim();
    const status = document.getElementById('rec-form-status').value.trim();
    const why = document.getElementById('rec-form-why').value.trim();
    const desc = document.getElementById('rec-form-desc').value.trim();

    const btnText = document.getElementById('rec-form-btn-text').value.trim();
    const btnUrl = document.getElementById('rec-form-btn-url').value.trim();

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `rec-${Date.now()}`;

    const newRec = {
        id,
        category,
        categoryLabel: category.toUpperCase(),
        badge,
        tags,
        title,
        excerpt,
        images: images.length ? images : [{ url: 'images/guita.jpg', alt: title }],
        quickInfo: {
            creator: creator || 'Nominoom',
            format: format || 'Media',
            genre: genre || 'Curated',
            status: status || 'Recommended'
        },
        whyRecommend: why,
        description: desc.split('\n\n').filter(Boolean),
        buttons: btnUrl ? [{ text: btnText || 'Visit →', url: btnUrl, type: 'primary' }] : []
    };

    // Save to local storage
    let stored = {};
    try {
        const local = localStorage.getItem(RECS_STORAGE_KEY);
        if (local) stored = JSON.parse(local);
    } catch (err) {}
    stored[id] = newRec;
    try {
        localStorage.setItem(RECS_STORAGE_KEY, JSON.stringify(stored));
    } catch (err) {}

    closeAddRecModal();
    renderRecommendationsGrid();

    if (typeof showToast === 'function') {
        showToast(`Added "${title}" to your recommendations!`);
    }
}
