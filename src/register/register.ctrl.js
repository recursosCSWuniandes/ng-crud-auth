(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('registerCtrl', ['$scope', 'authService', '$log', function ($scope, authSvc, $log) {

            //Alerts
            $scope.alerts = [];
            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

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

            this.register = function (newUser) {
                var self = this;
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
            this.goBack = function () {
                authSvc.goToLogin();
            };
        }]);

})(window.angular);

