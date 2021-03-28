const { response } = require('express')

const expect = require('chai').expect,
server       = require('../../../index'),
request      = require('supertest')(server),

// Mock data
loginMock = require('../../fixtures/login.json');
loginUnauthorizedMock = require('../../fixtures/loginUnauthorized.json');

describe("Ward Admissions Integration Testing", () => {
    var userId = null; //Initialize userId 
    var sessionToken = null; //Initialize session token

    it("Authorise user with valid credentials.", (done) => {
        request
        .post('/users/login')
        .set('Accept', 'application/json')
        .send(loginMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Un-Authorized user.", (done) => {
        request
        .post('/users/login')
        .set('Accept', 'application/json')
        .send(loginUnauthorizedMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(401);
            done();
        });
    });
});