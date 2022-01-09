const Vehicle = require('../db/models/vehicle');
const objectParsers = require('../utils/objectParsers');

const VehicleServiceAPI = (function singletonVehicleService() {

    const getAllVehicles = () => {
        //! Aplicar set para devolver obj únicos en lugar de repetidos también
        return Vehicle.find().then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    //! Transofmrar en filtro genérico para coche
    const getOneVehicle = (key, value) => {
        return (key === 'id' 
        ? Vehicle.findById(value)
        : Vehicle.findOne({[key]: value}))
            .exec()
            .then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    const deleteVehicle = (key, value) => {
        return (key === 'id' 
        ? Vehicle.findByIdAndDelete(value)
        : Vehicle.findOneAndDelete({[key]: value}))
        .exec()
        .then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    //! REFACTOR
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