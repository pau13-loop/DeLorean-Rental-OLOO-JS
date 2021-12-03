var mockStockTwoVehicles = require('../mock/mockStockList');
const Category = require('../src/domain/category/category');
const Vehicle = require('../src/domain/vehicle/vehicle');

var ServiceDomainAPI = (function singleDomainService() {

    const updatePriceStock = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            Vehicle.setPrototypeVehicle(vehicle);
            vehicle.updatePrice();
        });
        return mockStockTwoVehicles;
    }

    const applyDiscount = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            Vehicle.setPrototypeVehicle(vehicle);
            let categoryVehicle = vehicle.getCategory();
            Category.setPrototypeCategory(categoryVehicle);
            vehicle.price = categoryVehicle.applyDiscount(vehicle.price);
        });
        return mockStockTwoVehicles;
    }

    //! Esto ha cambiado, ahora se llama al update price para conseguir su precio original
    const restorePrice = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            Vehicle.setPrototypeVehicle(vehicle);
            vehicle.price = vehicle.getOriginalPrice();
        });
        return mockStockTwoVehicles;
    }

    //TODO: seguro que es la mejor implementación devolver un null ???
    // Devolvemos null para que devuelva el error 404 en caso de no encontrar el vehiculo
    const bookVehicle = function (brand, model) {
        let vehicleToBook = mockStockTwoVehicles.find(vehicle => vehicle.brand === brand && vehicle.model === model);
        if (vehicleToBook) {
            vehicleToBook.available = false;
            return vehicleToBook;
        }
        return null;
    }

    // Devolvemos null para que devuelva el error 404 en caso de no encontrar el vehiculo
    const returnVehicle = function (brand, model) {
        let vehicleToReturn = mockStockTwoVehicles.find(vehicle => vehicle.brand === brand && vehicle.model === model && !vehicle.available);
        if (vehicleToReturn) {
            vehicleToReturn.available = true;
            return mockStockTwoVehicles;
        }
        return null;
    }

    return {
        updatePriceStock,
        applyDiscount,
        restorePrice,
        bookVehicle,
        returnVehicle
    }
})();

exports.ServiceDomainAPI = ServiceDomainAPI;