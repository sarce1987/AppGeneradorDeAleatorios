/**
 * Al arrancar el programa
 */
/*ElmntHTML.body.onload = mostrarGraficoEfectividadInicio;*/

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

/**
 * Generacion de la simulacion
 * Esto lo que retorna es la lista de trades
 */

ElmntHTML.botonSimular.addEventListener("click", crearSimulacion);

//Validamos los datos de entrada
function validar(elementoHTML) {
  if (elementoHTML.id == "num-de-trades") {
    if (elementoHTML.value === null || elementoHTML.value <= 0) {
      document.getElementById("input-1").classList.remove("input-valido");
      document.getElementById("input-1").classList.add("input-no-valido");
      document.getElementById("msj-error-1").innerHTML =
        "El valor no puede ser nulo o estar vacio";
    } else {
      document.getElementById("input-1").classList.remove("input-no-valido");
      document.getElementById("input-1").classList.add("input-valido");
    }
  }

  if (elementoHTML.id == "monto-stoplost") {
    if (elementoHTML.value === null || elementoHTML.value > 0) {
      document.getElementById("input-2").classList.remove("input-valido");
      document.getElementById("input-2").classList.add("input-no-valido");
      document.getElementById("msj-error-2").innerHTML =
        "El valor no puede ser nulo o ser positivo";
    } else {
      document.getElementById("input-2").classList.remove("input-no-valido");
      document.getElementById("input-2").classList.add("input-valido");
    }
  }

  if (elementoHTML.id == "monto-take-profit") {
    if (elementoHTML.value === null || elementoHTML.value < 0) {
      document.getElementById("input-3").classList.remove("input-valido");
      document.getElementById("input-3").classList.add("input-no-valido");
      document.getElementById("msj-error-3").innerHTML =
        "El valor no puede ser nulo o ser negativo";
    } else {
      document.getElementById("input-3").classList.remove("input-no-valido");
      document.getElementById("input-3").classList.add("input-valido");
    }
  }

  if (elementoHTML.id == "comision") {
    if (elementoHTML.value === null || elementoHTML.value < 0) {
      document.getElementById("input-4").classList.remove("input-valido");
      document.getElementById("input-4").classList.add("input-no-valido");
      document.getElementById("msj-error-4").innerHTML =
        "El valor no puede ser nulo o ser negativo";
    } else {
      document.getElementById("input-4").classList.remove("input-no-valido");
      document.getElementById("input-4").classList.add("input-valido");
    }
  }

  if (elementoHTML.id == "efectividad") {
    if (elementoHTML.value === null || elementoHTML.value < 0 || elementoHTML.value > 1) {
      document.getElementById("input-5").classList.remove("input-valido");
      document.getElementById("input-5").classList.add("input-no-valido");
      document.getElementById("msj-error-5").innerHTML =
      "Tiene que ingresar un valor entre 0 y 1";
    } else {
      document.getElementById("input-5").classList.remove("input-no-valido");
      document.getElementById("input-5").classList.add("input-valido");
    }
  }

  if (elementoHTML.id == "num-de-simulaciones") {
    if (elementoHTML.value === null || elementoHTML.value <= 0 || !(elementoHTML.value % 1 === 0)) {
      document.getElementById("input-6").classList.remove("input-valido");
      document.getElementById("input-6").classList.add("input-no-valido");
      document.getElementById("msj-error-6").innerHTML =
      "El valor debe ser un numero entero mayor a 0";
    } else {
      document.getElementById("input-6").classList.remove("input-no-valido");
      document.getElementById("input-6").classList.add("input-valido");
    }
  }
  /*

  }
  if (ElmntHTML.montoTakeProfit.value === null || ElmntHTML.montoTakeProfit.value < 0) {
    
    throw new Error("El valor no puede ser nulo o ser negativo");
  }
  if (ElmntHTML.comisionPorTrade.value === null || ElmntHTML.comisionPorTrade.value < 0) {
    
    throw new Error("El valor no puede ser nulo o ser negativo");
  }
  if (ElmntHTML.comisionPorTrade.value === null || ElmntHTML.comisionPorTrade.value > 1) {
   
    throw new Error("Tiene que ingresar un valor entre 0 y 1");
  }
  
*/
}

function crearSimulacion() {
  
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
  ElmntHTML.ratioGP.value = Math.abs(
    ElmntHTML.montoTakeProfit.value / ElmntHTML.montoStopLoss.value
  );
  console.log('se esta ejecutando esto');
}

/*
ElmntHTML.montoTakeProfit.onchange = mostrarRatio;
ElmntHTML.montoStopLoss.onchange = mostrarRatio;
*/
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
var graficoEficiencia = null;
function mostrarGraficoEfectividad(simulacionResultados) {
  const ctx = ElmntHTML.graficoEfectividad;
  const datos = [
    simulacionResultados.efectividad() * 100,
    (1 - simulacionResultados.efectividad()) * 100,
  ];

  if (graficoEficiencia != null) {
    graficoEficiencia.destroy();
  }

  graficoEficiencia = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Positivos", "Negativos"],
      datasets: [
        {
          label: "#",
          data: datos,
          borderWidth: 1,
          backgroundColor: ["#58D68D", "#E74C3C"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
function mostrarGraficoEfectividadInicio() {
  const ctx = ElmntHTML.graficoEfectividad;
  const datos = [0, 100];

  if (graficoEficiencia != null) {
    graficoEficiencia.destroy();
  }

  graficoEficiencia = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Positivos", "Negativos"],
      datasets: [
        {
          label: "#",
          data: datos,
          borderWidth: 1,
          backgroundColor: ["#58D68D", "#E74C3C"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
