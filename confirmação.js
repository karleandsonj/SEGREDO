/* ------------------------------------------------------------------------ */

const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', formatarTelefone);

function formatarTelefone() {
  const telefone = telefoneInput.value;

  // Remove todos os caracteres não numéricos
  const numeroLimpo = telefone.replace(/\D/g, '');

  // Verifica se há pelo menos 2 dígitos no número
  if (numeroLimpo.length >= 3) {
    // Formata o número colocando parênteses nos dois primeiros dígitos
    let numeroFormatado = `(${numeroLimpo.substring(0, 2)})`;

    // Adiciona um espaço no terceiro número
    if (numeroLimpo.length >= 3) {
      numeroFormatado += ` ${numeroLimpo.substring(2, 3)}`;
    }

    // Adiciona o restante dos números e o traço depois do sétimo número
    if (numeroLimpo.length >= 4) {
      numeroFormatado += `${numeroLimpo.substring(3, 7)}-${numeroLimpo.substring(7)}`;
    }

    // Atualiza o valor do campo de entrada com o número formatado
    telefoneInput.value = numeroFormatado;
  }
}

const addloading = () => {
  const load = document.querySelector('#load');
  load.innerHTML = '<div class="container">   <div class="preloader">     <span></span>     <span></span>     <span></span>   </div>   <div class="shadow"></div> </div>'/* '<img src="fotos/load.gif" alt="GIF animado" id="">' */;
}

// addloading ();

const removeloading = () => {
  const alerta = document.querySelector('#alerta');
  alerta.innerHTML = '<div class="d-flex justify-content-center mt-5 h-100"> <div class="d-flex align-items-center align-self-center card p-3 text-center cookies"><img src="https://i.pinimg.com/originals/a1/cd/2e/a1cd2e4a82bf9407d751f02f81baf257.png" width="50" class="core"><span class="mt-2"><b>Confirmação Feita com sucesso</b></span>  <span class="justify"> <b>Convite será enviado para seu email e WhatsApp. <br> <i>aguarde!</i></br></span><button class="btn btn-dark mt-3 px-4" type="button" id="reloadButton">✔️</button> </div> </div> ';

  const reloadButton = document.querySelector('#reloadButton');
  reloadButton.addEventListener('click', function() {
    if (reloadButton) {
      window.location.href = 'presentes.html';
    }
    
  });

}

// removeloading(); 
  
const handleSubmit = (event) => {
  event.preventDefault();
  addloading();
  
  const name = document.querySelector('input[name=name]').value;
  /* const Presentes = document.querySelector('select[name=Presentes]').value; */
  const email = document.querySelector('input[name=email]').value;
  const telefone = document.querySelector('input[name=telefone]').value;
/*   const presença = document.querySelector('input[name=presença]').value; */

  fetch('https://api.sheetmonkey.io/form/wnxVCxtKEARrR36z6kd5kM', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, telefone }),
  }).then(() => {
    removeloading();
  });
}
document.querySelector('form').addEventListener('submit', handleSubmit);/* location.reload(true); */


