# User stories


[***README***](../README.md)


## Basic CRUD Operations

For each module of the proyect, ***bookings, cutomers, vehicles and categories***, has been implemented the basic crud operations that all of us already now but just in case someone doesn't I'll specify them below:

- Get (Find all, Find one by property and Find one by id)
- Delete (Delete one by property and delete one by id)
- Put (Update one by property and Update one by id)
- Post (Create one)


## Domain Logic

Now we will explain the user stories that we imagine we had to supply to reach the goals and be able to develop the project following a guide lane. All this user storires you're going to read are not real for an actual ***Rent a car*** business, all them have been made up to create a business logic that will make the project as close as possible to a real implementation.


#### ***Category***

1. **Appply Discount**: each vehicle is got a category assigned to it. And the category will be able to update all the prices of the vehicles by the discount tax each one have specified. This discount tax is supposed just to be applied at events like: Black Friday, sales season or another event following the same characteristics than the specified before. 
1. **Set prototype category**: will check that the prototype of the category is set correctly and it belong the the right object prototype. In case is not set correctly it will set the prototype of the category to his belonging object prototype.

#### ***Vehicle***

1. **Book vehicle and Unbook vehicle**: like the name of the function specify, both methods work for the system related to the booking and unbooking a vehicle. It will set the availability to false when the vehicle will be booked and it will set back the availability to true when the booking period will came to the end.

1. **Update price**: will update the price of the vehicles of all of those that meet the characteristics. All vehicles unless the *classic* can be older than five years. After they first year, his price will be reduced by a 10% and like this every year until they become five years old, then they will be removed from the stock. The *classic* vehicles can't have his price updated. The *common* and *premium* vehicles can have his price update. 

1. **Set prototype vehicle**: will check that the prototype of the vehicle is set correctly and it belong the the right object prototype. In case is not set correctly it will set the prototype of the vehicle to his belonging object prototype.

#### ***Customer***

1. **Check is adult**: checks the customer is old enough to rent a vehicle. The minimum age required to be able to book a vehicle will be 21 years old.

1. **Check valid dni**: checks the dni of the customer registered is valid. To ensure validity of the dni we follow the mathematic rule. We divide the number sequence by 23 and we get the rest of this division. We get the letter of the dni number by the table provided by the spanish goverment that matches numbers with letters. Check that the obtained by the rest of our division match the DNI letter provided by the customer that wants to book a car.

1. **Set prototype customer**: will check that the prototype of the customer is set correctly and it belong the the right object prototype. In case is not set correctly it will set the prototype of the customer to his belonging object prototype.

#### ***Booking***

1. **Calculate booking days number**: get the days the booking is going to take. From the first day of the booking until the last one, this two included too. 

1. **Calculate booking price**: this method requries to know how many days the booking is going to last and the price of the vehicle booked. After get this two parameters will multiply one with the other to get the total price of the booking.

1. **Set prototype booking**: will check that the prototype of the booking is set correctly and it belong the the right object prototype. In ºcase is not set correctly it will set the prototype of the booking to his belonging object prototype.


## Vehicle price life cycle

Property ORIGINAL_PRICE
> price = ORIGINAL_PRICE;

Discount Price (Black Friday)
> newPprice = ORIGINAL_PRICE - (ORIGINAL_PRICE * (0.01 * discountTax));

> price = newPprice > MIN_PRICE_CATEGORY ? newPprice : MIN_PRICE_CATEGORY;

Update Price
> price = ORIGINALPRICE * (0.1 * years_old_vehicle);

To Restore Price
> call function, updatePrice();

**[⬆ back to top](#user-stories)**

---