/* ==================================================================
   RECS.JS — CURATED RECOMMENDATIONS & DISCORD FORUM GALLERY MODAL
   Featuring Auto-Shuffle Carousel & TikTok/Instagram Bubble Ovals
   ================================================================== */

'use strict';

// 1. CURATED RECOMMENDATIONS DATA STORE
const recommendationsData = {
    'gachiakuta': {
        id: 'gachiakuta',
        category: 'anime',
        categoryLabel: 'Manga & Graphic Novels',
        badge: '★ TOP PICK',
        tags: ['#Manga', '#DarkFantasy', '#GraffitiArt', '#Shonen'],
        title: 'Gachiakuta — Urban Graffiti & Relic Magic',
        excerpt: 'Kei Urana\'s breathtaking dark fantasy shonen following Rudo in the Abyss, powered by dynamic ink splatters, kinetic graffiti worldbuilding, and relic soul combat.',
        images: [
            {
                url: 'images/recs/gachiakuta_art.jpg',
                alt: 'Gachiakuta Urban Abyss Graffiti Art',
                caption: 'Dynamic urban graffiti aesthetics and relic-fueled kinetic battle'
            },
            {
                url: 'images/project_gachiakuta_preview.jpg',
                alt: 'Gachiakuta Digital Web Reader Preview',
                caption: 'Custom client-side progressive web reader available on site'
            },
            {
                url: 'images/fallen-angel.jpg',
                alt: 'Thematic inspiration — Alexander Cabanel Fallen Angel',
                caption: 'Thematic parallels: Outcasts cast into the abyss seeking redemption'
            }
        ],
        quickInfo: {
            creator: 'Kei Urana (Story & Art)',
            format: 'Serialized Manga & Studio Bones Anime',
            genre: 'Dark Urban Fantasy / Action',
            status: 'Ongoing Masterpiece'
        },
        whyRecommend: 'The sheer kinetic energy of Kei Urana\'s brush strokes is unmatched in modern manga. Combining high-fashion urban wear, raw graffiti art, and a profound philosophical premise—that objects cherished with love gain souls while discarded trash becomes monsters—makes it an absolute must-read.',
        description: [
            'Set in a stratified floating civilization where criminals and unwanted "trash" are exiled down into the toxic Abyss, Gachiakuta follows Rudo, a boy falsely framed for murder. Down in the underworld, he discovers "Givers"—warriors capable of drawing out the latent souls of objects they hold dear ("Jinki").',
            'Urana was a direct protege of Atsushi Ohkubo (Soul Eater, Fire Force), and it shows in every kinetic panel. The motion lines feel alive, and the visual character designs are some of the freshest in the medium.',
            'I even developed an integrated lightweight digital reader right here on this portfolio site so you can experience it natively.'
        ],
        buttons: [
            {
                text: 'Open Reader on Site →',
                url: '/gachiakuta/',
                type: 'primary'
            },
            {
                text: 'Official Kodansha Site ↗',
                url: 'https://kodansha.us/series/gachiakuta/',
                type: 'secondary'
            }
        ]
    },

    'villain-essay': {
        id: 'villain-essay',
        category: 'film',
        categoryLabel: 'Cinema & Philosophy',
        badge: '📌 PINNED ESSAY',
        tags: ['#FilmAnalysis', '#Philosophy', '#DarthVader', '#Essay'],
        title: 'The Villain: Architecture of Opposition',
        excerpt: 'An analytical exploration of tragic antagonists, moral divergence, and how figures like Darth Vader reflect classical masterworks such as Alexander Cabanel\'s The Fallen Angel.',
        images: [
            {
                url: 'images/fallen-angel.jpg',
                alt: 'The Fallen Angel by Alexandre Cabanel (1847)',
                caption: 'Alexandre Cabanel — The Fallen Angel (1847), depiction of tearful defiance'
            },
            {
                url: 'images/vader-bg.jpg',
                alt: 'Darth Vader — The Dark Chamber',
                caption: 'Darth Vader — The tragic culmination of Anakin Skywalker\'s downfall'
            },
            {
                url: 'images/oppenheimer1.png',
                alt: 'Oppenheimer — The Nemesis of Consequence',
                caption: 'Christopher Nolan\'s Oppenheimer — Existential regret & destructive power'
            },
            {
                url: 'images/twelve-angry-men.png',
                alt: '12 Angry Men — Ideological Opposition',
                caption: '12 Angry Men (1957) — Opposition through dialogue, prejudice, and empathy'
            }
        ],
        quickInfo: {
            creator: 'Nominoom (Seth Noom)',
            format: 'Written Essay & Visual Study',
            genre: 'Cinema Theory / Character Ethics',
            status: 'Published on Site'
        },
        whyRecommend: 'True villainy in great storytelling is rarely about evil for its own sake. It is about grief, trauma, and an unyielding will warped by circumstance. Great antagonists aren\'t just obstacles; they are mirrors of the protagonist\'s deepest vulnerabilities.',
        description: [
            'In this essay, I analyze what truly defines an antagonist across cinematic history. From Anakin Skywalker\'s tragic metamorphosis into Darth Vader, to Oppenheimer\'s harrowing realization of cosmic destruction, to Juror 3 in Twelve Angry Men.',
            'A special focal point is the visual and emotional alignment between Anakin Skywalker\'s tearful, wrathful gaze on Mustafar and Alexandre Cabanel\'s 1847 painting "The Fallen Angel"—capturing grief, pride, and sorrow intertwined.',
            'If you enjoy character studies and deep cinema analysis, check out the full article.'
        ],
        buttons: [
            {
                text: 'Read Full Essay on Site →',
                url: '/article/',
                type: 'primary'
            },
            {
                text: 'Star Wars Databank ↗',
                url: 'https://www.starwars.com/databank/darth-vader',
                type: 'secondary'
            }
        ]
    },

    'interstellar': {
        id: 'interstellar',
        category: 'film',
        categoryLabel: 'Cinema & Soundtracks',
        badge: '★ MASTERWORK',
        tags: ['#SciFi', '#HansZimmer', '#Physics', '#KipThorne'],
        title: 'Interstellar — Relativistic Time & Organ Score',
        excerpt: 'Christopher Nolan and Kip Thorne\'s hard science-fiction triumph, elevated by Hans Zimmer\'s monumental 1926 pipe organ score recorded at London\'s Temple Church.',
        images: [
            {
                url: 'images/recs/interstellar_blackhole.jpg',
                alt: 'Gargantua Black Hole & Endurance Spacecraft',
                caption: 'Gargantua gravitational lensing simulation & Endurance modular frame'
            },
            {
                url: 'images/Cooper_Messages.png',
                alt: 'Cooper Receiving 23 Years of Messages',
                caption: 'Cooper experiencing decades of lost family transmissions on Miller\'s planet'
            },
            {
                url: 'images/vader-luke.jpg',
                alt: 'Cinematic scale and timeless narrative conflict',
                caption: 'Cinematic scale bridging physics, relativity, and human desperation'
            }
        ],
        quickInfo: {
            creator: 'Christopher Nolan & Kip Thorne',
            format: 'Feature Film & Original Soundtrack',
            genre: 'Hard Sci-Fi / Astrophysics',
            status: 'Academy Award Winner'
        },
        whyRecommend: 'Beyond the rigorous relativistic physics calculated with Kip Thorne, Zimmer\'s decision to make the 1926 four-manual Temple Church organ the beating heart of the score turns vast, terrifying interstellar isolation into something deeply spiritual and emotionally shattering.',
        description: [
            'Interstellar represents the gold standard of marrying cutting-edge computational astrophysics with raw human vulnerability. The black hole Gargantua was rendered using real ray-tracing equations derived from Einstein\'s field equations, discovering new gravitational lensing phenomena in the process.',
            'Each tick in "Stay" and "Mountains" marks 1.25 Earth days passing on Miller\'s planet due to extreme gravitational time dilation. The soundtrack doesn\'t just accompany the visuals; it embodies time slipping relentlessly through human fingers.',
            'Essential listening with high-end open-back headphones or surround audio.'
        ],
        buttons: [
            {
                text: 'Interstellar Score on Spotify ↗',
                url: 'https://open.spotify.com/album/4vjR9B06Vf3yD1i947M3iX',
                type: 'primary'
            },
            {
                text: 'Physics of Interstellar (Book) ↗',
                url: 'https://wwnorton.com/books/the-science-of-interstellar/',
                type: 'secondary'
            }
        ]
    },

    'nomi-moo-show': {
        id: 'nomi-moo-show',
        category: 'music',
        categoryLabel: 'Music & Radio Broadcast',
        badge: '📻 LIVE BROADCAST',
        tags: ['#AltRock', '#MathRock', '#WMTU', '#CollegeRadio'],
        title: 'The Nomi Moo Show — Alt Rock & Intricate Rhythms',
        excerpt: 'My live weekly broadcast booth residency on Michigan Tech\'s WMTU 91.9 FM, curating Math Rock polyrhythms, Post-Punk riffs, Midwest Emo, and listener requests.',
        images: [
            {
                url: 'images/wmtu_logo.png',
                alt: 'WMTU 91.9 FM Official Crest',
                caption: 'WMTU 91.9 FM — Student-run community radio in Houghton, MI'
            },
            {
                url: 'images/recs/radio_studio_console.jpg',
                alt: 'Vintage Broadcast Soundboard Console',
                caption: 'Broadcast mixing console, tube preamps, and live studio boom'
            },
            {
                url: 'images/guita.jpg',
                alt: 'Live guitar performance & musicianship',
                caption: 'Dedicated to raw instrumentation, complex timing, and dynamic grooves'
            }
        ],
        quickInfo: {
            creator: 'Hosted by Nominoom (Seth)',
            format: 'Live FM & Web Audio Broadcast',
            genre: 'Alternative / Math Rock / Post-Punk',
            status: 'Tuesdays 2:00 PM – 4:00 PM EST'
        },
        whyRecommend: 'College radio is one of the last true frontiers of un-algorithmic musical discovery. Broadcasting live on 91.9 FM allows me to spin underground math rock, intricate guitar tapping, and listener requested deep-cuts completely free of corporate playlists.',
        description: [
            'Every Tuesday afternoon from 2:00 PM to 4:00 PM EST, I take the booth at Michigan Technological University\'s WMTU 91.9 FM for The Nomi Moo Show.',
            'We focus heavily on progressive alt rock, bands utilizing complex time signatures (7/8, 11/8, polyrhythms), melodic post-punk, and emo revival classics.',
            'You can tune in from anywhere in the world on wmtu.fm, watch the booth live stream on Twitch (twitch.tv/wmtu_live), and drop live song requests directly into our queue.'
        ],
        buttons: [
            {
                text: 'Listen Live on WMTU.FM ↗',
                url: 'https://wmtu.fm',
                type: 'primary'
            },
            {
                text: 'Submit Track Request ↗',
                url: 'https://request.wmtu.fm',
                type: 'secondary'
            },
            {
                text: 'Watch Twitch Stream ↗',
                url: 'https://twitch.tv/wmtu_live',
                type: 'secondary'
            }
        ]
    },

    'frieren': {
        id: 'frieren',
        category: 'anime',
        categoryLabel: 'Manga & Literature',
        badge: '★ MASTERWORK',
        tags: ['#Anime', '#Philosophical', '#Fantasy', '#Madhouse'],
        title: 'Frieren: Beyond Journey\'s End (Sousou no Frieren)',
        excerpt: 'An elven mage\'s quiet pilgrimage exploring mortality, human perception of time, and the weight of ordinary memories formed across a thousand-year lifespan.',
        images: [
            {
                url: 'images/recs/frieren_spell.jpg',
                alt: 'Frieren Under Starlight With Ornate Staff',
                caption: 'Frieren under the cosmic starry expanse collecting ordinary folk spells'
            },
            {
                url: 'images/fallen-angel.jpg',
                alt: 'Themes of grief, remembrance, and eternity',
                caption: 'Thematic depth: Reckoning with grief after centuries have slipped away'
            },
            {
                url: 'images/project_gachiakuta_preview.jpg',
                alt: 'Modern Japanese Narrative Craftsmanship',
                caption: 'Exemplary pacing, atmospheric direction, and orchestral score'
            }
        ],
        quickInfo: {
            creator: 'Kanehito Yamada & Tsukasa Abe',
            format: 'Anime (Studio Madhouse) & Manga',
            genre: 'Contemplative High Fantasy',
            status: 'Completed Season 1 (Critically Acclaimed)'
        },
        whyRecommend: 'Most fantasy epics end when the Demon King is defeated. Frieren starts the day after. It is a profoundly moving meditation on how a human lifetime appears like a fleeting spark to an immortal elf, and how we must treasure the mundane moments before they become memories.',
        description: [
            'Sousou no Frieren follows the elven mage Frieren decades after her party brought peace to the world. When her human companion Himmel passes away of old age, she experiences an unbearable regret: she realized too late how little she truly understood the people who loved her.',
            'Directed by Keiichirō Saitō at Studio Madhouse with a sweeping orchestral score by Evan Call, it balances quiet pastoral walks with staggering, fluid magic duels.',
            'One of the most emotionally mature fantasy narratives written in the past twenty years.'
        ],
        buttons: [
            {
                text: 'Watch on Crunchyroll ↗',
                url: 'https://www.crunchyroll.com/series/GG5H5XMQ5/frieren-beyond-journeys-end',
                type: 'primary'
            },
            {
                text: 'Viz Media Manga Page ↗',
                url: 'https://www.viz.com/frieren-beyond-journeys-end',
                type: 'secondary'
            }
        ]
    },

    'robotics-kinematics': {
        id: 'robotics-kinematics',
        category: 'engineering',
        categoryLabel: 'Engineering & Open Hardware',
        badge: '⚙ LAB PICKS',
        tags: ['#Robotics', '#Kinematics', '#ROS2', '#STM32'],
        title: 'Open Kinematics & Applied Civil Robotics',
        excerpt: 'The fundamental robotics architecture, inverse kinematics mathematics, and embedded toolchains powering our 5-DOF articulated arm and human-assisted automation research.',
        images: [
            {
                url: 'images/robotic_arm_schematic.jpg',
                alt: '5-DOF Articulated Robotic Arm Schematic',
                caption: 'Closed-form inverse kinematics geometry and joint coordinate limits'
            },
            {
                url: 'images/robotic_arm_wave.gif',
                alt: '5-DOF Articulated Arm Wave Kinematics Motion',
                caption: 'Active kinematic trajectory simulation executing smooth wave pathing'
            },
            {
                url: 'images/baymax-structure.jpg',
                alt: 'Companion Healthcare Robotics Internal Frame',
                caption: 'Modular chassis design integrating biometric sensors and low-latency bus'
            }
        ],
        quickInfo: {
            creator: 'Open Source Robotics Foundation & Nominoom Lab',
            format: 'ROS2 Humble / STM32 HAL / SolidWorks',
            genre: 'Robotics Engineering / Kinematics',
            status: 'Active Lab Development'
        },
        whyRecommend: 'Building robotic systems that physically assist humans in infrastructure and construction requires bridging mathematical coordinate transforms with real-world motor inertia. These are the core references that turned mathematical theory into working steel.',
        description: [
            'For anyone stepping into physical computing and robotics, mastering closed-form geometric Inverse Kinematics (IK) is a transformative milestone. It allows you to transform simple Cartesian X/Y/Z end-effector coordinates into exact rotational joint angles in sub-millisecond execution loops.',
            'Our lab combines ROS2 Humble for high-level path planning with custom STM32 ARM Cortex microcontrollers communicating over differential CAN-bus for hard real-time motor actuation.',
            'Check out the technical specifications on our featured projects modal to inspect the exact hardware layout.'
        ],
        buttons: [
            {
                text: 'View Kinematics Lab Specs →',
                url: '#research',
                type: 'primary'
            },
            {
                text: 'ROS2 Documentation ↗',
                url: 'https://docs.ros.org/en/humble/',
                type: 'secondary'
            },
            {
                text: 'Nominoom GitHub ↗',
                url: 'https://github.com/nominoom',
                type: 'secondary'
            }
        ]
    }
};

