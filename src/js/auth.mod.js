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

    mod.run(['$httpProvider', 'authService', '$log', function ($httpProvider, auth, $log) {
        $httpProvider.interceptors.push(['$q', function ($q) {
            return {
                'responseError': function (rejection) {
                    $log.debug(rejection);
                    return $q.reject(a);
                }
            }
        }]);
        restangular.setErrorInterceptor(function (resp) {
            if (resp.status === 401) {
                auth.goToLogin();
                return false;
            } else if (resp.status === 403) {
                auth.goToForbidden();
                return false;
            }
            return true;
        });
    }]);
})(window.angular);


