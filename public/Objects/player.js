function Player(arguments) {

	this.height = arguments.height;
	this.width = arguments.width;
	this.x = arguments.x;
	this.y = arguments.y;
	this.desplazamiento = arguments.desplazamiento;
	this.doMoveLeft = false;
	this.doMoveRight = false;
	this.doMoveUp = false;
	this.doMoveDown = false;
  	this.doSpace = false;
	this.gameCtx = arguments.contexto;
	this.imageObj = arguments.image;
	
}

Player.prototype.tick = function() {
	if ( this.doMoveLeft){
		this.x -= this.desplazamiento;
	}

	if ( this.doMoveRight){
		this.x += this.desplazamiento;
	}

	if ( this.doMoveUp){
		this.y -= this.desplazamiento;
	}

	if ( this.doMoveDown){
		this.y += this.desplazamiento;
	}
};


Player.prototype.draw = function() {
	//this.gameCtx.drawImage(this.imageObj, this.x, this.y, this.width, this.height);
	this.gameCtx.fillRect( this.x, this.y, this.width, this.height);
};

/*
* Set event keyboard listener
*/

Player.prototype.listenKeyBoardEvent = function() {
	var that = this;

	// https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
	document.addEventListener("keydown", function(e) {
		that.keyDown(e);
	}, false);

	document.addEventListener("keyup", function(e) {
		that.keyUp(e);
	}, false);
};

Player.prototype.keyDown = function(e) {
	var keyCode = e.keyCode;
	//LEFT
	if(keyCode == 37){
		this.doMoveLeft = true;
	}
	//UP
	else if(keyCode == 38){
		this.doMoveUp = true;
	}
	//RIGHT
	else if(keyCode == 39){
		this.doMoveRight = true;
	}
	//DOW
	else if(keyCode == 40){
		this.doMoveDown = true;
	}
};

Player.prototype.keyUp = function(e) {
	var keyCode = e.keyCode;
	//UP KEY
	if(keyCode == 38){
		this.doMoveUp = false;
	}
	//LEFT
	else if(keyCode == 37){
		this.doMoveLeft = false;
	}
	//RIGHT
	else if(keyCode == 39){
		this.doMoveRight = false;
	}
	//DOW
	else if(keyCode == 40){
		this.doMoveDown = false;
	}
  //SPACE
  else if(keyCode == 32){
    this.doSpace = true;
  }
};
