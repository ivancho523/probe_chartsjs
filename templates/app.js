var do_data = [],
  d1_data = [],
  time_data = [],
  h0_data = [],
  t0_data = [];
var prueba_chart;
var daticos;
// // // Perfeccionar este MediaStreamAudioDestinationNode, por ahora se usa el antiguo

// const printCharts = (url) => {
//     const promise = fetch(url).then(response => response.json())
//     // console.log(promise)
//     return Promise.all(promise)
// }

async function printCharts() {
  // const url = "https://dummyjson.com/products"
  // const url =  "https://pm25.lass-net.org/API-1.0.0/project/lass/latest/"
  const url = "http://127.0.0.1:8000";
  const response = await fetch(url);
  const datosGenerales = await response.json();
  console.log(datosGenerales);
  const d0 = datosGenerales.feeds.map((x) => x.s_d0);
  const h0 = datosGenerales.feeds.map((x) => x.s_h0);
  const d1 = datosGenerales.feeds.map((x) => x.s_d1);
  const t0 = datosGenerales.feeds.map((x) => x.s_t0);
  const time_device = datosGenerales.feeds.map((x) => x.time);
  console.log(d0);
  console.log(d1);
  console.log(time_device);

  do_data = d0;
  d1_data = d1;
  h0_data = h0;
  t0_data = t0;
  time_data = time_device;
}
printCharts();

// const grafo1 = document.getElementById('s_d0_id').getContext('2d')

async function costChart() {
  await printCharts();
  const data = {
    labels: time_data,
    datasets: [
      {
        label: "Valor D0",
        data: do_data,
        borderColor: "green",
        backgroundColor: "blue",
        tension: 0.1,
      },
      {
        label: "Valor D1",
        data: d1_data,
        borderColor: "blue",
        backgroundColor: "green",
        tension: 0.1,
      },
      {
        label: "Valor H10",
        data: h0_data,
        borderColor: "red",
        backgroundColor: "green",
        tension: 0.1,
      },
      {
        label: "Valor T_0",
        data: t0_data,
        borderColor: "black",
        backgroundColor: "green",
        tension: 0.1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: { display: true },
    },
  };
  new Chart(document.getElementById("s_d0_id"), {
    type: "line",
    data,
    options,
  });
}
costChart();

async function ratingChart() {
  await printCharts();
  const data = {
    labels: time_data,
    datasets: [
      {
        label: "Valor D1",
        data: d1_data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "black",
        tension: 0.1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: { display: true },
    },
  };
  new Chart(document.getElementById("s_d1_id"), {
    type: "line",
    data,
    options,
  });
}
ratingChart();

async function radarChart() {
  await printCharts();
  const data = {
    labels: time_data,
    datasets: [
      {
        label: "Valor D1 Radar",
        data: d1_data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "black",
      },
    ],
  };
  const options = {
    plugins: {
      legend: { display: true },
    },
    scales: {
      r: {
        ticks: { display: false },
      },
    },
  };
  new Chart(document.getElementById("s_d1_id_radar"), {
    type: "radar",
    data,
    options,
  });
}
radarChart();

async function mychart() {
  await printCharts();
  data = {
    labels: time_data,
    datasets: [
      {
        label: "Valor T-0",
        data: t0_data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "black",
      },
    ],
  };
  options = {
    plugins: {
      legend: { display: true },
    },
    scales: {
      r: {
        ticks: { display: false },
      },
    },
  };
  prueba_chart = new Chart(document.getElementById("myChart"), {
    type: "bar",
    data,
    options,
  });
  // return prueba_chart
}
mychart();
// `` estas comillas se sacan con alt+96, las string literals

// // FUNCION PARA CAMBIAR DATOS DE LOS DATASETS
// function randomizeData() {
//     let ctx = document.getElementById('myChart').getContext('2d');
//     let myChart = new Chart(ctx, {
//         type: 'line',
//         data: t0_data,
//     });
//     var new_t0_data = t0_data.map(x => Math.floor(Math.random() * 30));
//     myChart.update();
//     console.log(new_t0_data);
//   };

// ACTUALIZAR EL TIPO DE GRÁFICO
function updateChartType() {
  var new_t0_data = t0_data.map((x) => Math.floor(Math.random() * 20));
  var new_t1_data = t0_data.map((x) => Math.floor(Math.random() * 10));
  var datos_actualizados = {
    labels: time_data,
    datasets: [
      {
        label: "Nuevo Valor T-0",
        data: new_t0_data,
        borderColor: "rgba(255, 159, 64, 0.2)",
        backgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Nuevo Valor T-1",
        data: new_t1_data,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };
  //luego de crear nuevos datos, borro la imagen anterior y dibujo una nueva sobre el espacio
  prueba_chart.destroy();
  prueba_chart = new Chart(document.getElementById("myChart"), {
    type: document.getElementById("chartType").value,
    data: datos_actualizados,
  });
  console.log(new_t0_data);
}

function randomizeData() {
  let newDataBaby = dataBaby.map((x) => Math.floor(Math.random() * 50));
  let newMoreDataBaby = moreDataBaby.map((x) => Math.floor(Math.random() * 40));
  myData.datasets[0].data = newDataBaby;
  myData.datasets[1].data = newMoreDataBaby;
  myChart.update();
  console.log(newDataBaby);
}