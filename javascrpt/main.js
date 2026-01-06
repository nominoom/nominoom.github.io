/*
  ==================================================================
  main.js — AIROZ UNIVERSE
  
  Main JavaScript file that handles interactive behavior:
  
  FEATURES:
  1) Mobile navigation toggle
     - Toggles `aria-expanded` on the menu button
     - Toggles `aria-hidden` on the primary nav list
  
  2) Skip-link helper
     - Moves keyboard focus to main content when skip link is used
  
  3) Timeline scroll lock
     - Prevents vertical scrolling until reaching horizontal scroll endpoints
     - Locks scroll direction: up at start, down at end
  
  4) Page scroll-to-horizontal transform
     - Binds vertical scroll to horizontal timeline movement
  
  The code is organized into small functions with clear names so it's
  easy to read, maintain, and extend.
  ================================================================== */

'use strict';

// ==================================================================
// UTILITY FUNCTIONS
// ==================================================================

/**
 * Safe query helper: returns the element or null.
 * This is a tiny wrapper to make intent clear when scanning the code.
 */
function $(selector) {
  return document.querySelector(selector);
}


// ==================================================================
// NAVIGATION SETUP
// ==================================================================

/**
 * setupNavToggle
 * - Finds the menu toggle button and the primary nav element.
 * - Ensures ARIA attributes are initialized.
 * - Adds a click listener to toggle open/closed state.
 *
 * Why we do this: visually hiding/showing the nav for small screens is
 * controlled by CSS, but we must update ARIA attributes so screen readers
 * and keyboard users know whether the menu is open.
 */
function setupNavToggle() {
  var button = $('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (!button || !nav) {
    // If either element is missing, nothing to do.
    return;
  }

  // Ensure attributes have sensible defaults so state is predictable.
  if (!button.hasAttribute('aria-expanded')) {
    button.setAttribute('aria-expanded', 'false');
  }

  if (!nav.hasAttribute('aria-hidden')) {
    nav.setAttribute('aria-hidden', 'true');
  }

  // Toggle function separated for readability and potential reuse.
  function toggleMenu() {
    var currentlyExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!currentlyExpanded));

    var currentlyHidden = nav.getAttribute('aria-hidden') === 'true';
    nav.setAttribute('aria-hidden', String(!currentlyHidden));
  }

  button.addEventListener('click', toggleMenu);
}


// ==================================================================
// SKIP LINK SETUP
// ==================================================================

/**
 * setupSkipLink
 * - Makes the "skip to content" link move keyboard focus to the target
 *   element. This helps keyboard users and older browsers which may not
 *   move focus automatically when an in-page anchor is clicked.
 *
 * Notes for beginners:
 * - We add a temporary tabindex so the element can receive focus.
 * - We do not remove the tabindex afterwards because leaving it is harmless
 *   and keeps the element focusable for keyboard users.
 */
function setupSkipLink() {
  var skip = $('.skip-link');
  if (!skip) return;

  skip.addEventListener('click', function (event) {
    // The href is expected to be like "#main". slice(1) removes the '#'.
    var targetId = skip.getAttribute('href').slice(1);
    if (!targetId) return;

    var target = document.getElementById(targetId);
    if (!target) return;

    // Make sure the target can be focused, then focus it.
    target.setAttribute('tabindex', '-1');
    target.focus();
  });
}


// ==================================================================
// TIMELINE SCROLL LOCK SETUP
// ==================================================================

/**
 * setupTimelineScrollLock
 * - Prevents vertical scrolling on the timeline section until horizontal scroll reaches the ends.
 * - Once at the start, only up-scroll (negative deltaY) passes through.
 * - Once at the end, only down-scroll (positive deltaY) passes through.
 */
function setupTimelineScrollLock() {
  var scrollWrapper = document.querySelector('.scroll-wrapper');
  if (!scrollWrapper) return;

  scrollWrapper.addEventListener('wheel', function (event) {
    var isAtStart = scrollWrapper.scrollLeft === 0;
    var isAtEnd = scrollWrapper.scrollLeft >= (scrollWrapper.scrollWidth - scrollWrapper.clientWidth - 10);

    // Allow vertical scroll only when at the start (and scrolling up) or at the end (and scrolling down)
    var isScrollingUp = event.deltaY < 0;
    var isScrollingDown = event.deltaY > 0;

    // Block vertical scroll if not at an endpoint or if direction doesn't match
    if ((!isAtStart && !isAtEnd) || (isAtStart && !isScrollingUp) || (isAtEnd && !isScrollingDown)) {
      // Prevent default scrolling behavior
      event.preventDefault();
      // Allow horizontal scroll instead
      scrollWrapper.scrollLeft += event.deltaY;
    }
  }, { passive: false });
}


