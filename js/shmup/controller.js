var shmup = shmup || {};

shmup.controller = function() {
  this.keydown = {};

  this.init();
};

shmup.controller.prototype.initialized = false;

shmup.controller.prototype.init = function() {
  if (this.initialized === true)
    return;

  shmup.controller.initialized = true;

  var that = this;
  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind("keydown", function(event) {
    that.keydown[keyName(event)] = true;
  });

  $(document).bind("keyup", function(event) {
    that.keydown[keyName(event)] = false;
  });
};
