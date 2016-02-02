"use strict";

var yourApp = angular.module('app', ['ngRoute']);


yourApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'testController',
        templateUrl: 'views/home/index.html' 
    });
    $routeProvider.when('/home/index', {
        controller: 'testController',
        templateUrl: 'views/home/index.html'
    });
    $routeProvider.when('/home/about', {
        controller: 'testController',
        templateUrl: 'views/home/about.html'
    });
    $routeProvider.when('/home/contact', {
        controller: 'testController',
        templateUrl: 'views/home/contact.html'
    });

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

yourApp.controller('testController', [ '$scope',  function ($scope) {
    $scope.message = "this is test controller content";
}]);