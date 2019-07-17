const MiBand = require('miband');
const crypto = require('browserify-aes');
const noble = require('noble');

//const key = new Buffer('30313233343536373839404142434445', 'hex');

noble.on('stateChange', function (state) {
	if (state === 'poweredOn') {
		//Filter by Miband id
		noble.startScanning();
	} else {
		noble.stopScanning();
	}
});


/*
noble.on('discover', function (peripheral) {
	console.log('Found device with local name: ' + peripheral.advertisement.localName);
	console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
	noble.stopScanning();
	peripheral.connect(function (error) {
		if (!error) {
			peripheral.discoverServices(['1802'], function (error, services) {
				console.log('discovered the following services:');
				console.log('Name: ' + services[0]);
				const alertService = services[0];
				alertService.discoverCharacteristics(['2a06'], function (error, characteristics) {
					const alertChar = characteristics[0];
					console.log(alertChar);
					alertChar.write(Buffer.from([0x01]), true, function (error) {
						if (!error) {
							console.log('set alert level to mid (1)');
						}
					});
				});
			});
		}
	});
});
*/

function connectXiaomi() {
	//todo
}