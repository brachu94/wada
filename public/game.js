"use strick";
window.addEventListener("load",load);
var socket;

function load() {
    socket = io();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var fps = 40;
	var imageObj = new Image();
    var players = [];
    imageObj.src = 'http://cd1.dibujos.net/dibujos/pintados/2011008/9b6956528621eb4ad9be29f3eeb98610.png';
  
    var currentPlayer = new Player({ contexto: ctx , image: imageObj, x:100, y:100 ,ace:5});
    var objeto2 = new rectangulo({width:300,height:300,x:300,y:300});
    currentPlayer.listenKeyBoardEvent();




  
  
    (function tick() {
        drawWorld();
        setTimeout( function() { tick(); }  , 1000/fps);
    })();

    function drawWorld() {
       
        

        if (hit(currentPlayer,objeto2)==false) {

         ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(300, 300, 300, 300);
        currentPlayer.tick();
        currentPlayer.draw();

        }else {
          
              currentPlayer.tick();
                currentPlayer.draw();
                ctx.clearRect(300,300, 300, 300);

           

        }
       
    

        
    }


  
    /*
    * Socket Listener
    */
    socket.on("rataMensaje", function(data){
      console.log(data);
    });

 
function hit(a,b){

    var hit = false;

    if (b.x+b.width >= a.x && b.x <= a.x + a.width) {
        if (b.y +b.height >= a.y && b.y <= a.x + a.height) {
            ace=0;
            hit = true;
        }
    }


       if (b.x <= a.x && b.x +b.width >= a.x + a.width) {
            if (b.y >= a.y && b.y +b.height >= a.y + a.height ) {
                hit = true;
                ace=0;
            }
        } 

    if (a.x <= b.x && a.x +a.width >= b.x + b.width) {
            if (a.y >= b.y && a.y +a.height >= b.y + b.height ) {
                hit = true;
                ace=0;
            }
        } 



    return hit;
}

}
