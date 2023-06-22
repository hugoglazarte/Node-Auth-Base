const request = require('supertest');
const { expect } = require('expect');
const { app } = require('../index.js');

describe('POST Create User', () => {
    
    it('Create new user error, user exists', async() => {
        // Arrange
        const newUser = {
            name: 'dummys',
            email: 'test@email.com',
            password: 'dummyPass'
        };
        // Act
        request(app)
            .post('/api/auth/new')
            .send(newUser)
            .then(response => {
                // Assert / Expect
                expect(response.statusCode).toBe(400);
                expect(response.ok).toBe(false);
                done();
            })
            .catch(err => done(err));
    });
});