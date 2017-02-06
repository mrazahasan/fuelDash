angular.module('app.services', [])

.factory('AppFactory', [function(){
    return {
        URL : "https://nodejsfirstapi.herokuapp.com/api"
    }
}])

.service('APIService', ['$http','$ionicLoading',function($http,$ionicLoading){
    var urlMaster = "https://nodejsfirstapi.herokuapp.com/api"; // live URL
    //var urlMaster = "http://127.0.0.1:5000/api"; //Laptop URL
    return {
			_http : function(config,loadObj){

				// config = {
				// 	'method': 'GET',
				// 	'url': 'getMyId',
				// 	'data': {},
				// 	'headers':{}
				// }

				this._loading(loadObj.condition,loadObj.text);

				if(!config.url&&!config.method)
					return false;

				config.url = urlMaster + config.url;

				return $http(config)

				// LOADING.OPEN;
				// $helper._get(config)
				//		.then(successCallback,errorCallback)
				//		.finally(LOADING.CLOSE)

			},
			_loading : function (toggle,tpl) {
				// body...
				console.log(toggle,tpl)

				tpl = tpl ? tpl : 'Loading...';

				switch(toggle){
					case true:
					    $ionicLoading.show({
					      template: tpl
					    });
						break;
					case false:
					default:
					    $ionicLoading.hide();

				}
			}
		}
}]);