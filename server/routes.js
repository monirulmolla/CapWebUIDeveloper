/*
 // Created by Academy on 20/10/16
 */
var HttpStatus = require('http-status');

var StudentController = require('./controllers/StudentController');
var CountryController = require('./controllers/master/CountryController');
var StateController = require('./controllers/master/StateController');
var CityController = require('./controllers/master/CityController');
var CollegeController = require('./controllers/CollegeController');
var HostelController = require('./controllers/HostelController');

module.exports = function(router){

    router.all('/', function (req, res) {
        res.sendFile('index.html',{ root:'./public/'});
    });

    router.all('/isServerRunning', function(req,res) {
        res.status(200).json({code:200, data: "Server Running..."})
    });

    router.all('/getTime', function(req,res) {
        res.status(200).json({code:200, data: {date: new Date().toUTCString()}})
    });

    /*
     Add your routes here
     */

    router.get('/college/:id/student/:studentId', function(req,res) {
        console.log("GetStudent: Step 1: routes.js");
        StudentController.getByCollegeAndStudent(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, item: data});
        });
    });

    // Country routes
    router.get('/countries', function(req,res) {
        console.log("I am inside countries");
        CountryController.list(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: {date: new Date().toUTCString()}});
            res.set({countries:data});
            //res.send();
        });
    });
    router.post('/country', function(req,res) {
        //console.log("I am inside countries");
        CountryController.save(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/country/:_id', function(req,res) {
        console.log("I am inside update country");
        CountryController.update(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/country/:_id/activate', function(req,res) {
        console.log("I am inside activate country");
        CountryController.activate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/country/:_id/deactivate', function(req,res) {
        console.log("I am inside deactivate country");
        CountryController.deactivate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/activeCountries', function(req,res) {
        console.log("I am inside deactivate country");
        CountryController.activeList(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/country/:_id/colleges', function(req,res) {
        console.log("I am inside activate country");
        CollegeController.getByCountry(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, colleges: data});
        });
    });

    // State routes
    router.get('/states', function(req,res) {
        console.log("I am inside states");
        StateController.list(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: {date: new Date().toUTCString()}});
            res.set({states:data});
        });
    });

    router.post('/state', function(req,res) {
        //console.log("I am inside state");
        StateController.save(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/state/:_id', function(req,res) {
        console.log("I am inside update state");
        StateController.update(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/state/:_id/activate', function(req,res) {
        console.log("I am inside activate state");
        StateController.activate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/state/:_id/deactivate', function(req,res) {
        console.log("I am inside deactivate state");
        StateController.deactivate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/country/:_id/states', function(req,res) {
        console.log("I am inside activate country");
        StateController.getByCountry(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });


    // City routes
    router.get('/cities', function(req,res) {
        console.log("I am inside states");
        CityController.list(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: {date: new Date().toUTCString()}});
            res.set({cities:data});
        });
    });

    router.post('/city', function(req,res) {
        //console.log("I am inside state");
        CityController.save(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/city/:_id', function(req,res) {
        console.log("I am inside update city");
        CityController.update(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/city/:_id/activate', function(req,res) {
        console.log("I am inside activate city");
        CityController.activate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/city/:_id/deactivate', function(req,res) {
        console.log("I am inside deactivate city");
        CityController.deactivate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });

    router.get('/state/:_id/cities', function(req,res) {
        console.log("I am inside cities");
        CityController.getByState(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, cities: data});
        });
    });




    // College routes
    router.get('/colleges', function(req,res) {
        console.log("I am inside colleges");
        //res.end(CollegeController.list(req,res));
        CollegeController.list(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.send(data);
        });
    });
    router.post('/college', function(req,res) {
        //console.log("I am inside state");
        CollegeController.save(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/college/:_id', function(req,res) {
        console.log("GetCollege Step 1: routes.js");
        CollegeController.get(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, college: data});
        });
    });
    router.put('/college/:_id', function(req,res) {
        console.log("I am inside update college");
        CollegeController.update(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, college: data});
        });
    });
    router.put('/college/:_id/activate', function(req,res) {
        console.log("I am inside activate college");
        CollegeController.activate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/college/:_id/deactivate', function(req,res) {
        console.log("I am inside deactivate college");
        CollegeController.deactivate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });


    // Hostel routes
    router.get('/hostels', function(req,res) {
        console.log("I am inside hostels");
        HostelController.list(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.send(data);
        });
    });

    router.post('/hostel', function(req,res) {
        HostelController.save(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/hostel/:_id', function(req,res) {
        console.log("I am inside update hostel");
        HostelController.get(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, college: data});
        });
    });
    router.put('/hostel/:_id', function(req,res) {
        console.log("I am inside update hostel");
        HostelController.update(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, college: data});
        });
    });
    router.put('/hostel/:_id/activate', function(req,res) {
        console.log("I am inside activate hostel");
        HostelController.activate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/hostel/:_id/deactivate', function(req,res) {
        console.log("I am inside deactivate hostel");
        HostelController.deactivate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/college/:_id/hostels', function(req,res) {
        console.log("I am inside getHostets by college");
        HostelController.getByCollege(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/college/:_id/activeHostels', function(req,res) {
        console.log("I am inside getHostets by college");
        HostelController.activeListByCollege(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });




    // Student routes
    router.get('/students', function(req,res) {
        console.log("I am inside students");
        StudentController.list(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.send(data);
        });
    });
    router.post('/student', function(req,res) {
        StudentController.save(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.get('/student/:_id', function(req,res) {
        console.log("I am inside update student");
        StudentController.get(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, student: data});
        });
    });
    router.put('/student/:_id', function(req,res) {
        console.log("I am inside update student");
        StudentController.update(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, student: data});
        });
    });
    router.put('/student/:_id/activate', function(req,res) {
        console.log("I am inside activate student");
        StudentController.activate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });
    router.put('/student/:_id/deactivate', function(req,res) {
        console.log("I am inside deactivate student");
        StudentController.deactivate(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });

    router.get('/college/:_id/students', function(req,res) {
        console.log("I am inside getStudent by college");
        StudentController.getByCollege(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, students: data});
        });
    });

    router.post('/college/:_id/student', function(req,res) {
        console.log("I am inside getStudent by college");
        StudentController.saveByCollege(req,res,function (err, data) {
            if (err) {
                return res.sendStatus(500).end();
            }
            res.status(200).json({code:200, data: data});
        });
    });






};