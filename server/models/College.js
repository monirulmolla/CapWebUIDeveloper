/*
// Created by Academy on 20/10/16
// Model file for College
// Fields to be captured
// name: String 
// addressLine1: String
// addressLine2: String
// city: Id reference to City Object
// state: Id reference to State Object
// country: Id reference to Country Object
// activeStatus: boolean
// createdOn: Date
// updatedOn: Date
// All fields are mandatory
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Define the CollegeSchema here
var CollegeSchema = {};
var CollegeSchema = new Schema({
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: {type: ObjectId, ref: 'City'},
    state: {type: ObjectId, ref: 'State'},
    country: {type: ObjectId, ref: 'Country'},
    activeStatus: { type: Boolean, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true }
});
module.exports = mongoose.model('College', CollegeSchema);