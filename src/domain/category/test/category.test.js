const { expect } = require('@jest/globals');
const Category = require('../category');

describe('Define vehicle and category for getters test cases', () => {

    var category = Object.create(Category).init('classic', 30);

    test('Get properties vehicle category', () => {
        expect(category.getName()).toBe('Category name: classic');
        expect(category.getDiscountTax()).toBe('Category discount tax: 30');
    })
})