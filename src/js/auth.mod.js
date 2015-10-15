(function (ng) {

    var mod = ng.module('authModule', ['restangular', 'ngCookies', 'ngRoute']);
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

    mod.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$log', 'authService', function ($q, $log, auth) {
            return {
                'responseError': function (rejection) {
                    if(rejection.status === 401){
                        $log.debug('error 401', rejection);
                        auth.goToLogin();
                    }
                    if(rejection.status === 403){
                        $log.debug('error 403', rejection);
                        auth.goToForbidden();
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
})(window.angular);


