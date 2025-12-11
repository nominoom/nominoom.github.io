// 1. SETUP
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 200; // Denser web looks better with this effect

// 2. MOUSE & TOUCH TRACKING
const mouse = {
    x: null,
    y: null,
    radius: 150 // This is now purely the connection radius for the mouse
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('touchstart', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
});
window.addEventListener('touchmove', (event) => {
    event.preventDefault();
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
});
window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// 3. PARTICLE CLASS (Simplified for Drift Only)
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = this.x; // This is now the "drift center"
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;

        // Properties for fluidic random motion
        this.driftAngle = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.2 + 0.1;
        this.driftChangeTimer = Math.random() * 100;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // --- FLUIDIC DRIFT MOTION (the only motion now) ---
        
        // Update the drift center occasionally
        if (this.driftChangeTimer++ > 120) {
            this.driftAngle += (Math.random() - 0.5) * Math.PI / 2;
            this.driftChangeTimer = 0;
        }

        // Move the drift center
        this.baseX += Math.cos(this.driftAngle) * this.driftSpeed;
        this.baseY += Math.sin(this.driftAngle) * this.driftSpeed;

        // Wrap the drift center around the screen edges
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;

        // Gently pull the particle towards its moving drift center
        let homeX = this.baseX - this.x;
        let homeY = this.baseY - this.y;
        this.x += homeX / 50;
        this.y += homeY / 50;
    }
}

// 4. INITIALIZE PARTICLES (randomly)
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

// 5. ANIMATION LOOP & CONNECTION LOGIC
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(9, 10, 15, 0.05)'; // Creates a trailing effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Build the Quadtree for this frame
    const boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    const quadtree = new QuadTree(boundary, 4);
    for (let p of particlesArray) {
        quadtree.insert(p);
    }

    // Update particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    // --- NEW: Connect mouse to nearby particles ---
    if (mouse.x != null) {
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const opacityValue = 1 - (distance / mouse.radius);
                // Make mouse lines brighter and slightly thicker
                ctx.strokeStyle = `rgba(186, 85, 211, ${opacityValue * 0.9})`; // Brighter purple
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        }
    }
    
    // --- Connect particles to other particles ---
    for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        const range = new Rectangle(p.x, p.y, 220, 220); // Connection radius for particles
        const points = quadtree.query(range);

        for (let j = 0; j < points.length; j++) {
            const p2 = points[j];
            if (p === p2) continue;

            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacityValue = 1 - (distance / 120);
                ctx.strokeStyle = `rgba(147, 51, 234, ${opacityValue * 0.4})`; // Standard purple
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }

    // Draw particles on top of all lines
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
    }
}

// Start the animation
init();
animate();