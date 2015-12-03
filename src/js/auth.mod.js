(function (ng) {

    var mod = ng.module('authModule', ['ngCookies', 'ui.router', 'checklist-model']);
    mod.constant('defaultStatus', {status: false});

    mod.config(['$stateProvider', 'authServiceProvider', function ($stateProvider, auth) {
        var authConfig = auth.getValues();
        $stateProvider
            .state('login', {
                url: authConfig.loginPath,
                templateUrl: 'src/templates/login.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .state('register', {
                url: authConfig.registerPath,
                templateUrl: 'src/templates/register.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .state('forgotPass', {
                url: authConfig.forgotPassPath,
                templateUrl: 'src/templates/forgotPass.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .state('forbidden', {
                url: authConfig.forbiddenPath,
                templateUrl: 'src/templates/forbidden.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            });
    }]);

    mod.config(['$httpProvider', 'authServiceProvider', function ($httpProvider, authServiceProvider) {
        $httpProvider.interceptors.push(['$q', '$log', '$location', function ($q, $log, $location) {
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
                    config.withCredentials = true;
                    return config;
                },
                response: function(res) {
                    return res;
                }

            };
        }]);
    }]);
})(window.angular);


