/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('authController', ['$scope', '$cookies', '$location', 'authService', 'defaultStatus','$log', function ($scope, $cookies, $location, authSvc, defaultStatus, $log) {
        this.errorctrl = defaultStatus;
        $scope.roles = authSvc.getRoles();
        $scope.menuitems=[];
        $scope.currentUser = ""
            $scope.$on('logged-in', function (events, user) {
                $scope.currentUser = user.data.userName;
                for (var i=0; i<user.data.roles.length; i++)
                {
                    for (var rol in $scope.roles){
                        if (user.data.roles[i] === rol) {
                            for (var menu in $scope.roles[rol])
                            $scope.menuitems.push($scope.roles[rol][menu]);
                        }
                    }
                }

        });


        $scope.isAuthenticated = function(){
            return $scope.currentUser !== "";
        };


        this.login = function (user) {
            var self = this;
            if (user && user.userName && user.password) {
                authSvc.login(user).then(function (data) {
                    $log.info("success", data);
                }, function (data) {
                    self.errorctrl = {status: true, type: "danger", msg: ":" + data.data};
                    $log.error("Error", data);
                });
            }
        };

        $scope.logout = function () {
            authSvc.logout().then(function(){
                authSvc.deleteToken();
                $scope.currentUser = "";

            });
        };

        $scope.log = function(obj){
            console.log(obj);
        };

        this.close = function () {
            this.errorctrl = defaultStatus;
        };

        this.registration = function () {
            authSvc.registration();
        };

        this.register = function (newUser) {
            var self = this;
            $log.debug('newUser', newUser);
            if (newUser.password !== newUser.confirmPassword) {
                this.errorctrl = {status: true, type: "warning", msg: ": Passwords must be equals"};
            } else {
                authSvc.register(newUser).then(function (data) {
                    self.errorctrl = {status: true, type: "success", msg: ":" + " User registered successfully"};
                }, function (data) {
                    self.errorctrl = {status: true, type: "danger", msg: ":" + data.data};
                });
            }
        };


        $scope.goToLogin = function () {
            authSvc.goToLogin();
        };

        this.goBack = function () {
            authSvc.goToBack();
        };

        $scope.goToSuccess = function(){
            authSvc.goToSuccess();
        };
    }]);

})(window.angular);

