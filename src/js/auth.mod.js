(function (ng) {

    var mod = ng.module('authModule', ['ngCookies', 'ngRoute', 'checklist-model', 'ngStorage']);
    mod.constant('defaultStatus', {status: false});

    mod.config(['$routeProvider', 'authServiceProvider', function ($routeProvider, auth) {
        var authConfig = auth.getValues();
        $routeProvider
            .when(authConfig.loginPath, {
                templateUrl: 'src/templates/login.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .when(authConfig.registerPath, {
                templateUrl: 'src/templates/register.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .when(authConfig.forbiddenPath, {
                templateUrl: 'src/templates/forbidden.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            });
    }]);

    mod.config(['$httpProvider', 'authServiceProvider', function ($httpProvider, authServiceProvider) {
        $httpProvider.interceptors.push(['$q', '$log', '$location','$localStorage', function ($q, $log, $location,$localStorage) {
            return {
                'responseError': function (rejection) {
                    if(rejection.status === 401){
                        $log.debug('error 401', rejection);
                        $location.path(authServiceProvider.getValues().loginPath);
                    }
                    if(rejection.status === 403){
                        $log.debug('error 403', rejection);
                        $location.path(authServiceProvider.getValues().forbiddenPath);
                    }
                    return $q.reject(rejection);
                },
                request: function (config) {
                    var token = $localStorage.token;
                    if(token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                // If a token was sent back, save it
                response: function(res) {
                    if(res.headers('Authorization')) {
                        $localStorage.token = res.headers('Authorization');
                    }
                    return res;
                }

            };
        }]);
    }]);
})(window.angular);


