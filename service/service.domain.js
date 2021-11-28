var mockStockTwoVehicles = require('../mock/mockListTwoVehicles');
const Category = require('../src/domain/category/category');
const Vehicle = require('../src/domain/vehicle/vehicle');

var ServiceDomainAPI = (function singleDomainService() {

    const setPrototypeVehicle = function (vehicle) {
        return Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.brand, vehicle.model, vehicle.color, vehicle.price, vehicle.category));
    }

    const setPrototypeCategory = function (category) {
        return Object.setPrototypeOf(category, Category.init(category.name, category.discountTax));
    }

    const updatePriceStock = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            //? Esto se debe hacer al inicializar la bd ???
            //* Asignar la propiedad --> es el momento adecuado ???
            if (Object.getPrototypeOf(vehicle) !== Vehicle) {
                setPrototypeVehicle(vehicle);
            }
            //
            vehicle.updatePrice();
        });
        return mockStockTwoVehicles;
    }

    const applyDiscount = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            if (Object.getPrototypeOf(vehicle) !== Vehicle) {
                setPrototypeVehicle(vehicle);
            }
            let categoryVehicle = vehicle.getCategory();
            if (Object.getPrototypeOf(categoryVehicle) !== Category) {
                setPrototypeCategory(categoryVehicle);
            }
            vehicle.price = categoryVehicle.applyDiscount(vehicle.price);
        });
        return mockStockTwoVehicles;
    }

    

    return {
        updatePriceStock,
        applyDiscount
    }
})();

exports.ServiceDomainAPI = ServiceDomainAPI;