# Article - The Villain Website

A professional, dark-themed article website about the role of the villain in modern narrative.

## Setup Instructions

### Image Setup
The article requires a hero background image. To complete the setup:

1. **Save the provided image** to this folder (`article/`)
2. **Name it:** `villain-hero.jpg`
3. The CSS file references `villain-hero.jpg` in the background image URL

### File Structure
```
article/
├── index.html          # Main article page
├── article.css         # Styling (dark theme, responsive)
├── article.js          # Interactive enhancements
├── villain-hero.jpg    # Background image (add this)
└── README.md           # This file
```

## Features

### Design
- **Fixed Background**: Hero image stays in place while text scrolls
- **Dark Color Scheme**: Professional dark tones with accent red (#ff4d4d)
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Fade-in effects, parallax scrolling, progress bar

### Interactive Elements
- **Reading Progress Bar**: Visual indicator at the top showing scroll progress
- **Parallax Effects**: Subtle background movement on scroll
- **Smooth Transitions**: Hover effects on headings
- **Keyboard Navigation**: Arrow keys for scrolling
- **Intersection Observer**: Animations trigger when sections come into view
- **Reading Time Estimate**: Automatically calculated based on content

### Typography & Layout
- Modern sans-serif typography with optimal spacing
- Structured article sections with visual hierarchy
- Accent underlines on headings
- Feature lists with styled bullet points
- Proper line height and letter spacing for readability

### Responsive Breakpoints
- **Desktop** (1024px+): Full parallax and animations
- **Tablet** (768px-1023px): Adjusted spacing and typography
- **Mobile** (480px-767px): Optimized for touch
- **Small Mobile** (<480px): Compact layout

## Customization

### Colors
Edit the CSS variables at the top of `article.css`:
```css
:root {
    --primary-dark: #0a0e27;
    --secondary-dark: #1a1f3a;
    --accent-light: #e8e8ea;
    --accent-muted: #a0a0a5;
    --accent-brand: #ff4d4d;
}
```

### Content
Edit the article sections in `index.html` under the `<article class="main-content">` element.

### Background Image
Update the background image URL in `article.css`:
```css
background: url('villain-hero.jpg') center/cover no-repeat;
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Supports CSS Grid, Flexbox, and CSS Custom Properties
- Smooth scrolling behavior
- Intersection Observer API for animations

## Performance
- Minimal JavaScript - mostly CSS-based animations
- Passive event listeners for scroll performance
- Optimized images for web
- Fast rendering with efficient styling

---

**Created for a professional villain-themed article experience.**
