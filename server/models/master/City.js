/*
// Created by Academy on 20/10/16
// Model file for City
// Fields to be captured
// name: String 
// state: id Reference to State Object
// activeStatus: String
// createdOn: Date
// updatedOn: Date
// All fields are mandatory
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Define the CitySchema here
//var CitySchema = {};
var CitySchema = new Schema({
    name: { type: String, required: true },
    state: {type: ObjectId, ref: 'State'},
    activeStatus: { type: Boolean, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true }
});

module.exports = mongoose.model('City', CitySchema);