// 2. MODAL & CAROUSEL STATE MANAGER
const RecsCarouselState = {
    currentId: null,
    currentIndex: 0,
    totalImages: 0,
    isAutoPlaying: true,
    autoPlayInterval: null,
    progressInterval: null,
    autoPlayDelay: 4200, // 4.2 seconds per slide
    progressTick: 50,    // 50ms interval for smooth progress bar
    progressValue: 0,
    isHovered: false
};

// 3. INITIALIZATION & DOM ATTACHMENTS
document.addEventListener('DOMContentLoaded', () => {
    initRecsFilters();
    initRecsModalKeyboard();
});

// 4. FILTER CONTROLLER
function initRecsFilters() {
    const filterButtons = document.querySelectorAll('.recs-filter-btn');
    const cards = document.querySelectorAll('.forum-rec-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active state on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards with smooth fade/scale
            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.97)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 250);
                }
            });
        });
    });
}

// 5. OPEN RECOMMENDATION MODAL
function openRecModal(id) {
    const data = recommendationsData[id];
    if (!data) return;

    RecsCarouselState.currentId = id;
    RecsCarouselState.currentIndex = 0;
    RecsCarouselState.totalImages = data.images.length;
    RecsCarouselState.isAutoPlaying = true;
    RecsCarouselState.progressValue = 0;
    RecsCarouselState.isHovered = false;

    // POPULATE RIGHT COLUMN CONTENT
    document.getElementById('recs-modal-category').textContent = data.categoryLabel;
    document.getElementById('recs-modal-badge').textContent = data.badge;
    document.getElementById('recs-modal-title').textContent = data.title;

    // Tags
    const tagsRow = document.getElementById('recs-modal-tags');
    tagsRow.innerHTML = data.tags.map(t => `<span class="forum-pill-tag">${t}</span>`).join('');

    // Quick info grid
    document.getElementById('modal-info-creator').textContent = data.quickInfo.creator;
    document.getElementById('modal-info-format').textContent = data.quickInfo.format;
    document.getElementById('modal-info-genre').textContent = data.quickInfo.genre;
    document.getElementById('modal-info-status').textContent = data.quickInfo.status;

    // Why recommend quote
    document.getElementById('recs-modal-quote').textContent = `"${data.whyRecommend}"`;

    // Full description paragraphs
    const descContainer = document.getElementById('recs-modal-desc');
    descContainer.innerHTML = data.description.map(p => `<p>${p}</p>`).join('');

    // Go-to action buttons
    const btnContainer = document.getElementById('recs-modal-buttons');
    btnContainer.innerHTML = data.buttons.map(b => {
        const isExternal = b.url.startsWith('http');
        const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        const btnClass = b.type === 'primary' ? 'rec-btn-primary' : 'rec-btn-secondary';
        return `<a href="${b.url}" class="${btnClass}" ${target}>${b.text}</a>`;
    }).join('') + `
        <button type="button" class="rec-btn-copy" onclick="copyRecShareLink('${id}')" title="Copy link to this recommendation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            <span class="copy-rec-label">Share Pick</span>
        </button>
    `;

    // POPULATE LEFT COLUMN CAROUSEL SLIDES
    const slidesTrack = document.getElementById('recs-carousel-slides');
    slidesTrack.innerHTML = data.images.map(img => `
        <div class="gallery-slide-item">
            <img src="${img.url}" alt="${img.alt}" class="gallery-slide-img" loading="eager" onerror="this.onerror=null;this.src='images/fallen-angel.jpg';">
        </div>
    `).join('');

    // POPULATE TIKTOK / INSTAGRAM POST BUBBLE OVALS
    const bubbleNav = document.getElementById('recs-carousel-bubbles');
    bubbleNav.innerHTML = data.images.map((img, idx) => `
        <button type="button" class="carousel-bubble-oval ${idx === 0 ? 'active' : ''}" 
                onclick="goToRecSlide(${idx})" 
                aria-label="Jump to slide ${idx + 1}"
                title="${img.caption || `Image ${idx + 1}`}"></button>
    `).join('');

    // Update Counter & Badge
    updateCarouselVisuals();

    // SHOW MODAL
    const backdrop = document.getElementById('recs-modal-backdrop');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // ATTACH HOVER PAUSE LISTENERS
    const galleryViewport = document.getElementById('recs-gallery-viewport');
    galleryViewport.onmouseenter = () => {
        RecsCarouselState.isHovered = true;
        updateAutoplayBadgeState();
    };
    galleryViewport.onmouseleave = () => {
        RecsCarouselState.isHovered = false;
        updateAutoplayBadgeState();
    };

    // START AUTO-PLAY SLIDESHOW
    startRecsAutoplay();
}

