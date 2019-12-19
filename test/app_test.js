var mongoose = require("mongoose");
var College = require('../server/models/College');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/routes');
var should = chai.should();
var supertest  = require('supertest');

chai.use(chaiHttp);
var request = supertest("http://localhost:5000");

describe('CapstoneWebUIDeveloper', function() {
    it('Country Master /get countries list', function() {
        //chai.request(server)
        request.get('/countries').end(function(err,res) {
            res.should.have.status(200);
            res.body.code.eq(200);
            res.body.countries.length.should.be.gt(0);
            done();
        });
    });

    it('Country Master /get activeCountries', function() {
        //chai.request(server)
        request.get('/activeCountries').end(function(err,res) {
            res.should.have.status(200);
            res.body.code.eq(200);
            res.body.countries.length.should.be.gt(0);
            done();
        });
    });

    it('City Master /getByState', function() {
        //chai.request(server)
        request.get('/state/593c7c86b688f53ae8d1b2aa/cities').end(function(err,res) {
            res.should.have.status(200);
            res.body.code.eq(200);
            res.body.cities.length.should.be.gt(0);
            done();
        });
    });

    it('College /getByCountry', function() {
        //chai.request(server)
        request.get('/country/593c7c86b688f53ae8d1b2aa/colleges').end(function(err,res) {
            res.should.have.status(200);
            res.body.code.eq(200);
            res.body.colleges.length.should.be.gt(0);
            done();
        });
    });

    it('Hostel /activeListByCollege', function() {
        //chai.request(server)
        request.get('/college/593d4cb6c5e66d317c099531/activeHostels').end(function(err,res) {
            res.should.have.status(200);
            res.body.code.eq(200);
            res.body.hostels.length.should.be.gt(0);
            done();
        });
    });

});


