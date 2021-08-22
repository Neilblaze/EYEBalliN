const darkMode = document.querySelector(".theme-toggle");

function darkify() {
  document.documentElement.classList.toggle("theme--night");
}

darkMode.addEventListener("click", darkify);

darkify();


// Other Functions

  /* Clear Points */
  document.getElementById('clear-points').addEventListener('click', evt => {
    if (confirm("Are you sure you want to reset the score!!!")) {
      document.getElementById("currentz").innerHTML = 0;
      document.getElementById("bestz").innerHTML = 0;
      updateScore()
    }
  });


   // CPU usage data point every 500ms ~ rendRand()
   var random = new TimeSeries();
   setInterval(function() {
     random.append(new Date().getTime(), Math.random() * 100);
   }, 500);

   function createTimeline() {
     var chart = new SmoothieChart({responsive: true});
     chart.addTimeSeries(random, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
     chart.streamTo(document.getElementById("chart"), 500);
   }