var shmup = shmup || {};

shmup.game = function() {
	this.assetManager = null;
	this.entities = [];
	this.huds = [];
	this.controller = null;
	this.context = null;
	this.timer = null;
};

shmup.game.prototype.addEntity = function(entity) {
	this.entities.push(entity);
};

shmup.game.prototype.addHud = function(hud) {
	this.huds.push(hud);
};

shmup.game.prototype.init = function(ctx, callback) {
	this.context = ctx;

	this.timer = new shmup.frameTimer();
	this.timer.tick();

  this.controller = new shmup.controller();

	this.timer = new shmup.frameTimer();
	this.timer.tick();

  // start game loop
	var that = this;
	(function gameLoop(){
		that.loop();
		requestAnimationFrame(gameLoop, that.context.canvas);
	})();

	this.assetManager = new shmup.assetManager();
	this.assetManager.addImage('/assets/images/sentry.png');
	this.assetManager.addImage('/assets/images/alien.png');
	this.assetManager.addImage('/assets/sprites/lightning-bullet.png');
	this.assetManager.downloadAssets(callback);
};

shmup.game.prototype.showStartMenu = function() {
  this.addHud(new shmup.startMenu(this));
};

shmup.game.prototype.draw = function(callback) {
	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

	for (var i = 0, entitiesCount = this.entities.length; i < entitiesCount; i++) {
		this.entities[i].draw(this.context);
	}

	for (i = 0; i < this.huds.length; i++) {
		this.huds[i].draw(this.context);
	}

	if (callback) {
		callback(this);
	}
};

shmup.game.prototype.update = function() {
	this.timer.tick();
	for (var i = 0, entitiesCount = this.entities.length; i < entitiesCount; i++) {
		this.entities[i].update();
	}

	for (i = 0; i < this.huds.length; i++) {
		this.huds[i].update();
	}
};

shmup.game.prototype.loop = function() {
	this.update();
	this.draw();
};

shmup.game.prototype.start = function() {
  this.huds.pop();

	this.addEntity(new shmup.enemy(this, 75, 75));
	this.addEntity(new shmup.enemy(this, 515, 55, 1));
	this.addEntity(new shmup.pawn(this, 55, 555));
	this.addEntity(new shmup.enemy(this, 245, 255, 1));
	this.addEntity(new shmup.enemy(this, 341, 333));
};
