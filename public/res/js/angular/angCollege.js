/*
// Created by Academy on 20/10/16
// Angular JS Module for managing Colleges
*/

// Configure the Angular Module 
// Client side routes for 
// the College pages
angmodule.config(function($stateProvider) {
    var collegeDir = '/pages/college/';

    $stateProvider.state('home.college', {
        url: '^/colleges',
        controller: CollegeListCtrl,
        templateUrl: collegeDir+'collegeList.html',

    }).state('home.createCollege', {
        url: '^/college',
        controller: CollegeCtrl,
        templateUrl: collegeDir+'college.html'
    }).state('home.editCollege', {
        url: '^/college/:id',
        controller: CollegeCtrl,
        templateUrl: collegeDir+'college.html'
    }).state('home.showCollege', {
        url: '^/college/:id/show',
        controller: ShowCollegeCtrl,
        templateUrl: collegeDir+'showCollege.html'
    }).state('home.hostel', {
        url: '^/college/:id/hostels',
        controller: HostelListCtrl,
        templateUrl: collegeDir+'hostelList.html'
    });
});

// Write the Controllers here for the College pages
function CollegeCtrl($scope, $state, $stateParams, CrudService){

    if($stateParams.id != undefined){
        CrudService.get('/college/'+$stateParams.id).then(function(response){
            console.log("GetCollege Step 3: angCollege.js");
            var resp = JSON.parse(response);
            console.log("Response College:::"+resp.college);
            if(resp.code ==200){
                console.log(response)
                $scope.item = resp.college[0];
                $scope.item.country = resp.college[0].country;
                $scope.item.state = resp.college[0].state;
                $scope.item.city = resp.college[0].city._id;
            }else{
                console.log(response.error);
            }
        });
    }


    $scope.getCountryList = function(){
        CrudService.list('/activeCountries').then(function(response){
            console.log(response);
            //var resp = JSON.parse(response);
            console.log("TEST:Response getActiveCountry:::"+response);
            if(response.code == 200){
                $scope.countries = response.countries;
            }
        }, function(errorResponse){
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    };

    $scope.getCountryList();

    $scope.getStateList = function(){
        CrudService.list('/country/'+$scope.item.country+'/states').then(function(response){
            console.log(response);
            if(response.code ==200){
                $scope.states = response.states;
                $scope.collegeForm.$setPristine();
            }
        }, function(errorResponse){
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    };

    $scope.$watch('item.country', function() {
        if($scope.item && $scope.item.country){
            $scope.getStateList();
        }
    });

    $scope.getCityList = function(){
        if($scope.item.state != undefined)
            CrudService.list('/state/'+$scope.item.state+'/cities').then(function(response){
                console.log(response);
                if(response.code ==200){
                    $scope.cities = response.cities;
                    $scope.collegeForm.$setPristine();
                }
            }, function(errorResponse){
                console.log(errorResponse.error);
                //$scope.error = errorResponse.error;
            });
    };


    $scope.$watch('item.state', function() {
        console.log('watch called');
        if($scope.item && $scope.item.state != undefined){
            $scope.getCityList();
        }
    });

    $scope.addCollege = function(item){
        if(item._id != undefined){
            CrudService.update('/college/'+$stateParams.id, item).then(function(response){
                console.log(response);
                if(response.code ==200){
                    $state.go('home.college')
                }
            }, function(errorResponse){
                //console.log(errorResponse.error);
                $scope.error = errorResponse.error;
            });
        }
        else{
            CrudService.create('/college', item).then(function(response){
                console.log(response);
                if(response.code ==200){
                    $state.go('home.college');
                }
            }, function(errorResponse){
                //console.log(errorResponse.error);
                $scope.error = errorResponse.error;
            });
        }

    }
}

function ShowCollegeCtrl($scope, $state, $stateParams, CrudService){
    $scope.collegeId = $stateParams.id;

    var getCollege = function(){
        CrudService.get('/college/'+$stateParams.id).then( function(response){
            $scope.college = response.item;
        }, function(errorResponse){
            console.log(errorReponse);
        })
    };
    getCollege();
}

function CollegeListCtrl($scope, $state, CrudService){
    var getCollegeList = function(){
        CrudService.list('/colleges').then(function(response){
            console.log(response);
            if(response.code ==200){
                $scope.colleges = response.colleges;
            }
        }, function(errorResponse){
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    };

    $scope.colleges = [];

    getCollegeList();

    $scope.activate = function(itemId){
        CrudService.update('/college/' + itemId + '/activate').then(function (response) {
            console.log(response);
            if (response.code == 200) {
                getCollegeList();
            }
        }, function (errorResponse) {
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    }

    $scope.deactivate = function(itemId){
        CrudService.update('/college/' + itemId + '/deactivate').then(function (response) {
            console.log(response);
            if (response.code == 200) {
                getCollegeList();
            }
        }, function (errorResponse) {
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    }
}

// Write the Controller here for the Hostel pages
function HostelListCtrl($scope, $state, $stateParams, CrudService){
    CrudService.get('/college/'+$stateParams.id).then( function(response){
        $scope.college = response.item;
    }, function(errorResponse){
        console.log(errorResponse);
    });

    $scope.collegeId =$stateParams.id;
    var hostelList = function(){
        CrudService.list('/college/'+$stateParams.id+'/hostels').then(function(response){
            console.log(response);
            if(response.code ==200){
                $scope.hostels = response.hostels;
            }
        }, function(errorResponse){
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    };
    hostelList();

    $scope.addHostel = function(item){
        if(item._id){
            console.log(item)

            CrudService.update('/hostel/'+item._id, item).then(function(response){
                console.log(response);
                if(response.code ==200){
                    $scope.dismiss();
                    hostelList();
                }
            }, function(errorResponse){
                //console.log(errorResponse.error);
                console.log(errorResponse.error)
                $scope.error = errorResponse.error;
            })
        }
        else{
            item.college = $stateParams.id;
            CrudService.create('/hostel', item).then(function(response){
                console.log(response);
                if(response.code ==200){
                    $scope.dismiss();
                    hostelList();
                }
            }, function(errorResponse){
                //console.log(errorResponse.error);
                console.log(errorResponse)
                $scope.error = errorResponse.error;
            })
        }
    };

    $scope.editHostel = function(item){
        $scope.hostel = angular.copy(item);
    };

    $scope.resetForm = function(){
        $scope.hostel = '';
        $scope.error = '';
        $scope.hostelForm.$setPristine();
    };

    $scope.activate = function(itemId){
        CrudService.update('/hostel/' + itemId + '/activate').then(function (response) {
            console.log(response);
            if (response.code == 200) {
                hostelList();
            }
        }, function (errorResponse) {
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    }

    $scope.deactivate = function(itemId){
        CrudService.update('/hostel/' + itemId + '/deactivate').then(function (response) {
            console.log(response);
            if (response.code == 200) {
                hostelList();
            }
        }, function (errorResponse) {
            console.log(errorResponse.error);
            //$scope.error = errorResponse.error;
        });
    }
}