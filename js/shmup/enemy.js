var shmup = shmup || {};

shmup.enemy = function(game, x, y, flag) {
	shmup.entity.call(this, x, y);
	this.sprite = game.assetManager.getImage('/assets/images/alien.png');
	this.flag = flag || 0;
	this.step = 0;
};
shmup.enemy.prototype = new shmup.entity();
shmup.enemy.prototype.constructor = shmup.enemy;

shmup.enemy.prototype.update = function() {
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
};

shmup.enemy.prototype.draw = function(ctx) {
	ctx.drawImage(this.sprite, this.x, this.y);
};
