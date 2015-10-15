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
        $httpProvider.interceptors.push(['$q', '$log', function ($q, $log) {
            return {
                'responseError': function (rejection) {
                    $log.debug(rejection);
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
})(window.angular);


