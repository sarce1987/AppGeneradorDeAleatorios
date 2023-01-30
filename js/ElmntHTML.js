class ElmntHTML {
  
  //Inputs
  static numTrades = document.getElementById("num-de-trades");
  static montoStopLoss = document.getElementById("monto-stoplost");
  static montoTakeProfit = document.getElementById("monto-take-profit");
  static comisionPorTrade = document.getElementById("comision");
  static ratioGP = document.getElementById("ratio-ganancia-perdida");
  static efectividad = document.getElementById("efectividad");
  static botonSimular = document.getElementById("btn-simular");
  static body = document.getElementsByTagName('body')[0];

//Outputs
  static numTargets = document.getElementById('num-targets');
  static numStopsLoss = document.getElementById('num-stops');
  static efectividadSistema = document.getElementById('efectividad-sistema');
  static maxRachaPositiva = document.getElementById('max-racha-pos');
  static maxRachaNegativa = document.getElementById('max-racha-neg');
  static maxDrawdown = document.getElementById('max-drawdown');
  static totalComisiones = document.getElementById('total-comision');
  static totalStopsLoss = document.getElementById('total-stops');
  static totalTakeProfit = document.getElementById('total-target');
  static diffTargetStopp = document.getElementById('diff-target-stops');
  static resultadoFinal = document.getElementById('resultado-final');
  static indicadorResumen = document.getElementById('indicador-resumen');
  static maxDiasEnDrawdown = document.getElementById('max-dias-drawdown');
  //Tablas
  static cuerpoTabla = document.getElementById('tabla-cuerpo');
  
  //Graficos
  static grafico = document.getElementById('myChart');
  static graficoEfectividad = document.getElementById('efectividadChart')
}
