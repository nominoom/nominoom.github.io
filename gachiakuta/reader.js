/* ==================================================================
   GACHIAKUTA MANGA READER ENGINE (reader.js)
   Features:
   - Manifest driven chapter loading
   - LocalStorage memory for read chapters & last position
   - Webtoon Vertical Strip & Single Page Flip modes
   - Responsive lazy-loaded rendering
   - Full Keyboard & Touch controls
   ================================================================== */

(function () {
  'use strict';

  // Global State
  let manifest = window.GACHIAKUTA_MANIFEST || [];
  let currentChapterIndex = 0;
  let currentPageIndex = 0;
  let readingMode = localStorage.getItem('gachi_reading_mode') || 'vertical'; // 'vertical' or 'flip'
  let readerWidth = localStorage.getItem('gachi_reader_width') || '800';
  let readChapters = JSON.parse(localStorage.getItem('gachi_read_chapters') || '[]');
  let isToolbarVisible = true;

  // DOM Elements
  const heroCover = document.getElementById('hero-cover');
  const totalChaptersEl = document.getElementById('total-chapters');
  const totalPagesEl = document.getElementById('total-pages');
  const btnStartReading = document.getElementById('btn-start-reading');
  const chapterGrid = document.getElementById('chapter-grid');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.range-btn');
  
  // Reader Elements
  const readerView = document.getElementById('reader-view');
  const readerToolbar = document.getElementById('reader-toolbar');
  const readerBottomBar = document.getElementById('reader-bottom-bar');
  const selectChapter = document.getElementById('select-chapter');
  const btnPrevChapter = document.getElementById('btn-prev-chapter');
  const btnNextChapter = document.getElementById('btn-next-chapter');
  const btnToggleMode = document.getElementById('btn-toggle-mode');
  const btnCloseReader = document.getElementById('btn-close-reader');
  const pageIndicator = document.getElementById('page-indicator');
  const verticalStrip = document.getElementById('vertical-strip');
  const flipView = document.getElementById('flip-view');
  const flipImg = document.getElementById('flip-img');
  const widthSlider = document.getElementById('width-slider');
  const pageSlider = document.getElementById('page-slider');

  // Initialize Application
  function init() {
    if (!manifest || manifest.length === 0) {
      // Fallback fetch manifest.json if manifest.js failed
      fetch('manifest.json')
        .then(res => res.json())
        .then(data => {
          manifest = data;
          setupApp();
        })
        .catch(err => console.error('Failed to load manga manifest:', err));
    } else {
      setupApp();
    }
  }

  function setupApp() {
    calculateStats();
    populateSelectChapter();
    renderChapterGrid();
    setupEventListeners();

    // Check last read position
    const lastRead = JSON.parse(localStorage.getItem('gachi_last_read') || 'null');
    if (lastRead && lastRead.chapterId) {
      const idx = manifest.findIndex(c => c.id === lastRead.chapterId);
      if (idx !== -1) {
        btnStartReading.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> RESUME CHAPTER ${manifest[idx].id.lstrip ? manifest[idx].id.lstrip('c') : manifest[idx].id.replace('c', '')}`;
      }
    }
  }

  function calculateStats() {
    if (totalChaptersEl) totalChaptersEl.textContent = manifest.length;
    
    let sumPages = 0;
    manifest.forEach(c => sumPages += c.pages);
    if (totalPagesEl) totalPagesEl.textContent = sumPages.toLocaleString();

    if (heroCover && manifest.length > 0) {
      heroCover.src = `chapters/${manifest[0].id}/${manifest[0].files[0]}`;
    }
  }

  function populateSelectChapter() {
    if (!selectChapter) return;
    selectChapter.innerHTML = '';
    manifest.forEach((ch, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = `${ch.title} (${ch.pages}p)`;
      selectChapter.appendChild(opt);
    });
  }

  function renderChapterGrid(filterText = '', rangeMin = 0, rangeMax = Infinity) {
    if (!chapterGrid) return;
    chapterGrid.innerHTML = '';

    const filtered = manifest.filter((ch, idx) => {
      const chNum = parseFloat(ch.id.replace('c', '')) || 0;
      const matchesSearch = ch.title.toLowerCase().includes(filterText.toLowerCase()) || ch.id.toLowerCase().includes(filterText.toLowerCase());
      const matchesRange = chNum >= rangeMin && chNum <= rangeMax;
      return matchesSearch && matchesRange;
    });

    filtered.forEach(ch => {
      const realIndex = manifest.findIndex(item => item.id === ch.id);
      const isRead = readChapters.includes(ch.id);

      const card = document.createElement('div');
      card.className = `chapter-card ${isRead ? 'read' : ''}`;
      card.innerHTML = `
        <div class="chapter-card-title">${ch.title}</div>
        <div class="chapter-card-meta">
          <span>${ch.pages} Pages</span>
          <span>${isRead ? '✓ Read' : ''}</span>
        </div>
        ${isRead ? '<div class="read-badge"></div>' : ''}
      `;

      card.addEventListener('click', () => openReader(realIndex, 0));
      chapterGrid.appendChild(card);
    });
  }

  function setupEventListeners() {
    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const activeRangeBtn = document.querySelector('.range-btn.active');
        const min = activeRangeBtn ? parseFloat(activeRangeBtn.dataset.min) : 0;
        const max = activeRangeBtn ? parseFloat(activeRangeBtn.dataset.max) : Infinity;
        renderChapterGrid(e.target.value, min, max);
      });
    }

    // Range buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const min = parseFloat(btn.dataset.min) || 0;
        const max = parseFloat(btn.dataset.max) || Infinity;
        const searchVal = searchInput ? searchInput.value : '';
        renderChapterGrid(searchVal, min, max);
      });
    });

    // Start/Resume Button
    if (btnStartReading) {
      btnStartReading.addEventListener('click', () => {
        const lastRead = JSON.parse(localStorage.getItem('gachi_last_read') || 'null');
        let targetIndex = 0;
        let targetPage = 0;
        if (lastRead && lastRead.chapterId) {
          const found = manifest.findIndex(c => c.id === lastRead.chapterId);
          if (found !== -1) {
            targetIndex = found;
            targetPage = lastRead.pageIndex || 0;
          }
        }
        openReader(targetIndex, targetPage);
      });
    }

    // Select Chapter dropdown
    if (selectChapter) {
      selectChapter.addEventListener('change', (e) => {
        openReader(parseInt(e.target.value, 10), 0);
      });
    }

    // Prev / Next Chapter
    if (btnPrevChapter) {
      btnPrevChapter.addEventListener('click', () => {
        if (currentChapterIndex > 0) openReader(currentChapterIndex - 1, 0);
      });
    }

    if (btnNextChapter) {
      btnNextChapter.addEventListener('click', () => {
        if (currentChapterIndex < manifest.length - 1) openReader(currentChapterIndex + 1, 0);
      });
    }

    // Close reader button
    if (btnCloseReader) {
      btnCloseReader.addEventListener('click', closeReader);
    }

    // Toggle Mode Button
    if (btnToggleMode) {
      btnToggleMode.addEventListener('click', () => {
        readingMode = readingMode === 'vertical' ? 'flip' : 'vertical';
        localStorage.setItem('gachi_reading_mode', readingMode);
        updateReadingModeUI();
        renderReaderContent();
      });
    }

    // Width slider
    if (widthSlider) {
      widthSlider.value = readerWidth;
      widthSlider.addEventListener('input', (e) => {
        readerWidth = e.target.value;
        localStorage.setItem('gachi_reader_width', readerWidth);
        verticalStrip.style.maxWidth = `${readerWidth}px`;
      });
    }

    // Page slider
    if (pageSlider) {
      pageSlider.addEventListener('input', (e) => {
        jumpToPage(parseInt(e.target.value, 10));
      });
    }

    // Flip View navigation areas
    const flipLeft = document.getElementById('flip-nav-left');
    const flipRight = document.getElementById('flip-nav-right');
    if (flipLeft) flipLeft.addEventListener('click', prevPage);
    if (flipRight) flipRight.addEventListener('click', nextPage);

    // Keyboard controls
    document.addEventListener('keydown', handleKeyboard);

    // Intersection observer for vertical strip scroll tracking
    setupScrollObserver();
  }

  function openReader(chapterIdx, pageIdx = 0) {
    if (chapterIdx < 0 || chapterIdx >= manifest.length) return;
    
    currentChapterIndex = chapterIdx;
    currentPageIndex = pageIdx;

    // Mark as read
    const chId = manifest[currentChapterIndex].id;
    if (!readChapters.includes(chId)) {
      readChapters.push(chId);
      localStorage.setItem('gachi_read_chapters', JSON.stringify(readChapters));
      renderChapterGrid();
    }

    // Save last read position
    localStorage.setItem('gachi_last_read', JSON.stringify({
      chapterId: chId,
      pageIndex: currentPageIndex
    }));

    // Update UI elements
    selectChapter.value = currentChapterIndex;
    btnPrevChapter.disabled = currentChapterIndex === 0;
    btnNextChapter.disabled = currentChapterIndex === manifest.length - 1;

    verticalStrip.style.maxWidth = `${readerWidth}px`;
    updateReadingModeUI();

    readerView.classList.add('active');
    document.body.style.overflow = 'hidden';

    renderReaderContent();
  }

  function closeReader() {
    readerView.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateReadingModeUI() {
    if (readingMode === 'vertical') {
      verticalStrip.style.display = 'flex';
      flipView.classList.remove('active');
      btnToggleMode.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg> <span>STRIP</span>`;
    } else {
      verticalStrip.style.display = 'none';
      flipView.classList.add('active');
      btnToggleMode.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg> <span>PAGED</span>`;
    }
  }

  function renderReaderContent() {
    const ch = manifest[currentChapterIndex];
    if (!ch) return;

    if (pageSlider) {
      pageSlider.max = ch.pages - 1;
      pageSlider.value = currentPageIndex;
    }

    updatePageIndicator();

    if (readingMode === 'vertical') {
      renderVerticalStrip(ch);
    } else {
      renderFlipView(ch);
    }
  }

  function renderVerticalStrip(ch) {
    verticalStrip.innerHTML = '';

    ch.files.forEach((file, pIdx) => {
      const img = document.createElement('img');
      img.className = 'manga-page-img';
      img.dataset.page = pIdx;
      img.loading = pIdx < 3 ? 'eager' : 'lazy';
      img.src = `chapters/${ch.id}/${file}`;
      img.alt = `${ch.title} - Page ${pIdx + 1}`;
      verticalStrip.appendChild(img);
    });

    // Append Chapter End Navigation box
    const endBox = document.createElement('div');
    endBox.className = 'chapter-end-card';
    endBox.innerHTML = `
      <div class="end-title">END OF ${ch.title.toUpperCase()}</div>
      <p style="color: var(--text-muted);">You completed this chapter.</p>
      <div class="end-nav-buttons">
        ${currentChapterIndex > 0 ? `<button class="btn-secondary" id="end-prev-btn">← PREVIOUS CHAPTER</button>` : ''}
        ${currentChapterIndex < manifest.length - 1 ? `<button class="btn-primary" id="end-next-btn">NEXT CHAPTER →</button>` : ''}
      </div>
    `;
    verticalStrip.appendChild(endBox);

    const endNext = endBox.querySelector('#end-next-btn');
    if (endNext) endNext.addEventListener('click', () => openReader(currentChapterIndex + 1, 0));
    const endPrev = endBox.querySelector('#end-prev-btn');
    if (endPrev) endPrev.addEventListener('click', () => openReader(currentChapterIndex - 1, 0));

    // Jump to requested page index after DOM paint
    setTimeout(() => {
      if (currentPageIndex > 0) {
        const targetImg = verticalStrip.querySelector(`img[data-page="${currentPageIndex}"]`);
        if (targetImg) targetImg.scrollIntoView();
      } else {
        document.querySelector('.reader-viewport').scrollTop = 0;
      }
    }, 50);
  }

  function renderFlipView(ch) {
    if (currentPageIndex < 0) currentPageIndex = 0;
    if (currentPageIndex >= ch.pages) currentPageIndex = ch.pages - 1;

    const file = ch.files[currentPageIndex];
    if (flipImg && file) {
      flipImg.src = `chapters/${ch.id}/${file}`;
      flipImg.alt = `${ch.title} - Page ${currentPageIndex + 1}`;
    }

    // Preload next & previous page
    if (currentPageIndex + 1 < ch.pages) {
      const preloadNext = new Image();
      preloadNext.src = `chapters/${ch.id}/${ch.files[currentPageIndex + 1]}`;
    }
    if (currentPageIndex > 0) {
      const preloadPrev = new Image();
      preloadPrev.src = `chapters/${ch.id}/${ch.files[currentPageIndex - 1]}`;
    }
  }

  function prevPage() {
    if (readingMode === 'flip') {
      if (currentPageIndex > 0) {
        jumpToPage(currentPageIndex - 1);
      } else if (currentChapterIndex > 0) {
        openReader(currentChapterIndex - 1, manifest[currentChapterIndex - 1].pages - 1);
      }
    }
  }

  function nextPage() {
    const ch = manifest[currentChapterIndex];
    if (readingMode === 'flip') {
      if (currentPageIndex < ch.pages - 1) {
        jumpToPage(currentPageIndex + 1);
      } else if (currentChapterIndex < manifest.length - 1) {
        openReader(currentChapterIndex + 1, 0);
      }
    }
  }

  function jumpToPage(pageIdx) {
    const ch = manifest[currentChapterIndex];
    if (!ch) return;

    currentPageIndex = Math.max(0, Math.min(pageIdx, ch.pages - 1));
    if (pageSlider) pageSlider.value = currentPageIndex;
    updatePageIndicator();

    // Save state
    localStorage.setItem('gachi_last_read', JSON.stringify({
      chapterId: ch.id,
      pageIndex: currentPageIndex
    }));

    if (readingMode === 'vertical') {
      const targetImg = verticalStrip.querySelector(`img[data-page="${currentPageIndex}"]`);
      if (targetImg) targetImg.scrollIntoView({ behavior: 'smooth' });
    } else {
      renderFlipView(ch);
    }
  }

  function updatePageIndicator() {
    const ch = manifest[currentChapterIndex];
    if (!ch) return;
    if (pageIndicator) {
      pageIndicator.textContent = `Page ${currentPageIndex + 1} / ${ch.pages}`;
    }
  }

  function setupScrollObserver() {
    const viewport = document.querySelector('.reader-viewport');
    if (!viewport) return;

    let timeout;
    viewport.addEventListener('scroll', () => {
      if (readingMode !== 'vertical') return;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const imgs = verticalStrip.querySelectorAll('img');
        const viewportTop = viewport.scrollTop + 100;
        
        imgs.forEach(img => {
          const top = img.offsetTop;
          const height = img.offsetHeight;
          if (viewportTop >= top && viewportTop < top + height) {
            const pIdx = parseInt(img.dataset.page, 10);
            if (currentPageIndex !== pIdx) {
              currentPageIndex = pIdx;
              updatePageIndicator();
              if (pageSlider) pageSlider.value = currentPageIndex;
              localStorage.setItem('gachi_last_read', JSON.stringify({
                chapterId: manifest[currentChapterIndex].id,
                pageIndex: currentPageIndex
              }));
            }
          }
        });
      }, 100);
    });
  }

  function handleKeyboard(e) {
    if (!readerView.classList.contains('active')) return;

    switch (e.key) {
      case 'ArrowLeft':
        prevPage();
        break;
      case 'ArrowRight':
        nextPage();
        break;
      case 'j':
      case 'J':
        document.querySelector('.reader-viewport').scrollBy({ top: 300, behavior: 'smooth' });
        break;
      case 'k':
      case 'K':
        document.querySelector('.reader-viewport').scrollBy({ top: -300, behavior: 'smooth' });
        break;
      case 'f':
      case 'F':
        if (!document.fullscreenElement) {
          readerView.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        break;
      case 'm':
      case 'M':
        isToolbarVisible = !isToolbarVisible;
        readerToolbar.classList.toggle('hidden', !isToolbarVisible);
        readerBottomBar.classList.toggle('hidden', !isToolbarVisible);
        break;
      case 'Escape':
        closeReader();
        break;
    }
  }

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
