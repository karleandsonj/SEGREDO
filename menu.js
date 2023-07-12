var navicon = document.querySelector('.navicon');

// Adiciona um ouvinte de evento de clique ao elemento
navicon.addEventListener('click', function() {
  navicon.classList.add('active');
});

// Adiciona um ouvinte de evento de clique ao documento
document.addEventListener('click', function(event) {
  // Verifica se o elemento clicado é o .navicon ou um filho dele
  var isClickInsideNavicon = navicon.contains(event.target);
  
  // Se o clique não estiver dentro do .navicon, remove a classe "active"
  if (!isClickInsideNavicon) {
    navicon.classList.remove('active');
  }
});
