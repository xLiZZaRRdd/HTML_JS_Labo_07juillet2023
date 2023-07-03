function updateStartButton() {
    const themeSelect = document.getElementById('theme');
    const startButton = document.getElementById('start-button');
  
    if (themeSelect.value === 'dragon-ball') {
      startButton.onclick = function() {
        window.location.href = 'http://127.0.0.1:5500/MemoryGame/DragonBall/MemoryDragonBall.html';
      };
    } else if (themeSelect.value === 'one-piece') {
      startButton.onclick = function() {
        window.location.href = 'http://127.0.0.1:5500/MemoryGame/Monopoly/MemoryMonopoly.html';
      };
    }
  }
  
  // Appel initial pour prendre en compte la valeur par défaut
  updateStartButton();
  