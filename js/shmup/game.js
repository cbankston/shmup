var shmup = shmup || {};

shmup.game = function() {
	this.assetManager = null;
	this.entities = [];
	this.context = null;
	this.timer = null;
}

shmup.game.prototype.addEntity = function(entity) {
	this.entities.push(entity);
}

shmup.game.prototype.init = function(ctx, callback) {
	this.context = ctx;

	this.timer = new shmup.frameTimer();
	this.timer.tick();

	this.assetManager = new shmup.assetManager();
	this.assetManager.addImage('/assets/images/sentry.png');
	this.assetManager.addImage('/assets/images/alien.png');
	this.assetManager.addImage('/assets/sprites/lightning-bullet.png');
	this.assetManager.downloadAssets(callback);

	this.addEntity(new shmup.enemy(this, 75, 75));
	this.addEntity(new shmup.enemy(this, 515, 55, 1));
	this.addEntity(new shmup.pawn(this, 55, 555));
	this.addEntity(new shmup.enemy(this, 245, 255, 1));
	this.addEntity(new shmup.enemy(this, 341, 333));
}

shmup.game.prototype.draw = function(callback) {
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

	for (var i = 0, entitiesCount = this.entities.length; i < entitiesCount; i++) {
		this.entities[i].draw(this.context);
	}

	if (callback) {
		callback(this);
	}
}

shmup.game.prototype.update = function() {
	this.timer.tick();
	for (var i = 0, entitiesCount = this.entities.length; i < entitiesCount; i++) {
		this.entities[i].update();
	}
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
