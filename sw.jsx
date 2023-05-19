self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    console.log('listener');
    if (event.action === 'play') {
      const audioUrl = event.notification.data;
      alert('hola');
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      // Hacer algo si se hace clic en el cuerpo de la notificación
    }
  });
  
  self.addEventListener('install', function(event) {
    console.log('El Service Worker ha sido instalado');
  });
  
  self.addEventListener('activate', function(event) {
    console.log('El Service Worker ha sido activado');
  });

  
  