
const request = require('supertest');
const app = require('../app');

describe('POST /user', () => {
    it('it should create user successfully', async () => {
        const body = {
            userName: 'kyo'
        };
        const response = await request(app.callback()).post('/user').send(body);

        console.log(response);
        expect(response.status).toEqual(200)
        expect(response.body.data.userId).toBe(1);
        expect(response.body.data.userName).toBe('kyo');
    });

    it('it should get user successfully', async () => {
        const response = await request(app.callback()).get('/user/1');

        expect(response.status).toEqual(200)
        expect(response.body.data).toBe('Hello kyo');
    });
});