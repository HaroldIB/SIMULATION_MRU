window.addEventListener("load", eventWindowLoaded, false);	
function eventWindowLoaded() {

	canvasApp();
}

function canvasSupport () {
  	return Modernizr.canvas;
}

function eventWindowLoaded() {

	canvasApp();
}

function canvasApp(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var v = 5;

    var formElement = document.getElementById("textBox");
	formElement.addEventListener("keyup", textBoxChanged, false);	
	
    function textBoxChanged(e) {
		var target =  e.target;
		v = target.value;
		animFrame();
	}

    var particula;
    var t0;
    var dt;
    var t;
    var animId;
    var animTime = 20;
    var today = new Date();
    /* Espacio para dibujar la grilla */
    var xMin=10;
    var xMax=canvas.width-10;
    var yMin=70;
    var yMax=canvas.height-10;
    var xStep=10;
    var yStep=10;
		

    particula = new Particula(20,"blue");
    particula.x = 50;
    particula.y = 250;
    //Velocidad en pixeles por segundo
    particula.vx = v;
    particula.draw(context);
    t0 = new Date().getTime();
    t = 0;

    animFrame();


    function animFrame(){
        animId = requestAnimationFrame(animFrame,canvas);
        onTimer();
        drawGrill();
        drawScreen();
    };

    function onTimer(){
        var t1 = new Date().getTime(); 
        dt = 0.001*(t1-t0); 
        t0 = t1;	
        t += dt;
        console.log(dt,t,t0,animTime);
        if (t < animTime){
            move();
        }else{
            stop();
        }
    }

    function move(){
            particula.x = particula.x + v*dt;
            context.clearRect(0, 0, canvas.width, canvas.height);
            particula.draw(context);   
    };

    function stop(){
        cancelAnimationFrame(animId);
    };

    function drawScreen() {
        //background
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 700, 60);    
        //text
        //Hora
        context.fillStyle    = "#000000";
        context.font         = "10px _san";
        context.fillText  (today, 450 ,10);
        //Título
        context.fillStyle    = "#000000";
        context.font         = "25px _sans";
        context.textBaseline = "top";
        context.globalCompositeOperation = "source-over";
        context.fillText  ("Movimiento Rectilíneo Uniforme", 200, 25 );
        //box
        context.strokeStyle = "#000000"; 
        context.strokeRect(5,  5, 690, 50);
    }

    function drawGrill(){
        context.beginPath() ;		
        var imax = Math.floor((xMax-xMin)/xStep);
        for (var i=0; i<=imax; i++){
            context.globalCompositeOperation = "destination-over";
            context.moveTo(xMin+xStep*i,yMin);
            context.lineTo(xMin+xStep*i,yMax);
        }
        var jmax = Math.floor((yMax-yMin)/yStep);
        for (var j=0; j<=jmax; j++){
            context.moveTo(xMin,yMin+yStep*j);
            context.lineTo(xMax,yMin+yStep*j);
        }
        context.stroke();
    }
}