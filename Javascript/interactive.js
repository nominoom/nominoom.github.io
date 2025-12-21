// Music Track Audio Hover Effect
const musicCards = document.querySelectorAll('.music-card');

musicCards.forEach(card => {
  const audio = card.querySelector('audio');
  let fadeInterval;
  
  if (audio) {
    // Start playing immediately but at volume 0
    audio.volume = 0;
    audio.play().catch(err => {
      // Auto-play might be blocked, will play on first interaction
      console.log('Audio autoplay blocked, will play on hover');
    });
    
    card.addEventListener('mouseenter', function(e) {
      // Prevent navigation on hover
      e.preventDefault();
      
      // Clear any existing fade interval
      if (fadeInterval) clearInterval(fadeInterval);
      
      // Ensure audio is playing
      if (audio.paused) {
        audio.play().catch(err => console.log('Play failed:', err));
      }
      
      // Fade in audio
      fadeInterval = setInterval(() => {
        if (audio.volume < 0.7) {
          audio.volume = Math.min(0.7, audio.volume + 0.05);
        } else {
          clearInterval(fadeInterval);
        }
      }, 30);
    });
    
    card.addEventListener('mouseleave', function() {
      // Clear any existing fade interval
      if (fadeInterval) clearInterval(fadeInterval);
      
      // Fade out audio
      fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.volume = 0;
          clearInterval(fadeInterval);
        }
      }, 30);
    });
    
    // Prevent click from navigating immediately, allow audio to play
    card.addEventListener('click', function(e) {
      // Only navigate if audio has been playing for a bit (user wants to go to the link)
      if (audio.volume > 0.5) {
        return true; // Allow navigation
      } else {
        e.preventDefault(); // Prevent navigation on first click
      }
    });
  }
});

// Interactive Beat Pad
let beatCount = 0;
const achievements = [
  { count: 10, message: "🎵 Getting started!" },
  { count: 25, message: "🔥 You're on fire!" },
  { count: 50, message: "💯 Beat master!" },
  { count: 100, message: "🎹 Producer level!" },
  { count: 200, message: "🚀 Legendary!" }
];

// Beat Pad functionality
const pads = document.querySelectorAll('.pad');
const beatCountElement = document.getElementById('beat-count');
const achievementElement = document.getElementById('achievement');

// Sound frequencies for each pad (using Web Audio API)
const soundFrequencies = {
  'kick': 60,
  'snare': 200,
  'hihat': 800,
  'clap': 400,
  'bass': 80,
  'synth': 440,
  'fx': 1000,
  'vocal': 300
};

function playSound(frequency) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

pads.forEach(pad => {
  pad.addEventListener('click', function() {
    const sound = this.getAttribute('data-sound');
    const frequency = soundFrequencies[sound];
    
    // Play sound
    playSound(frequency);
    
    // Increment counter
    beatCount++;
    beatCountElement.textContent = beatCount;
    
    // Check for achievements
    const achievement = achievements.find(a => a.count === beatCount);
    if (achievement) {
      achievementElement.textContent = achievement.message;
      setTimeout(() => {
        achievementElement.textContent = '';
      }, 3000);
    }
  });
});

// Reset Beats Button
const resetBeatsBtn = document.getElementById('reset-beats');
if (resetBeatsBtn) {
  resetBeatsBtn.addEventListener('click', function() {
    beatCount = 0;
    beatCountElement.textContent = beatCount;
    achievementElement.textContent = '🔄 Counter reset!';
    setTimeout(() => {
      achievementElement.textContent = '';
    }, 2000);
  });
}

// Easter Egg functionality
const eggBoxes = document.querySelectorAll('.egg-box');
const secretMessage = document.getElementById('secret-message');

eggBoxes.forEach(box => {
  box.addEventListener('click', function() {
    if (!this.classList.contains('revealed')) {
      const message = this.getAttribute('data-message');
      this.textContent = message.split(' ')[0]; // Show just the emoji
      this.classList.add('revealed');
      secretMessage.textContent = message;
      
      // Reset after 2 seconds
      setTimeout(() => {
        secretMessage.textContent = '???';
      }, 2000);
    }
  });
});

// Reset Easter Eggs Button
const resetEggsBtn = document.getElementById('reset-eggs');
if (resetEggsBtn) {
  resetEggsBtn.addEventListener('click', function() {
    eggBoxes.forEach(box => {
      box.classList.remove('revealed');
      box.textContent = '?';
    });
    secretMessage.textContent = '🔄 All eggs reset!';
    setTimeout(() => {
      secretMessage.textContent = '???';
    }, 2000);
  });
}

// ===== CATCH THE BEAT GAME =====
let gameActive = false;
let score = 0;
let timeLeft = 30;
let gameInterval;
let spawnInterval;
let highScore = localStorage.getItem('catchTheBeatHighScore') || 0;

const gameArea = document.getElementById('game-area');
const startButton = document.getElementById('start-game');
const scoreElement = document.getElementById('game-score');
const timeElement = document.getElementById('game-time');
const highScoreElement = document.getElementById('high-score');
const gameMessage = document.getElementById('game-message');

// Display saved high score
highScoreElement.textContent = highScore;

const noteEmojis = ['🎵', '🎶', '🎼', '🎹', '🎸', '🎤', '🥁'];

function createNote() {
  if (!gameActive) return;
  
  const note = document.createElement('div');
  note.className = 'music-note';
  note.textContent = noteEmojis[Math.floor(Math.random() * noteEmojis.length)];
  
  // Random position
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;
  note.style.left = Math.random() * maxX + 'px';
  note.style.top = Math.random() * maxY + 'px';
  
  // Click handler
  note.addEventListener('click', function() {
    if (!gameActive) return;
    
    score += 10;
    scoreElement.textContent = score;
    
    // Pop animation
    this.classList.add('pop');
    setTimeout(() => {
      if (this.parentNode) {
        this.remove();
      }
    }, 300);
  });
  
  gameArea.appendChild(note);
  
  // Remove note after 2 seconds if not clicked
  setTimeout(() => {
    if (note.parentNode && gameActive) {
      note.remove();
    }
  }, 2000);
}

function startGame() {
  gameActive = true;
  score = 0;
  timeLeft = 30;
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  gameMessage.textContent = '';
  startButton.classList.add('hidden');
  
  // Clear any existing notes
  const existingNotes = gameArea.querySelectorAll('.music-note');
  existingNotes.forEach(note => note.remove());
  
  // Spawn notes every 800ms
  spawnInterval = setInterval(createNote, 800);
  
  // Timer countdown
  gameInterval = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false;
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  
  // Remove all notes
  const notes = gameArea.querySelectorAll('.music-note');
  notes.forEach(note => note.remove());
  
  // Check for high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('catchTheBeatHighScore', highScore);
    highScoreElement.textContent = highScore;
    gameMessage.textContent = `🎉 NEW HIGH SCORE: ${score}! 🎉`;
  } else {
    gameMessage.textContent = `Game Over! Final Score: ${score}`;
  }
  
  startButton.classList.remove('hidden');
  startButton.textContent = 'PLAY AGAIN';
}

startButton.addEventListener('click', startGame);

// Reset High Score Button
const resetGameBtn = document.getElementById('reset-game');
if (resetGameBtn) {
  resetGameBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset your high score?')) {
      highScore = 0;
      localStorage.setItem('catchTheBeatHighScore', highScore);
      highScoreElement.textContent = highScore;
      gameMessage.textContent = '🔄 High score reset!';
      setTimeout(() => {
        gameMessage.textContent = '';
      }, 2000);
    }
  });
}
