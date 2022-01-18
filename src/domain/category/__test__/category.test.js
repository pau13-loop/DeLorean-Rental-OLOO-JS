const { expect } = require('@jest/globals');
const Category = require('../category');

describe('Category domain test cases', () => {

    var category = Object.create(Category)._init('classic', 30, 35);

    test('Check vehicle properties', () => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('discountTax');
        expect(category).toHaveProperty('MIN_PRICE_CATEGORY');
        // Check length of props
        expect(Object.keys(category)).toHaveLength(3);
        expect(Object.keys(category).length).not.toBeGreaterThan(3);
        expect(Object.keys(category).length).not.toBeLessThan(3);
    });

    test('Chec category props accessed directly', () => {
        expect(category.name).toBe('classic');
        expect(category.discountTax).toEqual(30);
        expect(category.MIN_PRICE_CATEGORY).toEqual(35);
    });

    test('Get properties vehicle category', () => {
        expect(category.getName()).toEqual(expect.stringMatching("classic"));
        expect(category.getDiscountTax()).toEqual(30);
        expect(category.getMinPriceCategory()).toEqual(35);
    });

    test('Check prototype of category is defined', () => {
        let categoryWithoutProto = {
            name: "premium",
            discountTax: 15,
            MIN_PRICE_CATEGORY: 45
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

    const applyDiscountMock = jest
        .fn()
        .mockImplementation((ORIGINAL_PRICE_VEHICLE) => Math.floor(ORIGINAL_PRICE_VEHICLE - (0.01 * category.discountTax) * ORIGINAL_PRICE_VEHICLE))
        .mockName('applyDiscountMock')

    //* Chequeamos que el descuento y el redondeo del mismo se aplique correctamente
    test('Apply discount over MIN_PRICE_CATEGORY', () => {
        expect(category.applyDiscount(70)).toEqual(applyDiscountMock(70));
        expect(category.applyDiscount(70)).toEqual(49);
        expect(category.applyDiscount(70)).not.toEqual(48);
        expect(category.applyDiscount(70)).not.toEqual(50);
    });

    test('Apply discount under MIN_PRICE_CATEGORY', () => {
        expect(category.applyDiscount(40)).toEqual(35);
        expect(category.applyDiscount(40)).not.toEqual(applyDiscountMock(40));
        expect(category.applyDiscount(40)).not.toBeGreaterThan(35);
    });
})