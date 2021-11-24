var Vehicle = require('./src/domain/vehicle');

// Create vehicle
console.log('Vehicle prepared !');
console.log('Vehicle: ', Object.create(Vehicle).init('seat', 'cupra', 'grey'));

