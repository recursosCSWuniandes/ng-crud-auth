/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (ng) {

    var mod = ng.module('authModule', ['restangular', 'ngCookies', 'ngRoute']);
    mod.constant('defaultStatus', {status: false});
    mod.config(['RestangularProvider', function (rp) {
            rp.setBaseUrl('webresources');
        }]);
    mod.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'src/templates/login.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .when('/register', {
                templateUrl: 'src/templates/register.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            });
    }]);

    mod.run(['Restangular', 'authService', function (restangular, auth) {
        restangular.setErrorInterceptor(function(resp){
            if (resp.status === 401) {
                auth.goToLogin();
                return false;
            }
            return true;
        });
    }]);

})(window.angular);


