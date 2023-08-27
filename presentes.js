const sheetURL = "https://docs.google.com/spreadsheets/d/1x6KOfHlEAyEg6aD1NmO8Sj0VX0MDF6R4Q-gHleyb8rs/edit#gid=0";

// Função para carregar os dados da planilha
function loadGoogleSheetData(url) {
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
      const maxRows = Math.min(tableRows.length, 61);

      // Percorrer as linhas da planilha a partir da linha 3 até o limite máximo (linha 10)
      for (let i = 3; i < maxRows; i++) {
        const row = tableRows[i];
        const columns = row.querySelectorAll('td');

        // Criar a célula para a coluna "Presentes" (coluna 1)
        const presentCell = document.createElement('td');
        const presentData = columns[0].textContent.trim();
        presentCell.innerHTML = `<span>${presentData}</span>`;

        // Criar a célula para a coluna "Nomes" (coluna 2)
        const nameCell = document.createElement('td');
        const nameData = columns[1].textContent.trim();
        if (nameData === '') {
          nameCell.innerHTML = 
            `<form data-row="${i}" class="responsive-form"> <!-- Armazena o índice da linha no atributo data-row -->
              <label for="name">
                <input type="text" id="name" class="name" name="name" placeholder="Digite Seu Nome" autocomplete="off" required>
              </label>
              <button type="submit" id="submit" style="cursor: pointer;" class="btn1">
                <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                  <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                </svg>
              </button>
            </form>`;
          // Adicionar o evento de submit ao formulário apenas da célula atual
          nameCell.querySelector('form').addEventListener('submit', handleSubmit);
        } else {
          nameCell.innerHTML = `<span>${nameData}</span>`;
        }

        // Criar a nova linha da tabela
        const newRow = document.createElement('tr');
        newRow.appendChild(presentCell);
        newRow.appendChild(nameCell);

        // Adicionar a nova linha à tabela
        dataTableBody.appendChild(newRow);
      }
    })
    .catch(error => console.error('Erro ao carregar dados da planilha:', error));
}


// Chamar a função para carregar os dados da planilha
loadGoogleSheetData(sheetURL);

/* ------------------------------------------------------------------------------------------- */



const handleSubmit = (event) => {
  event.preventDefault();
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
    removeloading();
  });
}

// Função para adicionar o estado de carregamento
const addloading = () => {
  const load = document.querySelector('#load');
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
};

// Função para remover o estado de carregamento
const removeloading = () => {
  const alerta = document.querySelector('#alerta');
  alerta.innerHTML = `
    <div class="d-flex justify-content-center mt-5 h-100">
      <div class="d-flex align-items-center align-self-center card p-3 text-center cookies">
        <img src="https://i.pinimg.com/originals/a1/cd/2e/a1cd2e4a82bf9407d751f02f81baf257.png" width="50" class="core">
        <span class="mt-2" class="justify"><b>Obrigado pela contribuição 😊</b></span>
        <span class="justify">
          <b>Se caso colocou seu nome no presente errado <br> nos chame no WhatsApp.</br>
        </span>
        <button class="btn btn-dark mt-3 px-4" type="button" id="reloadButton">✔️</button>
      </div>
    </div>
  `;

  const reloadButton = document.querySelector('#reloadButton');
  reloadButton.addEventListener('click', function() {
    location.reload();
    loadGoogleSheetData(sheetURL); // Recarrega os dados da planilha
  }, 1000);
};