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
        authSvc.userAuthenticated().then(function(data){
            $scope.currentUser = data.data;
            if ($scope.currentUser !== "" && !$scope.menuitems){
                $scope.setMenu($scope.currentUser);
            }
        });
        $scope.loading = false;
        $scope.$on('logged-in', function (events, user) {
            $scope.currentUser = user.data;
            $scope.setMenu($scope.currentUser);
        });

        $scope.setMenu = function(user){
            $scope.menuitems=[];
            for (var i=0; i<user.roles.length; i++)
            {
                for (var rol in $scope.roles){
                    if (user.roles[i] === rol) {
                        for (var menu in $scope.roles[rol])
                            $scope.menuitems.push($scope.roles[rol][menu]);
                    }
                }
            }
        };

        $scope.isAuthenticated = function(){
            return !!$scope.currentUser;
        };


        this.login = function (user) {
            var self = this;
            if (user && user.userName && user.password) {
                $scope.loading = true;
                authSvc.login(user).then(function (data) {
                    $log.info("user", data);
                }, function (data) {
                    self.errorctrl = {status: true, type: "danger", msg: ":" + data.data};
                    $log.error("Error", data);
                }).finally(function(){
                    $scope.loading = false;
                });
            }
        };

        $scope.logout = function () {
            authSvc.logout().then(function(){
                $scope.currentUser = "";

            });
        };

        $scope.log = function(obj){
            $log.debug(obj);
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
                $scope.loading = true;
                authSvc.register(newUser).then(function (data) {
                    self.errorctrl = {status: true, type: "success", msg: ":" + " User registered successfully"};
                }, function (data) {
                    self.errorctrl = {status: true, type: "danger", msg: ":" + data.data.substring(66)};
                }).finally(function(){
                    $scope.loading = false;
                });
            }
        };

        this.goToForgotPass = function(){
            authSvc.goToForgotPass();
        };

        this.forgotPass = function(user){
            var self = this;
            if (user){
                $scope.loading = true;
                authSvc.forgotPass(user).then(function(data){
                }, function(data){
                        self.errorctrl = {status: true, type: "danger", msg: ":" + data.data.substring(66)};
                    }
                ).finally(function(){
                       $scope.loading = false;
                    });
            }else {
                self.errorctrl = {status: true, type: "danger", msg: ":" + "You must to enter an email address"}
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

