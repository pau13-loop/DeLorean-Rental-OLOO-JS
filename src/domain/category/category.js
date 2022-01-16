var Category = {
    init: function(name, discountTax, MIN_PRICE_CATEGORY) {
        this.name = name;
        this.discountTax = discountTax;
        this.MIN_PRICE_CATEGORY = MIN_PRICE_CATEGORY;
        return this;
    },
    getName: function() {
        return this.name;
    },
    getDiscountTax: function() {
        return this.discountTax;
    },
    getMinPriceCategory: function() {
        return this.MIN_PRICE_CATEGORY;
    },
    setPrototypeCategory: function (category) {
        return Object.getPrototypeOf(category) !== Category
        ? Object.setPrototypeOf(category, Category.init(category.name, category.discountTax, category.MIN_PRICE_CATEGORY))
        : category;
    },
    //? El descuento siempre se aplicará al precio original y no al actualizado. Black Friday fraudulento
    applyDiscount: function (ORIGINAL_PRICE) {
        //* Al aplicar el descuento siempre queremos redondear al menor número posible
        let discountedPrice = Math.floor(ORIGINAL_PRICE - (0.01 * this.discountTax) * ORIGINAL_PRICE);
        return  discountedPrice < this.MIN_PRICE_CATEGORY
        ? this.MIN_PRICE_CATEGORY
        : discountedPrice;
    }
}

module.exports = Category;