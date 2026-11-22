(function () {
  var screens = {};
  document.querySelectorAll('.screen').forEach(function (s) { screens[s.dataset.screen] = s; });
  var first = document.querySelector('.screen').dataset.screen;
  var current = null;
  var goingBack = false;

  function show(id) {
    if (!screens[id]) id = first;
    if (current === id) return;
    Object.keys(screens).forEach(function (k) {
      var s = screens[k];
      s.classList.toggle('back-anim', goingBack);
      s.classList.toggle('active', k === id);
      s.setAttribute('aria-hidden', k === id ? 'false' : 'true');
    });
    current = id;
    goingBack = false;
  }

  function route() { show(location.hash.replace('#', '') || first); }

  document.addEventListener('click', function (e) {
    var go = e.target.closest('[data-go]');
    if (go) { location.hash = go.dataset.go; return; }
    var back = e.target.closest('[data-back]');
    if (back) {
      goingBack = true;
      // Replace so the thank-you screens don't leave a loop in history
      location.replace('#' + back.dataset.back);
    }
  });

  window.addEventListener('hashchange', route);
  route();

  // Block pinch-zoom on iOS Safari (double-tap zoom is off via touch-action)
  document.addEventListener('gesturestart', function (e) { e.preventDefault(); });
})();
