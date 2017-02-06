controllers.controller('signUpCtrl', ['$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope) {
        $scope.signUpData = {
            username: '',
            password: '',
            emailId: '',
            phone: ''
        };
        $scope.back = function () {
            $scope.signUpData = {
                username: '',
                password: '',
                emailId: '',
                phone: ''
            };
            $scope.$ionicHistory.goBack();
        };
        $scope.signUp = function () {
            if ($scope.signUpData.username == '' || $scope.signUpData.password == '' || $scope.signUpData.emailId == '' || $scope.signUpData.phone == '') {
                var alertPopup = $scope.$ionicPopup.alert({
                    title: "Warning!",
                    template: "All fields are mandatory."
                });
            } else {
                var config = {
                    "method": 'POST',
                    "url": '/signUp',
                    "data": $scope.signUpData,
                    "headers": {
                        "Content-Type": "application/json"
                    }
                };
                var loadObj = { condition: true, text: "Registering....." };
                $scope.APIService._http(config, loadObj).then(function (res) {
                    $scope.signUpData = {
                        username: '',
                        password: '',
                        emailId: '',
                        phone: ''
                    };
                    API.storage.set('isLoggedIn', true, false);
                    API.storage.set("loggedInInfo", res.data, false);
                    $scope.$state.go("app.home");
                }, function (res) {
                    var alertPopup = $scope.$ionicPopup.alert({
                        title: "Error!",
                        template: res.data == null ? "HTTP request failed." : res.data.message
                    });
                }).finally(function () {
                    $scope.APIService._loading(false);

                });

            }

        };
    }]);