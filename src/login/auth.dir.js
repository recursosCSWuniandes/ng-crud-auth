/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.directive('loginButton', [function () {
            return {
                scope: {},
                restrict: 'E',
                templateUrl: 'src/templates/button.html',
                controller: ['$scope', 'authService', function ($scope, authSvc) {
                        $scope.roles = authSvc.getRoles();
                        authSvc.userAuthenticated().then(function (resp) {
                            $scope.currentUser = resp.data;
                            if ($scope.currentUser !== "" && !$scope.menuitems) {
                                $scope.setMenu($scope.currentUser);
                            }
                        });
                        $scope.$on('$authenticated', function (events, resp) {
                            $scope.currentUser = resp.data;
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

                        $scope.logout = function () {
                            return authSvc.logout();
                        };

                        $scope.goToLogin = function () {
                            authSvc.goToLogin();
                        };
                    }]
            };
        }]);
})(window.angular);

