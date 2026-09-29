/* =========================================
   ELEMENTOS PRINCIPALES
========================================= */

const vistaInicio = document.getElementById("vista-inicio");
const vistaBienvenida = document.getElementById("vista-bienvenida");
const vistaQuiz = document.getElementById("vista-quiz");
const vistaCalculando = document.getElementById("vista-calculando");
const vistaRegalo = document.getElementById("vista-regalo");
const vistaCarta = document.getElementById("vista-carta");

const regalo = document.getElementById("regalo");
const contadorRegalo = document.getElementById("contador-regalo");
const instruccionRegalo = document.getElementById("instruccion-regalo");

const btnIngresar = document.getElementById("btn-ingresar");
const btnEmpezar = document.getElementById("btn-empezar");

const musica = document.getElementById("bg-music");


/* =========================================
   ELEMENTOS DEL QUIZ
========================================= */

const textoPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("opciones");

const numeroPregunta = document.getElementById("numero-pregunta");
const porcentajeProgreso = document.getElementById("porcentaje-progreso");
const barraProgreso = document.getElementById("progreso");

const tarjetaPregunta = document.getElementById("tarjeta-pregunta");


/* =========================================
   CAMBIAR ENTRE PANTALLAS
========================================= */

function cambiarVista(vistaActual, nuevaVista) {

    vistaActual.style.opacity = "0";

    setTimeout(function () {

        vistaActual.classList.remove("activa");

        nuevaVista.classList.add("activa");

        nuevaVista.style.opacity = "0";

        // Forzamos al navegador a procesar el cambio
        nuevaVista.offsetHeight;

        nuevaVista.style.opacity = "1";

    }, 400);

}


/* =========================================
   VISTA 1 → BIENVENIDA
========================================= */

btnIngresar.addEventListener("click", function () {

    cambiarVista(
        vistaInicio,
        vistaBienvenida
    );

});


/* =========================================
   PLAYLIST
========================================= */

const canciones = [
    "musica/badromance.mp3",
    "musica/just dance.mp3"
];

let cancionActual = 0;


function iniciarMusica() {

    musica.src = canciones[cancionActual];

    // Puedes modificar el volumen aquí.
    musica.volume = 0.35;

    musica.play().catch(function (error) {

        console.error(
            "No se pudo reproducir la música:",
            error
        );

    });

}


/* Cuando termine una canción,
   reproducimos la siguiente */

musica.addEventListener("ended", function () {

    cancionActual++;

    if (cancionActual >= canciones.length) {
        cancionActual = 0;
    }

    musica.src = canciones[cancionActual];

    musica.play();

});


/* =========================================
   PREGUNTAS DEL QUIZ

   IMPORTANTE:
   AQUÍ puedes modificar fácilmente
   preguntas y respuestas.
========================================= */

const preguntas = [

    {
        pregunta: "¿Qué países ha visitado Ali?",

        opciones: [
            "Noruega",
            "Chile",
            "España",
            "Todas las anteriores"
        ]
    },

    {
        pregunta: "Cuando jugabas PlayStation 2 con Dani, ¿cuál era tu videojuego favorito?",

        opciones: [
            "Midnight Club 3",
            "God of War 2",
            "God of War 1"
        ]
    },

    {
        pregunta: "De entre estos cantantes, ¿cuál te gusta más?",

        opciones: [
            "Rihanna",
            "Lady Gaga",
            "Beyoncé"
        ]
    },

    {
        pregunta: "Cuando ganaste tu primera maratón de código del poli, ¿cuál fue tu premio?",

        opciones: [
            "Unos Doritos",
            "Unos audífonos Sony",
            "Nada"
        ]
    },

    {
        pregunta: "¿Qué anime solías ver junto a Dani?",

        opciones: [
            "Jujutsu Kaisen",
            "My Hero Academia",
            "Demon Slayer"
        ]
    }

];


/* =========================================
   CONTROL DEL QUIZ
========================================= */

let preguntaActual = 0;

let respuestas = [];

let bloqueado = false;


/* =========================================
   MOSTRAR PREGUNTA
========================================= */

function mostrarPregunta() {

    const datos = preguntas[preguntaActual];

    /* Colocamos la pregunta */

    textoPregunta.textContent = datos.pregunta;


    /* Limpiamos respuestas anteriores */

    contenedorOpciones.innerHTML = "";


    /* =====================================
       ACTUALIZAR PROGRESO
    ===================================== */

    const progreso =
        ((preguntaActual + 1) / preguntas.length) * 100;

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    porcentajeProgreso.textContent =
        `${progreso}%`;

    barraProgreso.style.width =
        `${progreso}%`;


    /* =====================================
       CREAR LAS OPCIONES
    ===================================== */

    datos.opciones.forEach(function (opcion) {

        const boton = document.createElement("button");

        boton.classList.add("opcion");

        boton.textContent = opcion;

        boton.addEventListener("click", function () {

            seleccionarRespuesta(
                opcion,
                boton
            );

        });

        contenedorOpciones.appendChild(boton);

    });

}


