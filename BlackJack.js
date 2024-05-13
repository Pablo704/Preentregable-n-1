// Baraja de cartas
const suits = ["corazon", "pica", "diamante", "trebol"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function crearBaraja() {
    const baraja = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            baraja.push({ rank, suit });
        }
    }
    return baraja;
}

// Mezclar la baraja
function mezclarBaraja(baraja) {
    for (let i = baraja.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * baraja.length);
        [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
    }
}

// Repartir una carta
function repartirCarta(baraja) {
    return baraja.pop();
}

// Calcular el valor de una mano
function calcularValorMano(mano) {
    let valor = 0;
    let tieneAs = false;

    for (let carta of mano) {
        if (carta.rank === "A") {
            tieneAs = true;
        }
        const valorCarta = obtenerValorCarta(carta.rank);
        console.log(`Carta: ${carta.rank} de ${carta.suit}, Valor: ${valorCarta}`);
        valor += valorCarta;
    }

    if (tieneAs && valor + 10 <= 21) {
        valor += 10;
    }

    console.log(`Valor total de la mano: ${valor}`);
    return valor;
}


// Obtener el valor de una carta
function obtenerValorCarta(rank) {
    if (rank === "A") return 1;
    if (rank === "J" || rank === "Q" || rank === "K") return 10;
    return parseInt(rank);
}

// Juego principal
function jugarBlackjack() {
    const baraja = crearBaraja();
    mezclarBaraja(baraja);

    const jugador = [];
    const casa = [];

    // Repartir 2 cartas a cada jugador
    jugador.push(repartirCarta(baraja));
    casa.push(repartirCarta(baraja));


   
    console.log("Carta de la casa:", casa);
    console.log("Tus cartas:", jugador[0]);
    

    // Turno del jugador
    while (calcularValorMano(jugador) < 21) {
        let opcion;
        do {
            opcion = prompt("¿Quieres otra carta? (s/n)").toLowerCase();
        } while (opcion !== "s" && opcion !== "n");

        if (opcion === "s") {
            jugador.push(repartirCarta(baraja));
            console.log("Tus cartas:", jugador[jugador.length - 1]);
        } else {
            break;
        }
    }

    // Turno de la casa
    while (calcularValorMano(casa) <= 17) {
        casa.push(repartirCarta(baraja));
    }

    console.log("Cartas de la casa:", casa);

    // Determinar ganador
    const valorJugador = calcularValorMano(jugador);
    const valorCasa = calcularValorMano(casa);

    if ((valorJugador > 21 && valorCasa > 21) || (valorJugador === valorCasa)) {
        console.log("Empate.");
    } else if (valorJugador <= 21 && (valorCasa > 21 || (21 - valorJugador < 21 - valorCasa))) {
        console.log("¡Ganas tú!");
    } else {
        console.log("¡Gana la casa!");
    }
}    

// Iniciar el juego
jugarBlackjack();
