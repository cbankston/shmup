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

};
