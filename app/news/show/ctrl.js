'use strict';

angular.module('app')
    .controller('NewsCtrl', ['$scope', 'News', function ($scope, News) {
        News.get({id: 8863}, function (n) {
            $scope.news = n;
        });
    }]);