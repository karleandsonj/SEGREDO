const addNotificacao = () => {
    const Notificacao = document.querySelector('#notificacao');
    const overlay = document.querySelector('#overlay');

    // Adiciona o conteúdo da notificação
    Notificacao.innerHTML = `
<div class="container_notifi">
    <div id="closeButton">X</div> <!-- Botão para fechar -->
    <p class="txtNOTF">Bem-vindo! <br><br>
    Digite seu nome e clique no coração ao lado para que ele seja adicionado a lista!<br><br>
    Se preferir pode nos enviar o valor referente ao presente! <br>
    No rodapé do site tem o QR-Code da chave pix.</p>


</div>
`;

    // Exibe a notificação e o overlay
    Notificacao.style.display = 'block';
    overlay.style.display = 'block';

    // Adiciona evento para fechar a notificação
    document.querySelector('#closeButton').addEventListener('click', () => {
        Notificacao.style.display = 'none';
        overlay.style.display = 'none';
    });
};

// Chama a função ao carregar a página
addNotificacao();