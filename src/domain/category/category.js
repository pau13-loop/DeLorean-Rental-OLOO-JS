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
        //* Al aplicar el descuento siempre queremos redondear al menor número posible
            return Math.floor(price - (0.01 * this.discountTax) * price);
    }
}

module.exports = Category;