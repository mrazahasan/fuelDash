controllers.controller('menuCtrl', ['$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope) {
        $scope.currentUser = API.storage.get('loggedInInfo', false);
        $scope.logout = function () {
            API.storage.set('isLoggedIn', false, false);
            $scope.$state.go("login");
        };
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            if (cordova.platformId == 'android') {
                StatusBar.backgroundColorByHexString("#a790f1");
            }
            else {
                StatusBar.styleDefault();
            }
        }
    }
]);