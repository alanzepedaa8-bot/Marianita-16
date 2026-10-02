/* =====================================================
   FECHA DE DESBLOQUEO
===================================================== */

const FECHA_CUMPLE =
    new Date("2026-09-01T00:00:00-06:00");


/* =====================================================
   VARIABLES
===================================================== */

let cumpleDesbloqueado = false;

let musicaActual = "espera";
let musicaIniciada = false;
let musicaPausada = false;

let seccionesVistas = {
    mensaje: false,
    fotos: false,
    noche: false
};

let recuerdosDescubiertos = [];

let regaloAbierto = false;


/* =====================================================
   ELEMENTOS
===================================================== */

const musica =
    document.getElementById("musica");

const musicaSource =
    document.getElementById("musica-source");

const musicOverlay =
    document.getElementById("music-overlay");

const musicButton =
    document.getElementById("music-button");


/* =====================================================
   INICIO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        configurarMusica();

        comprobarCumple();

        actualizarCountdown();

        setInterval(
            actualizarCountdown,
            1000
        );

        crearCorazon();

        setInterval(
            crearCorazon,
            1800
        );

    }
);


/* =====================================================
   CUENTA REGRESIVA
===================================================== */

function comprobarCumple() {

    const ahora = new Date();

    if (ahora >= FECHA_CUMPLE) {

        desbloquearCumple();

    } else {

        goTo("espera");

    }

}


function actualizarCountdown() {

    const ahora = new Date();

    const diferencia =
        FECHA_CUMPLE - ahora;


    if (diferencia <= 0) {

        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";

        desbloquearCumple();

        return;
    }


    const totalSegundos =
        Math.floor(diferencia / 1000);


    const dias =
        Math.floor(
            totalSegundos / 86400
        );


    const horas =
        Math.floor(
            (totalSegundos % 86400) / 3600
        );


    const minutos =
        Math.floor(
            (totalSegundos % 3600) / 60
        );


    const segundos =
        totalSegundos % 60;


    document.getElementById("dias").textContent =
        String(dias).padStart(2,"0");


    document.getElementById("horas").textContent =
        String(horas).padStart(2,"0");


    document.getElementById("minutos").textContent =
        String(minutos).padStart(2,"0");


    document.getElementById("segundos").textContent =
        String(segundos).padStart(2,"0");

}


/* =====================================================
   CUMPLEAÑOS
===================================================== */

function desbloquearCumple() {

    if (cumpleDesbloqueado) {
        return;
    }

    cumpleDesbloqueado = true;


    cambiarMusica(
        "musica/mananitas.mp3",
        "mananitas"
    );


    goTo("cumple");

}


/* =====================================================
   NAVEGACIÓN
===================================================== */

function goTo(screenId) {

    const screens =
        document.querySelectorAll(".screen");


    screens.forEach(
        function (screen) {

            screen.classList.remove("active");

        }
    );


    const destino =
        document.getElementById(screenId);


    if (destino) {

        destino.classList.add("active");

        destino.scrollTop = 0;

    }


    /*
       Al entrar a Momentos empieza Amapolas.
    */

    if (screenId === "fotos") {

        iniciarAmapolas();

    }


    /*
       Amapolas no se detiene al salir.
    */

}


/* =====================================================
   REGRESAR
===================================================== */

function regresarAlMenu() {

    actualizarMenu();

    goTo("menu");

}


/* =====================================================
   SECCIONES
===================================================== */

function abrirSeccion(seccion) {

    if (
        seccion === "regalo" &&
        !puedeAbrirRegalo()
    ) {

        goTo("trampa-message");

        return;
    }


    if (
        seccion === "mensaje" ||
        seccion === "fotos" ||
        seccion === "noche"
    ) {

        seccionesVistas[seccion] = true;

    }


    actualizarMenu();

    goTo(seccion);

}


/* =====================================================
   MENÚ
===================================================== */

