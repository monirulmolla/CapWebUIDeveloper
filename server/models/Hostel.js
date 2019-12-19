/*
// Created by Academy on 20/10/16
// Model file for Hostel
// Fields to be captured
// name: String 
// college: id Reference to College Object
// activeStatus: boolean
// createdOn: Date
// updatedOn: Date
// All fields are mandatory
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Define the HostelSchema here
//var HostelSchema = {};
var HostelSchema = new Schema({
    name: { type: String, required: true },
    college: {type: ObjectId, ref: 'College',required: true},
    activeStatus: { type: Boolean, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true }
});

module.exports = mongoose.model('Hostel', HostelSchema);