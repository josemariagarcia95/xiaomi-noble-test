const MiBand = require('miband');
const crypto = require('browserify-aes');
const noble = require('noble');
const UUID_BASE = (x) => `0000${x}-0000-3512-2118-0009af100700`
var events = require("events");
var emitter = new events.EventEmitter();

//const key = new Buffer('30313233343536373839404142434445', 'hex');



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

async function connectXiaomi() {
	return new Promise((resolve, reject) => {
		noble.on('stateChange', function (state) {
			if (state === 'poweredOn') {
				//Filter by Miband id
				noble.startScanning(['fee0']);
			} else {
				noble.stopScanning();
			}
		});

		noble.on('discover', function (peripheral) {
			console.log('Found device with local name: ' + peripheral.advertisement.localName);
			console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
			noble.stopScanning();
			peripheral.connect(function (error) {
				if (!error) {
					peripheral.discoverServices(['fee1'], function (error, services) {
						console.log('discovered the following services:');
						console.log('Name: ' + services[0]);
						const authService = services[0];
						authService.discoverCharacteristics([UUID_BASE('0009')], function (error, characteristics) {
							const authChar = characteristics[0];
							authChar.on('data', function (data, isNotification) {
								console.log('Data from auth', data.readUInt8(0));
							});
							// to enable notify
							authChar.subscribe(function (error) {
								console.log('Auth notification notification on');
							});

							authChar.writeValue(Buffer.from([0x02, 0x08]));
							setTimeout(() => reject('Timeout'), 10000);
							resolve(peripheral);
						});
					});
				}
			});
		});
	});
}


//const xiaomi = connectXiaomi();

function discoverXiaomiServices() {
	return new Promise((resolve, reject) => {
		noble.on('stateChange', function (state) {
			if (state === 'poweredOn') {
				//Filter by Miband id
				noble.startScanning(['fee0']);
			} else {
				noble.stopScanning();
			}
		});

		noble.on('discover', function (peripheral) {
			console.log('Found device with local name: ' + peripheral.advertisement.localName);
			console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
			noble.stopScanning();
			peripheral.connect(function (error) {
				if (!error) {
					peripheral.discoverServices(null, function (error, services) {
						console.log('discovered the following services:');
						console.log('Name: ' + services[0]);
						services.forEach(serv => {
							serv.discoverCharacteristics(null, function (error, characteristics) {
								console.log('discovered the following characteristics:');
								for (var i in characteristics) {
									console.log('Name: ' + characteristics[i].name + ' - uuid: ' + characteristics[i].uuid + ' - Service UUID: ' + characteristics[i]._serviceUuid);
								}
							});
						});
					});
				}
			});
		});
	});
}
//discoverXiaomiServices();