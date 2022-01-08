const Vehicle = require('../db/models/vehicle');

const VehicleServiceAPI = (function singletonVehicleService() {

    const getAllVehicles = () => {
        //! Aplicar set para devolver obj únicos en lugar de repetidos también
        return Vehicle.find();
    }

    //! Transofmrar en filtro genérico para coche
    const getOneVehicle = (modelName) => {
        //! Conseguimos lista json de objectos
        // let response = await Vehicle.findOne({model: modelName});
        // console.log('Response find one:  ', response);
        // return response;
        return Vehicle.findOne({model: modelName});
    }

    const deleteVehicle = (modelName) => {
        return Vehicle.findOneAndDelete({model: modelName})
    }

    //! Pasar número no determinado de argumantos para actualizar ???
    const updateVehicle = () => {

    }

    return {
        getAllVehicles,
        getOneVehicle,
        deleteVehicle
    }
})();

exports.VehicleServiceAPI = VehicleServiceAPI;