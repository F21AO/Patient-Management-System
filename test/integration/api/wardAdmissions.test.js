const { response } = require('express')

const expect = require('chai').expect,
server       = require('../../../index'),
request      = require('supertest')(server),

// Mock data
loginMock = require('../../fixtures/login.json');
wardAdmissionsMock = require('../../fixtures/wardAdmissionsMock.json');

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
            //store session token 
            if(response.statusCode == 200 && response.body && response.body.user) {
                var user     = response.body.user;
                userId       = user.userid;
                sessionToken = user.sessiontoken;
            }
            done();
        });
    });

    it("Ward admissions", (done) => {
        request
        .post('/wards/admit')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .send(wardAdmissionsMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(409);
            done();
        });
    });

    it("Fetch all ward", (done) => {
        request
        .get('/wards')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("fetch all ward admissions", (done) => {
        request
        .get('/wards/admissions')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Fetch admissions by patient", (done) => {
        request
        .get('/wards/admissions/6037636cdd28db57d871ac88')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});