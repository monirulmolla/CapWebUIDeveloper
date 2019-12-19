/*
// Created by Academy on 20/10/16
// Create ValidationService with a single function validationErrors
// Capture the mongodb errors and return them as Understandable messages
// For example if a required field is not included, then capture the error
// return <field name> is Required
*/
exports.validationErrors = function (model,validationError) {
    // var errors = {};
    // Write your code here


    var college = {
        name:{
            required:'College name is required'
        },
        addressLine1:{
            required:'AddressLine1 is required'
        },
        city:{
            required:'City is required'
        },
        state:{
            required:'State is required'
        },
        country:{
            required:'Country is required'
        },
        activeStatus:{
            required:'Active Status is required'
        },
        createdOn:{
            required:'CreatedOn is required'
        },
        updatedOn:{
            required:'UpdatedOn is required'
        }
    };
    var hostel = {
        name:{
            required:'Hostel name is required'
        },
        college:{
            required:'College is required'
        },
        activeStatus:{
            required:'Active Status is required'
        },
        createdOn:{
            required:'CreatedOn is required'
        },
        updatedOn:{
            required:'UpdatedOn is required'
        }
    };

    var student = {
        name:{
            required:'Student name is required'
        },
        rollNo:{
            required:'Student RollNo is required'
        },
        dob:{
            required:'Student DOB is required'
        },
        mobileNumber:{
            required:'Mobile number is required'
        },
        year:{
            required:'Year is required'
        },
        yearOfJoining:{
            required:'Year Of Joining is required'
        },
        college:{
            required:'College is required'
        },
        hostel:{
            required:'Hostel is required'
        },
        createdOn:{
            required:'CreatedOn is required'
        },
        updatedOn:{
            required:'UpdatedOn is required'
        }
    };

    var country = {
        name:{
            required:'Country name is required'
        },
        activeStatus:{
            required:'Active Status is required'
        },
        createdOn:{
            required:'CreatedOn is required'
        },
        updatedOn:{
            required:'UpdatedOn is required'
        }
    };
    var state = {
        name:{
            required:'State name is required'
        },
        country:{
            required:'Country is required'
        },
        activeStatus:{
            required:'Active Status is required'
        },
        createdOn:{
            required:'CreatedOn is required'
        },
        updatedOn:{
            required:'UpdatedOn is required'
        }
    };

    var city = {
        name:{
            required:'City name is required'
        },
        state:{
            required:'State is required'
        },
        activeStatus:{
            required:'Active Status is required'
        },
        createdOn:{
            required:'CreatedOn is required'
        },
        updatedOn:{
            required:'UpdatedOn is required'
        }
    };


    var validationMessages = {
        college:college,
        hostel:hostel,
        student:student,
        country:country,
        state:state,
        city:city
    };

    var messages = validationMessages[model];
    for(key in messages){
        var element = messages[key];
        if(validationError[key]){
            for(i in validationError[key]){
                var err = validationError[key][i];
                err.message = element[err.rule];
            }
        }
    }
    return validationError;
    
    //return errors;
};


