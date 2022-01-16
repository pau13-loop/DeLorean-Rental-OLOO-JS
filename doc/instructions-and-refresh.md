# Refresh Concepts

## MongoDB define a Schema (Good PRactices Video)

### Relational

Link all the tables witha  foreign key (Normalization). This will avoid get duplciated data and will help us go through nomralizing "data modelling".

### No Relational

3 thing to keep in mind while developing an Schema: 

1. No Rules
2. No Process
3. No Algorithm

3 things to keeo in mind to develop and Schema: 

1. How to store the data
2. Query Performance
3. Reasonable amount of hardware

### Embeding vs Referencing

Embeed unless you can justify why is better referencing !

##### Rule 1

Favor embeding unless is a compelling reason not to.

##### Rule 2

Needing to access an object on its own is a compelling reason not to embed it.

##### Rule 3 

Avoid JOINs and $lookups if they can be, but don't be afraid if they can provide a better schema deign.

##### Rule 4

Arrays should not grow without bound.

##### Rule 5

How you model your data depends-entirely-on your particular aplication's data access patterns

## Types relationships in MongoDB

- One to One

> Use key-value pairs

- One to Fex

> Prefer embeding

- One to Many

> Prefer Referencing

- One to Squillions

> Prefer Referencing

- Many to Many

> Prefer Referencing

## Cross-env 

> Basically it let you run scripts that set and use environment variables across platforms.

## Security 

To be able to use the environment variables at the file .env you'll have to install the following dependency:
```bash
     npm install dotenv --save
```

And now add at the top of the files the following `require('dotenv').config()` to be able to user the environment variables saved at the .env

# ATENTION

The DB from production has not to be touch at any moment. This means we wont do any insert or deletion. 

# This I've Forgot

## app.js

En la app se definen las rutas y los midelware. A partir de cada ruta definida se le añade la extensión que se le quiera dar y las rutas del endpoint definido comenzarán a partir de dicha extensión. <br/>
Por ejemplo:<br/>
Queremos definir el endpoint para el **stock**. En la app añadiremos el siguiente statement `app.use('/stock', stockRouter)`. Todos los endpoints de stock serán creado a a partir de, `/stock/<name new endpoint of stock>`.  