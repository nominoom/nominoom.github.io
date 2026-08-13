/* ==================================================================
   MAIN.JS — NOMINOOM PORTFOLIO CONTROLLERS (REFERENCE LAYOUT)
   ================================================================== */

'use strict';

// 1. TYPEWRITER SUBTITLE EFFECT FOR HERO SECTION
const typewriterPhrases = [
    "I'm a Creator",
    "Software Engineer",
    "Robotics Developer",
    "Security Practitioner"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function handleTypewriter() {
    const targetElement = document.getElementById('typewriter-text');
    if (!targetElement) return;

    const currentPhrase = typewriterPhrases[phraseIndex];

    if (isDeleting) {
        targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typewriterSpeed = 50;
    } else {
        targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typewriterSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typewriterSpeed = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
        typewriterSpeed = 300; // Pause before starting next phrase
    }

    setTimeout(handleTypewriter, typewriterSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    handleTypewriter();
});

// 2. PROJECT DATA FOR MODAL
const projectData = {
    'baymax': {
        title: 'Project: Baymax',
        tag: 'Robotics & AI',
        description: 'Baymax is an autonomous healthcare companion prototype designed to perform non-invasive biometric monitoring, companion interaction, and emergency response signaling in real-time.',
        specs: [
            'Embedded Microcontrollers (ESP32-S3 + Raspberry Pi 4)',
            'Computer Vision with OpenCV for facial gesture recognition',
            'Pulse-oximetry & Infrared thermal sensor integrations',
            'Custom 3D-printed lightweight chassis with soft pneumatic covers'
        ],
        features: [
            'Real-time biometric data telemetry & alert dispatcher',
            'Voice synthesis and interactive speech recognition',
            'Autonomous obstacle avoidance with ultrasonic lidar arrays',
            'Secure local-only data storage for patient privacy'
        ],
        status: 'Active Prototype',
        arch: 'ROS2 / Python3 / C++'
    },
    'robotic-arm': {
        title: 'Articulated Robotic Arm',
        tag: 'Automation & Kinematics',
        description: 'A custom 5-DOF (Degree of Freedom) robotic arm engineered for sub-millimeter precision task execution, custom inverse kinematics solving, and automated material handling.',
        specs: [
            'High-torque metal gear digital stepper motors & servo actuators',
            'STM32 32-bit ARM Cortex control board with custom PCB interface',
            'Analytical 3D Inverse Kinematics solver written in C++',
            'Serial G-code protocol interface for external host software'
        ],
        features: [
            'Sub-millimeter repeatability for pick-and-place automation',
            'Real-time joint position feedback & collision boundary limits',
            'Web-based control dashboard with interactive 3D arm visualizer',
            'Modular end-effector attachment system (vacuum gripper, claw, laser)'
        ],
        status: 'Hardware Complete',
        arch: 'C++ / STM32 / WebGL'
    }
};

// 3. PROJECT MODAL CONTROLLERS
function openProjectModal(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-description').textContent = data.description;
    
    const specsList = document.getElementById('modal-specs');
    specsList.innerHTML = data.specs.map(s => `<li>${s}</li>`).join('');
    
    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    
    document.getElementById('modal-status').textContent = data.status;
    document.getElementById('modal-arch').textContent = data.arch;
    
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(e) {
    if (e && e.target !== document.getElementById('project-modal') && !e.target.classList.contains('modal-close-btn')) {
        return;
    }
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

// 4. MOBILE MENU CONTROLLERS
function toggleMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const isActive = btn.classList.contains('active');
    btn.classList.toggle('active');
    menu.classList.toggle('active');
    btn.setAttribute('aria-expanded', String(!isActive));
    menu.setAttribute('aria-hidden', String(isActive));
}

function closeMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.classList.remove('active');
        menu.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }
}