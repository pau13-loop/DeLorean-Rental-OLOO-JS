var Vehicle = require('./src/domain/Vehicle/vehicle');
var Category = require('./src/domain/Category/category');

// Create category
var category = Object.create(Category).init('premium', 50);

// Create vehicle
console.log('Vehicle prepared !');
console.log('Vehicle: ', Object.create(Vehicle).init('seat', 'cupra', 'grey', category));


