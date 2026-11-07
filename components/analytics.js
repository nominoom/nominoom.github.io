// Vercel Web Analytics Initialization
// This script loads and initializes Vercel Web Analytics for the site

// Import and inject analytics
import { inject } from './vercel-analytics.js';

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => inject());
} else {
  inject();
}