// ==================================================================
// TIMELINE INITIAL SCROLL POSITION
// ==================================================================

/**
 * setupTimelineInitialScroll()
 * - Sets the initial horizontal scroll position far to the right
 * - This hides the first image so it only becomes visible as user scrolls down
 * - Creates a "reveal" effect: first image appears when timeline is fully visible
 */
function setupTimelineInitialScroll() {
  var scrollWrapper = document.querySelector('.scroll-wrapper');
  if (!scrollWrapper) return;

  // Delay slightly to ensure DOM is fully rendered
  setTimeout(function() {
    // Scroll to 800px to the right (adjust this value to change the reveal point)
    scrollWrapper.scrollLeft = 1200;
  }, 100);
}


// ==================================================================
// TIMELINE SCROLL LOCK - PROGRESSIVE REVEAL WITH SCROLL
// ==================================================================

/**
 * setupTimelineScrollReveal()
 * - Monitors scroll position and triggers timeline reveal when past hero midpoint
 * - Locks scroll when hero is off-screen and "Our Journey" is fully visible
 * - Fade animation is reversible based on scroll direction
 */
function setupTimelineScrollReveal() {
  var timelineSection = document.querySelector('.timeline-section');
  var timelineHeading = document.querySelector('#timeline-heading');
  var heroSection = document.querySelector('.hero-bleed');
  
  if (!timelineSection || !timelineHeading || !heroSection) return;

  var heroHeight = heroSection.offsetHeight;
  var heroMidpoint = heroHeight / 2;
  var isLocked = false;
  var hasBeenLocked = false;

  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY;
    var timelineSectionTop = timelineSection.offsetTop;
    var progress = Math.max(0, Math.min(1, (scrollPos - heroMidpoint) / (timelineSectionTop - heroMidpoint)));

    // Update heading opacity and position based on scroll progress
    timelineHeading.style.opacity = progress;
    timelineHeading.style.transform = 'translateY(' + (40 - (progress * 40)) + 'px)';

    // Check if hero is completely off screen and heading is fully visible
    var heroOffScreen = scrollPos >= heroHeight;
    var headingFullyVisible = progress >= 1;

    // Lock scroll when conditions are met (only once)
    if (heroOffScreen && headingFullyVisible && !isLocked && !hasBeenLocked) {
      isLocked = true;
      hasBeenLocked = true;
      var targetScrollPos = scrollPos;
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + targetScrollPos + 'px';
      document.body.style.width = '100%';
      
      // Unlock after delay
      setTimeout(function() {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, targetScrollPos);
        isLocked = false;
      }, 2000);
    }
  });
}


// ==================================================================
// INITIALIZATION
// ==================================================================

/**
 * init()
 * - Entry point run when the DOM is ready
 * - Calls all setup functions in order
 */
function init() {
  setupNavToggle();
  setupSkipLink();
  setupTimelineScrollLock();
  setupTimelineInitialScroll();
  setupTimelineScrollReveal();
}


// ==================================================================
// DOM READY CHECK & INITIALIZATION TRIGGER
// ==================================================================

// Run init when DOM is fully loaded. This ensures all elements exist.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already ready
  init();
}


// ==================================================================
// TIMELINE SCROLL-TO-HORIZONTAL TRANSFORM
// ==================================================================
// Binds vertical page scroll to horizontal timeline movement.
// As the user scrolls down the page, the timeline moves left.

const horizontal = document.querySelector(".horizontal");
const maxScroll = document.body.scrollHeight - window.innerHeight;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const progress = scrollTop / maxScroll;
  const maxOffset = horizontal.scrollWidth - window.innerWidth;

  // Move horizontal container to the left as user scrolls down
  horizontal.style.transform = `translateX(-${maxOffset * progress}px)`;
});