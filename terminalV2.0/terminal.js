document.addEventListener('DOMContentLoaded', function() {
  const output = document.getElementById('output');
  const input = document.getElementById('command-input');
  const typingSpeed = 50;
  const matrixLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const welcomeMessage = 'Hola, mi nombre es Andrés Felipe. Puedes utilizar estos comandos para conocer más sobre mí:';
  showTextWithTypingEffect(welcomeMessage, output);

  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const command = input.value.trim();
      input.value = '';

      if (command !== '') {
        const response = executeCommand(command);
        output.innerHTML += `<div><span>&gt;</span> ${command}</div>`;
        showTextWithTypingEffect(response, output);
        output.scrollTop = output.scrollHeight;
      }
    }
  });

  function executeCommand(command) {
    if (command === 'help') {
      return 'Lista de comandos disponibles:\n- help: Muestra la lista de comandos.\n- date: Muestra la fecha actual.';
    } else if (command === 'date') {
      return new Date().toLocaleString();
    } else {
      return 'Comando desconocido. Escribe "help" para obtener ayuda.';
    }
  }

  function showTextWithTypingEffect(text, element) {
    let index = 0;
    let displayText = '';

    const typingInterval = setInterval(function() {
      displayText += text[index];
      element.innerHTML = `<div><span>&gt;</span> ${displayText}</div>`;
      index++;

      if (index >= text.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  }

  // Función para crear letras al estilo Matrix debajo de la terminal
  function createMatrixEffect() {
    const terminal = document.querySelector('.terminal');
    const matrixEffectContainer = document.createElement('div');
    matrixEffectContainer.classList.add('matrix-effect-container');
    terminal.appendChild(matrixEffectContainer);

    const terminalRect = terminal.getBoundingClientRect();
    const matrixWidth = Math.floor(terminalRect.width / 20);
    const matrixHeight = Math.floor(terminalRect.height / 20);

    for (let i = 0; i < matrixWidth; i++) {
      for (let j = 0; j < matrixHeight; j++) {
        const matrixLetter = document.createElement('span');
        matrixLetter.classList.add('matrix-letter');
        matrixLetter.style.left = `${i * 20}px`;
        matrixLetter.style.top = `${j * 20}px`;
        matrixLetter.style.animationDelay = `${Math.random() * 5}s`;
        matrixLetter.textContent = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
        matrixEffectContainer.appendChild(matrixLetter);
      }
    }
  }

  createMatrixEffect();
});
