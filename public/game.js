"use strick";
window.addEventListener("load",load);
var socket;

function load() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var fps = 40;
    var imageObj = new Image();
    var players = [];
    imageObj.src = 'http://cd1.dibujos.net/dibujos/pintados/2011008/9b6956528621eb4ad9be29f3eeb98610.png';
  
    var currentPlayer = new Player({ contexto: ctx , image: imageObj, x:200, y:200 , desplazamiento:5, height:50, width:50 } );
    var objeto2 = new rectangulo({width:300, height:300, x:300, y:300 });
    currentPlayer.listenKeyBoardEvent();

  
    (function tick() {
        drawWorld();
        setTimeout( function() { tick(); }  , 1000/fps);
    })();

    function drawWorld() {
        // siempre se tiene que despintar y volver a pintar los objectos 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(300, 300, 300, 300);
        if ( !hit(currentPlayer, objeto2) ) {   // si existe colicion que no entre al tick del player para que no pueda aumentar su posicion        
            currentPlayer.tick();            
        }         
        currentPlayer.draw();        
    }
 
    function hit(a,b){
        var hit = false;
        // The objects are touching
        if (a.x < b.x + b.width  && a.x + a.width  > b.x &&
            a.y < b.y + b.height && a.y + a.height > b.y) { // is hit
            
            /**
             *  hago una formula para saber si tengo que sumar o restar la posicion por ejemplo si es que el player coliciona desde ariba se le tiene que 
             *  restar su aceleracion y si se coliciona de abajo el player se le tiene que sumar su aceleracion , el mismo flujo para "y".
             *  La formula consiste en restar la posicion en "x" del player menos la posicion "x" del otro objecto "b", entonces obtendremos un numero que 
             *  estaria dentro del rango del ancho del objecto "b" por eso comparamos la mitad del ancho del objecto "b" para ver si es que este numero que 
             *  hemos obtenido es menor o mayor a la mitad del ancho del objecto "b", asi sabremos si es mayor es porque el objecto entro por el lado derecho
             *  y entonces se le tendria que sumar y si es menor se le tendria que restar, el mismo flujo es para setearle la posicion "y" del player
             */

            a.x = (a.x - b.x) < ( b.width / 2) ? a.x - 1 : a.x + 1; // seteandole el retroceso dependiendo de su posicion
            a.y =  (a.y - b.y) < ( b.height / 2) ? a.y - 1 : a.y + 1; // seteandole el retroceso dependiendo de su posicion

            hit = true;
        }
        return hit;
    }

}
