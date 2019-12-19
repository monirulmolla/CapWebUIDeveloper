/*
// Created by Academy on 20/10/16
// Controller for managing the State Master
*/
var validator = require('../../services/ValidationService');
var State = require('../../models/master/State');
var Country = require('../../models/master/Country');
var City = require('../../models/master/City');
var HttpStatus = require('http-status');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//Export the save method to save a State
//Check if the State already exists 
//throw a State already exists error
//If not then create the State
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
    console.log("I am inside save method");
    console.log("req.body.state.country::::"+req.body.country);
    console.log("State Save body::"+JSON.stringify(req.body))
    var country = Country({
        _id : req.body.country,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString(),
        activeStatus: true
    });
    var state = State({
        name: req.body.name,
        country: country,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString(),
        activeStatus: true
    });

    var stateName = req.body.name;
    var regexStateName = new RegExp(["^", stateName, "$"].join(""), "i");
    //To check if country already exist
    Country.find({name:regexStateName}, function(err, data) {
        if (err) {
            console.log("State Find error::"+err);
            throw validator('state',err.ValidationError);
        }
        if(!data.length){
            //if country not exist save the country
            state.save(function(err) {
                if (err) {
                    console.log('State created Error::'+err);
                    throw validator('state',err.ValidationError);
                }
                console.log('State saved successfully');
            });
        }else{
            console.log("State Already Exist");
            throw new Error('State Already Exist');
        }

    });
};

//Export the list method to return a list of all States
exports.list = function(req, res){
    //Write your list code here
    State.find({}).populate('country').exec(function(err, data) {
        if (err) throw validator('state',err.ValidationError);
        // object of all the countries
        console.log("States::"+JSON.stringify(data))
        var response = {code : 200, states : data};
        res.send(response);
        res.end();
    });
};

//Export the activeList method to list all active States
exports.activeList = function(req, res){
    //Write your activeList code here
    console.log("I am inside state active list");
    State.find({activeStatus:true}).populate('country').exec(function(err, data) {
        if (err) throw validator('state',err.ValidationError);
        console.log("States::"+JSON.stringify(data))
        var response = {code : 200, states : data};
        res.send(response);
        res.end();
    });
};

//Export the getByCountry method to list 
//all States for a given Country
//The Country id is passed as id in the request parameters
exports.getByCountry = function(req, res){
    //Write your getbyCountry code here
    console.log("I am inside getbyCountry code ");
    State.find({country :req.params._id}).populate('country').exec(function(err, data) {
        if (err) throw validator('state',err.ValidationError);
        console.log("States::"+JSON.stringify(data))
        var response = {code : 200, states : data};
        res.send(response);
        res.end();
    });
};

//Export the update method
//Find the State by id passed in the request parameters 
//and update it with the State object in the request body
//Throw an error
//If the State name already exists
//If the State is not found
////Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
    console.log("I am inside save method");
   console.log("req.body.state.country::::"+req.body.country);
    console.log("State update body::"+JSON.stringify(req.body));
    console.log("StateController: sateId:::"+req.body._id);
    var stateName = req.body.name;
    var stateId = req.body._id;
    var regexStateName = new RegExp(["^", stateName, "$"].join(""), "i");
    //To check if country already exist
    //State.find({name:regexStateName}, function(err, data) {
    State.find({name:regexStateName}).populate('country').exec(function(err, data) {
        if (err) {
            console.log("State Find error::"+err);
            throw validator('state',err.ValidationError);
        }
        if(!data.length){
            //if country not exist update the country
            var stat = State(req.body);
            State.findByIdAndUpdate(stateId, stat, function(err, data) {
                if (err) {
                    throw new Error("State is not found:"+err);
                }
                console.log(data);
                console.log('State updated successfully');
            });

        }else{
            console.log("State Already Exist");
            throw new Error('State Already Exist');
        }

    });

};

//Export the activate method
//Find the State by the id request parameter
//Update the State activeStatus to true
//Throw an error
//If the State is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
    console.log("StateController:activate method");
    console.log("StateController:activate stateId:::"+req.params._id);
    var stateId = req.params._id;
    State.findByIdAndUpdate(stateId, { activeStatus:true}, function(err, data) {
        if (err) {
            throw new Error("State is not found:"+err);
        }
        console.log(data);
        console.log('State is activated successfully');
    });
};

//Export the deactivate method
//Find the State by the id request parameter
//Update the State activeStatus to false
//Throw an error
//If the State is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
    console.log("StateController:activate method");
    console.log("StateController:activate stateId:::"+req.params._id);
    var stateId = req.params._id;
    State.findByIdAndUpdate(stateId, { activeStatus:false}, function(err, data) {
        if (err) {
            throw new Error("State is not found:"+err);
        }
        console.log(data);
        console.log('State is activated successfully');
    });
};