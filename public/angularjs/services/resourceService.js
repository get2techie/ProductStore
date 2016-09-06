angular.module('productStoreAdmin')
	.factory('resourceService', ["$resource", function ($resource) {
	    return $resource("http://localhost:2403/products/:id", { id: '@id' }, { 
		        	'get': { method: 'GET', cache: true }, // To cache the GET request fired using 'get' method.
		        	'update':  {method:'PUT'}
        		}
        );
	}]);