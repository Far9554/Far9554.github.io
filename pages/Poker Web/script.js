// ---- BOTONES DE PARTIDA ---- //
var btSeguir = document.getElementById("Seguir");
var btApuesta = document.getElementById("Subir");
var btIgualar = document.getElementById("Igualar");
var btTodo = document.getElementById("Todo");
var btAbandonar = document.getElementById("Abandonar");

var PriceParent = document.getElementById("AñadirDinero");
var Price1 = document.getElementById("1P");
var Price2 = document.getElementById("2P");
var Price3 = document.getElementById("3P");
var Price4 = document.getElementById("4P");
var Price5 = document.getElementById("5P");
var Price6 = document.getElementById("6P");

// ---- CONFIGURACIONES GENERALES DE PARTIDA ---- //
let startMoney = 1000;
let llJugadores = [];
let Mesero = [];
let BarajaPrincipal;

let IdCartas = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let Colores = [];

// ---- ESTADO DE PARTIDA ---- //
let dineroTotal = 0;
let dineroEnRonda = 0;
let dineroParaContinuar = 0;

let turnoJugador = 0;

var QttJugadoresActivos = 1;

window.onload = function() {
    BarajaPrincipal = new Baraja();
    BarajaPrincipal.GenerarBarajaNueva();
    BarajaPrincipal.BarajarBaraja();

    AddCartaMesero();
    AddCartaMesero();
    AddCartaMesero();

    AddPlayer();
    AddPlayer();
    AddPlayer();
    AddPlayer();

    SiguienteMovimiento();
};

function AddCartaMesero() {
    let template = document.getElementById("CartaMesero");

    let c = BarajaPrincipal.Robar()
    Mesero.push(c);

    let content = template.content;
    content.querySelector(".Carta").src = "./img/Cartas/" + (c.numero-1) + c.color + ".png";

    let row = template.content.cloneNode(true);
    document.getElementById("Mesero").appendChild(row);
}

function AddPlayer() {
    let template = document.getElementById("player-template");  

    let newPlayer = new Jugador(QttJugadoresActivos, startMoney); 
    llJugadores.push(newPlayer);
    
    let content = template.content;
    content.querySelector('div').setAttribute("id", "Jugador" + QttJugadoresActivos);
    content.querySelector(".Nombre").textContent = "Jugador " + QttJugadoresActivos;
    content.querySelector(".Dinero").textContent = startMoney + "$";
    content.querySelector(".Carta1").src = "./img/Cartas/" + (newPlayer.carta1.numero-1) + (newPlayer.carta1.color) + ".png";
    content.querySelector(".Carta2").src = "./img/Cartas/" + (newPlayer.carta2.numero-1) + (newPlayer.carta2.color) + ".png";
    
    let row = template.content.cloneNode(true);
    document.getElementById("MesaJugadores").appendChild(row);    

    QttJugadoresActivos++;
}

function SiguienteMovimiento() {
    if(turnoJugador >= llJugadores.length)
        SiguienteRonda();
    TurnoPlayer();
}

function TurnoPlayer() {
    if (!llJugadores[turnoJugador].abandono && !llJugadores[turnoJugador].eliminado && !llJugadores[turnoJugador].allIn)
    {
        DibujarInteraccionesJugador(llJugadores[turnoJugador]);
    }
}

function SiguienteRonda() {
    AddCartaMesero();
    turnoJugador=0;
    dineroTotal += dineroEnRonda;
    dineroEnRonda = 0;
    dineroParaContinuar = 0;

    document.getElementById("DineroR").textContent = "Dinero en ronda: " + dineroEnRonda;
    document.getElementById("DineroT").textContent = "Dinero en juego: " + dineroTotal;

    llJugadores.forEach(j => {
        j.dineroApostado = 0;
        UpdateJugador(j);
    });
}

