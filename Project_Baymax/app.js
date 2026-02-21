// Stages (sticky left)
let stages = [
  "Project initialization",
  "Frontend HUD design",
  "Backend setup",
  "Venv hiccups & fixes",
  "PyWebView integration",
  "Dependencies installed",
  "Testing and packaging"
];

// Narrative text for each stage
let stageContent = [
  `The Baymax project began as an ambitious attempt to create a Windows desktop voice assistant with a futuristic XR HUD interface. The initial focus was on defining the project structure and planning the overall design, including both frontend and backend elements.`,

  `Frontend development centered around a dark techno-inspired HUD layout, with minimalist panels and clear separation of system information, runtime logs, and controls. The aesthetic drew inspiration from cyberpunk themes, balancing style with usability.`,

  `The backend was established using Python, incorporating whisper for speech-to-text, SAPI/pyttsx3 for text-to-speech, and websockets for communication between the frontend and backend components. Initial testing focused on ensuring reliable data transfer and audio processing.`,

  `Early hiccups included difficulties with activating the virtual environment in PowerShell; '.\\venv\\Scripts\\Activate' was not recognized. This was resolved by switching to '.\\venv\\Scripts\\Activate.ps1', ensuring the environment was correctly loaded for subsequent package installations.`,

  `Integrating PyWebView introduced challenges because pythonnet failed to build on Windows. The issue was bypassed by installing PyWebView without dependencies and using alternative rendering backends. Once integrated, the frontend could run in a native window.`,

  `Subsequent dependency installations included sounddevice, numpy, pyttsx3, psutil, openai-whisper, and websockets. Each package was verified to function correctly within the virtual environment, ensuring a stable and predictable environment for development.`,

  `After overcoming all setup and integration challenges, testing focused on microphone input, websocket roundtrips, and final packaging as a single executable. The sticky left panel allows developers to track progress across all stages as the article scrolls.`
];

// Render stages
function renderStages() {
  const ul = document.getElementById('stage-list');
  ul.innerHTML = '';
  stages.forEach(stage => {
    const li = document.createElement('li');
    li.textContent = stage;
    ul.appendChild(li);
  });
}

// Render article sections
function renderArticle() {
  const article = document.getElementById('article-section');
  article.innerHTML = '';
  stages.forEach((stage, index) => {
    const section = document.createElement('section');
    const header = document.createElement('h3');
    header.textContent = stage;
    const paragraph = document.createElement('p');
    paragraph.textContent = stageContent[index];
    section.appendChild(header);
    section.appendChild(paragraph);
    article.appendChild(section);
  });
}

// Initial render
renderStages();
renderArticle();