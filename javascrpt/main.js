/* ==================================================================
   MAIN.JS — NOMINOOM PORTFOLIO CONTROLLERS (REFERENCE LAYOUT)
   ================================================================== */

'use strict';

// 1. CLIPBOARD COPY HELPER FOR DISCORD, PHONE & CONTACTS
function copyDiscordTag(element, tag, label) {
    const textToCopy = tag || 'nomi.nomi';
    const itemLabel = label || (textToCopy.includes('(') ? 'Phone number' : 'Discord tag');

    const handleSuccess = () => {
        // Look for copy text indicator inside or nearby
        const badge = element ? element.querySelector('.copy-badge, .btn-text, .copy-indicator') : null;
        const originalText = badge ? badge.textContent : null;
        
        if (badge) {
            badge.textContent = 'Copied!';
            badge.style.color = '#ffffff';
        }

        if (element && element.classList.contains('social-btn')) {
            element.classList.add('copied');
        }
        
        // Show floating toast notification
        showToast(`${itemLabel} "${textToCopy}" copied to clipboard!`);
        
        setTimeout(() => {
            if (badge && originalText) {
                badge.textContent = originalText;
                badge.style.color = '';
            }
            if (element && element.classList.contains('social-btn')) {
                element.classList.remove('copied');
            }
        }, 2200);
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(handleSuccess)
            .catch(() => {
                fallbackCopy(textToCopy, handleSuccess, itemLabel);
            });
    } else {
        fallbackCopy(textToCopy, handleSuccess, itemLabel);
    }
}

function fallbackCopy(text, callback, itemLabel) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful && callback) {
            callback();
        } else {
            showToast(`${itemLabel}: ${text}`);
        }
    } catch (err) {
        showToast(`${itemLabel}: ${text}`);
    }
}

function showToast(message) {
    let toast = document.getElementById('contact-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'contact-toast';
        toast.className = 'contact-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

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