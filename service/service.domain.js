var mockStockTwoVehicles = require('../mock/mockListTwoVehicles');
const Vehicle = require('../src/domain/vehicle/vehicle');

var ServiceDomainAPI = (function singleDomainService() {

    const assignPrototype = function(vehicle) {
        return Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.brand, vehicle.model, vehicle.color, vehicle.price, vehicle.category));
    }

    const updatePriceStock = function () {
        mockStockTwoVehicles.forEach(vehicle => {
            //? Esto se debe hacer al inicializar la bd ???
            //* Asignar la propiedad --> es el momento adecuado ???
            if (Object.getPrototypeOf(vehicle) !== Vehicle) {
                assignPrototype(vehicle);
            }
            //
            vehicle.updatePrice();
        });
        return mockStockTwoVehicles;
    }

    

    return {
        updatePriceStock
    }
})();

exports.ServiceDomainAPI = ServiceDomainAPI;