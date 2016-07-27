/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('authController', ['$scope', 'authService', function ($scope, authSvc) {
            $scope.alerts = [];
            $scope.roles = authSvc.getRoles();
            authSvc.userAuthenticated().then(function (data) {
                $scope.currentUser = data.data;
                if ($scope.currentUser !== "" && !$scope.menuitems) {
                    $scope.setMenu($scope.currentUser);
                }
            });
            $scope.loading = false;
            $scope.$on('logged-in', function (events, user) {
                $scope.currentUser = user;
                $scope.setMenu($scope.currentUser);
            });

            $scope.setMenu = function (user) {
                $scope.menuitems = [];
                for (var rol in $scope.roles) {
                    if (user.roles.indexOf(rol) !== -1) {
                        for (var menu in $scope.roles[rol]) {
                            if ($scope.menuitems.indexOf($scope.roles[rol][menu]) === -1) {
                                $scope.menuitems.push($scope.roles[rol][menu]);
                            }
                        }
                    }
                }
            };

            $scope.isAuthenticated = function () {
                return !!$scope.currentUser;
            };

            //Alerts
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
                    }).finally(function () {
                        $scope.loading = false;
                    });
                }
            };

            $scope.logout = function () {
                authSvc.logout().then(function () {
                    $scope.currentUser = "";

                });
            };

            this.registration = function () {
                authSvc.registration();
            };

            var self = this;
            this.register = function (newUser) {
                $scope.loading = true;
                authSvc.register(newUser).then(function (data) {
                    self.showSuccess("User registered successfully");
                }, function (data) {
                    self.showError(data.data.substring(65));
                }).finally(function () {
                    $scope.loading = false;
                });
            };

            $scope.isCheckRequired = function (newUser) {
                return !newUser;
            };

            this.goToForgotPass = function () {
                authSvc.goToForgotPass();
            };

            this.forgotPass = function (user) {
                var self = this;
                if (user) {
                    $scope.loading = true;
                    authSvc.forgotPass(user).then(function (data) {
                    }, function (data) {
                        self.showError(data.data.substring(66));
                    }
                    ).finally(function () {
                        $scope.loading = false;
                    });
                }
            };


            $scope.goToLogin = function () {
                authSvc.goToLogin();
            };

            this.goBack = function () {
                authSvc.goToBack();
            };

            $scope.goToSuccess = function () {
                authSvc.goToSuccess();
            };
        }]);

})(window.angular);

