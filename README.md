# AppGeneradorDeAleatorios
## Conceptos

Cuando se analiza una estrategia de trading, se debe tener en cuenta la aleatoriedad de las operaciones. Por ejemplo, un sistema de trading que tiene una efectividad del 60% quiere decir que del total de, por ejemplo, 100 operaciones, 60 van a ser positivas y 40 negativas, pero estas operaciones van apareciendo en secuencias desordenadas, es decir que no aparecen todas las negativas juntas y luego todas las positivas juntas. 

Esta aleatoriedad en los mercados hace que en el sistema aparezcan rachas perdedoras y rachas ganadoras (secuencia seguida de operaciones negativas o positivas).
Esas rachas suelen producir efectos psicológicos fuertes en los traders que lo pueden llevar a tomar malas decisiones saliéndose de sus planes de trading. Por ejemplo, ante una racha negativa el trader puede empezar a dudar sobre su sistema y cerrar sus operaciones antes de llegar a sus objetivos, o incluso reducir los rangos de stops por miedo a que el mercado se devuelva en su contra cuando la operación iba a su favor, ahogando el trade y produciendo un cierre prematuro de la operación alterando la probabilidad del sistema. Por ejemplo, ante una racha positiva, el trader puede sentir demasiada confianza, pensando que su sistema es extremadamente rentable, llevando a sobre operaciones o estirando los take profit alterando totalmente las probabilidades del sistema.

Otro de los aspectos que un trader debe tener en cuenta a la hora de analizar su sistema, es el drawdown. Esto determina un periodo en el cual el trader no genera nuevas
ganancias. Este periodo puede llegar a ser bastante extenso y debe conocerse su existencia para no entrar en desesperación y mantener la calma a la hora de seguir operando día a día.

Por lo tanto, rachas perdedoras grandes o periodos de drawdown extensos no significan que el sistema sea perdedor.

## ¿Para qué sirve esta herramienta?
Es una herramienta diseñada para que los traders de futuros que realizan scalping puedan simular diferentes escenarios de su sistema de trading y así poder compáralos para determinar si es rentable o no en el largo plazo.

Todo trader debe tener un sistema de trading testeado a través de un backtesting, donde va a obtener, n° de operaciones que realizo, monto de stop loss promedio,  monto de take profit promedio,  ratio ganancia/perdida, comisiones pagadas por operación y  efectividad de su sistema; determinando si el sistema presenta o no una esperanza matemática positiva.

Todos esos datos anteriormente mencionados, son los que la herramienta les va a solicitar para poder generar las simulaciones.

![](https://github.com/sarce1987/AppGeneradorDeAleatorios/blob/master/Inputs.png)

Al apretar el botón simular, y si los datos han sido ingresados correctamente, se va a mostrar las simulaciones mostrando todos los datos relevantes para su análisis y comparación de los escenarios posibles.


![](https://github.com/sarce1987/AppGeneradorDeAleatorios/blob/master/generador%20de%20aleatorios.png)

### Apartado Estadística 

En este apartado encontraremos el total de operaciones positivas y negativas, la efectividad el sistema con el ratio ganancia/perdida utilizado para la estrategia, la esperanza matemática y un indicador para señalar si el sistema es rentable o no en la cantidad de operaciones seleccionadas.

### Apartado Rachas y drawdown 

En estos apartados encontraremos las rachas positivas y negativas máximas que desarrollaron en el sistema y también el máximo drawdon en términos monetarios y el periodo máximo de drawdown en el cual no se han generado nuevas ganancias.

### Apartado acumulado

En este apartado, de manera gráfica, podemos ver como se han ido desarrollando las operaciones y con el grafico de áreas se puede ver en qué momentos el sistema entró en un periodo de drawdown. Cuando esta gráfica toca el punto 0 quiere decir que se ha salido del drawdown y se empezaron a generar nuevas ganancias.

### Apartado monetario

Indica el total en términos monetarios. Cuanto se generó en el total de operaciones positivas, cuanto se perdió en operaciones negativas, la diferencia entre estos dos montos, cuanto se pagó en comisiones y el resultado final monetario que generaría este sistema.

### Apartado tabla

En este apartado se puede apreciar una tabla con el detalle de cada operación. Esta tabla muestra solo las 4 primeras operaciones, pero puede desplegarse para ver la totalidad de las operaciones.


[Abrir App](https://sarce1987.github.io/AppGeneradorDeAleatorios/)

