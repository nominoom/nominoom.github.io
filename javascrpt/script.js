/* ==================================================================
   SCRIPT.JS — STRICT MONOCHROME B&W STARFIELD CANVAS
   ================================================================== */

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const PARTICLE_DENSITY = 0.35;

function calculateParticleCount() {
    const screenArea = canvas.width * canvas.height;
    return Math.floor((screenArea / 10000) * PARTICLE_DENSITY);
}

let numberOfParticles = calculateParticleCount();

const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numberOfParticles = calculateParticleCount();
    init();
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.6 + 1;
        this.driftAngle = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.12 + 0.04;
        this.driftChangeTimer = Math.random() * 100;
        this.opacity = Math.random() * 0.38 + 0.18;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        if (this.driftChangeTimer++ > 120) {
            this.driftAngle += (Math.random() - 0.5) * Math.PI / 2;
            this.driftChangeTimer = 0;
        }

        this.baseX += Math.cos(this.driftAngle) * this.driftSpeed;
        this.baseY += Math.sin(this.driftAngle) * this.driftSpeed;

        this.baseX = Math.max(0, Math.min(canvas.width, this.baseX));
        this.baseY = Math.max(0, Math.min(canvas.height, this.baseY));

        let homeX = this.baseX - this.x;
        let homeY = this.baseY - this.y;
        this.x += homeX / 50;
        this.y += homeY / 50;
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    const quadtree = new QuadTree(boundary, 4);
    for (let p of particlesArray) {
        quadtree.insert(p);
    }

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    // Connect mouse to nearby particles
    if (mouse.x != null) {
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const opacityValue = (1 - (distance / mouse.radius)) * 0.35;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        }
    }
    
    // Connect particles to nearby particles
    for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        const range = new Rectangle(p.x, p.y, 180, 180);
        const points = quadtree.query(range);

        for (let j = 0; j < points.length; j++) {
            const p2 = points[j];
            if (p === p2) continue;

            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const opacityValue = (1 - (distance / 100)) * 0.12;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
    }
}

init();
animate();