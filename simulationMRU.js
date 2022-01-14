//Evente que se ejecuta cada vez que se carga la página Web
window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}
//Para la comptabilidad de Canvas con el Navegador
function canvasSupport() {
    return Modernizr.canvas;
}
//Función Principal que se ejecuta al escuchar el evento
function canvasApp() {
    //Inicialización del Canvas y los Elementos del HTML
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var formElement = document.getElementById("textBox");
    var startButton = document.getElementById("startSimulation");
    //Declaración de Variables
    var v = 30;
    var paused = true;
    var particula;
    var t0;
    var dt;
    var t;
    var animId;
    var animTime = 60;
    var today = new Date();
    //Variables para dibujar la Grilla
    var xMin = 10;
    var xMax = canvas.width - 10;
    var yMin = 70;
    var yMax = canvas.height - 10;
    var xStep = 10;
    var yStep = 10;

    //Dibujando la Cuadricula
    drawGrill();
    drawScreen();
    drawRule();
    timeSimulation();

    //Evento para escuchar el click del Butoon INICIAR
    startButton.addEventListener("click", beginSimulation, false);
    function beginSimulation(e) {
        e.preventDefault();
        e.stopPropagation();
        paused = false;
        //Iniciamos el temporizador para el movimiento.
        t0 = new Date().getTime();
    }

    //Evento para recuperar el texto del textBox de Velocidad
    formElement.addEventListener("keyup", textBoxChanged, false);
    function textBoxChanged(e) {
        var target = e.target;
        v = target.value;
    }

    //Función que realiza la animación
    function animFrame() {
        animId = requestAnimationFrame(animFrame, canvas);
        if (!paused) {
            onTimer();
        }
    };
    //Función para actualizar el tiempo de la animación.
    function onTimer() {
        var t1 = new Date().getTime();
        dt = 0.001 * (t1 - t0);
        t0 = t1;
        t += dt;
        console.log(dt, t, t0, animTime);
        if (t < animTime) {
            move();
        } else {
            stop();
        }
    }

    //Función que realiza la animación.
    function move() {
        particula.vx = v;
        particula.x = particula.x + particula.vx * dt;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawScreen();
        drawGrill();
        drawRule();
        timeSimulation();
        particula.draw(context);
    };

    //Función para parar la animación.
    function stop() {
        cancelAnimationFrame(animId);
    };

    //Función para dibujar el título
    function drawScreen() {
        //background
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 1080, 60);
        //text
        //Hora
        context.fillStyle = "#000000";
        context.font = "10px _san";
        context.fillText(today, 450, 10);
        //Título
        context.fillStyle = "#000000";
        context.font = "25px _sans";
        context.textBaseline = "top";
        context.globalCompositeOperation = "source-over";
        context.fillText("Movimiento Rectilíneo Uniforme", 400, 25);
        //box
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 1070, 50);
    }
    //Función para dibujaer la Regla/Riel
    function drawRule(){
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "#474b4e";
        context.fillRect(20, 210, 1040, 50);

        context.strokeStyle = "white";
        context.lineWidth =1;
        for (let index = 0; index <= 100; index++) {
            context.beginPath();
            context.moveTo(60+index*10,210);
            context.lineTo(60+index*10,235);
            context.fillStyle = "white";
            context.font = "7px _sans";
            context.fillText(index, 55+index*10, 235);
            context.stroke();
            context.closePath();    
        }
    }
    //Funcion para dibujar Tiempo de simulacion
    function timeSimulation(){
        //background
        context.fillStyle = "black";
        context.fillRect(20, 260, 150, 30);
        //text
        //Hora
        context.fillStyle = "white";
        context.font = "15px _san";
        context.fillText("Tiempo: "+t, 25, 265);
    }

    //Función para dibujar la cuadricula
    function drawGrill() {
        context.beginPath();
        var imax = Math.floor((xMax - xMin) / xStep);
        for (var i = 0; i <= imax; i++) {
            context.globalCompositeOperation = "destination-over";
            context.moveTo(xMin + xStep * i, yMin);
            context.lineTo(xMin + xStep * i, yMax);
        }
        var jmax = Math.floor((yMax - yMin) / yStep);
        for (var j = 0; j <= jmax; j++) {
            context.moveTo(xMin, yMin + yStep * j);
            context.lineTo(xMax, yMin + yStep * j);
        }
        context.stroke();
    }

    //Inicialización del objeto partícula
    particula = new Particula(20, "blue");
    particula.x = 40;
    particula.y = 190;
    // Tomar en cuenta que la Velocidad es en pixeles por segundo
    particula.vx = v;
    particula.draw(context);
    t = 0;
    //Iniciando la animación
    animFrame();
}