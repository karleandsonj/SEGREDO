// Data alvo para a contagem regressiva
var targetDate = new Date("2024-12-28T07:00:00").getTime();

// Função para atualizar o contador
function updateCountdown() {
  var currentDate = new Date().getTime();
  var timeRemaining = targetDate - currentDate;

  // Cálculos para dias, horas, minutos e segundos restantes
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Exibir a contagem regressiva na página
  document.getElementById("countdown").innerHTML = days + ":" + hours + ":"
    + minutes + ":" + seconds;

  // Verificar se a contagem regressiva terminou
  if (timeRemaining < 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "Contagem regressiva encerrada";
  }
}

// Atualizar a contagem regressiva a cada segundo
var countdownInterval = setInterval(updateCountdown, 1000);
