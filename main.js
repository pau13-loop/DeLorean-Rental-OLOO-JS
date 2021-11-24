var Vehicle = require('./src/domain/Vehicle');
var Category = require('./src/domain/Category');

// Create category
var category = Object.create(Category).init('premium', 50);

// Create vehicle
console.log('Vehicle prepared !');
console.log('Vehicle: ', Object.create(Vehicle).init('seat', 'cupra', 'grey', category));


