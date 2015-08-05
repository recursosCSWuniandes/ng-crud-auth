/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {

    var mod = ng.module('authModule');
    mod.provider('auth', function () {

        //Default
        this.values = {
            apiUrl: 'users',
            successPath: '/product',
            loginPath: '/login',
            registerPath: '/register'
        };

        this.$get = ['Restangular', '$cookies', function (RestAngular, $cookies) {
                var self = this;
                var values = this.values;
                this.api = RestAngular.all(values.apiUrl);
                return {
                    login: function (user) {
                        return self.api.customPOST(user, 'login');
                    },
                    getConf: function () {
                        return values;
                    },
                    logout: function () {
                        return self.api.customGET('logout');
                    },
                    register: function (user) {
                        return self.api.customPOST(user, 'register');
                    },
                    getCurrentUser: function () {
                        var jsession = $cookies.getObject('user');
                        if (jsession) {
                            return {id: jsession.id, name: jsession.userName};
                        } else {
                            return null;
                        }
                    }

                };
            }];

        this.setValues = function (values) {
            this.values = values;
        };

        this.getValues = function () {
            return this.values;
        };
    });
})(window.angular);


