var shmup = shmup || {};

shmup.pawn = function(game, x, y, flag) {
	shmup.entity.call(this, x, y, flag);
	this.speed = 4.5;
	this.sprite = game.assetManager.getImage('/assets/images/sentry.png');
}
shmup.pawn.prototype = new shmup.entity();
shmup.pawn.prototype.constructor = shmup.pawn;

shmup.pawn.prototype.update = function() {
	if (keydown.space)
		console.log('shoot');

	if (keydown.left)
		this.x -= this.speed;

	if (keydown.right)
		this.x += this.speed;

	if (keydown.up)
		this.y -= this.speed;

	if (keydown.down)
		this.y += this.speed;
}

shmup.pawn.prototype.draw = function(ctx) {
	ctx.drawImage(this.sprite, this.x, this.y);
}
