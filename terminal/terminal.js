document.addEventListener('DOMContentLoaded', function() {
  const output = document.getElementById('output');
  const input = document.getElementById('command-input');
  const typingSpeed = 50; // Velocidad de escritura en milisegundos

  // Mostrar mensaje de bienvenida con efecto de tecleo
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
    // Aquí puedes implementar la lógica para ejecutar diferentes comandos y generar respuestas
    // Por ejemplo:
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

    const typingInterval = setInterval(function() {
      element.innerHTML += text[index];
      index++;

      if (index >= text.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  }
});
