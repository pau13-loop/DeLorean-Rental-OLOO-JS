var Category = {
    init: function(name, discountTax) {
        this.name = name;
        this.discountTax = discountTax;
        return this;
    },
    getName: function() {
        return this.name;
    },
    getDiscountTax: function() {
        return this.discountTax;
    },
    makeDiscount: function(price) {
        return;
    }
}

module.exports = Category;