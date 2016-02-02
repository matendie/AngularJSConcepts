"use strict";

resolveApp.directive('buttons', function () {
    return {
        scope: true,
        template:
                    '<li><button ng-click="nodelayClick()" >No Delay Load Page</button></li>   ' +
                    '<li><button ng-click="delayClick()" >Delayed Load Page</button></li>     ' +
                    '<li><button ng-click="intendedClick()" >Intended page to land on</button></li>' +
                    '<li><button ng-click="redirectClick()"  >Redirected page</button></li>           ' +
                    '<li><button ng-click="mvcPageClick()" >MVC partial Page</button></li>   '
    };
});
