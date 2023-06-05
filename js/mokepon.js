// SECCIONES ------------------------------------------
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

// SECCION MASCOTA ------------------------------------------
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const botonMascotaJugador = document.getElementById('boton-mascota')

let mokepones = []

// SECCION ATAQUE ------------------------------------------
const spanMascotaJugador = document.getElementById('mascota-jugador')
const imgMascotaJugador = document.getElementById('foto-mascota-jugador')
const spanVidasJugador = document.getElementById('vidas-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const imgMascotaEnemigo = document.getElementById('foto-mascota-enemigo')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

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
let vidasJugador = 3
let vidasEnemigo = 3

// Creacion de Mokepones y sus ataques --------------------------------
class Mokepon {
    constructor (nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
}}

let hipodoge = new Mokepon ('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5)
let capipepo = new Mokepon ('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5)
let ratigueya = new Mokepon ('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5)

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

mokepones.push(hipodoge, capipepo, ratigueya)

//------------------ INICIO FUNCIONES --------------------

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    // parte seleccion mascota
    seleccionarMascotaEnemigo()
    mostrarEleccionMascotas()
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    // parte ataque esta dentro de mostrar eleccion ataque - que esta dentro de seleccionar mascota jugador

    //mostrarEleccionAtaques()  <-- se ejecuta en   : seleccionarMascotaJugador()
    //secuenciaAtaques()        <-- se ejecuta en   : mostrarEleccionMascotas()
    //ataqueAleatorioEnemigo()  <-- se ejecuta en   : secuenciaAtaques()

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaEnemigo() { // se ejecuta en -- iniciarJuego 
    // obtengo ID mascota
    mascotaEnemigo = aleatorio(0,mokepones.length-1)
    // con el ID muestro los datos
    spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemigo].nombre
    imgMascotaEnemigo.setAttribute('src',mokepones[mascotaEnemigo].foto)
}
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
    } else {
        alert('Selecciona una mascota')
    }

    // esto solo se activa si el jugador eligio mascota
    if (auxtemp === 1) {
        sectionSeleccionarMascota.style.display = 'none'
        sectionSeleccionarAtaque.style.display = 'flex'

        // con el nombre obtengo el ID y lo guardo
        for (let i = 0; i < mokepones.length; i++) {
            if(mascotaJugador == mokepones[i].nombre){
                mascotaJugador = i
            }
        }

        // con el ID muestro los datos
        spanMascotaJugador.innerHTML = mokepones[mascotaJugador].nombre
        imgMascotaJugador.setAttribute('src', mokepones[mascotaJugador].foto)

        mostrarEleccionAtaques()
    }

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
    botonesAtaques.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            ataqueJugador.push(e.target.innerText)
            boton.disabled = true
            boton.style.background = "#bbbfc3"
        }) 
    })

    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() { // se ejecuta en -- secuenciaAtaques
    let auxxx = mokepones[mascotaEnemigo].ataques

    auxxx.forEach((ataqq) => {
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

    console.log(ataqueEnemigo)

    /*mokepones[a]
    ataqueEnemigo
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = '🔥'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = '💧'
    } else {
        ataqueEnemigo = '🌱'
    }

    combate()*/
}

function combate() {
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == '🔥' && ataqueEnemigo == '🌱') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == '💧' && ataqueEnemigo == '🔥') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == '🌱' && ataqueEnemigo == '💧') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let resultadoParcial = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    resultadoParcial.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    mensajeParcial.appendChild(resultadoParcial)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
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
