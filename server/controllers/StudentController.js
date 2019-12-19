/*
// Created by Academy on 20/10/16
// Controller for Managing Students
*/
var Student = require('../models/Student');
var College = require('../models/College');
var Hostel = require('../models/Hostel');
var validator = require('../services/ValidationService');

var HttpStatus = require('http-status');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//Export the save method to save a Student
//Check if the Roll No already exists 
//throw a Roll no already exists error
//If not then create the Student
//Use the validationErrors service for any validation errors
exports.save = function(req, res){
    //Write your save code here
    console.log("I am inside student save method");
    console.log("Student Save body::"+JSON.stringify(req.body));
    console.log("MyRollNo:::"+req.body.rollNo);
    var student = Student({
        name: req.body.name,
        rollNo: req.body.rollNo,
        dob: req.body.dob,
        email: '',
        mobileNumber: req.body.mobileNumber,
        year: req.body.year,
        yearOfJoining: req.body.yearOfJoining,
        college: req.body.college,
        hostel: req.body.hostel,
        activeStatus: true,
        createdOn: new Date().toUTCString(),
        updatedOn: new Date().toUTCString()
    });

    var rollNo = req.body.rollNo;
    Student.find({rollNo:rollNo}, function(err, data) {
        if (err) {
            console.log("Student Find error::"+err);
            throw validator('student',err.ValidationError);
        }
        if(!data.length){
            student.save(function(err) {
                if (err) {
                    console.log('Student created Error::'+err);
                    throw validator('student',err.ValidationError);
                }
                console.log('Student saved successfully');
            });
        }else{
            console.log("Student Already Exist");
            throw new Error('Student Already Exist');
        }

    });
};

exports.saveByCollege = function(req, res){
    //Write your save code here
    console.log("I am inside student save method");
    console.log("Student Save body::"+JSON.stringify(req.body));
    var student = Student({
        name: req.body.name,
        rollNo: req.body.rollNo,
        dob: req.body.dob,
        email: '',
        mobileNumber: req.body.mobileNumber,
        year: req.body.year,
        yearOfJoining: req.body.yearOfJoining,
        college: req.params._id,
        hostel: req.body.hostel,
        activeStatus: true,
        createdOn: new Date().toUTCString(),
        updatedOn: new Date().toUTCString()
    });

    var rollNo = req.body.rollNo;
    Student.find({rollNo:rollNo}, function(err, data) {
        if (err) {
            console.log("Student Find error::"+err);
            throw validator('student',err.ValidationError);
        }
        if(!data.length){
            student.save(function(err) {
                if (err) {
                    console.log('Student created Error::'+err);
                    throw validator('student',err.ValidationError);
                }
                console.log('Student saved successfully');
            });
        }else{
            console.log("Student Already Exist");
            throw new Error('Student Already Exist');
        }

    });
};

//Export the get method to return
//a Student object given the id in the request parameters
//If the student is not found
//Throw a student not found error
exports.get = function(req, res){
    //Write your get code here
    console.log("I am inside getbyStudent id ");
    Student.find({_id :req.params._id}).populate('hostel').populate('hostel.college').exec(function(err, data) {
        if (err) throw validator('student',err.ValidationError);
        console.log("Students::"+JSON.stringify(data))
        var response = {code : 200, student : data};
        res.send(response);
        res.end();
    });
};

//Export the list method to return a list of all Students
exports.list = function(req, res){
    //Write your list code here
    console.log("I am inside getbyStudent id ");
    Student.find({}).populate('hostel').populate('hostel.college').exec(function(err, data) {
        if (err) throw validator('student',err.ValidationError);
        console.log("Students::"+JSON.stringify(data))
        var response = {code : 200, students : data};
        res.send(response);
        res.end();
    });
};

//Export the getByCollege method to list 
//all active Students for a given College
//The College id is passed as id in the request parameters
exports.getByCollege = function(req,res){
    //Write your getByCollege code here
    console.log("I am inside getbyStudent id ");
    Student.find({college :req.params._id}).populate('hostel').populate('hostel.college').exec(function(err, data) {
        if (err) throw validator('student',err.ValidationError);
        console.log("Students::"+JSON.stringify(data))
        var response = {code : 200, students : data};
        res.send(response);
        res.end();
    });
};
exports.getByCollegeAndStudent = function(req,res){
    //Write your getByCollege code here
    console.log("GetStudent: Step 2: StudentController.js");
    Student.find({college :req.params.id,_id :req.params.studentId}).populate('hostel').populate('hostel.college').exec(function(err, data) {
        if (err) throw validator('student',err.ValidationError);
        console.log("Student::"+JSON.stringify(data))
        var response = {code : 200, student : data};
        res.send(response);
        res.end();
    });
};
//Export the update method
//Find the Student by id passed in the request parameters 
//and update it with the Student object in the request body
//Throw an error
//If the Student Roll No already exists
//If the Roll No is not found
//Use the validationErrors service for any validation errors
exports.update = function(req, res){
    //Write your update code here
    console.log("Student update body::"+JSON.stringify(req.body));
    console.log("StudentController: sateId:::"+req.body._id);
    var studentId = req.body._id;
    var rollNo = req.body.rollNo;
    Student.find({rollNo:rollNo}).populate('hostel').populate('hostel.college').exec(function(err, data) {
        if (err) {
            console.log("Student Find error::"+err);
            throw validator('student',err.ValidationError);
        }
        if(!data.length){
            var sudent = Student(req.body);
            Student.findByIdAndUpdate(studentId, sudent, function(err, data) {
                if (err) {
                    throw new Error("Student is not found:"+err);
                }
                console.log(data);
                console.log('Student updated successfully');
            });

        }else{
            console.log("Student Already Exist");
            throw new Error('Student Already Exist');
        }

    });
};

//Export the activate method
//Find the Student by the id request parameter
//Update the Student activeStatus to true
//Throw an error
//If the Student is not found
//Use the validationErrors service for any validation errors
exports.activate = function(req, res){
    //Write your activate code here
    console.log("StudentController:activate studentId:::"+req.params._id);
    var studentId = req.params._id;
    Student.findByIdAndUpdate(studentId, { activeStatus:true}, function(err, data) {
        if (err) {
            throw new Error("Student is not found:"+err);
        }
        console.log(data);
        console.log('Student is activated successfully');
    });
};

//Export the deactivate method
//Find the Student by the id request parameter
//Update the Student activeStatus to false
//Throw an error
//If the Student is not found
//Use the validationErrors service for any validation errors
exports.deactivate = function(req, res){
    //Write your deactivate code here
    console.log("StudentController:activate studentId:::"+req.params._id);
    var studentId = req.params._id;
    Student.findByIdAndUpdate(studentId, { activeStatus:false}, function(err, data) {
        if (err) {
            throw new Error("Student is not found:"+err);
        }
        console.log(data);
        console.log('Student is activated successfully');
    });
};
