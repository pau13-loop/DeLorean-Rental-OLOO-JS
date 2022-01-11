const { expect } = require('@jest/globals');
const Category = require('../category');

describe('Category domain test cases', () => {

    var category = Object.create(Category).init('classic', 30);

    test('Check vehicle properties', () => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('discountTax');
        // Check length of props
        expect(Object.keys(category)).toHaveLength(2);
        expect(Object.keys(category).length).not.toBeGreaterThan(2);
    });

    test('Chec category props accessed directly', () => {
        expect(category.name).toBe('classic');
        expect(category.discountTax).toEqual(30);
    });

    test('Get properties vehicle category', () => {
        expect(category.getName()).toEqual(expect.stringMatching("classic"));
        expect(category.getDiscountTax()).toEqual(30);
    });

    test('Check prototype of category is defined', () => {
        let categoryWithoutProto = {
            name: "premium",
            discountTax: 15
        };

        expect(Category.isPrototypeOf(category)).toBeTruthy();
        expect(Category.isPrototypeOf(categoryWithoutProto)).toBeFalsy()
        expect(Object.getPrototypeOf(category) === Category).toBeTruthy();
        expect(Object.getPrototypeOf(categoryWithoutProto) === Category).toBeFalsy();

        //* Set prototype Category *//
        Category.setPrototypeCategory(categoryWithoutProto);

        expect(Category.isPrototypeOf(categoryWithoutProto)).toBeTruthy();
        expect(Object.getPrototypeOf(categoryWithoutProto) === Category).toBeTruthy();
    });

    //* Chequeamos que el descuento y el redondeo del mismo se aplique correctamente
    test('Apply discount over price', () => {
        expect(category.applyDiscount(70)).toEqual(49);
        expect(category.applyDiscount(70)).not.toEqual(48);
        expect(category.applyDiscount(70)).not.toEqual(50);
    });
})