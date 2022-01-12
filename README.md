# Rent-a-car-OLOO-JS
Implement the business logic of a Rent a car, create an ApiRestfull connected to MongoAtlas and implement the object composition. Introduction to linked objects by prototypes of JS

## Table of Contents

1. [OLOO](#oloo)
1. [Motivation](#motivation)
1. [Technologies Implemented](#technologies-implemented)
1. [Required dependencies](#required-dependencies)
1. [Required dependencies](#required-dependencies)
1. [Bibliography](#bibliography)
<!-- No desarrollados aún -->
1. [Installation](#)
1. [Contribuition](#)
1. [Collaboration References](#)
1. [Domain Documentation](#)
1. [License](#)

## OLOO

What is it OLOO ?

---

## Motivation

This project has been created thanks to the motivation of our coding head teacher to learn the paradigm of JavaScript in the lowest possible leevl. Create an api with Express and implement a connection to a no relationl data base, like MongoDB in this case. I've to say that it was a lot easier than I expected and thanks to projects like this kind if started to develop a big love for JavaScript language and the easy way that JS it turns out to be to give you freedom when you code. 

---

## Technologies Implemented

- JS
- Git
- Node.js
- NPM
- Express
- MongoDB

## Required dependencies

###### Production

- cookie-parser
- debug
- dotenv
- express
- http-errors
- jade
- mongoose
- morgan
- node 
- npm
- express-generator

###### Development

- cross-env
- eslint
- jest
- nodemon
- supertest

---

## User Stories

[***User Stories***](./doc/userStories.md)

---

## Bibliography

[**Bibliography**](./doc/bibliography.md)

---

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

4. Esta función sobra  ???
```
        getMinPrice: function() {
        return this.getOriginalPrice * 0.3;
    },

    if (this.price > this.originalPrice * 0.3)
```

> Si hubiera colocado el método dentro del condicional el lenguage del dominio sería mucho más intuitivo y facilitaria el antenimiento del código en el caso de que futuros programadores vinieran a trabjar en el proyecto

5. Cuando le debo asignar el prototipo a los objetos ? 

```
    //TODO: asignar prototypo ???
    //? Esto se debe hacer al inicializar la bd ???
    //* Asignar la propiedad --> es el momento adecuado ???
    const setPrototypeVehicle = function (vehicle) {
        if (Object.getPrototypeOf(vehicle) !== Vehicle) {
            return Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.brand, vehicle.model, vehicle.color, vehicle.price, vehicle.category));
        }
    }
```

> La asignación o lincamiento de prototipos debe producirse en el domain, en la lógica de dominio. Cada entidad deberá ser la encargada de lincar su prototipo a los objetos.

6. Cuando ordeno los aobjetos ?

> En la llamada a la BD ya puedo hacer que me de los obj ordenados según como me interesa


# Historias de usuario

- Los obj tendrán el precio inicial de cuando se obtuvieron por primera vez de BD. Por esta razón una vez acabe el "Black Friday" podrán restablecer su valor original sin hacer una query costosa, tan solo tendrán que acceder a su atributo "originalPRice" que será [no enumerable, no configurable y no writeable]. El atributo no vendrá definido de BD por lo que nos ahorramos el campo en los obj a la hora de meterlos en BD y lo creamos al inicializar el obj

- El precio mínimo nunca podrá ser inferior al 40% del precio original o en ese caso al precio se lelos obj a la hora de meterlos en BD y lo creamos al inicializar el obj

- El precio mínimo nunca podrá ser inferior al 40% del precio original o en ese caso al precio se le asignará el valor devuelto por la función getMinPrice(). Cuando hay oferta de descuent asignará el valor devuelto por la función getMinPrice(). Cuando hay oferta de descuento como el Black Friday, no se le aplicará está lógica, cualquier descuento sobre el precio está permitido, la ocasión lo merece, rebajas sin control, no ? Política Black Friday consumista !

- Cada vez que un vehiculo cumple un año se le actualizará el 10% del precio original

- Los vehiculos que tienen un descuento son todos, pero los clasicos no actualizarán su precio (solo lo descuentan en BF), su precio mantiene a lo largo del programa.

- Los vehiculos clasicos no se eliminaran nunca de la flota, solo se eliminaran coches con una antiguedad superior a cinco años y categoria no clasica

- Solo se pueden añadir vehiculos a la flota con una antiguedad inferior a cinco años

- Debería comprobar que al actualizar los coches su disponibilidad está seteada a "true". Solo actualizan los vehiculos con disponibilidad seteada a "true"

- Closure para conseguir asistencia técnica ??? Cuando un vehiculo es reservado se define una propiedad del objeto que trata sobre conseguir asistencia técnica. Solo se puede acceder a ella mientras su prop available este seteada a false. Basicamente lo que hace es pasarle un nombre por parametro y devolver un mensaje diciendo: "Asistencia técninca en camino para <nombre>"

### Ciclo de vida del precio del Vehiculo

Seteamos property ORIGINALPRICE
> precio = ORIGINALPRICE

Black Friday
> precio = precio * tasaDescuento

Update Price
> precio = ORIGINALPRICE * (0.1 * añosVehiculo hasta día de hoy)

Restore Price
> updatePrice()


# Service

-  Número de pasajeros me parece más improtante que el color para actualizar la lista, tenemos que ver si el filtro generico funciona y ordenar la lista de menor a mayor. Porque esa lista filtra por año y por núm. de pasajeros.

- Si el filtro generico después ordena de menor a mayor probablemente se pueda incluir el precio. 
    
    > Porque yo quiero que me muestre vehiculos a partir de determinado número de pasajeros
    > A partir de determinado año
    > A partir de determinado precio (o el precio es a partir de este como máximo ??? )

