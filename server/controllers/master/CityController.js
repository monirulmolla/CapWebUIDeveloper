/*
// Created by Academy on 20/10/16
// Controller for Managing City Master
*/

var HttpStatus = require('http-status');
var State = require('../../models/master/State');
var City = require('../../models/master/City');
var validator = require('../../services/ValidationService');

//Export the save method to save a City
//Check if the city already exists 
//throw a city already exists error
//If not then create the city
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
    console.log("I am inside save method");
    console.log("req.body.state.country::::"+req.body.country);
    console.log("State Save body::"+JSON.stringify(req.body));
    var state = State({
        _id :req.body.state,
        name: req.body.state,
        country: req.body.country,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString(),
        activeStatus: true
    });

    var city = City({
        name: req.body.name,
        state: state,
        updatedOn: new Date().toUTCString(),
        createdOn: new Date().toUTCString(),
        activeStatus: true
    });

    var cityName = req.body.name;
    var regexCityName = new RegExp(["^", cityName, "$"].join(""), "i");
    //To check if City already exist
    City.find({name:regexCityName}, function(err, data) {
        if (err) {
            console.log("City Find error::"+err);
            throw validator('city',err.ValidationError);
        }
        if(!data.length){
            //if country not exist save the City
            city.save(function(err) {
                if (err) {
                    console.log('City created Error::'+err);
                    throw validator('city',err.ValidationError);
                }
                console.log('City saved successfully');
            });
        }else{
            console.log("City Already Exist");
            throw new Error('City Already Exist');
        }

    });
};

//Export the list method to return a list of all Cities
exports.list = function(req, res){
    //Write your list code here
    City.find({}).populate('state').populate('state.country').exec(function(err, data) {
        if (err) throw validator('city',err.ValidationError);
        console.log("Cities::"+JSON.stringify(data))
        var response = {code : 200, cities : data};
        res.send(response);
        res.end();
    });
};


//Export the activeList method to list all active Cities
exports.activeList = function(req, res){
    //Write your activeList code here
    City.find({activeStatus:true}).populate('state').populate('state.country').exec(function(err, data) {
        if (err) throw validator('city',err.ValidationError);
        console.log("Cities::"+JSON.stringify(data))
        var response = {code : 200, cities : data};
        res.send(response);
        res.end();
    });
};

//Export the getByState method to list 
//all active Cities for a given State
//The state id is passed as id in the request parameters
exports.getByState = function(req, res){
    //Write your code to get the list of Cities for a given state
    City.find({state :req.params._id,activeStatus:true}).populate('state').exec(function(err, data) {
        if (err) throw validator('city',err.ValidationError);
        console.log("Cities::"+JSON.stringify(data))
        var response = {code : 200, cities : data};
        res.send(response);
        res.end();
    });
}

//Export the get method to return
//a City object given the id in the request parameters
exports.get = function(req, res){
    //Write your code the  get a city for given an id
    City.find({_id :req.params.id}).populate('state').populate('state.country').exec(function(err, data) {
        if (err) throw validator('city',err.ValidationError);
        console.log("States::"+JSON.stringify(data))
        var response = {code : 200, cities : data};
        res.send(response);
        res.end();
    });
};

//Export the update method
//Find the city by id passed in the request parameters 
//and update it with the city object in the request body
//Throw an error
//If the city name already exists
//If the city is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
    console.log("req.body.state.country::::"+req.body.state);
    console.log("City update body::"+JSON.stringify(req.body));
    console.log("CityController: sateId:::"+req.body._id);
    var cityName = req.body.name;
    var cityId = req.body._id;
    var regexCityName = new RegExp(["^", cityName, "$"].join(""), "i");
    City.find({name:regexCityName}).populate('state').populate('state.country').exec(function(err, data) {
        if (err) {
            console.log("State Find error::"+err);
            throw validator('city',err.ValidationError);
        }
        if(!data.length){
            //if country not exist update the country
            var citi = City(req.body);
            City.findByIdAndUpdate(cityId, citi, function(err, data) {
                if (err) {
                    throw new Error("City is not found:"+err);
                }
                console.log(data);
                console.log('City updated successfully');
            });

        }else{
            console.log("City Already Exist");
            throw new Error('City Already Exist');
        }

    });
};

//Export the activate method
//Find the city by the id request parameter
//Update the city activeStatus to true
//Throw an error
//If the city is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
    console.log("CityController:activate method");
    console.log("CityController:activate cityId:::"+req.params._id);
    var cityId = req.params._id;
    City.findByIdAndUpdate(cityId, { activeStatus:true}, function(err, data) {
        if (err) {
            throw new Error("City is not found:"+err);
        }
        console.log(data);
        console.log('City is activated successfully');
    });
};

//Export the deactivate method
//Find the city by the id request parameter
//Update the city activeStatus to false
//Throw an error
//If the city is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
    console.log("CityController:activate method");
    console.log("CityController:activate cityId:::"+req.params._id);
    var cityId = req.params._id;
    City.findByIdAndUpdate(cityId, { activeStatus:false}, function(err, data) {
        if (err) {
            throw new Error("City is not found:"+err);
        }
        console.log(data);
        console.log('City is activated successfully');
    });
};