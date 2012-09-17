var shmup = shmup || {};

shmup.pawn = function(game, x, y, flag) {
	shmup.entity.call(this, x, y, flag);
	this.game = game;
	this.speed = 4.5;
	this.sprite = game.assetManager.getImage('/assets/images/sentry.png');
	this.lastShot = 0
}
shmup.pawn.prototype = new shmup.entity();
shmup.pawn.prototype.constructor = shmup.pawn;

shmup.pawn.prototype.update = function() {
	if (keydown.space)
		this.shoot();

	if (keydown.left)
		this.x -= this.speed;

	if (keydown.right)
		this.x += this.speed;

	if (keydown.up)
		this.y -= this.speed;

	if (keydown.down)
		this.y += this.speed;
}

shmup.pawn.prototype.shoot = function() {
	var currentTime = +new Date();
	if ((currentTime - this.lastShot) > 100) {
		var bullet = new shmup.lightningBullet(this.game, this.x, this.y);
		this.game.addEntity(bullet);
		this.lastShot = currentTime;
	}
}

shmup.pawn.prototype.draw = function(ctx) {
	ctx.drawImage(this.sprite, this.x, this.y);
}
