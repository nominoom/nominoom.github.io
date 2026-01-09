// ============================================
// TERMINAL.JS - Interactive Terminal Guide
// ============================================

// STEP 1: Get DOM elements
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');

// STEP 2: Define your personal information
const userInfo = {
    name: "Nominoom",
    alias: "Dummy King",
    role: "Full-Stack Developer",
    location: "The Upside Down",
    skills: ["JavaScript", "HTML/CSS", "Web Design", "Architecture"],
    interests: ["Music", "Graffiti Art", "Gaming", "Cybersecurity & Development"],
    portfolio: "nominoom.github.io",
    github: "github.com/nominoom",
    cashapp: "$K1ngDummy"
};

// STEP 3: Display initial welcome message
function displayWelcome() {
    addLine("Welcome to Nominoom's terminal!", "success");
    addLine("Type 'sudo whoami' to start!", "hint");
    addLine(""); // Blank line for spacing
}

// STEP 4: Add a line to the terminal
function addLine(text, type = "normal") {
    const line = document.createElement('div');
    line.classList.add('terminal-line');
    
    // Apply different colors based on type
    if (type === "command") {
        line.innerHTML = `<span style="color: #00ff00;">$ </span>${text}`;
    } else if (type === "error") {
        line.style.color = "#ff6b6b";
        line.textContent = text;
    } else if (type === "success") {
        line.style.color = "#4ecdc4";
        line.textContent = text;
    } else if (type === "hint") {
        line.style.color = " rgb(200, 151, 255)";
        line.textContent = text;
    } else {
        line.textContent = text;
    }
    
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight; // Auto-scroll
}

// STEP 5: Handle the 'sudo whoami' command
function handleWhoAmI() {
    addLine("sudo whoami", "command");
    addLine(""); // Spacing
    addLine("╔══════════════════════════════════════╗", "success");
    addLine("║     USER PROFILE INFORMATION         ║", "success");
    addLine("╚══════════════════════════════════════╝", "success");
    addLine("");
    addLine(`👤 Name: ${userInfo.name}`);
    addLine(`🎭 Alias: ${userInfo.alias}`);
    addLine(`💼 Role: ${userInfo.role}`);
    addLine(`📍 Location: ${userInfo.location}`);
    addLine("");
    addLine("🛠️  Skills:");
    userInfo.skills.forEach(skill => {
        addLine(`   • ${skill}`);
    });
    addLine("");
    addLine("🎨 Interests:");
    userInfo.interests.forEach(interest => {
        addLine(`   • ${interest}`);
    });
    addLine("");
    addLine("🔗 Links:");
    addLine(`   Portfolio: ${userInfo.portfolio}`);
    addLine(`   GitHub: ${userInfo.github}`);
    addLine(`   CashApp: ${userInfo.cashapp}`);
    addLine("");
    addLine("Type 'help' for more commands", "hint");
}

// STEP 6: Handle other commands (you can expand this!)
function handleCommand(input) {
    const command = input.toLowerCase().trim();
    
    switch(command) {
        case 'sudo whoami':
            handleWhoAmI();
            break;
            
        case 'help':
            addLine("help", "command");
            addLine("");
            addLine("Available commands:", "success");
            addLine("  sudo whoami  - Display user information");
            addLine("  help         - Show this help message");
            addLine("  clear        - Clear the terminal");
            addLine("  skills       - Show technical skills");
            addLine("  contact      - Show contact info");
            addLine("");
            break;
            
        case 'clear':
            terminalBody.innerHTML = '';
            displayWelcome();
            break;
            
        case 'skills':
            addLine("skills", "command");
            addLine("");
            addLine("Technical Skills:", "success");
            userInfo.skills.forEach(skill => {
                addLine(`  ⚡ ${skill}`);
            });
            addLine("");
            break;
            
        case 'contact':
            addLine("contact", "command");
            addLine("");
            addLine("📧 Contact Information:", "success");
            addLine(`  GitHub: ${userInfo.github}`);
            addLine(`  CashApp: ${userInfo.cashapp}`);
            addLine("");
            break;
            
        case '':
            // Do nothing for empty input
            break;
            
        default:
            addLine(input, "command");
            addLine(`Command not found: ${input}`, "error");
            addLine("Type 'help' for available commands", "hint");
            addLine("");
    }
}

// STEP 7: Listen for Enter key
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        handleCommand(input);
        terminalInput.value = ''; // Clear input
    }
});

// STEP 8: Initialize terminal on page load
document.addEventListener('DOMContentLoaded', () => {
    displayWelcome();
});

// ============================================
// HOW TO CUSTOMIZE:
// ============================================
// 1. Edit the 'userInfo' object (lines 8-17) with your personal data
// 2. Add more commands in the switch statement (starting line 77)
// 3. Create new functions like handleWhoAmI() for complex outputs
// 4. Change colors in addLine() function (lines 30-44)
// 5. Add ASCII art or special formatting in your command outputs
// ============================================
