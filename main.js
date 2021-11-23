// parent vehicle

let Vehicle = {
    init: function(
        brand, 
        // model, color, category
        ) {
        this.brand = brand;
        // this.model = model;
        // this.color = color;
        // this.category = category;
        return this;
    },
    getBrand: function() {
        return `Car brand: ${this.brand}`;
    },
    // getName: function() {
    //     console.log('Car name: ' + this.name);
    // },
    // //? Esta función debería implementar getBrans + getName, o debería acceder a las propiedades directamente ???
    // getFullName: function() {
    //     console.log('Fullname car: ' + this.brand + ' ' + this.model);
    // },
    // getColor: function() {
    //     console.log('Car color is ' + this.color);
    // },
    // getCategory: function() {
    //     console.log('The car category is ' + this.category);
    // }

};

// Parent Category

var Category = {
    init: function(name, discountTax) {
        this.name = name;
        this.discountTax = discountTax;
        return this;
    }
}

// childs Categoria

var Normal = {
    init: function() {
        this.price = 50;
        return Object.create(Category).init("normal", 60);
    },
}

var Classic = {
    init: function() {
        this.price = 100;
        return Object.create(Category).init("classic", 40);
    }
}

var Premium = {
    init: function() {
        this.price = 150
        return Object.create(Category).init("premium", 20);
    },
    getPrice: function() {
        console.log('Price: ' + this.price);
    }
}

var Type = {
    //? Hago de tipo un prototipo ???
    // diesel-gasoline-hybrid-electric
}

// var premiumCategory = Object.create(Premium);
// premiumCategory.init();


// var seatCupra = Object.create(Vehicle).init('seat', 'cupra', 'grey', 'premiumCategory');
let seatCupra = Object.create(Vehicle).init('seat');

console.log("Printing Seat Cupra !");
//! Si meted dentro de un console.log a una función que llama a otro console log acabara printeando undefined
//TODO: el método debe tener una sentencia return y debes llamarlo desde un console.log() para que printe el resultado por pantalla y no devuelva undefined !  
console.log(seatCupra.getBrand());
// seatCupra.getBrand();
// console.log('Show Vehicle characteristics');
// console.log(seatCupra.getFullName());
// console.log(premiumCategory.getPrice());

