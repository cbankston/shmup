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

shmup.assetManager = function() {
	this.assetCache = {};

	this.assetFailureCount = 0;
	this.assetSuccessCount = 0;

	this.imageAssets = [];
	this.soundAssets = [];
}

shmup.assetManager.prototype.addImage = function(path) {
	this.imageAssets.push(path);
}

shmup.assetManager.prototype.addSound = function(path) {
	this.soundAssets.push(path);
}

shmup.assetManager.prototype.downloadAssets = function(callback) {
	if (this.isComplete()) {
		callback(this);
	} else {
		this.downloadImages(callback);
		this.downloadSounds(callback);
	}
}

shmup.assetManager.prototype.downloadImages = function(callback) {
	for(var i = 0, queueLength = this.imageAssets.length; i < queueLength; i++) {
		var path = this.imageAssets[i];
		var img = new Image();
		var that = this;
		img.addEventListener('load', function() {
			that.assetSuccessCount ++;
			if (that.isComplete())
				callback(this);
		}, false);
		img.addEventListener('error', function() {
			that.assetFailureCount ++;
			if (that.isComplete())
				callback(this);
		}, false);
		img.src = path;
		this.assetCache[path] = img;
	}
}

shmup.assetManager.prototype.downloadSounds = function(callback) {
	for(var i = 0, queueLength = this.soundAssets.length; i < queueLength; i++) {
		var path = this.soundAssets[i];
		// @TODO revise this after implementing the sound manager
		this.assetFailureCount ++;
		if (this.isComplete())
			callback(this);
		this.assetCache[path] = null;
	}
}

shmup.assetManager.prototype.getImage = function(path) {
	return this.assetCache[path];
}

shmup.assetManager.prototype.getSound = function(path) {
	return this.assetCache[path];
}

shmup.assetManager.prototype.isComplete = function(callback) {
	return (this.imageAssets.length + this.soundAssets.length) === (this.assetFailureCount + this.assetSuccessCount);
}
