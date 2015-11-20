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
            forbiddenPath: '/forbidden'
        };

        //Default Roles
        var roles = {
            'user': 'Client',
            'provider': 'Provider'
        };

        var jwtConfig = {
            'name': 'Authorization',
            'saveIn': 'localStorage'
        }

        this.setJwtConfig = function(newConfig){
            jwtConfig = ng.extend(jwtConfig,newConfig);
        }

        this.getJwtConfig = function(){
            return jwtConfig;
        }

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

        this.$get = ['$cookies', '$location', '$http','$rootScope','$localStorage', '$sessionStorage', function ($cookies, $location, $http, $rootScope, $localStorage, $sessionStorage) {
            return {
                getRoles: function(){
                    return roles;
                },
                login: function (user) {
                    return $http.post(values.apiUrl+values.loginURL, user).then(function (data) {
                        $rootScope.$broadcast('logged-in', data);
                        $location.path(values.successPath);
                    });
                },
                getConf: function () {
                    return values;
                },
                logout: function () {
                    return $http.get(values.apiUrl+values.logoutURL).then(function () {
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
                    $log.info("Sin implementar")
                    return false
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
                },
                deleteToken: function(){
                    if (jwtConfig.saveIn === "localStorage")
                        delete $localStorage.token
                    else if (jwtConfig.saveIn === "sessionStorage")
                        delete $sessionStorage.token
                }
            };
        }];
    });
})(window.angular);
