const { sayHello } = require('../router/user');

describe('Say Hello function testing', () => {
    it('it should say hello to OneAI', () => {
        expect(sayHello('OneAI')).toBe('Hello OneAI');
    });
});