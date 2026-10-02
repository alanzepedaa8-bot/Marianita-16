// ==========================================
// CONFIGURACIÓN
// ==========================================

const FECHA_CUMPLE = new Date("2026-10-11T00:00:00-06:00");

// Modo de prueba:
// index.html?saltar=1
const parametros = new URLSearchParams(window.location.search);
const SALTAR_ESPERA = parametros.get("saltar") === "1";

// ==========================================
// ELEMENTOS
// ==========================================

const espera = document.getElementById("espera");
const cumple = document.getElementById("cumple");
const menu = document.getElementById("menu");
const mensaje = document.getElementById("mensaje");
const fotos = document.getElementById("fotos");
const noche = document.getElementById("noche");
const regalo = document.getElementById("regalo");
const trampaMessage = document.getElementById("trampa-message");

const countdown = document.getElementById("countdown");

const audioEspera = document.getElementById("audioEspera");
const audioMananitas = document.getElementById("audioMananitas");
const audioAmapolas = document.getElementById("audioAmapolas");

const musicButton = document.getElementById("musicButton");
const musicOverlay = document.getElementById("musicOverlay");


// ==========================================
// NAVEGACIÓN
// ==========================================

function ocultarTodo() {
    const secciones = [
        espera,
        cumple,
        menu,
        mensaje,
        fotos,
        noche,
        regalo,
        trampaMessage
    ];

    secciones.forEach(seccion => {
        if (seccion) {
            seccion.classList.remove("active");
        }
    });
}

function goTo(id) {
    ocultarTodo();

    const destino = document.getElementById(id);

    if (destino) {
        destino.classList.add("active");
        window.scrollTo(0, 0);
    }
}


// ==========================================
// CUENTA REGRESIVA
// ==========================================

function actualizarCountdown() {

    if (SALTAR_ESPERA || new Date() >= FECHA_CUMPLE) {
        desbloquearCumple();
        return;
    }

    const ahora = new Date();
    const diferencia = FECHA_CUMPLE - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );
    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );
    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    if (countdown) {
        countdown.innerHTML = `
            <div class="time-box">
                <span>${dias}</span>
                <small>DÍAS</small>
            </div>

            <div class="time-box">
                <span>${String(horas).padStart(2, "0")}</span>
                <small>HORAS</small>
            </div>

            <div class="time-box">
                <span>${String(minutos).padStart(2, "0")}</span>
                <small>MIN</small>
            </div>

            <div class="time-box">
                <span>${String(segundos).padStart(2, "0")}</span>
                <small>SEG</small>
            </div>
        `;
    }
}

function desbloquearCumple() {

    if (window.cumpleDesbloqueado) return;

    window.cumpleDesbloqueado = true;

    detenerMusica();

    if (audioMananitas) {
        audioMananitas.currentTime = 0;
        audioMananitas.loop = true;

        audioMananitas.play().catch(() => {
            mostrarBotonMusica();
        });
    }

    goTo("cumple");
}


// ==========================================
// INICIAR PÁGINA
// ==========================================

function iniciarPagina() {

    if (SALTAR_ESPERA || new Date() >= FECHA_CUMPLE) {
        desbloquearCumple();
    } else {
        goTo("espera");

        if (audioEspera) {
            audioEspera.loop = true;

            audioEspera.play().catch(() => {
                mostrarBotonMusica();
            });
        }
    }

    actualizarCountdown();
}

setInterval(actualizarCountdown, 1000);


// ==========================================
// SECCIONES VISTAS
// ==========================================

let seccionesVistas = {
    mensaje: false,
    fotos: false,
    noche: false
};

function marcarSeccionVista(seccion) {

    if (seccionesVistas.hasOwnProperty(seccion)) {
        seccionesVistas[seccion] = true;
    }

    actualizarMenu();
}

function actualizarMenu() {

    const botonMensaje = document.getElementById("btnMensaje");
    const botonFotos = document.getElementById("btnFotos");
    const botonNoche = document.getElementById("btnNoche");
    const botonRegalo = document.getElementById("btnRegalo");

    if (botonMensaje && seccionesVistas.mensaje) {
        botonMensaje.classList.add("vista");
        botonMensaje.innerHTML = "💌 Un mensaje ✓";
    }

    if (botonFotos && seccionesVistas.fotos) {
        botonFotos.classList.add("vista");
        botonFotos.innerHTML = "📸 Momentos ✓";
    }

    if (botonNoche && seccionesVistas.noche) {
        botonNoche.classList.add("vista");
        botonNoche.innerHTML = "🌙 Una noche especial ✓";
    }

    if (
        botonRegalo &&
        seccionesVistas.mensaje &&
        seccionesVistas.fotos &&
        seccionesVistas.noche
    ) {
        botonRegalo.classList.remove("locked");
        botonRegalo.innerHTML = "🎁 La sorpresa";
    }
}


