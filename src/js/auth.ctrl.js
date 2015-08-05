/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('authController', ['$scope', '$cookies', '$location','auth', 'defaultStatus',function ($scope, $cookies, $location, authProvider, defaultStatus) {
            var self = this;
            this.errorctrl = defaultStatus;
            this.valuesConf = authProvider.getConf();
            this.login = function (user) {
                if (user && user.password) {
                    authProvider.login(user).then(function (data) {
                        var user = {userName: data.name, id: data.id};
                        $cookies.putObject('user', user);
                        $location.path(self.valuesConf.successPath);//gallery
                    }, function (error) {
                        self.errorctrl = {status: true, type: "danger", msg: error.data};
                    });
                }
            };

            this.close = function () {
                self.errorctrl = defaultStatus;
            };

            this.registration = function () {
                $location.path(self.valuesConf.registerPath);
            };
            
            this.register = function (newUser) {
                if (newUser.password !== newUser.confirmPassword) {
                    self.errorctrl = {status: true, type: "warning", msg: ": Passwords must be equals"};
                } else {
                    authProvider.register(newUser).then(function () {
                        $location.path(self.valuesConf.loginPath);
                    }, function (error) {
                        self.errorctrl = {status: true, type: "danger", msg: ":" + error.data};
                    });
                }

            };
            
            this.goBack = function(){
              $location.path(self.valuesConf.loginPath);  
            };
            



        }]);

})(window.angular);

