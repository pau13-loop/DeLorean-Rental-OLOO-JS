var mockStockTwoVehicles = require('../mock/mockListTwoVehicles');
const Category = require('../src/domain/category/category');
const Vehicle = require('../src/domain/vehicle/vehicle');

var ServiceDomainAPI = (function singleDomainService() {

    //TODO: asignar prototypo ???
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

    //TODO: seguro que es la mejor implementación devolver un null ???
    // Devolvemos null para que devuelva el error 404 en caso de no encontrar el vehiculo
    const bookVehicle = function (brand, model) {
        let vehicleToBook = mockStockTwoVehicles.find(vehicle => vehicle.brand === brand && vehicle.model === model);
        if (vehicleToBook) {
            vehicleToBook.available = false;
            return mockStockTwoVehicles;
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