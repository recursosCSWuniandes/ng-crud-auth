/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('authController', ['$scope', '$cookies', '$location', 'authService', 'defaultStatus', function ($scope, $cookies, $location, authSvc, defaultStatus) {
        this.errorctrl = defaultStatus;
        $scope.isAuthenticated = function(){
            return !!authSvc.getCurrentUser();
        };

        $scope.currentUser = function(){
            var user = authSvc.getCurrentUser();
            return user && user.name;
        };
        this.login = function (user) {
            var self = this;
            if (user && user.userName && user.password) {
                authSvc.login(user).then(function (data) {
                    console.log("success", data);
                }, function (data) {
                    self.errorctrl = {status: true, type: "danger", msg: ":" + data.data};
                });
            }
        };

        $scope.logout = function () {
            authSvc.logout();
        };

        this.close = function () {
            this.errorctrl = defaultStatus;
        };

        this.registration = function () {
            authSvc.registration();
        };

        this.register = function (newUser) {
            var self = this;
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
    }]);

})(window.angular);

