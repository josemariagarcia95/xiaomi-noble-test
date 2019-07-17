var bluetooth = require("webbluetooth").bluetooth;

bluetooth.requestDevice({
		filters: [{
			services: ["heart_rate"]
		}]
	})
	.then(device => {
		return device.gatt.connect();
	})
	.then(server => {
		console.log("funciooonoooooo");
	});