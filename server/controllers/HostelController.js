/*
// Created by Academy on 20/10/16
// Controller for Managing Hostels
*/

var HttpStatus = require('http-status');
var College = require('../models/College');
var Hostel = require('../models/Hostel');
var validator = require('../services/ValidationService');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//Export the save method to save a Hostel
//Check if the Hostel already exists for the given College
//throw a Hostel already exists error
//If not then create the Hostel for the Given College
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
    console.log("I am inside hostel save method");
    console.log("Hostel Save body::"+JSON.stringify(req.body));
    var hostel = Hostel({
        name: req.body.name,
        college: req.body.college,
        activeStatus: true,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString()
    });

    var hostelName = req.body.name;
    var regexHostelName = new RegExp(["^", hostelName, "$"].join(""), "i");
    Hostel.find({name:regexHostelName}, function(err, data) {
        if (err) {
            console.log("Hostel Find error::"+err);
            throw validator('hostel',err.ValidationError);
        }
        if(!data.length){
            hostel.save(function(err) {
                if (err) {
                    console.log('Hostel created Error::'+err);
                    throw validator('hostel',err.ValidationError);
                }
                console.log('Hostel saved successfully');
            });
        }else{
            console.log("Hostel Already Exist");
            throw new Error('Hostel Already Exist');
        }

    });
};

//Export the list method to return a list of all Hostels
exports.list = function(req, res){
    //Write your list code here
    console.log("I am inside list method to get hostels list");
    Hostel.find({}).populate('college').exec(function(err, data) {
        if (err) throw validator('hostel',err.ValidationError);
        console.log("Hostels::"+JSON.stringify(data))
        var response = {code : 200, hostels : data};
        res.send(response);
        res.end();
    });
};

//Export the getByCollege method to list 
//all Hostels for a given College
//The College id is passed as id in the request parameters
exports.getByCollege = function(req, res){
    //Write your getByCollege code here
    //Write your getByCountry code here
    console.log("I am inside getbyCollege id ");
    Hostel.find({college :req.params._id}).populate('college').exec(function(err, data) {
        if (err) throw validator('hostel',err.ValidationError);
        console.log("Hostels::"+JSON.stringify(data))
        var response = {code : 200, hostels : data};
        res.send(response);
        res.end();
    });
};

//Export the activeListByCollege method to list 
//all active Hostels for a given College
//The College id is passed as id in the request parameters
exports.activeListByCollege = function(req, res){
    //Write your activeListByCollege code here
    console.log("I am inside getbyCollege id ");
    Hostel.find({college :req.params._id,activeStatus:true}).populate('college').exec(function(err, data) {
        if (err) throw validator('hostel',err.ValidationError);
        console.log("Hostels::"+JSON.stringify(data))
        var response = {code : 200, hostels : data};
        res.send(response);
        res.end();
    });
}

//Export the get method to return
//a Hostel object given the id in the request parameters
exports.get = function(req, res){
    //Write your get code here
    console.log("I am inside getbyCollege id ");
    Hostel.find({_id :req.params._id}).populate('college').exec(function(err, data) {
        if (err) throw validator('hostel',err.ValidationError);
        console.log("Hostels::"+JSON.stringify(data))
        var response = {code : 200, hostels : data};
        res.send(response);
        res.end();
    });
};

//Export the update method
//Find the Hostel by id passed in the request parameters 
//and update it with the Hostel object in the request body
//Throw an error
//If the Hostel name already exists
//If the Hostel is not found
////Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
    console.log("Hostel update body::"+JSON.stringify(req.body));
    console.log("HostelController: sateId:::"+req.body._id);
    var hostelName = req.body.name;
    var hostelId = req.body._id;
    var regexHostelName = new RegExp(["^", hostelName, "$"].join(""), "i");
    Hostel.find({name:regexHostelName}).populate('college').exec(function(err, data) {
        if (err) {
            console.log("Hostel Find error::"+err);
            throw validator('hostel',err.ValidationError);
        }
        if(!data.length){
            var hostl = Hostel(req.body);
            Hostel.findByIdAndUpdate(hostelId, hostl, function(err, data) {
                if (err) {
                    throw new Error("Hostel is not found:"+err);
                }
                console.log(data);
                console.log('Hostel updated successfully');
            });

        }else{
            console.log("Hostel Already Exist");
            throw new Error('Hostel Already Exist');
        }

    });
};

//Export the activate method
//Find the Hostel by the id request parameter
//Update the Hostel activeStatus to true
//Throw an error
//If the Hostel is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
    console.log("HostelController:activate hostelId:::"+req.params._id);
    var hostelId = req.params._id;
    Hostel.findByIdAndUpdate(hostelId, { activeStatus:true}, function(err, data) {
        if (err) {
            throw new Error("Hostel is not found:"+err);
        }
        console.log(data);
        console.log('Hostel is activated successfully');
    });
};

//Export the deactivate method
//Find the Hostel by the id request parameter
//Update the Hostel activeStatus to false
//Throw an error
//If the Hostel is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
    console.log("HostelController:activate hostelId:::"+req.params._id);
    var hostelId = req.params._id;
    Hostel.findByIdAndUpdate(hostelId, { activeStatus:false}, function(err, data) {
        if (err) {
            throw new Error("Hostel is not found:"+err);
        }
        console.log(data);
        console.log('Hostel is activated successfully');
    });
};