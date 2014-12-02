define(function(require, exports, module) {

	var DropEvent = require("../events/DropEvent");

	var DropCtrl = function(){
		this.down = false;
		this.dropSource = null;
	};

	var p = DropCtrl.prototype;

	p.init = function(stage){
		var me = this;
		stage.addEventListener('mousedown', function(e){
			if(e.target._dropable)
				me.dropSource = e.target;
		});

		stage.addEventListener('mouseup', function(e){
			var dropTarget = e.target;
			me.dropSource && dropTarget && dropTarget !== me.dropSource && dropTarget.dispatchEvent(new DropEvent({
				type : DropEvent.DROP,
				global : e.global,
				local : e.local,
				dropSource : me.dropSource
			}));
			me.dropSource = null;
		});
	}

	return new DropCtrl();

});