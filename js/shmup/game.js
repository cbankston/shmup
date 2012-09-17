var shmup = shmup || {};

shmup.game = function() {
	this.assetManager = null;
	this.entities = [];
	this.context = null;
}

shmup.game.prototype.init = function(ctx, callback) {
	this.context = ctx;

	this.assetManager = new shmup.assetManager();
	this.assetManager.downloadAssets(callback);
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