// 6. CLOSE RECOMMENDATION MODAL
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

// 7. CAROUSEL NAVIGATION CONTROLLERS
function goToRecSlide(index) {
    const total = RecsCarouselState.totalImages;
    if (total <= 0) return;

    // Wrap around
    RecsCarouselState.currentIndex = (index + total) % total;
    RecsCarouselState.progressValue = 0;

    updateCarouselVisuals();

    // If auto-play is on, reset progress
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

    // 1. Move slide track
    const track = document.getElementById('recs-carousel-slides');
    if (track) {
        track.style.transform = `translateX(-${curr * 100}%)`;
    }

    // 2. Update TikTok / Instagram Post Bubble Ovals
    const bubbles = document.querySelectorAll('#recs-carousel-bubbles .carousel-bubble-oval');
    bubbles.forEach((bubble, idx) => {
        if (idx === curr) {
            bubble.classList.add('active');
        } else {
            bubble.classList.remove('active');
        }
    });

    // 3. Update Image Counter Badge
    const counterBadge = document.getElementById('recs-counter-badge');
    if (counterBadge) {
        counterBadge.textContent = `${curr + 1} / ${total}`;
    }

    // 4. Reset progress bar fill
    const progressFill = document.getElementById('recs-progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
}

// 8. AUTO-SHUFFLE LOGIC & PROGRESS BAR
function startRecsAutoplay() {
    stopRecsAutoplay();
    RecsCarouselState.progressValue = 0;

    RecsCarouselState.progressInterval = setInterval(() => {
        if (!RecsCarouselState.isAutoPlaying || RecsCarouselState.isHovered) {
            return;
        }

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
    if (progressFill) {
        progressFill.style.width = '0%';
    }
}

function toggleRecsAutoplay() {
    RecsCarouselState.isAutoPlaying = !RecsCarouselState.isAutoPlaying;
    updateAutoplayBadgeState();
    if (RecsCarouselState.isAutoPlaying) {
        resetAutoplayTimer();
    }
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

// 9. COPY SHARE LINK HELPER
function copyRecShareLink(id) {
    const url = `${window.location.origin}${window.location.pathname}#rec-${id}`;
    const data = recommendationsData[id];
    const title = data ? data.title : 'Recommendation';

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            if (typeof showToast === 'function') {
                showToast(`Copied share link for "${title}"!`);
            }
        }).catch(() => fallbackRecShareCopy(url, title));
    } else {
        fallbackRecShareCopy(url, title);
    }
}

function fallbackRecShareCopy(text, title) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        if (typeof showToast === 'function') {
            showToast(`Copied share link for "${title}"!`);
        }
    } catch (e) {
        if (typeof showToast === 'function') {
            showToast(`Share Link: ${text}`);
        }
    }
}

// 10. KEYBOARD & URL HASH LISTENER
function initRecsModalKeyboard() {
    document.addEventListener('keydown', (e) => {
        const backdrop = document.getElementById('recs-modal-backdrop');
        if (!backdrop || !backdrop.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeRecModal();
        } else if (e.key === 'ArrowRight') {
            nextRecSlide();
        } else if (e.key === 'ArrowLeft') {
            prevRecSlide();
        } else if (e.key === ' ') {
            // Spacebar toggles autoplay without scrolling
            e.preventDefault();
            toggleRecsAutoplay();
        }
    });

    // Check URL hash for direct links (e.g. #rec-gachiakuta)
    window.addEventListener('load', () => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#rec-')) {
            const recId = hash.replace('#rec-', '');
            if (recommendationsData[recId]) {
                setTimeout(() => openRecModal(recId), 400);
            }
        }
    });
}
