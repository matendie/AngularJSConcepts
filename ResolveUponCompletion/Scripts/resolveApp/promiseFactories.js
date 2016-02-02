"use strict";

angular.module('resolveApp').factory("promiseNewPageFactory", ['$q', 'ServiceAccess', function ($q, ServiceAccess) {
    // return promise object
    return function () {
        var Late2PageResult = ServiceAccess.late2.then(function (result) { return result.data[0]; });
        var Late3PageResult = ServiceAccess.late3.then(function (result) { return result.data[1]; });

        return $q.all([Late2PageResult, Late3PageResult]).then(function (results) {
            return {
                Late2PageResult: results[0],
                Late3PageResult: results[1]
            };
        });
    };
}]);

angular.module('resolveApp').factory("redirectFactory", ['$location', '$q', 'ServiceAccessRedirect', '$window', function ($location, $q, ServiceAccessRedirect, $window) {
    // return promise object
    return function () {
        var newurl = ServiceAccessRedirect.redirectUrl;
        var someresults = ServiceAccessRedirect.someResultData;

        return $q.all([newurl, someresults]).then(function (results) {
            if (results[0] != undefined) {
                $location.path(results[0].data[0]);
            }
            else {
                return {
                    someresults: results[1],
                    newUrl: results[0]
                };
            }
        });
    };
}]);
 
angular.module('resolveApp').factory('promiseRefreshFactory', ['$q', '$http', function ($q, $http) {    
    return { 
        refresh: function () {
            var deferred = $q.defer();             
            deferred.resolve($http.get('api/TestApi?second=' + 0));            
            return deferred.promise;
        }
    }
}]);
