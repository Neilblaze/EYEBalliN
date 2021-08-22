// TODO  :  Connect with chrome.process < https://developer.chrome.com/docs/extensions/reference/processes >

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var rtChart = new RealTimeChart(document.getElementById("topaz"));
  rtChart.setOptions({
    waitWindowLoad: true,
    type: "stacked",
    isResponsive: true,
    totalElement: 80,
    width: 200,
    height: 300,
    onHover: function(data) {
      console.log("Data", data);
    },
    legend: [
      {
        id: "line1",
        title: "IO Usage",
        color: "#00e8b2"
      },
      {
        id: "line2",
        title: "CPU",
        color: "#0362fc"
      },
      {
        id: "line3",
        title: "Memory Footprint",
        color: "#ff6a00"
      }
    ],
    minValue: 0,
    maxValue: 100,
    paddingRight: 0
  });
  
  setInterval(function() {
    rtChart.addChartData([
      {
        id: "line1",
        value: getRandomInt(0, 20)
      },
      {
        id: "line2",
        value: getRandomInt(10, 30)
      },
      {
        id: "line3",
        value: getRandomInt(30, 40)
      }
    ]);
    rtChart.render();
  }, 1000 / 24);