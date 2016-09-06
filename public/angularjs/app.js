angular.module("sportsStore", ['customFilters','cartModule','ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl:'views/checkoutSummary.html'
        });
        $routeProvider.when('/products',{
        	templateUrl:'views/productList.html'
        });
        $routeProvider.when('/placeorder',{
        	templateUrl:'views/placeOrder.html'
        });
        $routeProvider.when('/complete',{
        	templateUrl:'views/thankYou.html'
        });
        $routeProvider.otherwise({
            templateUrl: 'views/productList.html'
        });
    });