var shmup = shmup || {};

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
