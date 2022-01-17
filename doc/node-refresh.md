# Refresh Node Concepts


[***README***](../README.md)


## Node.js Server

To run the node.js server execute the file where you have added the configuration of your server, for example:

```
$ node main.js
Server running at http://127.0.0.1:3000/
```

Access to the `127.0.0.1:8000` or access to the `localhost:8000` to be able to view the express server up and running.

And in case do you want ot debugg the app then you can run

```
$ DEBUG=rent-a-car:* npm start
```

**Remember !**

The IP  `127.0.0.1` always refers to the `localhost`. Then if you access to the url `http://127.0.0.1:3000/` or to this other one `http://localhost:3000/` you'll get the same result, so don't worry about it because both urls point to the same destination point.

## Directory Structure Review

#### www file
The file /bin/www is the application entry point! The very first thing this does is require() the "real" application entry point (app.js, in the project root) that sets up and returns the express() application object.

#### app.js (main.js/index.js)
This file creates an express application object (named app, by convention), sets up the application with various settings and middleware, and then exports the app from the module.

#### Routes
First, it loads the express module and uses it to get an express.Router object. Then it specifies a route on that object and lastly exports the router from the module (this is what allows the file to be imported into app.js).

#### Why "next" in router function() ?
One thing of interest above is that the callback function has the third argument 'next', and is hence a middleware function rather than a simple route callback. While the code doesn't currently use the next argument, it may be useful in the future if you want to add multiple route handlers to the '/' route path.

#### Views (templates)
The views (templates) are stored in the /views directory (as specified in app.js) and are given the file extension .pug. The method Response.render() is used to render a specified template along with the values of named variables passed in an object, and then send the result as a response. 

## Things I've forgot easly and you should keep in mind

#### app.js (main.js/index.js)

In the *app* file you define the routes and middleware. From each defined route you'll add the extension that do you want to give to the endpoint of the desired route.

For example: 

We want to define the endpoint for the **stock**. In the *app.js* file we will add the following statement `app.use('/stock', stockRouter)`, and now all the endpoints of stock will be created from, `/stock/<name new endpoint of stock>`.