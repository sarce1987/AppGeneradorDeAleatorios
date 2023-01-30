class Trade {

    constructor(resultado , comisionPorTrade ){
        this.id = 0;
        this.resultado = resultado;
        this.comisionPorTrade = comisionPorTrade;
        this.subtotal = resultado - comisionPorTrade;
        this.acumulado = 0 ;
        this.drawdown = 0 ;
        this.indicadorDeResultado = (this.resultado > 0) ? 'POSITIVO' : 'NEGATIVO';
    }


}