/**Ocultar listado de simulacion al cargar la pagina y mostrarlo despues de apretar el boton simular */
ElmntHTML.body.onload = () =>{
  document.getElementsByClassName('seccion-lista-simulaciones')[0].style.display = 'none';
}
function cargarListadoSimulacion(){
  document.getElementsByClassName('seccion-lista-simulaciones')[0].style.display = 'block';
}



function Config() {
  return {
    numTrades: Number(ElmntHTML.numTrades.value),
    montoStopLoss: parseFloat(ElmntHTML.montoStopLoss.value),
    montoTakeProfit: parseFloat(ElmntHTML.montoTakeProfit.value),
    comisionPorTrade: parseFloat(ElmntHTML.comisionPorTrade.value),
    ratioGP: parseFloat(this.montoTakeProfit / this.montoStopLoss),
    efectividad: parseFloat(ElmntHTML.efectividad.value),
    numDeSimulaciones: Number(ElmntHTML.numDeSimulaciones.value),
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

/**
 * Esta funcion se fija si todos los campos de input son validos
 */
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

  //Creamos un arreglo de simulacionesResultados a partir de ese podemos sacar todos los datos
  const simulacionesResultados = [];
  const simulacion = new Simulacion();
  for (let i = 0; i < Config().numDeSimulaciones; i++) {
    simulacionesResultados.push(
      new SimulacionResultados(simulacion.listaTrades())
    );
  }
  mostrarDatosSeccionListaSimulaciones(simulacionesResultados);
  crearGraficosEfectividad(simulacionesResultados);
  crearGraficosAcumulado(simulacionesResultados);
  comprobarSistema(simulacionesResultados);
  cargarListadoSimulacion();
}

/*CREAMOS COMO SE MUESTRAN LOS DATOS CON CODIGO HTML PARA PODER REPETIR */
function mostrarDatosSeccionListaSimulaciones(simulacionesResultados) {
  let codigoHTML = "";
  let i = 0;
  for (const result of simulacionesResultados) {
    codigoHTML += `<div class="contenedor">
    <div class="contenedor-titulo">
      <h2>SIMULACION <span>n°${++i}</span></h2>
    </div>
    <div class="contenedor-info">
      <!--CONTENEDOR DE ESTADISTICAS-->
      <div class="contenedor contenedor-estadisticas">
        <div class="contenedor-titulo"><h2>Estadisticas</h2></div>
        <div class="contenedor-info">
  
          <table class="contenido-tabla">
            <thead id="tabla-encabezado">
              <tr>
                <th>n°targets</th>
                <th>n°stops</th>
              </tr>
            </thead>
            <tbody id="tabla-cuerpo"></tbody>
            <tr>
              <td id="val-1">${result.numTargets()}</td>
              <td id="val-2">${result.numStopsLoss()}</td>
            </tr>
           
          </table>
         
          <div class="contenedor-grafica-efectividad">
            <div class="centro-grafico">
              <div id="centro-efectividad">${formatoPorcentaje(
                result.efectividad()
              )}</div>
              <div id="centro-ratio">${Math.abs(
                ElmntHTML.montoTakeProfit.value / ElmntHTML.montoStopLoss.value
              ).toFixed(2)} : 1</div>
            </div>
            
            <div><canvas id="efectividadChart-${i}" ></canvas></div>
          </div>
          <div class="esperanza-mat">Esperanza matematica: <span id="esperanza-matematica">${result
            .esperanzaMatematica()
            .toFixed(2)}</span></div>
        </div>
        <div id="contenedor-resultado-simulacion-${i}">${result.comprobarSistemaDeTrading()}</div>
      </div>
      <!--CONTENEDOR DE RACHAS Y DRAWDOWN-->
      <div class="contenedor-rachas-drawdown">
        <div class="contenedor contenedor-rachas">
          <div class="contenedor-titulo"><h2>RACHAS</h2></div>
          <div class="contenedor-info">
            <table class="tabla-simple">
              <tr>
                <th>racha positiva</th>
                <td class="fila-positiva">${result.maxRachaPositiva()}</td>
              </tr>
              <tr>
                <th>racha negativa</th>
                <td class="fila-negativa">${result.maxRachaNegativa()}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="contenedor contenedor-drawdown">
          <div class="contenedor-titulo"><h2>DRAWDOWN</h2></div>
          <div class="contenedor-info">
            <table class="tabla-simple">
              <tr>
                <th>maximo drawdown</th>
                <td class="fila-negativa">${formatoMoneda(
                  result.maxDrawdown()
                )}</td>
              </tr>
              <tr>
                <th>max dias en drawdown</th>
                <td class="fila-negativa">${
                  result.maxDiasEnDrawdown() + " dias"
                }</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!--CONTENEDOR MONETARIO-->
      <div class="contenedor contenedor-monetario">
        <div class="contenedor-titulo"><h2>Monetario</h2></div>
        <div class="contenedor-info">
          <div class="contenedor-info-totales">
            <div class="contenedor-totales">
              <output id="total-targets">${formatoMoneda(
                result.montoTakeProfits()
              )}</output>
              <label>target</label>
            </div>
            <div class="contenedor-totales">
              <output id="total-stops">${formatoMoneda(
                result.montoStopLoss()
              )}</output>
              <label>stop</label>
            </div>
            <div class="contenedor-totales">
              <output id="diff-target-stops">${formatoMoneda(
                result.diffTargetStopp()
              )}</output>
              <label>subtotal</label>
            </div>
            <div class="contenedor-totales">
              <output id="total-comision">${formatoMoneda(
                result.totalComisiones()
              )}</output>
              <label>comisiones</label>
            </div>
          </div>
          <div class="contenedor-info-resultado-final">
            <div class="contenedor-totales">
              <output id="resultado-final-${i}">${formatoMoneda(
      result.resultadoFinal()
    )}</output>
              <label>monto final</label>
            </div>
          </div>
          
        </div>
      </div>
      <!--CONTENEDOR GRAFICA DE ACUMULADO-->
      <div class="contenedor contenedor-acumulado">
        <div class="contenedor-titulo"><h2>Acumulado</h2></div>
        <div class="contenedor-info">
          <canvas id="acumuladoChart-${i}"></canvas>
        </div>
      </div>
      <!--CONTENEDOR DE TABLA -->
      <div class="contenedor contenedor-tabla">
        <div class="contenedor-titulo"><h2>Tabla</h2></div>
        <div class="contenedor-info">
          <table id="tabla-operaciones-${i}" class="contenido-tabla tabla-retraida">
            <thead id="tabla-encabezado">
              <tr>
                <th>ID</th>
                <th>RESULTADO</th>
                <th>COMISION</th>
                <th>SUBTOTAL</th>
                <th>ACUMULADO</th>
                <th>DRAWDOWN</th>
                <th>+ / -</th>
              </tr>
            </thead>
              
            <tbody id="tabla-cuerpo">
              ${mostrarTabla(result.listTrades)}
            </tbody>
          </table>
          <button id="show-less-more-${i}" class="btn-ampliar" onclick="ocultarMostrarTabla(${i})">+</button>
        </div>
      </div>
    </div>
  </div>`;
  }
  document.getElementsByClassName("seccion-lista-simulaciones")[0].innerHTML =
    codigoHTML;
}

/*
Generacion de tablas html mediante un listado de trades
*/

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
  return html;
}