function DibujarInteraccionesJugador(jugador) {
    var divJugador = document.getElementById("Jugador" + jugador.name);

    divJugador.classList.add("Turno");
    //-- SEGUIR --//
    btSeguir.onclick = function() { DetectarInterracionJugador(jugador, 0); };
    if(jugador.dineroApostado < dineroParaContinuar)
        btSeguir.setAttribute("disabled", true);
    else
        btSeguir.removeAttribute("disabled");

    //-- SUBIR --//
    btApuesta.onclick = function() { DetectarInterracionJugador(jugador, 1); };
    if (jugador.money == 0)
        btApuesta.setAttribute("disabled", true);    
    else
        btApuesta.removeAttribute("disabled");

    //-- IGUALAR --//
    btIgualar.onclick = function() { DetectarInterracionJugador(jugador, 2); };
    if (jugador.dineroApostado >= dineroParaContinuar || jugador.Money < dineroParaContinuar - jugador.dineroApostado)
        btIgualar.setAttribute("disabled", true); 
    else
        btIgualar.removeAttribute("disabled");

    //-- TODO A UNO --//
    btTodo.onclick = function() { DetectarInterracionJugador(jugador, 3); };
    if (jugador.allIn)
        btTodo.setAttribute("disabled", true);
    else
        btTodo.removeAttribute("disabled");
}

function DetectarInterracionJugador(jugador, option) {
    switch(option) {
        case 0:
            PasarTurno(jugador);
            break;
        case 1:
            DibujarMeterDinero(jugador);
            break;
        case 2:
            DetectarMeterDinero(jugador, dineroParaContinuar/5); 
            break;
        case 3:
            alert(jugador.name + " Todo a Uno"); break;    
    }
}

function PasarTurno(jugador) {
    turnoJugador++;
    SiguienteMovimiento(); 
            
    var divJugador = document.getElementById("Jugador" + jugador.name);
    divJugador.classList.remove("Turno");
}

function DibujarMeterDinero(jugador) {
    PriceParent.style.visibility = "visible";

    Price1.onclick = function() { DetectarMeterDinero(jugador, 1); };
    if (dineroParaContinuar > 5 ) Price1.setAttribute("disabled", true);
    Price2.onclick = function() { DetectarMeterDinero(jugador, 2); };
    if (dineroParaContinuar > 10 ) Price2.setAttribute("disabled", true);
    Price3.onclick = function() { DetectarMeterDinero(jugador, 3); };
    if (dineroParaContinuar > 15 ) Price3.setAttribute("disabled", true);
    Price4.onclick = function() { DetectarMeterDinero(jugador, 4); };
    if (dineroParaContinuar > 20 ) Price4.setAttribute("disabled", true);
    Price5.onclick = function() { DetectarMeterDinero(jugador, 5); };
    if (dineroParaContinuar > 25 ) Price5.setAttribute("disabled", true);
    Price6.onclick = function() { DetectarMeterDinero(jugador, 6); };
    if (dineroParaContinuar > 30 ) Price6.setAttribute("disabled", true);
}

function DetectarMeterDinero(jugador, option) {
    SacarDineroJugador(jugador, 5 * option);
    PriceParent.style.visibility = "hidden";

    UpdateJugador(jugador);
    PasarTurno(jugador);
}

function SacarDineroJugador(jugador, count) {
    jugador.money -= count 
    jugador.dineroApostado += count;
    if (count > dineroParaContinuar)       
        dineroParaContinuar = count;
    dineroEnRonda += count;
}

function UpdateJugador(jugador) {
    var divJugador = document.getElementById("Jugador" + jugador.name);

    document.getElementById("DineroR").textContent = "Dinero en ronda: " + dineroParaContinuar;
    divJugador.querySelector(".Dinero").textContent = jugador.money + "$";
    divJugador.querySelector(".DineroApostado").textContent = jugador.dineroApostado + "$";
}

class Jugador {
    constructor(name, money) {
        this.name = name
        this.money = money
        this.dineroApostado = 0;
        this.abandono = false;
        this.subido = false;
        this.allIn = false;
        this.eliminado = false;
        this.carta1 = BarajaPrincipal.Robar();
        this.carta2 = BarajaPrincipal.Robar();
    }
}

class Carta {
    constructor(numero, color) {
        this.numero = numero;
        this.color = color;
    }
}

class Baraja {
    constructor() {
        this.llCartas = [];
    }

    GenerarBarajaNueva() {
        this.llCartas = [];
        for (let s = 0; s < 4; s++) {
            for (let n = 1; n <= 13; n++) {
                this.llCartas.push(new Carta(n, s));
            }
        }
    }

