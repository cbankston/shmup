var shmup = shmup || {};

shmup.game = function() {
	this.entities = [];
	this.context = null;
}

shmup.game.prototype.init = function(ctx) {
	this.context = ctx;
}

shmup.game.prototype.draw = function(callback) {
	
}

shmup.game.prototype.update = function() {
//	console.log('updating');
}

shmup.game.prototype.loop = function() {
	this.update();
	this.draw();
}

shmup.game.prototype.start = function() {
	console.log('Starting game.');

	var that = this;
	(function gameLoop(){
		that.loop();
		requestAnimationFrame(gameLoop, that.context.canvas);
	})();
}
