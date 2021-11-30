# Rent-a-car-OLOO-JS
Implement the business logic of a Rent a car, create an ApiRestfull connected to MongoAtlas and implement the object composition. Introduction to linked objects by prototypes of JS



# Install the required dependencies

###### Production

- node 
- npm
- express
- express-generator
- cookie-parser
- debug
- http-errors
- jade
- morgan

###### Development

- jest
- eslint
- nodemon



# Node.js server

To run the node.js server execute the file where you have added the configuration of your server, for example:
> node main.js
You'll get something like the example below:
```
> node hellonode.js
Server running at http://127.0.0.1:3000/
```
Access to the `127.0.0.1:3000` to be able to view the express server up and running.



###### Help
**Remember !**

The IP  `127.0.0.1` always refers to the `localhost`. Then if you access to the url `http://127.0.0.1:3000/` or to this other one `http://localhost:3000/` you'll get the same result, so don't worry about it because both urls point to the same destination point.



# Express server example
To run the node.js server execute the file where you have added the configuration of your server, for example:
> node myAppExpress.js
You'll get something like the example below:
```
> node myAppExpress.js
Example app listening on port 8000
```
Access to the `localhost:8000` to be able to view the express server up and running.



# eslint NOT WORKING AT THE MOMENT

To explain a little further, eslint src/js is a command that we could enter in our terminal/command line to run eslint on JavaScript files contained in the src/js directory inside our app directory. Including the above inside our app's package.json file provides a shortcut for this command — lint.



# Working with EXPRESS

Then run the app:
> `DEBUG=rent-a-car:* npm start`

### www file
The file /bin/www is the application entry point! The very first thing this does is require() the "real" application entry point (app.js, in the project root) that sets up and returns the express() application object.

### app.js
This file creates an express application object (named app, by convention), sets up the application with various settings and middleware, and then exports the app from the module.

### Routes
First, it loads the express module and uses it to get an express.Router object. Then it specifies a route on that object and lastly exports the router from the module (this is what allows the file to be imported into app.js).

###### Why "next" in router function() ?
One thing of interest above is that the callback function has the third argument 'next', and is hence a middleware function rather than a simple route callback. While the code doesn't currently use the next argument, it may be useful in the future if you want to add multiple route handlers to the '/' route path.

### Views (templates)
The views (templates) are stored in the /views directory (as specified in app.js) and are given the file extension .pug. The method Response.render() is used to render a specified template along with the values of named variables passed in an object, and then send the result as a response. 


# Bibliography

###### OLOO explanation
> https://chamikakasun.medium.com/javascript-prototype-and-prototype-chain-explained-fdc2ec17dd04
> https://www.debuggr.io/js-prototype-in-depth/

###### OLOO, why to use it ? 
> https://levelup.gitconnected.com/an-introduction-to-oloo-in-javascript-f2ba3445896a
> https://medium.com/predict/javascript-prototypal-inheritance-constructors-vs-oloo-d90c482aaa55
> https://stackoverflow.com/questions/29788181/kyle-simpsons-oloo-pattern-vs-prototype-design-pattern
> https://stackoverflow.com/questions/34838294/what-is-difference-between-creating-object-using-object-create-and-object-assi#:~:text=at%2020%3A01-,Object.,Deep%20copying%20provides%20prototype%20chain.

###### Object.create(), how it works ? 
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

###### Protypes and OLOO, by Kyle Simpson
> https://pepa.holla.cz/wp-content/uploads/2016/08/You-Don-t-Know-JS-this-Object-Prototypes.pdf


###### Examples OLOO
> https://www.learngamedevelopment.net/blog/40

###### Object.defineProperty in constructor:
> https://stackoverflow.com/questions/18524652/how-to-use-javascript-object-defineproperty

###### Respuesta para linkar objetos hata tres niveles ???
> https://stackoverflow.com/questions/33455026/not-sharing-object-properties-in-oloo-inheritance



# Lógica de negocio a aplicar:

- Los obj tendrán el precio inicial de cuando se obtuvieron por primera vez de BD. Por esta razón una vez acabe el "Black Friday" podrán restablecer su valor original sin hacer una query costosa, tan solo tendrán que acceder a su atributo "originalPRice" que será [no enumerable, no configurable y no writeable]. El atributo no vendrá definido de BD por lo que nos ahorramos el campo en los obj a la hora de meterlos en BD y lo creamos al inicializar el obj.

## Atribs a aplicar (en los prototipos)

- originalPrice 

## Método a aplicar (Lógica prototipos)

- UpdatePrice (este método se ejecutará cuando el vehiculo lleve en stock 1 año, actualizará el precio un 5%)
- applyDiscount (Black friday method, se hace el cálculo con el discountTax, atributo distinto para cada categoria)
- RestorePrice (devuelve su precio original después de un BlackFriday)

## Método a aplicar (en el Service)

###### Find alls
- [x] findAll
- [x][] findByBrand (or brands ???)
- [x] findByColor
- [x] findByPrice
- [x] findByCategory
- [x] findByDiscountTax
- [x] findByFuel
- [x] findByPassengersNum
- [x] findByYear
- [x] findAvailables
- [] findByCharacteristics

###### Find ones
- [x] findModel

###### Other
- findByPriceMinorTo
- findByPriceMajorTo

- SortByMayorPrice
- SortByMinorPrice
 

- Actualizar un vehiculo ? PUT
- Eliminar un vehiculo ? DELETE
- Añadir un vehiculo ? POST



# Preguntas que han ido surgiendo a lo largo del dessarrollo:

### Dudas que han surgido en el Controller

1. El modulo resource nos lo podemos ahorrar ??? Ya que en principio el la logica de Ollivaners habiamos creado uno ya que el controller actuaba como el router y el resource de Ollivanders actuaria como el controller de node. 

> Sí, la lógica del resoruces es una capa que nos podemos ahorrar, en Ollivanders no teniamos la capa routers.

2.    Si una lista al hacer un getAll me vuelve vacia, donde compruebo si devuelvo la lista o un mensaje de error en el caso de que este vacia, en el Service o en el controller ? Me creo una función que lo único que haga sea comprobar si la lista está vacia y mantnemos SRP ? Es una validación que se realizará constantemente para cada método que devuelva una lista, tendria sentido crearse una función. 

> La validación se debería hacer, se puede crear un método para ello y debería estar creada en el Controller de la aplicación

3.   Las validaciones se deberían hacer en el service y el objeto debería encapsular una lógica simple que solo sea llamada si se cumple la condición ??? Los if-else deberían ir en el service ?

> La lógica de negocio debe ir encapsulada en el dominio. En el service solo se ataca la bd y se filtra u ordena si se desea pero la lógica de negocio, que es lo que planteo en este caso, la encapsulamos en el dominio

4. 

# ACUERDATE PAU PORFAVOR !!!
- Debería comprobar que al actualizar los coches su disponibilidad está seteada a "true"

- Implementar un único método para los filtros, que sea generico y filtre por cualquier campo del vehiculo. El método sería algo así
```
const filterVehicle = function(keyFilter, filter) {
    let stockFiltered = [];
    mockStockList.forEach(vehicle => {
        //! en vehicle.filter será la key del filtro, vehicle.keyFilter
        if (vehicle.keyFilter === filter) {
            stockFiltered = [...stockFiltered, vehicle];
        }
    });
    return stockFiltered;
}
```
Ahora tenemos que ver cuando queremos ordenar la lista o si solo lo implementamos para los filtros en los cual no haga falta ordenar la lista