    BarajarBaraja()
    {
        let n = this.llCartas.length;

        while (n > 1)
        {
            n--;
            let k = Math.floor(Math.random() * n);
            let value = this.llCartas[k];
            this.llCartas[k] = this.llCartas[n];
            this.llCartas[n] = value;
        }
    }

    Robar()
    {
        let c = new Carta(this.llCartas[0].numero, this.llCartas[0].color);
        this.llCartas.shift();

        return c;
    }
}

//---------------------------//
// -- COMPROBACION CARTAS -- //
//---------------------------//
function OrdenarCartas(cartas)
{
    let tmp;

    for (let i = 0; i < 7; i++)
    {
        for (let j = 0; j < 7 - 1; j++)
        {
            if (cartas[j].Numero > cartas[j + 1].Numero)
            {
                tmp = cartas[j];
                cartas[j] = cartas[j + 1];
                cartas[j + 1] = tmp;
            }
        }
    }
}

function DarCartaAlta(cartas)
{
    let nAlto = 0;
    for (let s = 0; s < cartas.Length; s++)
    {
        if (cartas[s].Numero == 1)
            return 100;
        else if (cartas[s].Numero > nAlto)
            nAlto = cartas[s].Numero;
    }

    return nAlto;
}

function ComprobarPareja(cartas)
{
    for (let s = 1; s < cartas.Length; s++)
    {
        if (cartas[s].Numero == cartas[s - 1].Numero)
            return true;
    }

    return false;
}

function ComprobarDoblePareja(cartas)
{
    let Pareja1 = 0;

    for (let s = 1; s < cartas.Length; s++)
    {
        if (cartas[s].Numero == cartas[s - 1].Numero)
            Pareja1= cartas[s].Numero;
    }

    if(Pareja1 != 0 )
    {
        for (let s = 1; s < cartas.Length; s++)
        {
            if (cartas[s].Numero == cartas[s - 1].Numero && cartas[s].Numero != Pareja1)
                return true;
        }
    }

    return false;
}

function ComprobarTrio(cartas)
{
    for (let s = 2; s < cartas.Length; s++)
    {
        let num = cartas[s].Numero;
        if (num == cartas[s - 1].Numero && num == cartas[s - 2].Numero)
            return true;
    }

    return false;
}

function ComprobarEscaleras(cartas)
{
    let count = 0;

    for (let s = 1; s < cartas.Length; s++)
    {
        let num = cartas[s].Numero;
        if (num == cartas[s - 1].Numero + 1)
            count++;
        else
            count=0;

        if (count >= 4)
            return true;
    }

    return false;
}

function ComprobarColor(cartas)
{
    for (let i = 0; i < 4; i++)
    {
        let count = 0;

        for (let s = 0; s < cartas.Length; s++)
        {
            if (cartas[s].color == i)
                count++;
        }

        if (count >= 5)
            return true;
    }

    return false;
}

function ComprobarFull(cartas)
{
    let Trio = 0;

    for (let s = 2; s < cartas.Length; s++)
    {
        if (cartas[s].Numero == cartas[s - 1].Numero && cartas[s].Numero == cartas[s - 2].Numero)
            Trio = cartas[s].Numero;
    }

    if (Trio != 0)
    {
        for (let s = 1; s < cartas.Length; s++)
        {
            if (cartas[s].Numero == cartas[s - 1].Numero && cartas[s].Numero != Trio)
                return true;
        }
    }

    return false;
}

function ComprobarPoker(cartas)
{
    for (let s = 3; s < cartas.Length; s++)
    {
        let num = cartas[s].Numero;
        if (num == cartas[s - 1].Numero && num == cartas[s - 2].Numero && num == cartas[s - 3].Numero)
            return true;
    }
    return false;
}

function ComprobarEscaleraColor(cartas)
{
    for (let i = 0; i < 4; i++)
    {
        let count = 0;

        for (let s = 1; s < cartas.Length; s++)
        {
            if (cartas[s].color == i && cartas[s].Numero == cartas[s - 1].Numero + 1)
                count++;
            else
                count=0;
        }

        if (count >= 5)
            return true;
    }

    return false;
}