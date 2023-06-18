var myImage = document.getElementById('myImage');

myImage.addEventListener('click', function() {
  var link = '03458991565'; // Insira o link desejado aqui
  
  navigator.clipboard.writeText(link)
    .then(function() {
      console.log('Link copiado: ' + link);
      showNotification('Link copiado', 'O link foi copiado para a área de transferência.');
    })
    .catch(function(err) {
      console.error('Falha ao copiar o link: ', err);
    });
});

function showNotification(title, message) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification(title, { body: message });
      }
    });
  }
}
