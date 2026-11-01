/* Dra. Magda Odontologia — barra de consentimento LGPD + Consent Mode v2
   (menu mobile e accordion FAQ usam Alpine.js) */
(function () {
  'use strict';

  var KEY = 'dramagda-cookie-consent';
  var bar = document.getElementById('cookie-consent');
  if (!bar) return;

  function gtagConsent(mode) {
    if (typeof window.gtag !== 'function') return;
    var state = mode === 'granted' ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      'ad_storage': state,
      'ad_user_data': state,
      'ad_personalization': state,
      'analytics_storage': state
    });
  }

  function hide() { bar.hidden = true; }

  var saved = null;
  try { saved = window.localStorage.getItem(KEY); } catch (e) { saved = null; }

  if (saved === 'accepted' || saved === 'rejected') {
    hide();
  } else {
    bar.hidden = false;
  }

  bar.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-consent]');
    if (!btn) return;
    var action = btn.getAttribute('data-consent');
    var value = action === 'accept' ? 'accepted' : 'rejected';
    try { window.localStorage.setItem(KEY, value); } catch (e) { /* modo privado */ }
    gtagConsent(action === 'accept' ? 'granted' : 'denied');
    hide();
  });
})();
