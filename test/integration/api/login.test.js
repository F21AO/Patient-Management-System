const { response } = require('express')

const expect = require('chai').expect,
server       = require('../../../index'),
request      = require('supertest')(server),

// Mock data
loginMock = require('../../fixtures/login.json');

describe("Login API", () => {
    it("Should authorie user", (done) => {
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
});