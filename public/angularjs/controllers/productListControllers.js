angular.module("sportsStore")
	.constant("productListActiveClass", 'btn-primary')
    .constant("productListPageCount", 6)
    .controller("productListCtrl", function ($scope, $filter, productListActiveClass, 
        productListPageCount , cart) {
 
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }
        
        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        }

        $scope.getCategoryClass = function(category) {
        	return selectedCategory == category ? productListActiveClass : ""; 
        }

        // pagination
        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page ? productListActiveClass :"";
        }

        // cart
        $scope.addProductToCart = function(item){
            cart.addProduct(item.id, item.name, item.price)
            console.log(item);
        }
    });