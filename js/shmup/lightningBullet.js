var shmup = shmup || {};

shmup.lightningBullet = function(game, x, y) {
	shmup.entity.call(this, x, y);

	this.game = game;
	this.sprite = game.assetManager.getImage('/assets/sprites/lightning-bullet.png');

	this.animation = new shmup.animation([
		{sprite: 'bullet_1', time: 0.2},
		{sprite: 'bullet_2', time: 0.2},
		{sprite: 'bullet_3', time: 0.2},
		{sprite: 'bullet_2', time: 0.2}
	], this.sprites);
}
shmup.lightningBullet.prototype = new shmup.entity();
shmup.lightningBullet.prototype.constructor = shmup.lightningBullet;

shmup.lightningBullet.prototype.sprites = new shmup.spriteSheet({
	width: 21,
	height: 28,
	sprites: [
		{name: 'bullet_1'},
		{name: 'bullet_2', x: -21, y: 28},
		{name: 'bullet_3', x: -42, y: 56},
	]
});

shmup.lightningBullet.prototype.update = function() {
	this.y -= 10;
}

shmup.lightningBullet.prototype.draw = function(ctx) {
	this.animation.animate(this.game.timer.getSeconds());

	var frame = this.animation.getSprite();
	ctx.drawImage(this.sprite, frame.x, frame.y, frame.width, frame.height, this.x, this.y, frame.width, frame.height);
}