function actualizarMenu() {

    const mensajeCard =
        document.getElementById(
            "check-mensaje"
        ).parentElement;


    const fotosCard =
        document.getElementById(
            "check-fotos"
        ).parentElement;


    const nocheCard =
        document.getElementById(
            "check-noche"
        ).parentElement;


    mensajeCard.classList.toggle(
        "completed",
        seccionesVistas.mensaje
    );


    fotosCard.classList.toggle(
        "completed",
        seccionesVistas.fotos
    );


    nocheCard.classList.toggle(
        "completed",
        seccionesVistas.noche
    );


    const giftCard =
        document.getElementById(
            "gift-menu-card"
        );


    const lock =
        document.getElementById(
            "surprise-lock"
        );


    if (puedeAbrirRegalo()) {

        giftCard.classList.remove("locked");

        lock.textContent = "🔓";

    } else {

        giftCard.classList.add("locked");

        lock.textContent = "🔒";

    }

}


function puedeAbrirRegalo() {

    return (
        seccionesVistas.mensaje &&
        seccionesVistas.fotos &&
        seccionesVistas.noche
    );

}


function abrirRegalo() {

    if (!puedeAbrirRegalo()) {

        goTo("trampa-message");

        return;

    }


    goTo("regalo");

}


/* =====================================================
   RECUERDOS
===================================================== */

const recuerdos = {

    1: {
        foto: "fotos/foto1.JPEG",
        mensaje:
            "Ese día lo recordaremos siempre. ❤️"
    },

    2: {
        foto: "fotos/foto2.JPEG",
        mensaje:
            "Te amo por siempre. ❤️"
    },

    3: {
        foto: "fotos/foto3.JPEG",
        mensaje:
            "No sabes las ganas que tenía de mirarte. 🥹❤️"
    },

    4: {
        foto: "fotos/foto4.JPEG",
        mensaje:
            "Te andaba ahorcando, jsjs. 😂❤️"
    },

    5: {
        foto: "fotos/foto5.JPEG",
        mensaje:
            "Nuestra primera salida. No quería que te fueras. 🥹❤️"
    },

    6: {
        foto: "fotos/foto6.JPEG",
        mensaje:
            "Nuestra tercera salida. Cómo me divertí ese día, fue lo mejor. Algún día deberíamos repetirlo. ❤️"
    }

};


/* =====================================================
   ABRIR RECUERDO
===================================================== */

function descubrirMomento(numero) {

    const recuerdo =
        recuerdos[numero];


    if (!recuerdo) {
        return;
    }


    if (
        !recuerdosDescubiertos.includes(numero)
    ) {

        recuerdosDescubiertos.push(numero);

    }


    const tarjeta =
        document.getElementById(
            "memory-" + numero
        );


    if (tarjeta) {

        tarjeta.classList.add(
            "discovered"
        );

    }


    document.getElementById(
        "moments-found"
    ).textContent =
        recuerdosDescubiertos.length;


    document.getElementById(
        "memory-reveal-number"
    ).textContent =
        "Recuerdo " +
        String(numero).padStart(2,"0");


    document.getElementById(
        "memory-reveal-image"
    ).src =
        recuerdo.foto;


    document.getElementById(
        "memory-reveal-text"
    ).textContent =
        recuerdo.mensaje;


    document
        .getElementById("memory-reveal")
        .classList
        .remove("hidden");


    if (
        recuerdosDescubiertos.length === 6
    ) {

        document
            .getElementById("all-memories")
            .classList
            .remove("hidden");

    }

}


/* =====================================================
   CERRAR RECUERDO
===================================================== */

function cerrarMomento() {

    document
        .getElementById("memory-reveal")
        .classList
        .add("hidden");

}


/* =====================================================
   MÚSICA
===================================================== */

function configurarMusica() {

    musica.volume = 0.7;

    musicaSource.src =
        "musica/espera.mp3";

    musica.load();

    intentarMusica();

}


