function countdown() {
    var now = new Date();
    var eventDate = new Date("2024-01-27"); // Data final da contagem regressiva
  
    var currentTime = now.getTime();
    var eventTime = eventDate.getTime();
  
    var remTime = eventTime - currentTime;
  
    var seconds = Math.floor(remTime / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
  
    hours %= 24;
    minutes %= 60;
    seconds %= 60;
  
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  
    setTimeout(countdown, 1000);
  }
  
  countdown();
  