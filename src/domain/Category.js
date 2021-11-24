var Category = {
    init: function(name, discountTax) {
        this.name = name;
        this.discountTax = discountTax;
        return this;
    },
    getCategoryName: function() {
        return `Category name: ${this.name}`;
    },
    getDiscountTax: function() {
        return `Category Discount tax is: ${this.discountTax}`;
    }
}

module.exports = Category;