"use strict";

var uiRouteApp = angular.module('uiRouteApp', ['ui.router']);


uiRouteApp.run(['$rootScope', function ($rootScope) {


    //$stateChangeSuccess - fired once the state transition is complete.
    //$stateChangeStart - fired when the transition begins.
    //$stateNotFound - fired when a state cannot be found by its name.
    //$stateChangeError - fired when an error occurs during transition.


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

uiRouteApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
         
        .state('Home', {
            url: '/',
            templateUrl: 'views/home/partial-home.html'
        })

        .state('Home.list', {
            url: 'home/list',
            templateUrl: 'views/home/partial-home-list.html',
            controller: function ($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('Home.paragraph', {
            url: 'home/paragraph',
            template: 'I could sure use a drink right now.'
        })
         
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('About', {
            url: '/About',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'views/home/partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@About': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller 
                'columnTwo@About': { 
                    templateUrl: 'views/home/table-data.html',
                    controller: 'scotchController'
                }
            }

        })
        // INTENDED PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('Intended', {
            url: '/Intended',
            templateUrl: 'views/home/partial-intended.html',
            resolve: { 
                routeResolveData: ['promiseIntendedFactory', function (promiseIntendedFactory) {
                    return promiseIntendedFactory();
                }]
            }
        })
        // Redirect PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('Redirect', {
            url: '/Redirect',
            templateUrl: 'views/home/partial-redirect.html',
            controller: 'redirectController'
        })
    ;

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

uiRouteApp.controller('redirectController', ['$scope', 'redirecetService', function ($scope, redirecetService) {
    redirecetService.refreshEnabled().then(function (result) {
        $scope.refreshResults = result.data[0];
    });

    redirecetService.lateA.then(function (result) {
        $scope.staticResult1 = result.data[0];
    });

    redirecetService.lateB.then(function (result) {
        $scope.staticResult2 = result.data[1];
    });
}]);

uiRouteApp.controller('scotchController', ['$scope',function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

}]);


angular.module('uiRouteApp').factory("promiseIntendedFactory", ['$state', '$q', 'ServiceAccessRedirect', 'promiseRefreshFactory', '$rootScope', function ($state, $q, ServiceAccessRedirect, promiseRefreshFactory, $rootScope) {
    // return promise object
    return function () {
        var newurl = ServiceAccessRedirect.redirectUrl;
        var someresults = ServiceAccessRedirect.someResultData;
         
        return $q.all([newurl, someresults]).then(function (results) {
            if (results[0] != undefined) {

                // location Boolean or "replace" (default true), If true will update the url in the location bar, if false will not. If string "replace", will update url and also replace last history record.
                // inherit Boolean (default true), If true will inherit url parameters from current url.
                // relative stateObject (default $state.$current), When transitioning with relative path (e.g '^'), defines which state to be relative from.
                // notify Boolean (default true), If true will broadcast $stateChangeStart and $stateChangeSuccess events.
                // reload v0.2.5 Boolean (default false), If true will force transition even if the state or params have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd use this when you want to force a reload when everything is the same, including search params.

                // for some reason 'notify:true' is not triggering the success event, therefore we use the 'reload:true' to get the event triggered
                $state.go(results[0].data[0], {}, { reload: true });
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

angular.module('uiRouteApp').service("ServiceAccessRedirect", ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

    this.redirectUrl = $http.get('api/Redirect');
    this.someResultData = $http.get('api/TestApi?second=' + 2);
}]);


angular.module('uiRouteApp').factory('promiseRefreshFactory', ['$q', '$http', function ($q, $http) {
    return {
        refresh: function () {
            var deferred = $q.defer();
            deferred.resolve($http.get('api/TestApi?second=' + 2));
            return deferred.promise;
        }
    }
}]);

angular.module('uiRouteApp').service("redirecetService", ['$http', '$q', '$timeout', 'promiseRefreshFactory', function ($http, $q, $timeout, promiseRefreshFactory) {
    this.refreshEnabled = function () {
        this.promise = promiseRefreshFactory.refresh();
        return this.promise;
    };
    this.lateA = $http.get('api/TestApi?second=' + 1);
    this.lateB = $http.get('api/TestApi?second=' + 2);
}]);

 