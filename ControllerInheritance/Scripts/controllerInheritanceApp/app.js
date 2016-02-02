"use strict";

// application module instanciation
var controllerInheritanceApp = angular.module("controllerInheritanceApp", []);

// parent controller not used anywhere on the page on its own, for inheritance purposes only
var parentController = ['$scope', function parentController($scope) {
    $scope.parentHeaderText = "Header from Parent controller";
    $scope.parentValue = 200;
    $scope.parentFunction = function () {
        $scope.parentMessage = "Clicked button via parent scope";
        return $scope.parentMessage;
    }
}];

// need to add base controller to controllers collection in AngularJS
controllerInheritanceApp.controller(parentController);


// inheriting controller and cunstom functionality with access to parent controller via $injector
controllerInheritanceApp.controller('Secctrlr', ['$injector', '$scope', function ($injector, $scope) {
    
    $scope.simpleInheritance = $scope.masterControllerMessage;

    // inheritance of parent controller via $injector
    $injector.invoke(parentController, this, {
        $scope: $scope
    });

    // watch set up for both this and parent controller values
    $scope.$watchCollection('[parentValue, customValue]', function (newValues) {
        $scope.combinedValue = newValues[0] + newValues[1];
    });

    // some independent 'custom' functinality for this controller
    $scope.customHeaderText = "Header from Inheriting controller";
    $scope.customValue = 400;
    $scope.customFunction = function () {
        $scope.customMessage = "Clicked button for custom message";
        return $scope.customMessage;
    }


    // way to access and combine this and parent controller functionality
    $scope.combinedHeaderText = $scope.parentHeaderText + ", " + $scope.customHeaderText;
    $scope.combinedValue = $scope.parentValue + $scope.customValue;
    $scope.combinedFunctions = function () {
        var parentMessage = $scope.parentFunction();
        var customMessage = $scope.customFunction();
        $scope.combinedMessages = parentMessage + ", " + customMessage;
    }

}]);

angular.module('controllerInheritanceApp').controller('masterController', ['$scope',function ($scope) {
            $scope.masterControllerMessage = "Master Controller text";
}]);