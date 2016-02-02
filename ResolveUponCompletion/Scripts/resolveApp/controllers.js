
"use strict";


angular.module('resolveApp').controller('indexController', ['$scope', function ($scope) {

}]);

angular.module('resolveApp').controller('nodelayController', ['$scope', 'nodelayPageService', function ($scope, nodelayPageService) {

    nodelayPageService.result1.then(function (result) {
         $scope.nodelayPageResult1 = result.data[0];
    });
     
     nodelayPageService.result2.then(function (result) {
         $scope.nodelayPageResult2 = result.data[1];
    });
     
}]);

angular.module('resolveApp').controller('delayedpageController', ['$scope', 'routeResolveData', function ($scope, routeResolveData) {

    $scope.delayPageResult1 = routeResolveData.Late2PageResult;
    $scope.delayPageResult2 = routeResolveData.Late3PageResult;

}]);

angular.module('resolveApp').controller('masterController', ['$scope', '$location', '$templateCache', function ($scope, $location, $templateCache) {
     $scope.nodelayClick = function () { 
        $location.path('/delay/nodeley'); 
    };
    $scope.delayClick = function () { 
        $location.path('/delay/delayed'); 
    };
    $scope.intendedClick = function () { 
        $location.path('/delay/intended'); 
    };
    $scope.redirectClick = function () { 
        $location.path('/delay/redirect'); 
    };
    $scope.mvcPageClick = function () { 
        $location.path('/home/MvcPage'); 
    };
}]);

angular.module('resolveApp').controller('intendedPageController', ['$scope', '$location', function ($scope, $location) {

}]);

angular.module('resolveApp').controller('MvcPageController', ['$scope', 'redirecetService', function ($scope, redirecetService) {
    redirecetService.lateA.then(function (result) {
        $scope.staticResult1 = result.data[0];

    });
    redirecetService.lateB.then(function (result) {
        $scope.staticResult2 = result.data[1];

    });
}]);

angular.module('resolveApp').controller('redirectPageController', ['$scope', 'redirecetService', 'promiseRefreshService', function ($scope, redirecetService, promiseRefreshService) {

    promiseRefreshService.refreshEnabled().then(function (result) {
        $scope.refreshResults = result.data[0];
    });

    redirecetService.lateA.then(function (result) {
        $scope.staticResult1 = result.data[0];
    });

    redirecetService.lateB.then(function (result) {
        $scope.staticResult2 = result.data[1];
    });

}]);
