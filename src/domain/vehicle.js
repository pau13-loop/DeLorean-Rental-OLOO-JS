var Vehicle = {
    init: function(
        brand, model, color) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        // this.category = category;
        return this;
    },
    getBrand: function() {
        return `Car brand: ${this.brand}`;
    },
    getName: function() {
        return `Car name: ${this.name}`;
    },
    // //? Esta función debería implementar getBrans + getName, o debería acceder a las propiedades directamente ???
    getFullName: function() {
        return `Fullname car: ${this.brand} ${this.model}`;
    },
    getColor: function() {
        return `Car color is: ${this.color}`;
    },
    // getCategory: function() {
    //     return this.category;
    // }
};

module.exports = Vehicle;;