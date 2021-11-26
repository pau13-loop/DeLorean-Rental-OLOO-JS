var Category = {
    init: function(name, discountTax) {
        this.name = name;
        this.discountTax = discountTax;
        return this;
    },
    getName: function() {
        return `Category name: ${this.name}`;
    },
    getDiscountTax: function() {
        return `Category discount tax: ${this.discountTax}`;
    }
}

module.exports = Category;