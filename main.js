var Vehicle = require('./src/domain/vehicle/vehicle');
var Category = require('./src/domain/category/category');

// Create category
var category = Object.create(Category).init('premium', 50);
var seatCupra = Object.create(Vehicle).init('seat', 'cupra', 'grey', 50, category);
// Create vehicle
console.log('Vehicle prepared !');
console.log(`Vehicle: ${seatCupra}`);
console.log(seatCupra.getName());
console.log(seatCupra.getOriginalPrice());

console.log('Número props: ' + Object.keys(seatCupra).length);

