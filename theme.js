// Light/dark theme toggle. Loaded in <head> so a saved choice applies before first paint.
(function(){
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function saved(){
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function current(){
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
  function render(){
    var mode = current();
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.setAttribute('data-mode', mode);
      var label = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });
  }

  var initial = saved();
  if (initial === 'dark' || initial === 'light') root.setAttribute('data-theme', initial);

  media.addEventListener('change', render);
  document.addEventListener('DOMContentLoaded', function(){
    render();
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.addEventListener('click', function(){
        var next = current() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        render();
      });
    });
  });
})();
