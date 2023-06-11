// SECCIONES ------------------------------------------
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

// SECCION MASCOTA ------------------------------------------
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const botonMascotaJugador = document.getElementById('boton-mascota')

let mokepones = []

// SECCION MAPA ------------------------------------------

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png"

// SECCION ATAQUE ------------------------------------------
const spanMascotaJugador = document.getElementById('mascota-jugador')
const imgMascotaJugador = document.getElementById('foto-mascota-jugador')
const spanVictoriasJugador = document.getElementById('victorias-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const imgMascotaEnemigo = document.getElementById('foto-mascota-enemigo')
const spanVictoriasEnemigo = document.getElementById('victorias-enemigo')

const contenedorAtaques = document.getElementById('contenedorAtaques')

let botonesAtaques = []

const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const mensajeParcial = document.getElementById('mensajes')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const sectionMensajes = document.getElementById('resultado')
const botonReiniciar = document.getElementById('boton-reiniciar')

let mascotaJugador // numero en el arreglo
let mascotaEnemigo // numero en el arreglo
let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0

// Creacion de Mokepones y sus ataques --------------------------------
class Mokepon {
    constructor (nombre, foto, vida, x = aleatorio(0,440), y = aleatorio(0,315)) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 60
        this.alto = 60
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarlo () {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon (
    'Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5)
let capipepo = new Mokepon (
    'Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5)
let ratigueya = new Mokepon (
    'Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5)
let pydos = new Mokepon (
    'Pydos','./assets/mokepons_mokepon_pydos_attack.png',5)
let tucapalma = new Mokepon (
    'Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png',5)
let langostelvis = new Mokepon (
    'Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png',5)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'}
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
)
pydos.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
tucapalma.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'}
)
langostelvis.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
)

mokepones.push(hipodoge, capipepo, ratigueya, pydos, tucapalma, langostelvis)

//------------------ INICIO FUNCIONES --------------------

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    // parte seleccion mascota
    mostrarEleccionMascotas()
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    // parte canvas
    //iniciarMapa();            <-- se ejecuta en   : seleccionarMascotaJugador
    //canvasPersonaje()         <-- se ejecuta en   : iniciarMapa()-set interval
    //mover + direcciones()     <-- se ejecuta en   : codigo HTML
    //teclaPresionada()         <-- se ejecuta en   : iniciarMapa()
    //detenerMovimiento()       <-- se ejecuta en   : codigo HTML


    // parte ataque esta dentro de mostrar eleccion ataque - que esta dentro de seleccionar mascota jugador
    seleccionarMascotaEnemigo()
    
    // ! mostrarEleccionAtaques()  <-- se ejecuta en   : seleccionarMascotaJugador()
    //secuenciaAtaques()        <-- se ejecuta en   : mostrarEleccionMascotas()
    //ataqueAleatorioEnemigo()  <-- se ejecuta en   : secuenciaAtaques()
    //iniciarPelea()            <-- se ejecuta en   : ataqueAleatorioEnemigo()
    //combate()                 <-- se ejecuta en   : iniciarPelea()
    //crearMensaje(jugador, enemigo, resultado)
    //                          <-- se ejecuta en   : Combate()
    //revisarVictorias()        <-- se ejecuta en   : Combate()

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

/* SECCION ELECCION PERSONAJE
-------------------------------------------------------------- */
function mostrarEleccionMascotas(){ // se ejecuta en -- iniciarJuego 
    mokepones.forEach((Mokepon) => {
        let opcionDeMokepones = `
            <input type="radio" name="mascota" id=${Mokepon.nombre} />
            <label class="tarjeta__mokepon" for=${Mokepon.nombre}>
                <p>${Mokepon.nombre}</p>
                <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputPydos = document.getElementById('Pydos')
        inputTucapalma = document.getElementById('Tucapalma')
        inputLangostelvis = document.getElementById('Langostelvis')
    })
}
function seleccionarMascotaJugador() { // se ejecuta en -- iniciarJuego 
    let auxtemp = 0

    // obtiene nombre mascota
    if (inputHipodoge.checked) {
        mascotaJugador = inputHipodoge.id
        auxtemp = 1
    } else if (inputCapipepo.checked) {
        mascotaJugador = inputCapipepo.id
        auxtemp = 1
    } else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id
        auxtemp = 1
    } else if (inputPydos.checked) {
        mascotaJugador = inputPydos.id
        auxtemp = 1
    } else if (inputTucapalma.checked) {
        mascotaJugador = inputTucapalma.id
        auxtemp = 1
    } else if (inputLangostelvis.checked) {
        mascotaJugador = inputLangostelvis.id
        auxtemp = 1
    } else {
        alert('Selecciona una mascota')
    }

    // esto solo se activa si el jugador eligio mascota
    if (auxtemp === 1) {

        // con el nombre obtengo el ID y lo guardo
        for (let i = 0; i < mokepones.length; i++) {
            if(mascotaJugador == mokepones[i].nombre){
                mascotaJugador = i
            }
        }

        // con el ID muestro los datos
        spanMascotaJugador.innerHTML = mokepones[mascotaJugador].nombre
        imgMascotaJugador.setAttribute('src', mokepones[mascotaJugador].foto)

        iniciarMapa();
    }

}
/* SECCION CANVAS
-------------------------------------------------------------- */
function iniciarMapa() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'

    mapa.width = 500
    mapa.height = 375


    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown',teclaPresionada)
    window.addEventListener('keyup',detenerMovimiento)

    //! sectionSeleccionarAtaque.style.display = 'flex'
    // ! mostrarEleccionAtaques()
}

function pintarCanvas() {
    mokepones[mascotaJugador].x = mokepones[mascotaJugador].x + mokepones[mascotaJugador].velocidadX;
    mokepones[mascotaJugador].y = mokepones[mascotaJugador].y + mokepones[mascotaJugador].velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0, 0, mapa.width, mapa.height
    )

    for (let i = 0; i < mokepones.length; i++) {
        mokepones[i].pintarlo()
    }
}
function moverMokeponArriba() {
    mokepones[mascotaJugador].velocidadY = -5;
}
function moverMokeponAbajo() {
    mokepones[mascotaJugador].velocidadY = 5;
}
function moverMokeponIzquierda() {
    mokepones[mascotaJugador].velocidadX = -5;
}
function moverMokeponDerecha() {
    mokepones[mascotaJugador].velocidadX = 5;
}
function teclaPresionada(e) {
    switch (e.key) {
        case "ArrowUp": moverMokeponArriba(); break;
        case "ArrowDown": moverMokeponAbajo(); break;
        case "ArrowLeft": moverMokeponIzquierda(); break;
        case "ArrowRight": moverMokeponDerecha(); break;
        default: break;
    }
}
function detenerMovimiento() {
    mokepones[mascotaJugador].velocidadY = 0;
    mokepones[mascotaJugador].velocidadX = 0;
}

/* SECCION ATAQUE
-------------------------------------------------------------- */
function seleccionarMascotaEnemigo() { // se ejecuta en -- iniciarJuego 
    // obtengo ID mascota
    mascotaEnemigo = aleatorio(0,mokepones.length-1)
    // con el ID muestro los datos
    spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemigo].nombre
    imgMascotaEnemigo.setAttribute('src',mokepones[mascotaEnemigo].foto)
}

function mostrarEleccionAtaques() { // se ejecuta en -- seleccionarMascotaJugador
    let ataquess = mokepones[mascotaJugador].ataques
    let ataqueMokepon

    ataquess.forEach((ataque) => {
        ataqueMokepon = `
            <button id=${ataque.id} class="boton-de-ataque"> ${ataque.nombre} </button>
            `

            contenedorAtaques.innerHTML += ataqueMokepon
    })

    botonesAtaques = document.querySelectorAll('.boton-de-ataque')

    secuenciaAtaques()
}
function secuenciaAtaques() { // se ejecuta en -- mostrarEleccionAtaques 
    let contador = 0;

    botonesAtaques.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            ataqueJugador.push(e.target.innerText)
            boton.disabled = true
            boton.style.background = "#bbbfc3"
            contador = contador + 1
            if (contador === 5){ ataqueAleatorioEnemigo() }
        }) 
    })
}

function ataqueAleatorioEnemigo() { // se ejecuta en -- secuenciaAtaques
    let aux = mokepones[mascotaEnemigo].ataques

    aux.forEach((ataqq) => {
        ataqueEnemigo.push(ataqq.nombre)
    })

    let i = ataqueEnemigo.length;
    let j;
    let temp;

    while (i-- > 0) {
        j = aleatorio(0, 4)
        temp = ataqueEnemigo[j]
        ataqueEnemigo[j] = ataqueEnemigo[i]
        ataqueEnemigo[i] = temp
    }

    
    iniciarPelea()
}

function iniciarPelea() { // se ejecuta en -- ataqueAleatorioEnemigo
    if(ataqueJugador.length === 5 && ataqueEnemigo.length === 5){
        combate()
    }
}

function combate() { // se ejecuta en -- iniciarPelea
    let contador = 0
    for (let i = 0; i < ataqueJugador.length; i++) {

        if(ataqueEnemigo[i] == ataqueJugador[i]) {
            crearMensaje(ataqueJugador[i], ataqueEnemigo[i], "EMPATE")
        } else if(ataqueJugador[i] == '🔥' && ataqueEnemigo[i] == '🌱') {
            crearMensaje(ataqueJugador[i], ataqueEnemigo[i],"GANASTE")
            victoriasJugador++
        } else if(ataqueJugador[i] == '💧' && ataqueEnemigo[i] == '🔥') {
            crearMensaje(ataqueJugador[i], ataqueEnemigo[i],"GANASTE")
            victoriasJugador++
        } else if(ataqueJugador[i] == '🌱' && ataqueEnemigo[i] == '💧') {
            crearMensaje(ataqueJugador[i], ataqueEnemigo[i],"GANASTE")
            victoriasJugador++
        } else {
            crearMensaje(ataqueJugador[i], ataqueEnemigo[i],"PERDISTE")
            victoriasEnemigo++
        }
        contador++
    }
    
    if(contador === 5 ){ revisarVictoras() }
}

function crearMensaje(jugador, enemigo, resultado) { // se ejecuta en -- Combate
    let nuevoAtaqueDelJugador = document.createElement('p')
    let resultadoParcial = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    resultadoParcial.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = jugador
    nuevoAtaqueDelEnemigo.innerHTML = enemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    mensajeParcial.appendChild(resultadoParcial)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function revisarVictoras() {
    spanVictoriasJugador.innerHTML = "Victorias: "+victoriasJugador
    spanVictoriasEnemigo.innerHTML = "Victorias: "+victoriasEnemigo

    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (victoriasJugador < victoriasEnemigo) {
        crearMensajeFinal('Lo siento, perdiste :(')
    } else {
        crearMensajeFinal('Lo siento, empataste :(')
    }
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)  // se ejecuta en -- al cargar pagina
