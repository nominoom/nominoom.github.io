// STEP 1: Split text into individual letter spans
function splitTextToLetters(element) {
    const text = element.textContent;
    element.textContent = ''; // Clear original text
    
    // Create a span for each letter
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        span.style.transitionDelay = `${index * 0.01}s`; // 50ms delay per letter
        span.classList.add('letter');
        element.appendChild(span);
    });
}

// STEP 2: Initialize all nav items on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get ALL nav containers and apply animation to each
    const navContainers = document.querySelectorAll('.nav-container');
    
    navContainers.forEach(container => {
        const navTop = container.querySelector('.nav-top a');
        const navBottom = container.querySelector('.nav-bottom a');
        
        splitTextToLetters(navTop);
        splitTextToLetters(navBottom);
    });
});
