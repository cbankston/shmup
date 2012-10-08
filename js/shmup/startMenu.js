var shmup = shmup || {};

shmup.startMenu = function(game){
  this.game = game;
  this.started = false;
};

shmup.startMenu.prototype.draw = function(ctx) {
    var middle = ctx.canvas.width / 2;
    var heightBlock = ctx.canvas.height / 38;

    ctx.font = 'bold 60px Arial';
    ctx.fillText('SHMUP', middle - 108, heightBlock * 6);

    ctx.font = 'bold 24px Arial';
    ctx.fillText('Press Shoot to Start', middle - 116, heightBlock * 32);

    ctx.font = 'bold 24px Arial';
    ctx.fillText('Controls:', 0, heightBlock * 35);

    ctx.font = 'bold 14px Arial';
    ctx.fillText('Move:  Up, Down, Left, Right', 0, heightBlock * 36);
    ctx.fillText('Shoot: Spacebar', 0, heightBlock * 37);
};

shmup.startMenu.prototype.update = function() {
  if (this.started === false && this.game.controller.keydown.space) {
    this.started = true;
    this.game.start();
  }
};
