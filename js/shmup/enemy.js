var shmup = shmup || {};

shmup.enemy = function(game, x, y, flag) {
	shmup.entity.call(this, x, y, flag);
	this.sprite = game.assetManager.getImage('/assets/images/alien.png');
};
shmup.enemy.prototype = new shmup.entity();
shmup.enemy.prototype.constructor = shmup.enemy;

shmup.enemy.prototype.draw = function(ctx) {
	ctx.drawImage(this.sprite, this.x, this.y);
};
