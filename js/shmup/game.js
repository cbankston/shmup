var shmup = shmup || {};

shmup.game = function() {
	this.entities = [];
	this.context = null;
}

shmup.game.prototype.addEntity = function(entity) {
	this.entities.push(entity);
}

shmup.game.prototype.init = function(ctx) {
	this.context = ctx;

	this.addEntity(new shmup.entity(75, 75));
	this.addEntity(new shmup.entity(515, 55, 1));
	this.addEntity(new shmup.entity(55, 555));
	this.addEntity(new shmup.entity(245, 255, 1));
	this.addEntity(new shmup.entity(341, 333));
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
//	console.log('updating');

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

shmup.entity = function(x, y, flag) {
	this.x = x || 0;
	this.y = y || 0;
	this.flag = flag || 0;
	this.step = 0;
}

shmup.entity.prototype.update = function() {
	if (this.step > 15) {
		this.flag = !this.flag;
		this.step = 0;
	}

	this.step ++;

	if (this.flag) {
		this.x -= 1;
		this.y -= 1;
	} else {
		this.x += 1;
		this.y += 1;
	}
}

shmup.entity.prototype.draw = function(ctx) {
	ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.arc(this.x, this.y, 20, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
}
