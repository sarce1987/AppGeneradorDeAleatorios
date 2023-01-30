class Simulacion{
  listaTrades() {
    let resultado = 0;
    const trades = []; //Lista de trades

    for (let i = 0; i < Config().numTrades; i++) {
      if (Math.random() > Config().efectividad) {
        resultado = Config().montoStopLoss;
      } else {
        resultado = Config().montoTakeProfit;
      }
      trades.push(new Trade(resultado, Config().comisionPorTrade));
    }

    //Generacion de id
    let id = 0
    for (const trade of trades) {
      trade.id = ++id;
    }

    //Generacion del acumulado
    for (let i = 0; i < trades.length; i++) {
      if (i === 0) {
        trades[i].acumulado = trades[0].subtotal;
      } else {
        trades[i].acumulado = trades[i - 1].acumulado + trades[i].subtotal;
      }
    }

    //Generacion del drawdown
    let max = 0;
    let aux = [];

    for (let i = 0; i < trades.length; i++) {
      if (i == 0 && trades[0].resultado >= 0) {
        trades[0].drawdown = 0;
        aux.push(trades[i].acumulado);
      } else if (i == 0 && trades[0].resultado < 0) {
        trades[0].drawdown = trades[0].acumulado;
        aux.push(trades[i].acumulado);
      } else {
        aux.push(trades[i].acumulado);
        max = Math.max(...aux);
        trades[i].drawdown = (trades[i].acumulado - max);
      }
    }
   return trades;
  }
}
