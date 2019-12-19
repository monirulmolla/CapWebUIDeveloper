/*
// Created by Academy on 20/10/16
// Controller for Managing Colleges
*/
var HttpStatus = require('http-status');
var College = require('../models/College');
var validator = require('../services/ValidationService');

//Export the save method to save a College
//Check if the College already exists
//throw a College already exists error
//If not then create the College
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
    console.log("I am inside college save method");
    console.log("College Save body::"+JSON.stringify(req.body));
    var college = College({
        name: req.body.name,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        activeStatus: true,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString()
    });

    var collegeName = req.body.name;
    var regexCollegeName = new RegExp(["^", collegeName, "$"].join(""), "i");
    //To check if City already exist
    College.find({name:regexCollegeName}, function(err, data) {
        if (err) {
            console.log("College Find error::"+err);
            throw validator('college',err.ValidationError);
        }
        if(!data.length){
            //if country not exist save the City
            college.save(function(err) {
                if (err) {
                    console.log('College created Error::'+err);
                    throw validator('college',err.ValidationError);
                }
                console.log('College saved successfully');
            });
        }else{
            console.log("College Already Exist");
            throw new Error('College Already Exist');
        }

    });
};

//Export the list method to return a list of all Colleges
exports.list = function(req, res){
    //Write your list code here
    console.log("I am inside list method to get colleges list");
    College.find({}).populate('city').populate('city.state').populate('city.state.country').exec(function(err, data) {
        if (err) {
            throw validator('college',err.ValidationError);
        }
        console.log("Colleges::"+JSON.stringify(data))
        var response = {code : 200, colleges : data};
        res.send(response);
        res.end();
    });
};

//Export the activeList method to return a list of all Active Colleges
exports.activeList = function(req, res){
    //Write your activeList code here
    console.log("I am inside getbyCountry code ");
    College.find({activeStatus:true}).populate('city').populate('city.state').populate('city.state.country').exec(function(err, data) {
        if (err) {
            throw validator('college',err.ValidationError);
        }
        console.log("Colleges::"+JSON.stringify(data))
        var response = {code : 200, colleges : data};
        res.send(response);
        res.end();
    });
};

//Export the getByCountry method to list 
//all active Colleges for a given Country
//The Country id is passed as id in the request parameters
exports.getByCountry = function(req, res){
    //Write your getByCountry code here
    console.log("I am inside getbyCountry code ");
    College.find({country :req.params._id}).populate('city').populate('city.state').populate('city.state.country').exec(function(err, data) {
        if (err) {
            throw validator('college',err.ValidationError);;
        }
        console.log("Colleges::"+JSON.stringify(data))
        var response = {code : 200, colleges : data};
        res.send(response);
        res.end();
    });
};

//Export the get method to return
//a College object given the id in the request parameters
exports.get = function(req, res){
    //Write your get code here
    console.log("GetCollege Step 2: CollegeController.js");
    College.find({_id :req.params._id}).populate('city').exec(function(err, data) {
        if (err){
            throw validator('college',err.ValidationError);
        }
        console.log("College::"+JSON.stringify(data))
        var response = {code : 200, college : data};
        res.send(response);
        res.end();
    });
};

//Export the update method
//Find the College by id passed in the request parameters 
//and update it with the College object in the request body
//Throw an error
//If the College name already exists
//If the College is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
    //console.log("req.body.state.country::::"+req.body.state);
    console.log("City update body::"+JSON.stringify(req.body));
    console.log("CityController: sateId:::"+req.body._id);
    var collegeName = req.body.name;
    var collegeId = req.body._id;
    var regexCollegeName = new RegExp(["^", collegeName, "$"].join(""), "i");
    College.find({name:regexCollegeName}).populate('city').populate('city.state').populate('city.state.country').exec(function(err, data) {
        if (err) {
            console.log("College Find error::"+err);
            throw validator('college',err.ValidationError);
        }
        if(!data.length){
            var colg = College(req.body);
            College.findByIdAndUpdate(collegeId, colg, function(err, data) {
                if (err) {
                    throw new Error("College is not found:"+err);
                }
                console.log(data);
                console.log('College updated successfully');
            });

        }else{
            console.log("College Already Exist");
            throw new Error('College Already Exist');
        }

    });
};

//Export the activate method
//Find the College by the id request parameter
//Update the College activeStatus to true
//Throw an error
//If the College is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
    console.log("CollegeController:activate collegeId:::"+req.params._id);
    var collegeId = req.params._id;
    College.findByIdAndUpdate(collegeId, { activeStatus:true}, function(err, data) {
        if (err) {
            throw new Error("College is not found:"+err);
        }
        console.log(data);
        console.log('College is activated successfully');
    });
};

//Export the deactivate method
//Find the College by the id request parameter
//Update the College activeStatus to false
//Throw an error
//If the College is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
    console.log("CollegeController:activate collegeId:::"+req.params._id);
    var collegeId = req.params._id;
    College.findByIdAndUpdate(collegeId, { activeStatus:false}, function(err, data) {
        if (err) {
            throw new Error("College is not found:"+err);
        }
        console.log(data);
        console.log('College is activated successfully');
    });
};