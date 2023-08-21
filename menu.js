var navicon = document.querySelector('.navicon');

// Adiciona um ouvinte de evento de clique ao elemento
navicon.addEventListener('click', function() {
  if (navicon.classList.contains('active')) {
    navicon.classList.remove('active');
  } else {
    navicon.classList.add('active');
  }
});

// Adiciona um ouvinte de evento de clique ao documento
document.addEventListener('click', function(event) {
  var isClickInsideNavicon = navicon.contains(event.target);
  
  // Se o clique não estiver dentro do .navicon, remove a classe "active"
  if (!isClickInsideNavicon) {
    navicon.classList.remove('active');
  }
});

/* LOGO MOV */

/* const logo = document.querySelector('.logo');

logo.addEventListener('animationiteration', () => {
  setTimeout(() => {
    logo.classList.toggle('change');
  }, 2000); // 2000 ms = 2 seconds
}); */