/* =========================================
   SELECCIONAR RESPUESTA
========================================= */

function seleccionarRespuesta(respuesta, boton) {

    /*
       Evita que pueda pulsar varias opciones
       durante los 0.5 segundos de espera.
    */

    if (bloqueado) {
        return;
    }

    bloqueado = true;


    /* Marcamos visualmente la opción */

    boton.classList.add("seleccionada");


    /* Guardamos lo que respondió */

    respuestas.push({

        pregunta: preguntas[preguntaActual].pregunta,

        respuesta: respuesta

    });


    /* =====================================
       ESPERAMOS 0.5 SEGUNDOS
    ===================================== */

    setTimeout(function () {

        /* Animación de salida */

        tarjetaPregunta.style.opacity = "0";

        tarjetaPregunta.style.transform =
            "translateX(-20px)";


        setTimeout(function () {

            preguntaActual++;


            /* =================================
               ¿QUEDAN PREGUNTAS?
            ================================= */

            if (preguntaActual < preguntas.length) {

                mostrarPregunta();

                /* Preparamos entrada */

                tarjetaPregunta.style.transform =
                    "translateX(20px)";

                tarjetaPregunta.offsetHeight;

                tarjetaPregunta.style.opacity = "1";

                tarjetaPregunta.style.transform =
                    "translateX(0)";

                bloqueado = false;

            }

            else {

                finalizarQuiz();
            }

        }, 300);

    }, 500);

}

/* =========================================
   FINALIZAR QUIZ
========================================= */

function finalizarQuiz() {

    console.log("Quiz terminado");
    console.log("Respuestas:", respuestas);

    /*
        IMPORTANTE:

        Ya NO modificamos tarjetaPregunta.innerHTML.

        Simplemente abandonamos la pantalla
        del quiz y mostramos una pantalla
        independiente de cálculo.
    */

    cambiarVista(
        vistaQuiz,
        vistaCalculando
    );


    /*
        Después de 2 segundos mostramos
        el regalo.
    */

    setTimeout(function () {

        cambiarVista(
            vistaCalculando,
            vistaRegalo
        );

    }, 2000);

}

/* =========================================
   BOTÓN "EMPEZAR"
========================================= */

btnEmpezar.addEventListener("click", function () {

    /*
       Iniciamos la música aquí porque
       existe una interacción directa
       del usuario.
    */

    iniciarMusica();


    /* Reiniciamos el quiz */

    preguntaActual = 0;

    respuestas = [];

    bloqueado = false;


    /* Cargamos la primera pregunta */

    mostrarPregunta();


    /* Pasamos al quiz */

    cambiarVista(
        vistaBienvenida,
        vistaQuiz
    );
});
    /* =========================================
   REGALO INTERACTIVO
========================================= */

let clicsRegalo = 0;

const clicsNecesarios = 10;


/* =========================================
   CLICK SOBRE EL REGALO
========================================= */

regalo.addEventListener("click", function () {

    /* Si ya está abierto no hacemos nada */

    if (clicsRegalo >= clicsNecesarios) {
        return;
    }


    clicsRegalo++;


    /* Actualizamos contador */

    contadorRegalo.textContent =
        `${clicsRegalo} / ${clicsNecesarios}`;


    /* =====================================
       HACEMOS QUE SE SACUDA
    ===================================== */

    regalo.classList.remove("sacudir");

    /*
       Esta línea obliga al navegador
       a reiniciar la animación.
    */

    void regalo.offsetWidth;

    regalo.classList.add("sacudir");


    /* =====================================
       CAMBIAMOS EL MENSAJE
    ===================================== */

    if (clicsRegalo === 5) {

        instruccionRegalo.textContent =
            "Parece que algo está pasando... 👀";

    }


    if (clicsRegalo === 8) {

        instruccionRegalo.textContent =
            "¡Ya casi! Sigue tocando 🎁";

    }


    if (clicsRegalo === 9) {

        instruccionRegalo.textContent =
            "¡UNO MÁS! ✨";

    }


    /* =====================================
       CLICK NÚMERO 10
    ===================================== */

    if (clicsRegalo === clicsNecesarios) {

        abrirRegalo();

    }

});


/* =========================================
   ABRIR EL REGALO
========================================= */

function abrirRegalo() {

    regalo.classList.add("abierto");

    contadorRegalo.style.display = "none";

    instruccionRegalo.textContent =
        "¡Sorpresa! 🎉";


    /* =====================================
       CONFETI
    ===================================== */

    confetti({

        particleCount: 180,

        spread: 100,

        origin: {
            y: 0.6
        }

    });


    /* Segundo disparo */

    setTimeout(function () {

        confetti({

            particleCount: 120,

            spread: 140,

            origin: {
                y: 0.5
            }

        });

    }, 400);


    /* =====================================
       PASAMOS A LA CARTA
    ===================================== */

    setTimeout(function () {

        cambiarVista(
            vistaRegalo,
            vistaCarta
        );

    }, 1800);

}