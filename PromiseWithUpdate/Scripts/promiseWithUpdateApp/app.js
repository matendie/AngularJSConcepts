
"use strict";

var promiseUpdateApp = angular.module('promiseUpdateApp', ['ngRoute' ]);


promiseUpdateApp.controller('updateController', ['$scope',  'testFactory', '$q', function ($scope, testFactory, $q) {
     
    testFactory.serverTimeProperty.then( function (result) { $scope.serverTimeProperty = result.data; });

    $scope.getServerTimeProperty = function () {
        testFactory.serverTimeProperty.then(
            function (result) {
                $scope.serverTimeProperty = result.data;
            });
    };

    testFactory.serverTimeFunction().then(function (result) { $scope.serverTimeFunction = result.data; });

    $scope.getServerTimeFunction = function () {
        testFactory.serverTimeFunction().then(
            function (result) {
                $scope.serverTimeFunction = result.data;
            });
    };
     
    testFactory.serverDelayPromiseResponse().then(function (result) { $scope.serverDelayPromiseResponse = result.data; });

    $scope.getServerDelayPromiseResponse = function () { 
        testFactory.serverDelayPromiseResponse().then(
            function (result) {
                $scope.serverDelayPromiseResponse = result.data;
            });
    };
}]);
 
promiseUpdateApp.factory('testFactory', ['$timeout', '$http', 'testService', function ($timeout, $http, testService) {
    return {
        serverTimeProperty: $http.get("api/TestApi?seconds=" + 1),
        serverTimeFunction: function () { return $http.get("api/TestApi?seconds=" + 1); },
        serverDelayPromiseResponse: testService.result 
    }
}]);

promiseUpdateApp.service('testService', ['$http', '$q', function ($http, $q) {
    this.result = function () {
        var deferred = $q.defer();
        deferred.resolve($http.get("api/TestApi?seconds=" + 1));
        return deferred.promise;
    }
}]);
 
  