# Rent-a-car-OLOO-JS
Implement the business logic of a Rent a car, create an ApiRestfull connected to MongoAtlas and implement the object composition. Introduction to linked objects by prototypes of JS

# Install the required dependencies

- node 
- npm
- express

# Node.js server

To run the node.js server execute the file where you have added the configuration of your server, for example:
> node main.js
You'll get something like the example below:
```
> node hellonode.js
Server running at http://127.0.0.1:3000/
```




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

- findAll
- findOne
- findByCategory
- findByPriceMinorTo
- findByPriceMajorTo
- findByBrand (or brands ???)
- findByNumPassengers
- findByColor
- 
- SortByMayorPrice
- SortByMinorPrice
- 