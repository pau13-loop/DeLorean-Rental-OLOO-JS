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
    applyDiscount: function (price) {
            return Math.floor((100 * this.discountTax) / price);
    }
}

module.exports = Category;