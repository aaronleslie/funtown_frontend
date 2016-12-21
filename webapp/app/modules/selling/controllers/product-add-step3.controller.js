'use strict';
angular.module('selling').controller('AddProductStep3', ['$log','$scope','AttributeService',
	function($log,$scope,AttributeService){
		var STEP_NO = 3;
		$log.debug('AddProductStep3 controller');

		function init(){		
			$log.debug("AddProductStep3::init");		
			$scope.discs=getDiscAttribute(10);

			if($scope.product.category){
				$scope.regions = AttributeService.getAttributesFor('region',$scope.product.category.categoryId);
				$scope.conditions = AttributeService.getAttributesFor('condition',$scope.product.category.categoryId);
				$scope.classifications = AttributeService.getAttributesFor('NZClassification',$scope.product.category.categoryId);
				$scope.discs=getDiscAttribute(10);
			}else{
				$log.warn("Category not yet set.");
			}			
		}

		// check if the catalog is created manual or using existing catalog (auto)
		$scope.isAutoMode = function(){
			return $scope.product.catalogType === 'auto' 
		}
		// check if the next button should be enabled
	    $scope.isNextDisabled = function(){
	    	return false;
	    }

	    // create discs array 
	    function getDiscAttribute(max){
	    	var d =0;
	    	var discs=[];
			while ( d < max) {
		      discs[d] = d+1;
		      d++;
		    }
		    discs[d] = max + "+";
		    return discs
	    }

	    init();
	}
])