// ==========================================
// BOTÓN DEL MENSAJE
// ==========================================

function abrirMensaje() {

    marcarSeccionVista("mensaje");

    goTo("mensaje");
}


// ==========================================
// MOMENTOS
// ==========================================

const recuerdos = [
    {
        foto: "fotos/foto1.jpeg",
        texto: "Ese día lo recordaremos siempre. ❤️"
    },
    {
        foto: "fotos/foto2.jpeg",
        texto: "Te amo por siempre. ❤️"
    },
    {
        foto: "fotos/foto3.jpeg",
        texto: "No sabes las ganas que tenía de mirarte. 🥹❤️"
    },
    {
        foto: "fotos/foto4.jpeg",
        texto: "Te andaba ahorcando, jsjs. 😂❤️"
    },
    {
        foto: "fotos/foto5.jpeg",
        texto: "Nuestra primera salida. No quería que te fueras. 🥹❤️"
    },
    {
        foto: "fotos/foto6.jpeg",
        texto: "Nuestra tercera salida. Cómo me divertí ese día, fue lo mejor. Algún día deberíamos repetirlo. ❤️"
    }
];

let recuerdosVistos = [];

function iniciarMomentos() {

    marcarSeccionVista("fotos");

    iniciarAmapolas();

    const contenedor = document.getElementById("recuerdos");

    if (!contenedor) {
        goTo("fotos");
        return;
    }

    contenedor.innerHTML = "";

    recuerdos.forEach((recuerdo, index) => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "recuerdo-card";

        tarjeta.innerHTML = `
            <div class="recuerdo-numero">
                ${index + 1}
            </div>

            <div class="recuerdo-corazon">
                ${recuerdosVistos.includes(index) ? "❤️" : "💗"}
            </div>

            <p>Recuerdo ${index + 1}</p>
        `;

        tarjeta.addEventListener("click", () => {
            abrirRecuerdo(index);
        });

        contenedor.appendChild(tarjeta);
    });

    goTo("fotos");
}


function abrirRecuerdo(index) {

    const recuerdo = recuerdos[index];

    if (!recuerdosVistos.includes(index)) {
        recuerdosVistos.push(index);
    }

    const visor = document.getElementById("visorRecuerdo");

    if (!visor) return;

    visor.innerHTML = `
        <div class="foto-grande">
            <img
                src="${recuerdo.foto}"
                alt="Nuestro recuerdo ${index + 1}"
            >
        </div>

        <p class="frase-recuerdo">
            ${recuerdo.texto}
        </p>

        <button onclick="cerrarRecuerdo()">
            ❤️ Cerrar
        </button>
    `;

    visor.classList.add("active");

    actualizarTarjetasRecuerdos();

    if (recuerdosVistos.length === recuerdos.length) {
        mostrarFinalMomentos();
    }
}


function cerrarRecuerdo() {

    const visor = document.getElementById("visorRecuerdo");

    if (visor) {
        visor.classList.remove("active");
    }
}


function actualizarTarjetasRecuerdos() {

    const tarjetas = document.querySelectorAll(".recuerdo-card");

    tarjetas.forEach((tarjeta, index) => {

        const corazon = tarjeta.querySelector(".recuerdo-corazon");

        if (
            corazon &&
            recuerdosVistos.includes(index)
        ) {
            corazon.textContent = "❤️";
            tarjeta.classList.add("vista");
        }
    });
}


function mostrarFinalMomentos() {

    const final = document.getElementById("finalMomentos");

    if (!final) return;

    final.innerHTML = `
        <div class="final-momentos">
            <h2>❤️ Todos nuestros recuerdos</h2>

            <p>
                Gracias por guardar conmigo todos estos
                momentos tan bonitos.
            </p>

            <p>
                Espero que podamos crear muchos más. 🥹❤️
            </p>
        </div>
    `;
}


// ==========================================
// NOCHE ESPECIAL
// ==========================================

function abrirNoche() {

    marcarSeccionVista("noche");

    goTo("noche");
}


// ==========================================
// REGALO
// ==========================================

function abrirRegalo() {

    const desbloqueado =
        seccionesVistas.mensaje &&
        seccionesVistas.fotos &&
        seccionesVistas.noche;

    if (!desbloqueado) {

        goTo("trampa-message");

        return;
    }

    goTo("regalo");
}


function mostrarSorpresa() {

    const regaloCaja = document.getElementById("regaloCaja");
    const sorpresa = document.getElementById("sorpresa");

    if (regaloCaja) {
        regaloCaja.style.display = "none";
    }

    if (sorpresa) {
        sorpresa.classList.add("active");
    }

    crearCorazones();
}


