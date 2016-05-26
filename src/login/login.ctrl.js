/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('loginCtrl', ['$scope', '$cookies', 'authService', '$log', function ($scope, $cookies, authSvc, $log) {
            authSvc.userAuthenticated().then(function (data) {
                $scope.currentUser = data.data;
                if ($scope.currentUser !== "" && !$scope.menuitems) {
                    $scope.setMenu($scope.currentUser);
                }
            });
            $scope.loading = false;

            //Alerts
            $scope.alerts = [];
            this.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            function showMessage(msg, type) {
                var types = ["info", "danger", "warning", "success"];
                if (types.some(function (rc) {
                    return type === rc;
                })) {
                    $scope.alerts.push({type: type, msg: msg});
                }
            }

            this.showError = function (msg) {
                showMessage(msg, "danger");
            };

            this.showSuccess = function (msg) {
                showMessage(msg, "success");
            };


            this.login = function (user) {
                var self = this;
                if (user && user.userName && user.password) {
                    $scope.loading = true;
                    authSvc.login(user).then(function (data) {
                    }, function (data) {
                        self.showError(data.data);
                        $log.error("Error", data);
                    }).finally(function () {
                        $scope.loading = false;
                    });
                }
            };

            this.registration = function () {
                authSvc.goToRegister();
            };

            this.goToForgotPass = function () {
                authSvc.goToForgotPass();
            };
        }]);

})(window.angular);

