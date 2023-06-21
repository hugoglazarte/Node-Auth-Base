const express = require('express');
const chai = require('chai');
const request = require('supertest');
const { expect } = require('expect');
const { app } = require('../index.js');

describe('POST Create User', () => {
    
    it('create new user', async() => {
        // Arrange
        const newUser = {
            name: 'dummys',
            email: 'test@email.com',
            password: 'dummyPass'
        };
        // Act
        const response = await request(app).post('/api/auth/new').send(newUser);
        // Assert
        //console.log(response)
        expect(response.statusCode).toBe(400);
        expect(response.ok).toBe(false);
    });
});