/*
// Created by Academy on 20/10/16
// Model file for State
// Fields to be captured
// name: String 
// country: id Reference to Country Object
// activeStatus: boolean
// createdOn: Date
// updatedOn: Date
// All fields are mandatory
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Define the StateSchema Here
//var StateSchema = {};
var StateSchema = new Schema({
    name: { type: String, required: true },
    country: {type: ObjectId, ref: 'Country'},
    activeStatus: { type: Boolean, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true }
});

module.exports = mongoose.model('State', StateSchema);