var mockStockTwoVehicles = require('../mock/mockListTwoVehicles');
const Category = require('../src/domain/category/category');
const Vehicle = require('../src/domain/vehicle/vehicle');

var ServiceDomainAPI = (function singleDomainService() {

    //? Esto se debe hacer al inicializar la bd ???
    //* Asignar la propiedad --> es el momento adecuado ???
    const setPrototypeVehicle = function (vehicle) {
        if (Object.getPrototypeOf(vehicle) !== Vehicle) {
            return Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.brand, vehicle.model, vehicle.color, vehicle.price, vehicle.category));
        }
    }

    const setPrototypeCategory = function (category) {
        if (Object.getPrototypeOf(category) !== Category) {
            return Object.setPrototypeOf(category, Category.init(category.name, category.discountTax));
        }
    }

    const updatePriceStock = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            setPrototypeVehicle(vehicle);
            vehicle.updatePrice();
        });
        return mockStockTwoVehicles;
    }

    const applyDiscount = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            setPrototypeVehicle(vehicle);
            let categoryVehicle = vehicle.getCategory();
            console.log('Category vehicle: ', categoryVehicle);
            setPrototypeCategory(categoryVehicle);
            vehicle.price = categoryVehicle.applyDiscount(vehicle.price);
        });
        return mockStockTwoVehicles;
    }

    const restorePrice = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            setPrototypeVehicle(vehicle);
            vehicle.price = vehicle.getOriginalPrice();
        });
        return mockStockTwoVehicles;
    }

    const bookVehicle = function(brand, model) {
        let vehicleToBook = mockStockTwoVehicles.find(vehicle => vehicle.brand === brand && vehicle.model === model);
        if (vehicleToBook) {
            vehicleToBook.available = false;
            return mockStockTwoVehicles;
        }
        return undefined;
    }

    return {
        updatePriceStock,
        applyDiscount,
        restorePrice,
        bookVehicle
    }
})();

exports.ServiceDomainAPI = ServiceDomainAPI;