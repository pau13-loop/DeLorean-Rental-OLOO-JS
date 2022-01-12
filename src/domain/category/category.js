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
    setPrototypeCategory: function (category) {
        return Object.getPrototypeOf(category) !== Category
        ? Object.setPrototypeOf(category, Category.init(category.name, category.discountTax))
        : category;
    },
    applyDiscount: function (price) {
        //* Al aplicar el descuento siempre queremos redondear al menor número posible
            return Math.floor(price - (0.01 * this.discountTax) * price);
    }
}

module.exports = Category;