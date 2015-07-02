'use strict';

angular.module('app', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {controller: 'NewsCtrl', templateUrl: 'app/news/show/tmpl.html'})
    }]);