/**
 * Funciones para formatear los valores
 */

function formatoMoneda(valor) {
  return valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatoPorcentaje(valor) {
  return valor.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
}

/**
 * Ratio para el output dentro del listado de inputs
 */
function mostrarRatio() {
  ElmntHTML.ratioGP.value = `${Math.abs(
    ElmntHTML.montoTakeProfit.value / ElmntHTML.montoStopLoss.value
  ).toFixed(2)} : 1`;
}

/**
 * Esta funcion comprueba si el sistema de trading es rentable o no.
 * Determina si la esperanza matematica del sistema es positiva y en vase a eso
 * cambia las clases 
 */
function comprobarSistema(simulacionesResultados) {
  simulacionesResultados.forEach((simulacionResultado, i) => {
    if (simulacionResultado.esperanzaMatematica() > 0) {
      document.getElementById(`contenedor-resultado-simulacion-${i + 1}`).className = "contenedor-resultado-simulacion-positivo";
      document.getElementById(`resultado-final-${i + 1}`).className ="resultado-final-positivo";
    } 
    else {
      document.getElementById(`contenedor-resultado-simulacion-${i + 1}`).className = "contenedor-resultado-simulacion-negativo";
      document.getElementById(`resultado-final-${i + 1}`).className ="resultado-final-negativo";
    }
  });
}

/**
 * Logica para mostrar los datos en una grafica
 */

function crearGraficosAcumulado(simulacionesResultados) {
  const chartsAcumulado = [];
  i = 0;
  for (let simulacionResultado of simulacionesResultados) {
    let ctx = document.getElementById(`acumuladoChart-${++i}`).getContext("2d");
    let data1 = simulacionResultado.listTrades.map((trade) => trade.acumulado);
    let data2 = simulacionResultado.listTrades.map((trade) => trade.drawdown);
    let labels = simulacionResultado.listTrades.map((trade) => trade.id);
    grafico = new Chart(ctx, {
      data: {
        datasets: [
          {
            type: "line",
            label: "Trades",
            data: data1,
          },
          {
            type: "line",
            label: "Drawdown",
            data: data2,
            fill: true,
          },
        ],
        labels: labels,
      },
      options: {
        animation: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    chartsAcumulado.push(grafico);
  }
  return chartsAcumulado;
}

/*GRAFICA DE EFICIENCIA */

function crearGraficosEfectividad(simulacionesResultados) {
  const chartsEfectividad = [];
  let i = 0;

  for (let simulacionResultado of simulacionesResultados) {
    let ctx = document
      .getElementById(`efectividadChart-${++i}`)
      .getContext("2d");
    let datos = [
      simulacionResultado.efectividad() * 100,
      (1 - simulacionResultado.efectividad()) * 100,
    ];

    //Esto para dar color gradiente a los valores
    let gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke1.addColorStop(0, "rgba(59, 94, 146 , 1)");
    gradientStroke1.addColorStop(1, "rgba(88, 126, 155 , 1)");

    let gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke2.addColorStop(0, "rgba(179, 72, 72 , 1)");
    gradientStroke2.addColorStop(1, "rgba(220, 98, 98, 1)");

    grafico = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Positivos", "Negativos"],
        datasets: [
          {
            label: "#",
            data: datos,
            backgroundColor: [gradientStroke1, gradientStroke2],
            borderWidth: 0,
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

    chartsEfectividad.push(grafico);
  }

  return chartsEfectividad;
}

/*Boton de la tabla */


function ocultarMostrarTabla(i) {
  btn = document.getElementById(`show-less-more-${i}`);
  elmnt = document.getElementById(`tabla-operaciones-${i}`);
  if (elmnt.classList.contains("tabla-retraida")) {
    elmnt.classList.remove("tabla-retraida");
    btn.innerHTML = "-";
    tableElement = document.activeElement; //Guarda la posicion en la pagina
  } else {
    elmnt.classList.add("tabla-retraida");
    btn.innerHTML = "+";
    tableElement.scrollIntoView(); // Vamos a la posicion en la pagina
  }
}
