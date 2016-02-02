 
"use strict";

var resolveApp = angular.module('resolveApp', ['ngRoute']);

resolveApp.run(['$rootScope', function ($rootScope) {
      
    // set loading image visibility to false on start
    $rootScope.stateIsLoading = false;
     
    // route succeeded, set the loading image visibility to false
    $rootScope.$on('$routeChangeSuccess', function () { 
        $rootScope.stateIsLoading = false;  
    });
     
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $rootScope.stateIsLoading = true; 
    });

}]);

resolveApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
    $routeProvider.when('/',
    {
        templateUrl: 'Views/Home/Index.html',
        controller: 'indexController'
    });
    $routeProvider.when('/delay',
    {
        templateUrl: 'Views/Home/Index.html',
        controller: 'indexController'
    });
    $routeProvider.when('/delay/nodeley',
    {
        templateUrl: 'Views/Home/OnPageLoading.html',
        controller: 'nodelayController' 
    });
    $routeProvider.when('/delay/delayed',
    {
        templateUrl: 'Views/Home/DelayedLoad.html',
        controller: 'delayedpageController',
        resolve: {
            routeResolveData: ['promiseNewPageFactory', function (promiseNewPageFactory) { 
                return promiseNewPageFactory();                
            }]
        }         
    });
    $routeProvider.when('/delay/intended',
    {
        templateUrl: 'Views/Home/IntendedPage.html',
        controller: 'intendedPageController',
        resolve: {
            routeResolveData: ['redirectFactory', function (redirectFactory) {
                return redirectFactory();
            }]
        }
    });
    $routeProvider.when('/delay/redirect',
    {
        templateUrl: 'Views/Home/RedirectPage.html',
        controller: 'redirectPageController',
        resolve: {
            routeResolveData: ['redirectFactory', function (redirectFactory) {
                return redirectFactory();
            }]
        }
    });
    $routeProvider.when('/home/MvcPage',
    {
        templateUrl: 'Home/MvcPage',
        controller: 'MvcPageController',
        resolve: {
            routeResolveData: ['promiseNewPageFactory', function (promiseNewPageFactory) {
                return promiseNewPageFactory();
            }]
        }
    });
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

