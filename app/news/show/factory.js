'use strict';

angular.module('app')
    .factory('News', ['$resource', function ($resource) {
        return $resource("https://hacker-news.firebaseio.com/v0/item/:id.json?print=pretty");
    }]);