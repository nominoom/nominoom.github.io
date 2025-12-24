// ============================================
// CONTROL PANEL FUNCTIONALITY
// ============================================

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Movement Speed Control
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
        MOVEMENT_SPEED = parseFloat(e.target.value);
        speedValue.textContent = MOVEMENT_SPEED.toFixed(2);
    });
}

// Density Control
const densitySlider = document.getElementById('density-slider');
const densityValue = document.getElementById('density-value');
if (densitySlider) {
    densitySlider.addEventListener('input', (e) => {
        PARTICLE_DENSITY = parseFloat(e.target.value);
        densityValue.textContent = PARTICLE_DENSITY.toFixed(1);
        numberOfParticles = calculateParticleCount();
        init(); // Reinitialize particles with new density
    });
}

// Node Color Control
const nodeColorPicker = document.getElementById('node-color');
if (nodeColorPicker) {
    nodeColorPicker.addEventListener('input', (e) => {
        const rgb = hexToRgb(e.target.value);
        if (rgb) {
            NODE_COLOR = rgb;
        }
    });
}

// Connection Color Control
const connectionColorPicker = document.getElementById('connection-color');
if (connectionColorPicker) {
    connectionColorPicker.addEventListener('input', (e) => {
        const rgb = hexToRgb(e.target.value);
        if (rgb) {
            CONNECTION_COLOR = rgb;
        }
    });
}

// Connection Radius Control
const radiusSlider = document.getElementById('radius-slider');
const radiusValue = document.getElementById('radius-value');
if (radiusSlider) {
    radiusSlider.addEventListener('input', (e) => {
        CONNECTION_RADIUS = parseInt(e.target.value);
        radiusValue.textContent = CONNECTION_RADIUS;
    });
}

// Reset Button
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // Reset to defaults
        MOVEMENT_SPEED = 1;
        PARTICLE_DENSITY = 2;
        CONNECTION_RADIUS = 120;
        NODE_COLOR = { r: 255, g: 255, b: 255 };
        CONNECTION_COLOR = { r: 147, g: 51, b: 234 };
        
        // Update UI
        if (speedSlider) {
            speedSlider.value = MOVEMENT_SPEED;
            speedValue.textContent = MOVEMENT_SPEED.toFixed(2);
        }
        if (densitySlider) {
            densitySlider.value = PARTICLE_DENSITY;
            densityValue.textContent = PARTICLE_DENSITY.toFixed(1);
        }
        if (nodeColorPicker) nodeColorPicker.value = '#ffffff';
        if (connectionColorPicker) connectionColorPicker.value = '#9333ea';
        if (radiusSlider) {
            radiusSlider.value = CONNECTION_RADIUS;
            radiusValue.textContent = CONNECTION_RADIUS;
        }
        
        // Reinitialize particles
        numberOfParticles = calculateParticleCount();
        init();
    });
}
