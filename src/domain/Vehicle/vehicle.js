var Vehicle = {
    init: function(
        brand, model, color, category) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.category = category;
        return this;
    },
    getBrand: function() {
        return `Car brand: ${this.brand}`;
    },
    getModel: function() {
        return `Car model: ${this.model}`;
    },
    // //? Esta función debería implementar getBrans + getName, o debería acceder a las propiedades directamente ???
    getName: function() {
        return `Car name: ${this.brand} ${this.model}`;
    },
    getColor: function() {
        return `Car color: ${this.color}`;
    },
    getCategory: function() {
        return this.category;
    }
};

module.exports = Vehicle;