'use strict';
angular.module('selling').controller('ProductsList', ['$log','$scope','$state','ProductsListService','products','$stateParams',
	function($log,$scope,$state,ProductsListService,products,$stateParams){
		$log.debug("ProductsList controller::init");
		$scope.products = products;
		$scope.btnIsVisible = true;
		$scope.productsChosen = [];
        $scope.mode = $stateParams.activateMode;

		function init(){
            if($scope.products.length !== 0){
			     var status = $scope.products[0].status;
            }
			if(status === "In-Draft"){
				$scope.btnIsVisible = false;
			}
			$scope.alertMessage={};
			$scope.alertMessage.confirm = {
				message: "You want to delete the selected products permanently.",
			  	buttons:[
			  		{name:'Yes',action:"deleteProducts"},
			  		{name:'No'}]
			};

		}

		$scope.changeSelectedProducts = function(product){			
			//select one product
			if(product.selected === true && $scope.productsChosen.indexOf(product) === -1){
				$scope.productsChosen.push(product);
				$log.debug('SelectedProducts',$scope.productsChosen);
				//select all products
				if($scope.productsChosen.length === $scope.products.length){
					$scope.chooseAll = true;
				}
			//unselect products
			}else if(product.selected === false && $scope.productsChosen.indexOf(product) !== -1){
				$scope.productsChosen.splice($scope.productsChosen.indexOf(product),1);
				$scope.chooseAll = false;
				$log.debug('unSelectedProducts',$scope.productsChosen);
			}			
		}

		$scope.selectAll = function(){
			if($scope.chooseAll === true){
				$scope.products.forEach(function(element){
					//for unselected products:
					if($scope.productsChosen.indexOf(element) === -1){
						$scope.productsChosen.push(element);
						element.selected = true;
					}
				})
				$log.debug("$scope.productsChosen",$scope.productsChosen);	
			}else if($scope.chooseAll === false){
				$scope.productsChosen.forEach(function(element){
					element.selected = false;
				})
				$scope.productsChosen = [];
				$log.debug("$scope.productsChosen",$scope.productsChosen);
			}				
		}
		
		$scope.activateProduct = function(){
			$log.debug('activateProduct',$scope.productsChosen);
			$scope.productsChosen.forEach(function(product){
				if(product.status !== "Selling"){
					$scope.products.splice($scope.products.indexOf(product),1);
					$scope.chooseAll = false;
					ProductsListService.activateProduct(product);
					$scope.productsChosen = [];
				}else{					
					alert("they are already active.");
					event.preventDefault();
				}
			});	
			
		}

		$scope.deactivateProduct = function(){
			$log.debug('deactivateProduct',$scope.productsChosen);
			$scope.productsChosen.forEach(function(product){
				if(product.status !== "De-Active"){
					$scope.products.splice($scope.products.indexOf(product),1);
					$scope.chooseAll = false;
					ProductsListService.deactivateProduct(product);	
					$scope.productsChosen = [];
				}else{					
					alert("they are already deactive.");
					event.preventDefault();
				}
			});	
		}
		//since use the same confirm alert, function"cancelChanges" is equal to function"deleteProducts".
		$scope.cancelChanges = function(){
			$scope.deleteProducts();			
		}
		
		$scope.deleteProducts = function(){
			$log.debug('deleteProducts',$scope.productsChosen);
			$scope.productsChosen.forEach(function(product){
				$scope.products.splice($scope.products.indexOf(product),1);
				ProductsListService.deleteProducts(product);
				$scope.chooseAll = false;
			});
			$scope.productsChosen = [];			
		}

		$scope.editProduct = function(productId){
			$log.debug('editProduct',productId);
			$state.go("manage.editProduct.step1",{pid:productId})
		}
        $scope.checkLength = function(productsChosen){
            return productsChosen.length === 0;
        }
        $scope.getProductCount = function(){
            return $scope.products.length == 0?false:true;
        }

		init();
	}
])