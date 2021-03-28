const { response } = require('express')

const expect = require('chai').expect,
server       = require('../../../index'),
request      = require('supertest')(server),
randomstring = require("randomstring");

// Mock data
loginMock = require('../../fixtures/login.json');
registerPatientMock = require('../../fixtures/registerPetients.json');
referralsMock = require('../../fixtures/referrals.json');
diseasesMock = require('../../fixtures/diseases.json');

//generate random unique email ID.
registerPatientMock.email = randomstring.generate(7) + '@' + 'test.com';


describe("Patient Integration Testing", () => {
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
                var user     = response.body.user
                userId       = user.userid;
                sessionToken = user.sessiontoken;
            }
            done();
        });
    });

    it("Register a new patient.", (done) => {
        request
        .post('/patients/register')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .send(registerPatientMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Look up for new patient.", (done) => {
        request
        .get('/patients/605ef56ebb9c96525c681777')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .send(registerPatientMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Patient not found.", (done) => {
        request
        .get('/patients/605ef56ebb9d96525c681777')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .send(registerPatientMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it("Refer a patient.", (done) => {
        request
        .put('/patients/refer/6037636cdd28db57d871ac88')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .send(referralsMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Patient additional diseases.", (done) => {
        request
        .put('/patients/diseases/6030e674bc00b523757acfa0')
        .set('Accept', 'application/json')
        .set('userid', userId)
        .set('sessiontoken', sessionToken)
        .send(diseasesMock)
        .end((err, response) => {
            if(err) done(err);
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});