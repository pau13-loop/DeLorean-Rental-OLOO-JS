var Category = {
    _init: function(name, discountTax, MIN_PRICE_CATEGORY) {
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
        ? Object.setPrototypeOf(category, Category._init(category.name, category.discountTax, category.MIN_PRICE_CATEGORY))
        : category;
    },
    //? El descuento siempre se aplicará al precio original y no al actualizado. Black Friday fraudulento
    applyDiscount: function (ORIGINAL_PRICE_VEHICLE) {
        //* When apply discount we want to round to the smallest possible number
        let discountedPrice = Math.floor(ORIGINAL_PRICE_VEHICLE - (0.01 * this.discountTax) * ORIGINAL_PRICE_VEHICLE);
        console.log('Discounted price: ', discountedPrice);
        console.log('Min price category: ', this.MIN_PRICE_CATEGORY);
        return  discountedPrice < this.MIN_PRICE_CATEGORY
        ? this.MIN_PRICE_CATEGORY
        : discountedPrice;
    }
}

module.exports = Category;