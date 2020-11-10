console.log('hello');

if ('serviceWorker' in navigator) { //浏览器如果支持serviceWorker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('service-worker registed');
        }).catch(error => {
      console.log('service-worker register error');
    })
  })
}