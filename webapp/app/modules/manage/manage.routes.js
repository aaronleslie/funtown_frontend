'use strict';
angular.module('manage').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state('manage',{
			url:'/manage',
			controller:function($state){
			 	//Render child view
				if($state.current.name==='manage'){
					$state.go("manage.home");
				}
			},
			templateUrl:'app/modules/manage/views/manage-side-nav.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.home',{
			url:'/home',
			controller:'ManageController',
			templateUrl:'app/modules/manage/views/manage.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.changePassword',{
			url:'/changePassword',
			templateUrl:'app/modules/manage/views/changePassword.view.html',
			data: {
				authRequired: true
      }
		})
		.state('manage.editProfile',{
			url:'/editProfile',
			controller:'editProfileController',
			templateUrl:'app/modules/manage/views/editProfile.view.html',
			data: {
				authRequired: true
      }
      })
		//Accounts
		.state('manage.funtownAccount',{
			url:'/funtownAccount',
			templateUrl:'app/modules/account/views/funtown-account.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.paynowAccount',{
			url:'/paynowAccount',
			templateUrl:'app/modules/account/views/paynow-account.view.html',
			data: {
				authRequired: true
            }
		})
		//Buying
		.state('manage.orders',{
			url:'/orders',
			templateUrl:'app/modules/buying/views/orders.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.watchlist',{
			url:'/watchlist',
			templateUrl:'app/modules/buying/views/watchlist.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.shippingAddress',{
			url:'/shippingAddress',
			templateUrl:'app/modules/buying/views/shippingAddress.view.html',
			data: {
				authRequired: true
            }
		})

		.state('manage.itemDetail',{
			url:'/itemDetail?pid',
			templateUrl:'app/modules/buying/views/itemDetail.view.html',
			controller:'ItemDetail',
			data: {
				authRequired: true
            }
		})

		//Selling

		//Products List
		.state('manage.products',{
			url:'/products',
			templateUrl:'app/modules/selling/views/products-list-tabs.view.html',
			resolve:{
				tabs : function(ProductsListService){
					return ProductsListService.getProductCount()
				}
			},
			controller:function($scope,tabs){
				loadTabs(tabs);
				$scope.$on("statusChanged",function(event,tabs){
					loadTabs(tabs);
				})

				function loadTabs(tabs){
					$scope.tabs = tabs;
					$scope.tabs.forEach(function(tab){
						tab.state = "manage.products." + tab.statusCode;
					});
				}
			},
			data: {
				authRequired: true
            }
		})
		.state('manage.products.ACTIVE',{
			url:'/selling',
			templateUrl:'app/modules/selling/views/products-list.view.html',
			resolve:{
				products: function(ProductsListService){
					return ProductsListService.getProductsOfStatus("ACTIVE");
				}
			},
			params:{
				activateMode:'activate'
			},
			controller:'ProductsList',
			data: {
				authRequired: true
            }

		})
		.state('manage.products.SOLD',{
			url:'/sold',
			templateUrl:'app/modules/selling/views/products-list.view.html',
			resolve:{
				products: function(ProductsListService){
					return ProductsListService.getProductsOfStatus("SOLD");
				}
			},
			controller:'ProductsList',
			data: {
				authRequired: true
            }
		})
		.state('manage.products.OUT_OF_STOCK',{
			url:'/outOfStock',
			templateUrl:'app/modules/selling/views/products-list.view.html',
			resolve:{
				products: function(ProductsListService){
					return ProductsListService.getProductsOfStatus("OUT_OF_STOCK");
				}
			},
			controller:'ProductsList',
			data: {
				authRequired: true
            }
		})
		.state('manage.products.DE_ACTIVE',{
			url:'/deactive',
			templateUrl:'app/modules/selling/views/products-list.view.html',
			resolve:{
				products: function(ProductsListService){
					return ProductsListService.getProductsOfStatus("DE_ACTIVE");
				}
			},
			params:{
				activateMode:'deactivate'
			},
			controller:'ProductsList',
			data: {
				authRequired: true
            }
		})
		.state('manage.products.IN_DRAFT',{
			url:'/indraft',
			templateUrl:'app/modules/selling/views/products-list.view.html',
			resolve:{
				products: function(ProductsListService){
					return ProductsListService.getProductsOfStatus("IN_DRAFT");
				}
			},
			controller:'ProductsList',
			data: {
				authRequired: true
            }
		})

		//addProduct
		.state('manage.addProduct',{
			controller:'AddProduct',
			url:'/addProduct',
			templateUrl:'app/modules/selling/views/products-add.view.html',
			resolve:{
				AttributeService: function(AttributeService){
					return AttributeService;
				},
				editProduct:function(){
					return {};
				}
			},
			params:{
				mode:'add'
			},
			data: {
				authRequired: true
            }
		})
		.state('manage.addProduct.step1',{
			controller:'AddProductStep1',
			templateUrl:'app/modules/selling/views/products-add-step1.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.addProduct.step2',{
			controller:'AddProductStep2',
			templateUrl:'app/modules/selling/views/products-add-step2.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.addProduct.step3',{
			controller:'AddProductStep3',
			templateUrl:'app/modules/selling/views/products-add-step3.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.addProduct.step4',{
			controller:'AddProductStep4',
			templateUrl:'app/modules/selling/views/products-add-step4.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.addProduct.step5',{
			controller:'AddProductStep5',
			templateUrl:'app/modules/selling/views/products-add-step5.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.addProduct.step6',{
			controller:'AddProductStep6',
			templateUrl:'app/modules/selling/views/products-add-step6.view.html',
			data: {
				authRequired: true
            }
		})
		//edit product
		.state('manage.editProduct',{
			url:'/editProduct?pid',
			controller:'AddProduct',
			abstract : true,
			templateUrl:'app/modules/selling/views/products-add.view.html',
			resolve:{
				AttributeService: function(AttributeService){
					return AttributeService;
				},
				editProduct : function(ProductService,$stateParams){
					console.log("EditProduct --",$stateParams.pid);
					return ProductService.getSpecifyProduct($stateParams.pid).then(function(response){
						return response.data;
					});
				}
			},
			params:{
				mode:'edit'
			},
			data: {
				authRequired: true
            }
		})
		.state('manage.editProduct.step1',{
			url:'',
			controller:'AddProductStep1',
			templateUrl:'app/modules/selling/views/products-add-step1.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.editProduct.step2',{
			controller:'AddProductStep2',
			templateUrl:'app/modules/selling/views/products-add-step2.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.editProduct.step3',{
			controller:'AddProductStep3',
			templateUrl:'app/modules/selling/views/products-add-step3.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.editProduct.step4',{
			controller:'AddProductStep4',
			templateUrl:'app/modules/selling/views/products-add-step4.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.editProduct.step5',{
			controller:'AddProductStep5',
			templateUrl:'app/modules/selling/views/products-add-step5.view.html',
			data: {
				authRequired: true
            }
		})
		.state('manage.editProduct.step6',{
			controller:'AddProductStep6',
			templateUrl:'app/modules/selling/views/products-add-step6.view.html',
			data: {
				authRequired: true
            }
		})
	}
])