// ==========================================
// RESPUESTA SÍ
// ==========================================

function aceptarSalida() {

    const respuesta = document.getElementById("respuesta");

    if (!respuesta) return;

    respuesta.innerHTML = `
        <div class="respuesta-si">
            <div class="corazones-grandes">
                ❤️🥰❤️
            </div>

            <h2>
                Sabía que dirías que sí. 🥹💗
            </h2>

            <p>
                Entonces ya tenemos una salida pendiente. 🍣❤️
            </p>

            <p class="firma">
                Ya final... Con cariño, tu Alancito ❤️
            </p>
        </div>
    `;

    crearCorazones();
}


// ==========================================
// BOTÓN NO
// ==========================================

function botonNo() {

    const boton = document.getElementById("btnNo");

    if (!boton) return;

    const contenedor =
        boton.parentElement;

    if (!contenedor) return;

    boton.textContent = "¿Segura? 🥺";

    boton.style.position = "relative";

    const mover = () => {

        const x =
            Math.random() * 160 - 80;

        const y =
            Math.random() * 120 - 60;

        boton.style.transform =
            `translate(${x}px, ${y}px)`;
    };

    mover();

    setTimeout(() => {
        boton.style.transform = "translate(0, 0)";
    }, 1200);
}


// ==========================================
// MÚSICA
// ==========================================

let musicaActual = null;

function detenerMusica() {

    const audios = [
        audioEspera,
        audioMananitas,
        audioAmapolas
    ];

    audios.forEach(audio => {

        if (audio) {
            audio.pause();
        }
    });
}


function iniciarEspera() {

    detenerMusica();

    if (!audioEspera) return;

    audioEspera.currentTime = 0;
    audioEspera.loop = true;

    musicaActual = audioEspera;

    audioEspera.play().catch(() => {
        mostrarBotonMusica();
    });
}


function iniciarMananitas() {

    detenerMusica();

    if (!audioMananitas) return;

    audioMananitas.currentTime = 0;
    audioMananitas.loop = true;

    musicaActual = audioMananitas;

    audioMananitas.play().catch(() => {
        mostrarBotonMusica();
    });
}


function iniciarAmapolas() {

    if (audioAmapolas) {

        if (musicaActual === audioAmapolas) {
            return;
        }

        detenerMusica();

        audioAmapolas.currentTime = 0;
        audioAmapolas.loop = true;

        musicaActual = audioAmapolas;

        audioAmapolas.play().catch(() => {
            mostrarBotonMusica();
        });
    }
}


function alternarMusica() {

    if (!musicaActual) {

        if (new Date() < FECHA_CUMPLE && !SALTAR_ESPERA) {
            iniciarEspera();
        } else {
            iniciarMananitas();
        }

        return;
    }

    if (musicaActual.paused) {

        musicaActual.play().catch(() => {});

        if (musicButton) {
            musicButton.textContent = "🎵";
        }

    } else {

        musicaActual.pause();

        if (musicButton) {
            musicButton.textContent = "🔇";
        }
    }
}


function mostrarBotonMusica() {

    if (musicOverlay) {
        musicOverlay.classList.add("active");
    }
}


function ocultarBotonMusica() {

    if (musicOverlay) {
        musicOverlay.classList.remove("active");
    }
}


// ==========================================
// CORAZONES FLOTANTES
// ==========================================

function crearCorazones() {

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            const corazon =
                document.createElement("div");

            corazon.className =
                "floating-heart";

            corazon.textContent =
                Math.random() > 0.5
                    ? "❤️"
                    : "💗";

            corazon.style.left =
                Math.random() * 100 + "vw";

            corazon.style.animationDuration =
                (3 + Math.random() * 3) + "s";

            document.body.appendChild(corazon);

            setTimeout(() => {
                corazon.remove();
            }, 6000);

        }, i * 150);
    }
}


// ==========================================
// BOTONES DE MÚSICA
// ==========================================

if (musicButton) {

    musicButton.addEventListener(
        "click",
        alternarMusica
    );
}


if (musicOverlay) {

    musicOverlay.addEventListener(
        "click",
        () => {

            if (!musicaActual) {

                if (
                    !SALTAR_ESPERA &&
                    new Date() < FECHA_CUMPLE
                ) {
                    iniciarEspera();
                } else {
                    iniciarMananitas();
                }

            } else {

                musicaActual.play().catch(() => {});

            }

            ocultarBotonMusica();
        }
    );
}


// ==========================================
// TECLA ESC
// ==========================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        cerrarRecuerdo();

        goTo("menu");
    }
});


// ==========================================
// INICIAR
// ==========================================

window.addEventListener(
    "load",
    () => {

        iniciarPagina();

    }
);