/*
// Created by Academy on 20/10/16
// Controller for Managing the Country Master
*/

var Country = require('../../models/master/Country');
var HttpStatus = require('http-status');
var validator = require('../../services/ValidationService');
//Export the save method to save a Country
//Check if the country already exists 
//throw a country already exists error
//If not then create the country
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
    console.log("I am inside save method");
    var country = Country({
        name: req.body.name,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString(),
        activeStatus: true
    });

    var countryName = req.body.name;
    var regexCountryName = new RegExp(["^", countryName, "$"].join(""), "i");
    //To check if country already exist
    Country.find({name:regexCountryName}, function(err, data) {
        if (err) {
            console.log("Country Find error::"+err);
            throw validator('country',err.ValidationError);
        }
        if(!data.length){
            //if country not exist save the country
            country.save(function(err) {
                if (err) {
                    console.log('Country created Error::'+err);
                    throw validator('country',err.ValidationError);
                }
                console.log('Country saved successfully');
            });
        }else{
            console.log("Country Already Exist");
            throw new Error('Country Already Exist');
        }

    });
};

//Export the list method to return a list of all Countries
exports.list = function(req, res){
    //Write your list code here
    Country.find({}, function(err, data) {
        if (err) throw validator('country',err.ValidationError);
        // object of all the countries
        console.log("Countries::"+JSON.stringify(data))
        var response = {code : 200, countries : data};
        res.send(response);
        res.end();
    });
};

//Export the activeList method to list all active Countries
exports.activeList = function(req, res){
    //Write your activeList code here
    console.log("I am inside country active list");
    Country.find({activeStatus:true}, function(err, data) {
        if (err) throw validator('country',err.ValidationError);
        console.log("Countries::"+JSON.stringify(data))
        var response = {code : 200, countries : data};
        res.send(response);
        res.end();
    });
};

//Export the update method
//Find the Country by id passed in the request parameters 
//and update it with the country object in the request body
//Throw an error
//If the country name already exists
//If the country is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
    console.log("CountryController: I am inside country update method");
    console.log("CountryController: countryId:::"+req.body._id);
    console.log("I am inside save method");
    var countryId = req.body._id;
    var countryName = req.body.name;
    var regexCountryName = new RegExp(["^", countryName, "$"].join(""), "i");
    //To check if country already exist
    Country.find({name:regexCountryName}, function(err, data) {
        if (err) {
            console.log("Country Find error::"+err);
            throw validator('country',err.ValidationError);
        }
        if(!data.length){
            //if country not exist update the country
            Country.findByIdAndUpdate(countryId, { name:req.body.name,updatedOn:new Date().toUTCString()}, function(err, data) {
                if (err) {
                    throw new Error("Country is not found:"+err);
                }
                console.log(data);
                console.log('Country updated successfully');
            });

        }else{
            console.log("Country Already Exist");
            throw new Error('Country Already Exist');
        }

    });

};

//Export the activate method
//Find the Country by the id in request parameter
//Update the Country's activeStatus to true
//Throw an error
//If the country is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
    console.log("CountryController:activate method");
    console.log("CountryController:activate countryId:::"+req.params._id);
    var countryId = req.params._id;
    Country.findByIdAndUpdate(countryId, { activeStatus:true}, function(err, data) {
        if (err) {
            throw new Error("Country is not found:"+err);
        }
        console.log(data);
        console.log('Country is activated successfully');
    });
};

//Export the deactivate method
//Find the Country by the id in request parameter
//Update the Country's activeStatus to false
//Throw an error
//If the country is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
    console.log("CountryController:deactivate method");
    console.log("CountryController:deactivate countryId:::"+req.params._id);
    var countryId = req.params._id;
    Country.findByIdAndUpdate(countryId, { activeStatus:false}, function(err, data) {
        if (err) {
            throw new Error("Country is not found:"+err);
        }
        console.log(data);
        console.log('Country is deactivated successfully');
    });
};