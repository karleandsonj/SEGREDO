function selecionarItem(event) {
  // Remove a classe 'selected' de todos os links
  var links = document.querySelectorAll('.menu-horizontal li a');
  links.forEach(function(link) {
    link.classList.remove('selected');
  });

  // Adiciona a classe 'selected' ao link clicado
  var linkClicado = event.target;
  linkClicado.classList.add('selected');
}