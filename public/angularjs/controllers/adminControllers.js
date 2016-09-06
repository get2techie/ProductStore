angular.module('productStoreAdmin')
	.constant('authUrl','http://localhost:2403/users/login')
	.constant('orderUrl','http://localhost:2403/orders')
	.controller('authCtrl', function($scope, $http, $location, authUrl){
		$scope.authenticate = function(user, pwd) {
			$http.post(authUrl, {
	            username: user,
	            password: pwd
	        }, {
	            withCredentials: true
	        }).success(function (data) {
	            $location.path("/main");
	        }).error(function (error) {
	            $scope.authenticationError = error;
	        });
		}
	})
	.controller('mainCtrl', function($scope){
		$scope.screens = ["Products" ,"Orders"];
		$scope.current = $scope.screens[0];

		$scope.setScreen = function(index) {
			$scope.current = $scope.screens[index];
		};

		$scope.getScreen = function() {
			return $scope.current == "Products" ? "views/adminProducts.html" : "views/adminOrders.html"
		};
	})
	.controller('ordersCtrl', function($scope, $http, orderUrl){
		// This ensures that the browser includes the security cookie back to server to 
		// authenticate the request.
		$http.get(orderUrl, { withCredentials:true})
		.success(function(data){
			$scope.orders = data;
		})
		.error(function(error){
			$scope.error = error;
		});

		$scope.calcTotal = function(order) {
			var total = 0;
			for(var i = 0; i < order.products.length; i++){
				total += order.products[i].count * order.products[i].price;
			}
			return total;
		};

		$scope.selectOrder = function(order) {
			$scope.selectedOrder = order;
			console.log($scope.selectedOrder);
		};
	});