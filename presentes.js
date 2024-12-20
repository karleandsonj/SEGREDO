const sheetURL = "https://docs.google.com/spreadsheets/d/1x6KOfHlEAyEg6aD1NmO8Sj0VX0MDF6R4Q-gHleyb8rs/edit#gid=0";

// Função para carregar os dados da planilha
function loadGoogleSheetData(url) {
  const loadingElement = document.getElementById('loading');

  // Exibir a barra de carregamento
  loadingElement.style.display = 'block';

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, 'text/html');
      const tableRows = htmlDocument.querySelectorAll('tbody tr');

      // Limpar a tabela antes de adicionar novos dados
      const dataTableBody = document.querySelector('#data-table tbody');
      dataTableBody.innerHTML = '';

      // Definir o limite máximo de linhas a serem carregadas (até a linha 10)
      const maxRows = Math.min(tableRows.length, 64);

      // Inicializar uma nova linha
      let newRow = document.createElement('tr');

      // Percorrer as linhas da planilha a partir da linha 3 até o limite máximo
      for (let i = 3; i < maxRows; i++) {

        const row = tableRows[i];
        const columns = row.querySelectorAll('td');

        // Filtrar apenas as linhas que não têm nome preenchido
        const nameData = columns[1].textContent.trim();
        if (nameData === '') {

          const presentData = columns[0].textContent.trim();
          const presentLink = columns[3].textContent.trim();
          const presentImg = columns[4].textContent.trim();

          // Criar a célula para a coluna
          const presentCell = document.createElement('td');

          if (presentLink === 'PIX') {
            presentCell.innerHTML =`
                <div class="divImgPres">
                  <img class="ImgPres" id="ImgPres" src="${presentImg}">
                  <span class="NomePresente pix">${presentData}</span>
                  <a class="CarLink1 pix" onclick="PixMessage()" id="PIX_PRESENTE" target="_blank" style="text-decoration: none;">
                    <div class="carrinho pix">
                      <img class="Carimg pix" src="https://img.icons8.com/?size=100&id=CuUOYOfd3Dy9&format=png&color=000000" alt="PIX">
                      <label class="CarLink pix" style="position: relative; left: 1px; text-decoration: none; top: -5px;">PIX</label>
                    </div>
                  </a>
                  <form data-row="${i}" class="responsive-form2" style="display: none;">
                    <label for="name">
                      <input type="text" id="name" class="name2" name="name" placeholder="Digite Seu Nome" autocomplete="off" required>
                    </label>
                    <button type="submit" id="submit" style="cursor: pointer;" class="btn1">
                      <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                      </svg>
                    </button>
                  </form>
                </div>`;
          } else {
             // Verificar se `presentLink` está vazio
             if (presentImg === '') {
              // Exibir imagem padrão quando não houver link
              presentCell.innerHTML =`
                <div class="divImgPres">
                  <img class="ImgPres" id="ImgPres" src="${presentImg}">
                  <span class="NomePresente">${presentData}</span>
                  <a class="CarLink1" target="_blank" style="text-decoration: none;">
                    <div class="carrinho" onclick="addNotificacaoLINK('${presentLink}')">
                      <img class="Carimg" src="https://img.icons8.com/?size=100&id=59993&format=png&color=FFFFFF"  alt="Imagem padrão">
                      <label class="CarLink" style="position: relative; left: 1px; text-decoration: none; top: -7px;">Link</label>
                    </div>
                  </a>
                  <form data-row="${i}" class="responsive-form2">
                    <label for="name">
                      <input type="text" id="name" class="name2" name="name" placeholder="Digite Seu Nome" autocomplete="off" required>
                    </label>
                    <button type="submit" id="submit" style="cursor: pointer;" class="btn1">
                      <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                      </svg>
                    </button>
                  </form>
                </div>`;
            } else {
              // Exibir link com a imagem de `presentLink`
              presentCell.innerHTML = `
                <div class="divImgPres">
                  <img class="ImgPres" id="ImgPres" src="${presentImg}">
                  <span class="NomePresente">${presentData}</span>
                  <a class="CarLink1" target="_blank" style="text-decoration: none;">
                    <div class="carrinho" onclick="addNotificacaoLINK('${presentLink}')">
                      <img class="Carimg" src="https://img.icons8.com/?size=100&id=59993&format=png&color=FFFFFF"  alt="Imagem padrão">
                      <label class="CarLink" style="position: relative; left: 1px; text-decoration: none; top: -7px;">Link</label>
                    </div>
                  </a>
                  <form data-row="${i}" class="responsive-form2">
                    <label for="name">
                      <input type="text" id="name" class="name2" name="name" placeholder="Digite Seu Nome" autocomplete="off" required>
                    </label>
                    <button type="submit" id="submit" style="cursor: pointer;" class="btn1">
                      <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                      </svg>
                    </button>
                  </form>
                </div>`;
            }
          }

          // Adicionar a célula à nova linha
          newRow.appendChild(presentCell);

          // Adicionar o listener para o evento de submit do formulário
          presentCell.querySelector('form').addEventListener('submit', handleSubmit);
         

        }
      }

      // Adicionar a última linha se tiver células restantes
      if (newRow.childNodes.length > 0) {
        dataTableBody.appendChild(newRow);
      }
      

    })

    .catch(error => console.error('Erro ao carregar dados da planilha:', error))
    .finally(() => {
      // Ocultar a barra de carregamento
      loadingElement.style.display = 'none';
    });

}

