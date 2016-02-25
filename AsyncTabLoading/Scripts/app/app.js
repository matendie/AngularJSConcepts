
"use strict";

var resolveApp = angular.module('resolveApp', ['ui.router']);

resolveApp.run(['$rootScope', function ($rootScope) {

    // set loading image visibility to false on start
    $rootScope.stateIsLoading = false;

    // route succeeded, set the loading image visibility to false
    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.stateIsLoading = false;
    });

    $rootScope.$on('$stateChangeStart', function (event, next, current) {
        $rootScope.stateIsLoading = true;
    });

}]);
 
resolveApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
     
    $stateProvider.state('Store', {
        url: '/store',
        templateUrl: 'Views/Home/Store.html'
    });

    $stateProvider.state('Store.recommendation', {
        url: '/recommendation',
        templateUrl: 'Views/Home/Recommendation.html',
        controller: 'storeRecommendationController',
        resolve: {
            routeResolveData: ['promiseRecommendationFactory', function (promiseRecommendationFactory) {
                return promiseRecommendationFactory();
            }]
        }
    });

    $stateProvider.state('Store.shop', {
        url: '/shop',
        templateUrl: 'Views/Home/Shop.html'
    });

    $stateProvider.state('Store.cart', {
        url: '/cart',
        templateUrl: 'Views/Home/Cart.html'
    });

    $stateProvider.state('Home', {
        url: '/',
        templateUrl: 'Views/Home/Index.html'
    });

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

resolveApp.controller('indexController', ['$scope', function ($scope) {

}]);

resolveApp.controller('storeController', ['$scope', function ($scope) {

}]);

resolveApp.controller('storeRecommendationController', ['$scope', 'routeResolveData', 'ServiceAccess', function ($scope, routeResolveData, ServiceAccess) {
    
    $scope.refreshResults = routeResolveData.someresults.data[1];
    $scope.loading = true;
    ServiceAccess.refreshEnabled().then(function (result) {
        $scope.refreshResults2 = result.data[0];
        $scope.loading = false;
    });
     
}]);

resolveApp.factory("promiseRecommendationFactory", ['$state', '$q', 'ServiceAccess', function ($state, $q, ServiceAccess) {
    // return promise object
    return function () {
        var newurl = undefined;//ServiceAccess.redirectUrl;
        var someresults = ServiceAccess.someResultData;
         
        return $q.all([newurl, someresults]).then(function (results) {
            if (results[0] != undefined) { 
                // for some reason 'notify:true' is not triggering the success event, therefore we use the 'reload:true' to get the event triggered
                $state.go(results[0].data[0], {}, { reload: true });
            }
            else {
                return {
                    someresults: results[1]
                    , newUrl: results[0]
                };
            }
        });
    };
}]);


resolveApp.service("ServiceAccess", ['$http',  'promiseRefreshFactory', function ($http,  promiseRefreshFactory) {

    //this.redirectUrl = $http.get('api/Redirect');
    this.someResultData = $http.get('api/TestApi?second=' + 2);

    this.refreshEnabled = function () {
        this.promise = promiseRefreshFactory.refresh();
        return this.promise;
    };
}]);
 

resolveApp.factory('promiseRefreshFactory', ['$q', '$http', function ($q, $http) {
    return {
        refresh: function () {
            var deferred = $q.defer();
            deferred.resolve($http.get('api/TestApi?second=' + 2));
            return deferred.promise;
        }
    }
}]);