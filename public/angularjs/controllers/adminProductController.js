angular.module('productStoreAdmin')
	.constant("productUrl", "http://localhost:2403/products")
	.config(function($httpProvider) {
	    $httpProvider.defaults.withCredentials = true;
	})
	.factory('resourceService', ["$resource", function ($resource) {
	    return $resource("http://localhost:2403/products/:id", { id: '@id' }, { 
		        	'get': { method: 'GET', cache: true }, // To cache the GET request fired using 'get' method.
              
		        	'update':  {method:'PUT'}
        		}
        );
	}])
	.controller('productCtrl', function($scope, $http, $resource, productUrl, resourceService){
		
	    $scope.listProducts = function () {
	        $scope.products = resourceService.query();
	    };

	    $scope.listProducts();

	 	$scope.createProduct = function (product) {
	        new resourceService(product).$save().then(function (newProduct) {
	            $scope.products.push(newProduct);
	            $scope.editedProduct = null;
	        });
	    }

	    $scope.startEdit = function(product) {
	    	$scope.editedProduct = product;
	    	console.log($scope.editedProduct.id)
	    };

	    $scope.updateProduct = function (product) {	
	       	resourceService.save(product);
	        $scope.editedProduct = null;
	    }

	 	$scope.cancelEdit = function() {
	 		$scope.editedProduct = null;
	 	}

	 	$scope.deleteProduct = function(product) {
	 		product.$delete().then(function(){
	 			$scope.products.splice($scope.products.indexOf(product),1);
	 		});
	 	}
	});