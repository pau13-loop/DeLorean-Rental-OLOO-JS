# DeLorean Rental

Implement the business logic of a Rent a car, create an ApiRestfull connected to MongoAtlas and implement the object composition. Introduction to linked objects by prototypes of JS. 
The basics of a project to understand JavaScript in its low level, get a nice perspective of the scripting language and get familiarized with it. 

What else we cana ask for ? Give a chance and browse the code, you'll love it too (JavaScript, the project can be done much better, I'm sure of it).

[![status application](https://img.shields.io/badge/status-stable-brightgreen)](https://github.com/pau13-loop/DeLorean-Rental-OLOO-JS)
[![test passing](https://img.shields.io/badge/test-passing-green)](https://jestjs.io/)
[![test coverage](https://img.shields.io/badge/91%25-coverage-success)](https://jestjs.io/)
[![node version](https://img.shields.io/badge/node-v16.13.0-brightgreen)](https://nodejs.org/en/)
[![npm version](https://img.shields.io/badge/npm-v8.1.0-critical)](https://www.npmjs.com/)
[![version application](https://img.shields.io/badge/version-v1.0.1-informational)](https://github.com/pau13-loop/DeLorean-Rental-OLOO-JS/releases/tag/v1.0.1)


<!-- Source: https://www.deloreanrental.com/ -->
<p align="center">
  <img src="./doc/img/rent-a-car.gif" alt="animated" width="80%" height="300" />
</p>


## Table of Contents

1. [OLOO](#oloo)
1. [Motivation](#motivation)
1. [Technologies Implemented](#technologies-implemented)
1. [Required dependencies](#required-dependencies)
1. [Basic Explanation of User Stories and Business Logic](#basic-explanation-of-user-stories-and-business-logic)
1. [Installation](#installation)
1. [Links to Project Documentation](#links-to-project-documentation)
1. [Acknowledgment](#acknowledgment)
1. [License](#license)

## OLOO

What is it, OLOO ?

Foremost we have to understand what means "OLOO" to understand the concept. OLOO means, Objects Linking to Other Objects. And now we are ready to know how JavaScript works in base low level. Everything in JavaScript is considered an object, and every object has his own prototype. In JavaScript, we can't implement inheritance, but we can delegate the behaviour of prototype to his own prototype or into other ones, to get the behaviour of other prototypes we will have to implement OLOO, link to the desired prototype to be able to access his own logic. By this way, we finally are able to get rid of the suffering collateral effect of the inheritance that other languages implement.  

---

**[⬆ back to top](#table-of-contents)**

## Motivation

This project has been created thanks to the motivation of our coding head teacher to learn the paradigm of JavaScript as good and as close as possible. We had to create an API with Express and implement a connection to a no relational database, like MongoDB in this case. I've to say that it was a lot easier than I expected and thanks to projects like this, kind of started to develop a big love for JavaScript language and the easy way that JS it turns out to be to give you freedom when you code. Sometimes this can be harm, but if you implement SOLID Principles and follow a good developing strategy it should do more good than bad. Always keep in mind the "clean code conventions and project architecture", SOLID Principles, design patterns and good naming.

---

**[⬆ back to top](#table-of-contents)**

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

**[⬆ back to top](#table-of-contents)**

## Basic Explanation of User Stories and Business Logic

Welcome to DeLorean Rental application. This application is based on a business of a rent a car service. Like all the rent a car is got his own business logic. 

You've got four different modules that you should remember to understand how everything is connected in order to work:

- Category
- Vehicles
- Customers
- Bookings

Every one of the modules has got his basic CRUD operations that this one will be, GET, DELETE, UPDATE and CREATE.

Each car is got his own price. The price of each car will be updated by a 10% of the original price for each year old it becomes. By this way, always will be able to rent older cars by a cheaper price. This could be like the main slogan of this business to get the attention of the customer. But we have to remember that the price will be updated until it gets to the minimum price that the car can offer, and we get the minimum price of the car by making a 40% of the original price, this one will be always the minimum price updatable for every car in the system.

Any customers can register into our app, you just will have to provide a valid DNI to get your profile registered in our database. 

Bookings just will be able to be done by customers registered into our business, but also you'll have to be 21 years old or over to be able to rent a car. Anyone under the age of 21 years old will be able to rent a car. At the same, the bookings can be created and deleted but not updated to avoid fraudulent uses of the business. In case you make a wrong booking, you'll be able to deleted and create another but not update one that already has been created. 

The stock will show just all vehicles available and just one of them, instead of seeing how many cars of the same model and brand are available. In the end the customer is just interested in one car, not into know how many of the one he likes are available in our business.

And the more exciting thing of this business logic is how works  the discount method. The discount method will be applied in every "SALES SEASON", this means that will be applied in, for example: 

- Black Friday.
- New Year's Day
- Martin Luther King Jr. Day
- Presidents Day.
- Easter.
- Mother's Day.
- Father's Day.
- Amazon Prime Day.
- Tax-free weekends.
- Halloween.
- Cyber Monday.
- Super Saturday.
- etc

Sales seasons have become more than usual day by day, and most of them are not always 100% a real sale, then in our business happens the same. Every car is got a category assigned, and each category have got his own discount tax and the minimum price it can be applied for the specified category. The discount will always be applied to the original price of the car when this one was registered into the stock for first time instead of the actual price has got. This means that the new cars of the app probably will have a notorious price reduction but cars that already are a couple of years older and his price has been already updated previously maybe the SALES SEASON instead of make a reduction increase the price, making the people believe that they are getting a price reduction when actually this is not what is really happening. Enjoy the most believed lie that we know, HAPPY SALES CUSTOMERS !

---

**[⬆ back to top](#table-of-contents)**

## Instalaltion

To be able to run this project you just will have to create an account into MongoDB, clone this project and run the command `$ npm i` to install all the required dependencies. Finally, create a `.env` file in the root directory of your project and fill the credentials specified in the `.env template` that you'll find below. Enjoy !

---

**[⬆ back to top](#table-of-contents)**

## Links to Project Documentation

### User Stories

[***User Stories***](./doc/user-stories.md)

---

### Bibliography

[**Bibliography**](./doc/bibliography.md)

---

### Mongo Refresh

[***Mongo Refresh***](./doc/mongo-refresh.md)

---

### Node Refresh

[***Node Refresh***](./doc/node-refresh.md)

### Questions and answers

[***Questions and Answers***](./doc/questions-and-answers.md)

### env. Template

[***.env Template***](./doc/env-template.md)

---

**[⬆ back to top](#table-of-contents)**

## Acknowledgment

I would like to acknowledge the help and support of:

[***dfleta***](https://github.com/dfleta)

[***Charlos16v***](https://github.com/Charlos16v)

---

**[⬆ back to top](#table-of-contents)**

## License

MIT License

Copyright (c) 2020 AntoniPizarro and Pau Llinàs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**[⬆ back to top](#table-of-contents)**
