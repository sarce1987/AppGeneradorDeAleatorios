/**
 * Al arrancar el programa
 */
ElmntHTML.body.onload = mostrarGraficoEfectividadInicio;

/**
 * Seteo de valores de configuracion a traves de los valores del imput
 */

function Config() {
  return {
    numTrades: Number(ElmntHTML.numTrades.value),
    montoStopLoss: parseFloat(ElmntHTML.montoStopLoss.value),
    montoTakeProfit: parseFloat(ElmntHTML.montoTakeProfit.value),
    comisionPorTrade: parseFloat(ElmntHTML.comisionPorTrade.value),
    ratioGP: parseFloat(this.montoTakeProfit / this.montoStopLoss),
    efectividad: parseFloat(ElmntHTML.efectividad.value),
  };
}

//Validamos los datos de entrada
let err = [];
function validar(elementoHTML) {
  if (elementoHTML.id == "num-de-trades") {
    if (
      elementoHTML.value === null ||
      elementoHTML.value <= 0 ||
      !(elementoHTML.value % 1 === 0)
    ) {
      document.getElementById("input-1").classList.remove("input-valido");
      document.getElementById("input-1").classList.add("input-no-valido");
      document.getElementById("msj-error-1").innerHTML =
        "*El valor no puede ser nulo o estar vacio";
      err[0] = 1;
    } else {
      document.getElementById("input-1").classList.remove("input-no-valido");
      document.getElementById("input-1").classList.add("input-valido");
      err[0] = 0;
    }
  }

  if (elementoHTML.id == "monto-stoplost") {
    if (elementoHTML.value === null || elementoHTML.value > 0) {
      document.getElementById("input-2").classList.remove("input-valido");
      document.getElementById("input-2").classList.add("input-no-valido");
      document.getElementById("msj-error-2").innerHTML =
        "*El valor no puede ser nulo o ser positivo";
      err[1] = 1;
    } else {
      document.getElementById("input-2").classList.remove("input-no-valido");
      document.getElementById("input-2").classList.add("input-valido");
      err[1] = 0;
    }
  }

  if (elementoHTML.id == "monto-take-profit") {
    if (elementoHTML.value === null || elementoHTML.value < 0) {
      document.getElementById("input-3").classList.remove("input-valido");
      document.getElementById("input-3").classList.add("input-no-valido");
      document.getElementById("msj-error-3").innerHTML =
        "*El valor no puede ser nulo o ser negativo";
      err[2] = 1;
    } else {
      document.getElementById("input-3").classList.remove("input-no-valido");
      document.getElementById("input-3").classList.add("input-valido");
      err[2] = 0;
    }
  }

  if (elementoHTML.id == "comision") {
    if (elementoHTML.value === null || elementoHTML.value < 0) {
      document.getElementById("input-4").classList.remove("input-valido");
      document.getElementById("input-4").classList.add("input-no-valido");
      document.getElementById("msj-error-4").innerHTML =
        "*El valor no puede ser nulo o ser negativo";
      err[3] = 1;
    } else {
      document.getElementById("input-4").classList.remove("input-no-valido");
      document.getElementById("input-4").classList.add("input-valido");
      err[3] = 0;
    }
  }

  if (elementoHTML.id == "efectividad") {
    if (
      elementoHTML.value === null ||
      elementoHTML.value < 0 ||
      elementoHTML.value > 1
    ) {
      document.getElementById("input-5").classList.remove("input-valido");
      document.getElementById("input-5").classList.add("input-no-valido");
      document.getElementById("msj-error-5").innerHTML =
        "*Tiene que ingresar un valor entre 0 y 1";
      err[4] = 1;
    } else {
      document.getElementById("input-5").classList.remove("input-no-valido");
      document.getElementById("input-5").classList.add("input-valido");
      err[4] = 0;
    }
  }

  if (elementoHTML.id == "num-de-simulaciones") {
    if (
      elementoHTML.value === null ||
      elementoHTML.value <= 0 ||
      !(elementoHTML.value % 1 === 0)
    ) {
      document.getElementById("input-6").classList.remove("input-valido");
      document.getElementById("input-6").classList.add("input-no-valido");
      document.getElementById("msj-error-6").innerHTML =
        "*El valor debe ser un numero entero mayor a 0";
      err[5] = 1;
    } else {
      document.getElementById("input-6").classList.remove("input-no-valido");
      document.getElementById("input-6").classList.add("input-valido");
      err[5] = 0;
    }
  }
}

function comprobarErrorInput() {
  let i = 0;
  err.forEach((e) => {
    if (e === 0) {
      i++;
    }
  });
  if (i < 6) {
    throw new Error("Error - Revisar que los campos esten correctamente");
  }
}

/**
 * Generacion de la simulacion
 * Esto lo que retorna es la lista de trades
 */

ElmntHTML.botonSimular.addEventListener("click", crearSimulacion);

function crearSimulacion() {
  try {
    comprobarErrorInput();
    document.getElementById("btn-msj-err").innerHTML = "";
  } catch (error) {
    document.getElementById("btn-msj-err").innerHTML = error.message;
    throw new Error();
  }
  const simulacion = new Simulacion();
  const listaTrades = simulacion.listaTrades();
  const simulacionResultados = new SimulacionResultados(listaTrades);

  mostrarResultados(simulacionResultados);
  mostrarTabla(listaTrades);
  /*mostrarGrafico(listaTrades);*/
  mostrarGraficoEfectividad(simulacionResultados);

  console.log(simulacionResultados.esperanzaMatematica());
  console.log(simulacionResultados.gananciaPromedio());
  console.log(simulacionResultados.perdidaPromedio());
}

