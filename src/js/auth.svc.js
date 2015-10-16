(function (ng) {

    var mod = ng.module('authModule');

    mod.provider('authService', function () {

        //Default
        var values = {
            apiUrl: 'webresources/users/',
            successPath: '/product',
            loginPath: '/login',
            registerPath: '/register',
            logoutRedirect: '/login',
            loginURL: 'login',
            registerURL: 'register',
            logoutURL: 'logout',
            nameCookie: 'user',
            forbiddenPath: '/forbidden'
        };

        //Default Roles
        var roles = {
            'user': 'Client',
            'provider': 'Provider'
        };

        this.setValues = function (newValues) {
            values = ng.extend(values, newValues);
        };

        this.getValues = function () {
            return values;
        };

        this.getRoles = function(){
            return roles;
        };

        this.setRoles = function(newRoles){
            roles = newRoles;
        };

        this.$get = ['$cookies', '$location', '$http', function ($cookies, $location, $http) {
            return {
                getRoles: function(){
                    return roles;
                },
                login: function (user) {
                    return $http.post(values.apiUrl+values.loginURL, user).then(function (data) {
                        $cookies.putObject(values.nameCookie, data);
                        $location.path(values.successPath);
                    });
                },
                getConf: function () {
                    return values;
                },
                logout: function () {
                    return $http.get(values.apiUrl+values.logoutURL).then(function () {
                        $cookies.remove(values.nameCookie);
                        $location.path(values.logoutRedirect);
                    });
                },
                register: function (user) {
                    return $http.post(values.apiUrl+values.registerURL, user).then(function (data) {
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
                },
                goToSuccess: function () {
                    $location.path(values.successPath);
                },
                goToForbidden: function(){
                    $location.path(values.forbiddenPath);
                }
            };
        }];
    });
})(window.angular);
