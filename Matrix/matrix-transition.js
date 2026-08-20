// Reusable fullscreen Matrix-rain transition, played before navigating away from a page.
// Wraps the existing /Matrix/matrix.js animation (loaded dynamically) rather than duplicating it.
(function () {
  var SCRIPT_URL = document.currentScript.src;
  var MATRIX_JS_URL = new URL('matrix.js', SCRIPT_URL).href;

  var SHOW_MS = 4500;       // overlay fully visible before navigating away
  var HARD_LIMIT_MS = 5000; // absolute cap: navigate no matter what

  function navigate(url) {
    if (window.__matrixTransitionDone) return;
    window.__matrixTransitionDone = true;
    window.location.href = url;
  }

  function playMatrixTransition(url) {
    if (window.__matrixTransitionRunning) return;
    window.__matrixTransitionRunning = true;

    var overlay = document.createElement('div');
    overlay.id = 'matrix-transition-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      background: '#000',
      zIndex: '2147483647',
      overflow: 'hidden'
    });

    var canvas = document.createElement('canvas');
    canvas.id = 'canvas'; // matrix.js references the global `canvas` bound to this id
    Object.assign(canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      display: 'block'
    });
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    var script = document.createElement('script');
    script.src = MATRIX_JS_URL;
    document.body.appendChild(script);

    var hardLimit = setTimeout(function () {
      navigate(url);
    }, HARD_LIMIT_MS);

    setTimeout(function () {
      clearTimeout(hardLimit);
      navigate(url);
    }, SHOW_MS);
  }

  window.MatrixTransition = { navigate: playMatrixTransition };
})();
