const vehicle = require('./../src/domain/vehicle/vehicle');
const stockResource = require('../resource/stockResource');
const stockService = require('../service/service');

var vehicleAPI = (function singleVehicleController() {

    //? El modulo resource nos lo podemos ahorrar ???
    //* Ya que en principio el la logica de Ollivaners habiamos creado uno ya que el controller actuaba como el router y el resource de Ollivanders actuaria como el controller de node

    const vehicleList = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getStockList());
    }

    //! ATENCIÓN 
    /**
     *TODO: 
     * Si una lista al hacer un getAll me vuelve vacia, donde compruebo si devuelvo la lista o un mensaje de error en el caso de que este vacia, en el Service o en el controller ? Me creo una función que lo único que haga sea comprobar si la lista está vacia y mantnemos SRP ? controller
     ** Es una validación que se realizará constantemente para cada método que devuelva una lista, tendria sentido crearse una función
     */

    // FILTERS
    const vehicleFindOne = function (req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle find one');
    }

    const vehicleFindAllByBrand = function(req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getAllByBrand(req.params.brand));
    }

    // Solamanete nos interesa saber que ese modelo está disponible o existe, no cuantos hay
    const vehicleFindOneByModel = function(req, res) {
        console.log('Controller: ', req.params.model);
        res.status(200).type('json').json(stockService.serviceAPI.getOneByModel(req.params.model));
    }

    // CATEGORY
    const vehicleByCategory = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getAllByCategory(req.params.category));
        
    }

    const vehicleByDiscountTax = function (req, res) {
        console.log("Request: ", req.params.discountTax);
        res.status(200).type('json').json(stockService.serviceAPI.getAllByDiscountTax(req.params.discountTax));
    }

    return {
        vehicleList,
        // FILTERS
        vehicleFindOne,
        vehicleFindAllByBrand,
        vehicleFindOneByModel,
        // CATEGORY
        vehicleByCategory,
        vehicleByDiscountTax
    };

})();

exports.vehicleAPI = vehicleAPI;