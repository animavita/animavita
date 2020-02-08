/* eslint-env browser */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/expo-service-worker.js', {scope: '/'})
      .then(function(info) {
        // eslint-disable-next-line no-console
        console.info('Registered service-worker', info);
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.info('Failed to register service-worker', error);
      });
  });
}
