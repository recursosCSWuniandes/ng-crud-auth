(function (ng) {

    var mod = ng.module('authModule', ['restangular', 'ngCookies', 'ngRoute']);
    mod.constant('defaultStatus', {status: false});
    mod.config(['RestangularProvider', function (rp) {
        rp.setBaseUrl('webresources');
    }]);
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

    mod.run(['Restangular', 'authService', function (restangular, auth) {
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