function intentarMusica() {

    musica.play()

        .then(
            function () {

                musicaIniciada = true;

                musicaPausada = false;

                musicOverlay
                    .classList
                    .remove("show");

                actualizarBotonMusica();

            }
        )

        .catch(
            function () {

                musicOverlay
                    .classList
                    .add("show");

            }
        );

}


function iniciarMusica() {

    musica.play()

        .then(
            function () {

                musicaIniciada = true;

                musicaPausada = false;

                musicOverlay
                    .classList
                    .remove("show");

                actualizarBotonMusica();

            }
        )

        .catch(
            function () {

                console.log(
                    "El navegador bloqueó el audio."
                );

            }
        );

}


function cambiarMusica(
    ruta,
    nombre
) {

    /*
       Una vez que Amapolas comenzó,
       ya no cambiamos de canción.
    */

    if (
        musicaActual === "amapolas" &&
        nombre !== "amapolas"
    ) {

        return;

    }


    musica.pause();


    musicaSource.src = ruta;

    musica.load();


    musicaActual = nombre;


    if (
        musicaIniciada &&
        !musicaPausada
    ) {

        musica.play()

            .catch(
                function () {

                    musicOverlay
                        .classList
                        .add("show");

                }
            );

    }

}


function iniciarAmapolas() {

    if (
        musicaActual === "amapolas"
    ) {

        return;

    }


    cambiarMusica(
        "musica/amapolas.mp3",
        "amapolas"
    );

}


function alternarMusica() {

    if (musica.paused) {

        musica.play()

            .then(
                function () {

                    musicaPausada = false;

                    musicaIniciada = true;

                    actualizarBotonMusica();

                }
            )

            .catch(
                function () {

                    musicOverlay
                        .classList
                        .add("show");

                }
            );

    } else {

        musica.pause();

        musicaPausada = true;

        actualizarBotonMusica();

    }

}


function actualizarBotonMusica() {

    if (musica.paused) {

        musicButton.textContent = "🔇";

    } else {

        musicButton.textContent = "🔊";

    }

}


/* =====================================================
   REGALO
===================================================== */

function abrirCaja() {

    if (regaloAbierto) {
        return;
    }


    regaloAbierto = true;


    const boton =
        document.getElementById(
            "gift-button"
        );


    const hint =
        document.querySelector(
            ".gift-hint"
        );


    const mensaje =
        document.getElementById(
            "surprise-message"
        );


    boton.style.display = "none";


    if (hint) {

        hint.style.display = "none";

    }


    mensaje.classList.remove(
        "hidden"
    );

}


/* =====================================================
   SÍ
===================================================== */

function aceptarRegalo() {

    document.getElementById(
        "accept-question"
    ).style.display = "none";


    document.getElementById(
        "accepted-message"
    ).classList
    .remove("hidden");

}


/* =====================================================
   NO
===================================================== */

function rechazarRegalo() {

    const boton =
        document.getElementById(
            "no-button"
        );


    boton.textContent =
        "¿Segura? 🥺";


    boton.style.transform =
        "translateX(80px)";


    setTimeout(
        function () {

            boton.style.transform =
                "translateX(0)";

        },
        800
    );

}


/* =====================================================
   CORAZONES
===================================================== */

function crearCorazon() {

    const contenedor =
        document.getElementById(
            "hearts-container"
        );


    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";


    const corazones = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "💓"
    ];


    heart.textContent =
        corazones[
            Math.floor(
                Math.random() *
                corazones.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (12 + Math.random() * 15) +
        "px";


    const duracion =
        5 + Math.random() * 5;


    heart.style.animationDuration =
        duracion + "s";


    contenedor.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duracion * 1000
    );

}


/* =====================================================
   ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            cerrarMomento();

        }

    }
);


/* =====================================================
   MENÚ INICIAL
===================================================== */

actualizarMenu();