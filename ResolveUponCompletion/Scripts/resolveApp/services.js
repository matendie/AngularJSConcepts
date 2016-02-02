"use strict";
 
angular.module('resolveApp').service("redirecetService", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
     
    this.lateA =  $http.get('api/TestApi?second=' + 1);
    this.lateB = $http.get('api/TestApi?second=' + 2);
}]);

angular.module('resolveApp').service("ServiceAccessRedirect", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    
    this.redirectUrl = $http.get('api/Redirect');
    this.someResultData = $http.get('api/TestApi?second=' + 2);
}]);

angular.module('resolveApp').service("ServiceAccess", ['$http', '$q', '$timeout', function ($http, $q, $timeout) { 
    this.late2 = $http.get('api/TestApi?second=' + 1);
    this.late3 = $http.get('api/TestApi?second=' + 2);
}]);

angular.module('resolveApp').service("nodelayPageService", ['$http', function ($http) {
    this.result1 = $http.get('api/TestApi?second=' + 1);
    this.result2 = $http.get('api/TestApi?second=' + 2);
}]);


angular.module('resolveApp').service('promiseRefreshService', ['promiseRefreshFactory', '$http', '$q',  function (promiseRefreshFactory, $http, $q) { 
    this.refreshEnabled = function () {
        this.promise = promiseRefreshFactory.refresh();
        return this.promise;
    }; 
}]);