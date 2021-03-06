'use strict';
angular.module('funtown').service('ShippingTempalateService', ['$log','$http',
	function($log,$http){
		$log.debug('ShippingTempalateService');

		this.getShippingTemplates = function(){
			$log.debug('ShippingService1');
			return $http.get('/rest/api/selling/templates').then(function(response){
				return response.data;
			});
		}

		this.postTemplate = function(newTemplate){
			$log.debug('addTemplate', newTemplate);
			return $http.post('/rest/api/selling/templates', newTemplate).then(function(response){
				$log.debug('response.data',response.data);
				return response.data;
			});
		}

		this.deleteTemplate = function(templateId){
			$log.debug('delete',templateId);
			return $http.delete('/rest/api/selling/templates/' + templateId).then(function(response){
				return response.data;
			});
		}

		this.editTemplate = function(modifiedTemplate){
			$log.debug('editTemplate',modifiedTemplate);
			return $http.put('/rest/api/selling/templates', modifiedTemplate).then(function(response){
				return response.data;
			});
		}

		this.createTemplate = function(modifiedTemplate){
			$log.debug('createTemplate',modifiedTemplate);
			return $http.post('/rest/api/selling/templates', modifiedTemplate).then(function(response){
				return response.data;
			});
		}
	}
])