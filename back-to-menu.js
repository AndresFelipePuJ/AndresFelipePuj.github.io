// Reusable "back to menu" button for secondary pages.
// Injects a top-left terminal-style button, wires click + ESC, and plays the
// Matrix transition (if loaded) before navigating back to index.html.
(function () {
  var SCRIPT_URL = document.currentScript.src;
  var HOME_URL = new URL('index.html', SCRIPT_URL).href;

  function goHome() {
    if (window.MatrixTransition) {
      window.MatrixTransition.navigate(HOME_URL);
    } else {
      window.location.href = HOME_URL;
    }
  }

  function init() {
    var btn = document.createElement('button');
    btn.id = 'back-to-menu-btn';
    btn.type = 'button';
    btn.textContent = '> [ESC] back';
    Object.assign(btn.style, {
      position: 'fixed',
      top: '16px',
      left: '16px',
      zIndex: '2147483000',
      background: 'transparent',
      border: '1px solid #0F0',
      borderRadius: '2px',
      color: '#0F0',
      fontFamily: 'monospace',
      fontSize: '14px',
      padding: '6px 10px',
      cursor: 'pointer',
      textShadow: '0 0 4px #0F0'
    });
    btn.addEventListener('mouseenter', function () {
      btn.style.background = 'rgba(0, 255, 0, 0.1)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.background = 'transparent';
    });
    btn.addEventListener('click', goHome);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') goHome();
  });
})();
