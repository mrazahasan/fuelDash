controllers.controller('loginCtrl', ['$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope) {
        $scope.loginData = {
            _username: '',
            _password: ''
        };

        $scope.login = function () {
            //console.log($scope.loginData._username);
            if ($scope.loginData._username == undefined || $scope.loginData._password == undefined) {
                var alertPopup = $scope.$ionicPopup.alert({
                    title: "Warning!",
                    template: "Please enter username and password."
                });
            } else {
                var config = {
                    "method": 'POST',
                    "url": '/login',
                    "data": {
                        "username": $scope.loginData._username,
                        "password": $scope.loginData._password
                    },
                    "headers": {
                        "Content-Type": "application/json"
                    }
                };
                var loadObj = { condition: true, text: "Authentication....." };
                $scope.APIService._http(config, loadObj).then(function (res) {
                    API.storage.set('isLoggedIn', true, false);
                    API.storage.set("loggedInInfo", res.data, false);
                    $scope.$state.go("app.home");
                }, function (res) {
                    // An alert dialog
                    var alertPopup = $scope.$ionicPopup.alert({
                        title: "Error!",
                        template: res.data == null ? "HTTP request failed." : res.data.message
                    });

                    // alertPopup.then(function (res) {
                    //     console.log('Thank you for not eating my delicious ice cream cone');
                    // });
                    console.log(res);
                }).finally(function () {
                    $scope.APIService._loading(false);
                });

            }

        }
    }
]);