// Adiciona o parâmetro à função addNotificacaoLINK
function addNotificacaoLINK(presentLink) {
  const Notificacao = document.querySelector('#notificacao');
  const overlay = document.querySelector('#overlay');

  // Adiciona o conteúdo da notificação
  Notificacao.innerHTML = `
      <div class="container_notifi">
          <div id="closeButton">X</div> <!-- Botão para fechar -->
          <p class="txtNOTF"> LEMBRE-SE <br><br>
          Os links são referências. Se preferir, pode pedir em outro site. <BR>
          Endereço de envio se precisar 👇<br><br>
          <b> Avenida Senhor do Bonfim, Nº 375, Jequiezinho, Jequié-BA <BR> CEP: 45208.555 </b>
          </p>
          <a id="sairnocontinuar" class="continuarNOTa" href="${presentLink}" target="_blank" style="text-decoration: none;">
          <h4 class="continuarNOT">CONTINUAR</h4>
          </a>
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

  document.querySelector('#sairnocontinuar').addEventListener('click', () => {
    Notificacao.style.display = 'none';
    overlay.style.display = 'none';
});
}

function PixMessage() {
  const overlay1 = document.querySelector('#overlay1');
  document.getElementById('pix-message').style.display = 'block';
  overlay1.style.display = 'block';
}

function closePixMessage() {
  document.getElementById('pix-message').style.display = 'none'; // Esconde a mensagem
  overlay1.style.display = 'none';
}

// Chamar a função para carregar os dados da planilha
loadGoogleSheetData(sheetURL);

// Função para manipular o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();
  /* addDigitNum(); */
  addloading();

  const formElement = event.target; // Elemento do formulário que foi submetido
  const rowIndex = formElement.getAttribute('data-row'); // Obtém o índice da linha armazenado no atributo data-row
  const name = formElement.querySelector('input[name=name]').value; // Obtém o valor do input dentro do formulário

  // Salvar o valor na planilha usando o índice da linha (rowIndex) e o valor do input (name)
  fetch('https://api.sheetmonkey.io/form/4RhCWv4UpsRQHWvb8iZFmr', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rowIndex, name }), // Envia o índice da linha e o valor do input para a API
  }).then(() => {
    setTimeout(removeloading, 2000);
  });
}

// Função para adicionar o estado de carregamento
const addDigitNum = () => {
  const NumContato = document.querySelector('#DigitarNum');
  NumContato.innerHTML = `
    <div class="containerContato">
      <p> DIGITE SEU NUMERO </p>
    </div>
  `;
};

// Função para adicionar o estado de carregamento
const addloading = () => {
  const load = document.querySelector('#load');
  const overlay1 = document.querySelector('#overlay1');
  load.innerHTML = `
    <div class="container">
      <div class="preloader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="shadow"></div>
    </div>
  `;

  overlay1.style.display = 'block';
};

const sairaddloading = () => {
  // Remove o indicador de carregamento
  const loadingDiv = document.getElementById('loading');
  if (loadingDiv) {
    loadingDiv.remove();
  }
};

// Função para remover o estado de carregamento
const removeloading = () => {
  const alerta = document.querySelector('#alerta');
  alerta.innerHTML = `
    <div class="d-flex justify-content-center mt-5 h-100">
      <div class="d-flex align-items-center align-self-center card p-3 text-center cookies">
        <img src="https://i.pinimg.com/originals/a1/cd/2e/a1cd2e4a82bf9407d751f02f81baf257.png" width="50" class="core">
        <span class="mt-2"><b>Obrigado pela contribuição 😊</b></span>
        <span class="justify">
          <b>Se caso colocou seu nome no presente errado, nos chame no WhatsApp.</b>
        </span>
        <button class="btn btn-dark mt-3 px-4" type="button" id="reloadButton">✔️</button>
      </div>
    </div>
  `;

  const reloadButton = document.querySelector('#reloadButton');
  reloadButton.addEventListener('click', function () {
    location.reload();
    loadGoogleSheetData(sheetURL); // Recarrega os dados da planilha
  });

};