/*
Mediantes las siguientes funciones mostramos los resultados por pantalla
*/

function mostrarResultados(simulacionResultados) {
  ElmntHTML.numTargets.innerHTML = simulacionResultados.numTargets();
  ElmntHTML.numStopsLoss.innerHTML = simulacionResultados.numStopsLoss();
  ElmntHTML.efectividadSistema.innerHTML = (
    simulacionResultados.efectividad() * 100
  ).toFixed(2);
  ElmntHTML.maxRachaPositiva.innerHTML =
    simulacionResultados.maxRachaPositiva();
  ElmntHTML.maxRachaNegativa.innerHTML =
    simulacionResultados.maxRachaNegativa();
  ElmntHTML.maxDrawdown.innerHTML = formatoMoneda(
    simulacionResultados.maxDrawdown()
  );
  ElmntHTML.totalComisiones.innerHTML = formatoMoneda(
    simulacionResultados.totalComisiones()
  );
  ElmntHTML.totalStopsLoss.innerHTML = formatoMoneda(
    simulacionResultados.montoStopLoss()
  );
  ElmntHTML.totalTakeProfit.innerHTML = formatoMoneda(
    simulacionResultados.montoTakeProfits()
  );
  ElmntHTML.diffTargetStopp.innerHTML = formatoMoneda(
    simulacionResultados.diffTargetStopp()
  );
  ElmntHTML.resultadoFinal.innerHTML = formatoMoneda(
    simulacionResultados.resultadoFinal()
  );
  ElmntHTML.maxDiasEnDrawdown.innerHTML =
    simulacionResultados.maxDiasEnDrawdown();

  /*Con esto comprobamos si el sistema de trading es positivo o negativo y lo mostramos en 
  pantalla */
  if (simulacionResultados.esperanzaMatematica() > 0) {
    ElmntHTML.indicadorResumen.className = "positivo";
    ElmntHTML.indicadorResumen.innerHTML =
      simulacionResultados.comprobarSistemaDeTrading();
  } else {
    ElmntHTML.indicadorResumen.className = "negativo";
    ElmntHTML.indicadorResumen.innerHTML =
      simulacionResultados.comprobarSistemaDeTrading();
  }
}

function mostrarTabla(listaTrades) {
  let html = "";
  for (const trade of listaTrades) {
    if (trade.indicadorDeResultado == "POSITIVO") {
      html += `
    <tr class= 'fila-positiva'>
      <td>${trade.id}</td>
      <td>${formatoMoneda(trade.resultado)}</td>
      <td>${formatoMoneda(trade.comisionPorTrade)}</td>
      <td>${formatoMoneda(trade.subtotal)}</td>
      <td>${formatoMoneda(trade.acumulado)}</td>
      <td>${formatoMoneda(trade.drawdown)}</td>
      <td>${trade.indicadorDeResultado}</td>
    </tr>`;
    } else {
      html += `
      <tr class='fila-negativa'>
        <td>${trade.id}</td>
        <td>${formatoMoneda(trade.resultado)}</td>
        <td>${formatoMoneda(trade.comisionPorTrade)}</td>
        <td>${formatoMoneda(trade.subtotal)}</td>
        <td>${formatoMoneda(trade.acumulado)}</td>
        <td>${formatoMoneda(trade.drawdown)}</td>
        <td>${trade.indicadorDeResultado}</td>
      </tr>`;
    }
  }
  ElmntHTML.cuerpoTabla.innerHTML = html;
}

function formatoMoneda(valor) {
  return valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function mostrarRatio() {
  ElmntHTML.ratioGP.value = `${Math.abs(
    ElmntHTML.montoTakeProfit.value / ElmntHTML.montoStopLoss.value
  ).toFixed(2)} : 1`;
}

/**
 * Logica para mostrar los datos en una grafica
 */

/*function mostrarGrafico(listaTrades){
  const ctx = ElmntHTML.grafico;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}*/

/*GRAFICA DE EFICIENCIA */
var graficoEfectividad = null;
function mostrarGraficoEfectividad(simulacionResultados) {
  const ctx = ElmntHTML.graficoEfectividad;
  const datos = [
    simulacionResultados.efectividad() * 100,
    (1 - simulacionResultados.efectividad()) * 100,
  ];

  if (graficoEfectividad != null) {
    graficoEfectividad.destroy();
  }

  graficoEfectividad = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Positivos", "Negativos"],
      datasets: [
        {
          label: "#",
          data: [55, 45],
          borderWidth: 1,

          backgroundColor: ["#58D68D", "#E74C3C"],
        },
      ],
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  });
}
function mostrarGraficoEfectividadInicio() {
  const ctx = ElmntHTML.graficoEfectividad.getContext("2d");
  const datos = [55, 45];

  if (graficoEfectividad != null) {
    graficoEfectividad.destroy();
  }

  let gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke1.addColorStop(0, "rgba(59, 94, 146 , 1)");
  gradientStroke1.addColorStop(1, "rgba(88, 126, 155 , 1)");

  let gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradientStroke2.addColorStop(0, "rgba(179, 72, 72 , 1)");
  gradientStroke2.addColorStop(1, "rgba(220, 98, 98, 1)");

  graficoEfectividad = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Positivos", "Negativos"],
      datasets: [
        {
          label: "#",
          data: datos,
          borderWidth: 0,
          backgroundColor:[
            gradientStroke1,
            gradientStroke2
        ],
          borderColor: "#1e2128100",
        },
      ],
    },
    options: {
      animation: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  });
}
