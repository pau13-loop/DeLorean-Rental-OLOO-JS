# Questions & Answers that came up during the project development


[***README***](../README.md)


1. We can save the resource module ? Because in Ollivanders logic we have created one and the controller in my opinion would act as the router and the Ollivanders resource would act as the node controller. I'm I right ? (Ollivanders is a reference of a project from the first year of Software Development)

> Yes, we can save the logic from the resources layer because in Ollivanders project the routers layer was missing

2. If a list returns empty when I do a getAll, where do I check if I return the list or an error message in case it is empty, in the Service or in the controller layer ? I create a function that the only thing I do is to check if the list is empty and keep SRP ? 

> It is a validation that will be performed constantly for each method that returns a list, it would make sense to create a function. And some validation should be done, a method can be created for it and it should be created in the Controller of the application.

3.   Validations should be done in the service and the object should encapsulate simple logic that is only called if some condition is met?

> The business logic must be encapsulated in the domain. In the service we only attack the database and filter or sort it if desired, but the business logic, which is what I am proposing in this case, is encapsulated in the domain.

4. This function is redundant  ?
```
        getMinPrice: function() {
        return this.getOriginalPrice * 0.3;
    },

    if (this.price > this.originalPrice * 0.3)
```

> If I had placed the method inside the conditional, the domain language would be much more intuitive and would make it easier to maintain the code in case future programmers come to work on the project. As quick as you read the method name, you'll be related with its purpose.

5. When to assign the prototype to objects ? 

> The assignment or linking of prototypes must take place in the domain, in the domain logic. Each entity shall be responsible for linking its prototype to the objects.

6. When I order the objects ?

> In the call to the DB I can now make it give me the objects ordered according to my interests.