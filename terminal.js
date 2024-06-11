  document.addEventListener('DOMContentLoaded', function() {
  const output = document.getElementById('output');
  const input = document.getElementById('command-input');
  const typingSpeed = 50; // Velocidad de escritura en milisegundos


  output.style.whiteSpace = 'pre-wrap';


  // Mostrar mensaje de bienvenida con efecto de tecleo
  const welcomeMessage = 'Hola, mi nombre es Andrés Felipe. Escribe "help" y pulsa enter para ver los comandos disponibles.. ';
  showTextWithTypingEffect(welcomeMessage, output);

  // Deshabilitar la entrada del usuario hasta que se complete el mensaje de bienvenida
  input.disabled = true;

  // Esperar a que se complete el mensaje de bienvenida antes de habilitar la entrada del usuario
  setTimeout(function() {
    input.disabled = false;
    input.focus(); // Colocar el foco en el input para que el usuario pueda escribir inmediatamente
  }, typingSpeed * welcomeMessage.length);

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


  
  function comandList(dict) {
    let keysString = '';
    for (let key in dict) {
      keysString += key + '\n';
    }
    return keysString;
  }
  
  // Definimos inicialmente el diccionario sin 'help'
  var commandDict = {
    'Date': new Date().toLocaleString(),
    'profile': function() {
      window.location.href = './Bio3D/profile3D.html';
    },
    'matrix': function() {
      window.location.href = './Matrix/HtmlMatrix.html';
    },
    'ielts': function() {
      window.location.href = './IELTS/IELTS_report_form.pdf';
    }
  };
  
  // Actualizamos 'commandDict' con 'help' utilizando comandList(commandDict)
  commandDict['help'] = comandList(commandDict);

// Función para calcular la distancia de Levenshtein
function levenshtein(a, b) {
  var temp, i, j, prev, val, row, matrix = [];
  var a = a + "", b = b + "";

  for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
      if (i === 0) continue;
      matrix[0][i] = i;
  }

  for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
              val = matrix[i - 1][j - 1];
          } else {
              val = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
          }
          matrix[i][j] = val;
      }
  }
  return matrix[b.length][a.length];
}

function executeCommand(command) {
  // Convertimos el comando a minúsculas para que sea insensible a mayúsculas y minúsculas
  command = command.toLowerCase();

  // Buscamos el comando en nuestro diccionario
  var selectedCommand = commandDict[command];

  // Si encontramos una función asociada al comando, la ejecutamos
  if (selectedCommand && typeof selectedCommand === 'function') {
    return selectedCommand();
  } else {
    // Si no se encuentra el comando, buscamos el más parecido en el diccionario
    var minDistance = Infinity;
    var closestCommand = null;
    for (var key in commandDict) {
      var distance = levenshtein(command, key);
      if (distance < minDistance) {
        minDistance = distance;
        closestCommand = key;
      }
    }

    // Si el comando más parecido es suficientemente cercano, devolvemos la respuesta correspondiente
    if (minDistance <= 1) {
      return commandDict[closestCommand];
    } else {
      return 'Comando desconocido. Escribe "help" para obtener ayuda.';
    }
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

