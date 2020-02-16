const chai = require('chai');
const { isBefore, isEqual, isAfter, isWildcard } = require('../src/helper');

const assert = chai.assert;

describe('Helper functions - isBefore', () => {
	
	it('Test: should return true if first parameter is less than the second', () => {
	
		const p1 = 10;
		const p2 = 30;

		const res = isBefore(p1, p2);
		assert.isTrue(res)

	});

	it('Test: should return false if first parameter is greater than the second', () => {
	
		const p1 = 50;
		const p2 = 10;
		
		const res = isBefore(p1, p2);
		assert.isFalse(res);

	});

	it('Test: should return false if first parameter is equal the second', () => {
	
		const p1 = 10;
		const p2 = 10;

		const res = isBefore(p1, p2);
		assert.isFalse(res);

	});
	
});

describe('Helper functions - isEqual', () => {
	
	it('Test: should return true if first parameter is equal the second', () => {
	
		const p1 = 10;
		const p2 = 10;

		const res = isEqual(p1, p2);
		assert.isTrue(res);

	});
	
	it('Test: should return true if first parameter is not equal the second', () => {
	
		const p1 = 10;
		const p2 = 30;

		const res = isEqual(p1, p2);
		assert.isFalse(res);

	});
	
});

describe('Helper functions - isAfter', () => {
	
	it('Test: should return false if first parameter is less than the second', () => {
	
		const p1 = 10;
		const p2 = 30;

		const res = isAfter(p1, p2);
		assert.isFalse(res)

	});

	it('Test: should return true if first parameter is greater than the second', () => {
	
		const p1 = 50;
		const p2 = 10;
		
		const res = isAfter(p1, p2);
		assert.isTrue(res);

	});

	it('Test: should return false if first parameter is equal the second', () => {
	
		const p1 = 10;
		const p2 = 10;

		const res = isAfter(p1, p2);
		assert.isFalse(res);

	});
	
});

describe('Helper functions - isWildcard', () => {
	
	it('Test: should return true if the parameter is asterisk char', () => {
	
		const res = isWildcard("*");
		assert.isTrue(res);

	});
	
	it('Test: should return true if the parameter is not asterisk char', () => {
	
		const res = isEqual("a");
		assert.isFalse(res);

	});
	
});

describe('Helper functions - isAfter', () => {
	
	it('Test: should build the correct output', () => {
	
		const p1 = 10;
		const p2 = 30;

		const res = isAfter(p1, p2);
		assert.isFalse(res);

	});
	
});