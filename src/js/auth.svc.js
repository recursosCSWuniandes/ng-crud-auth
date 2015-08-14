/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');

    mod.provider('authService', function () {

        //Default
        var values = {
            apiUrl: 'users',
            successPath: '/product',
            loginPath: '/login',
            registerPath: '/register',
            logoutRedirect: '/login',
            loginURL: 'login',
            registerURL: 'register',
            logoutURL: 'logout',
            nameCookie: 'user'

        };

        this.setValues = function (newValues) {
            values = newValues;
        };

        this.getValues = function () {
            return values;
        };

        this.$get = ['Restangular', '$cookies', '$location', function (RestAngular, $cookies, $location) {
            var self = this;
            this.api = RestAngular.all(values.apiUrl);
            return {
                login: function (user) {
                    return self.api.customPOST(user, values.loginURL).then(function (data) {
                        $cookies.putObject(values.nameCookie, {userName: data.name, id: data.id});
                        $location.path(values.successPath);
                    });
                },
                getConf: function () {
                    return values;
                },
                logout: function () {
                    return self.api.customGET(values.logoutURL).then(function () {
                        $cookies.remove(values.nameCookie);
                        $location.path(values.logoutRedirect);
                    });
                },
                register: function (user) {
                    return self.api.customPOST(user, values.registerURL).then(function (data) {
                        $location.path(values.loginPath);
                    });
                },
                registration: function () {
                    $location.path(values.registerPath);
                },
                getCurrentUser: function () {
                    var jsession = $cookies.getObject(values.nameCookie);
                    if (jsession) {
                        return {id: jsession.id, name: jsession.userName};
                    } else {
                        return null;
                    }
                },
                goToLogin: function () {
                    $location.path(values.loginPath);
                },
                goToBack: function () {
                    $location.path(values.loginPath);
                }
            };
        }];
    });
})(window.angular);


