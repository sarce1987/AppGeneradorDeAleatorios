class SimulacionResultados {
  constructor(listTrades) {
    this.listTrades = listTrades;
  }
  /*
   * Este metodo determina cuantos trades fueron positivos
   */
  numTargets() {
    let numTargets = 0;
    for (const trade of this.listTrades) {
      if (trade.resultado > 0) {
        numTargets++;
      }
    }
    return numTargets;
  }

  /*
   * Este metodo determina cuantos trades fueron negaticos
   */
  numStopsLoss() {
    let numStopLoss = 0;
    for (const trade of this.listTrades) {
      if (trade.resultado < 0) {
        numStopLoss++;
      }
    }
    return numStopLoss;
  }

  /**
   * Este metodo destermina la efectividad del sistema
   */
  efectividad() {
    return this.numTargets() / this.listTrades.length;
  }

  /**
   * Este metodo destermina la max Racha positiva del sistema
   */
  maxRachaPositiva() {
    let racha = 0;
    let maxRachaPositiva = 0;
    for (const trade of this.listTrades) {
      if (trade.resultado > 0) {
        racha++;
      } else {
        racha = 0;
      }
      maxRachaPositiva = Math.max(maxRachaPositiva, racha);
    }
    return maxRachaPositiva;
  }

  /**
   * Este metodo destermina la max Racha negativa del sistema
   */
  maxRachaNegativa() {
    let racha = 0;
    let maxRachaNegativa = 0;
    for (const trade of this.listTrades) {
      if (trade.resultado < 0) {
        racha++;
      } else {
        racha = 0;
      }
      maxRachaNegativa = Math.max(maxRachaNegativa, racha);
    }
    return maxRachaNegativa;
  }

  /**
   * Este metodo determina el maximo drawdown en valores monetarios
   */

  maxDrawdown(){
    let aux = [];
    for (const trade of this.listTrades) {
      aux.push(trade.drawdown)
    }
    return Math.min(...aux);
  }

  /**
   * Este metodo suma el total de las comisiones del sistema
   */
  totalComisiones(){
    let comisiones = 0;
    for (const trade of this.listTrades) {  
        comisiones += trade.comisionPorTrade;
    }
    return comisiones;
  }

  /**
   * Este metodo suma el total de los resultados negativos
   */
  montoStopLoss(){
    let montoStopLoss = 0;
    for (const trade of this.listTrades) {
        if (trade.resultado < 0) {
            montoStopLoss += trade.resultado;
        }
    }
    return montoStopLoss;
  }

  /**
   * Este metodo suma el total de los resultados positivos
   */
  montoTakeProfits(){
    let montoTakeProfit = 0;
    for (const trade of this.listTrades) {
        if (trade.resultado > 0) {
            montoTakeProfit += trade.resultado;
        }
    }
    return montoTakeProfit;
  }

  /**
   * Este metodo obtiene la diferencia entre el total de takeProfit y el
   * total de los stop loss
   */  
  diffTargetStopp(){
    return this.montoTakeProfits() + this.montoStopLoss();
  }

  /**
   * Con este metodo obtenemos el total de ganancias o perdidas o sea 
   * el resultado final
   */  
  resultadoFinal(){
    return this.diffTargetStopp() - this.totalComisiones();
  }

  /**
   * Calculo de la esperanza matematica del sistema
   * La esperanza matemática se define como 
   * (Porcentaje de operaciones ganadoras * Ganancia Promedio) – (Probabilidad de operaciones perdedoras * Pérdida Promedio).
   */
  gananciaPromedio(){
    let gananciaPromedio = 0;
    for (const trade of this.listTrades) {
      if(trade.indicadorDeResultado == 'POSITIVO'){
        gananciaPromedio = trade.subtotal;
        break;
      }
    }
    return gananciaPromedio;

  }

  perdidaPromedio(){
    let perdidaPromedio = 0;
    for (const trade of this.listTrades) {
      if(trade.indicadorDeResultado == 'NEGATIVO'){
        perdidaPromedio = trade.subtotal;
        break;
      }
    }
    return perdidaPromedio;
  }

  esperanzaMatematica(){
    let esperanzaMatematica = (this.efectividad()* this.gananciaPromedio())+((1-this.efectividad())*this.perdidaPromedio());
    return esperanzaMatematica;
  }

  comprobarSistemaDeTrading(){
    if (this.esperanzaMatematica() > 0) {
      return 'SISTEMA DE TRADING RENTABLE'
    }else{
      return 'SISMETA DE TRADING NO RENTABLE'
    }
  }

  maxDiasEnDrawdown(){
    let racha = 0;
    let maxDiasEnDrawdown = 0;
    for (const trade of this.listTrades) {
      if (trade.drawdown < 0) {
        racha++;
      } else {
        racha = 0;
      }
      maxDiasEnDrawdown = Math.max(maxDiasEnDrawdown, racha);
    }
    return maxDiasEnDrawdown;
  }

}
