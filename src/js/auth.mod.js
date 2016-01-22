(function (ng) {

    var mod = ng.module('authModule', ['ngCookies', 'ui.router', 'checklist-model']);
    mod.constant('defaultStatus', {status: false});

    mod.config(['$stateProvider', 'authServiceProvider', function ($stateProvider, auth) {
        var authConfig = auth.getValues();
        $stateProvider
            .state(authConfig.loginState, {
                url: authConfig.loginState,
                templateUrl: 'src/templates/login.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .state(authConfig.registerState, {
                url: authConfig.registerState,
                templateUrl: 'src/templates/register.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .state(authConfig.forgotPassState, {
                url: authConfig.forgotPassState,
                templateUrl: 'src/templates/forgotPass.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            })
            .state(authConfig.forbiddenState, {
                url: authConfig.forbiddenState,
                templateUrl: 'src/templates/forbidden.html',
                controller: 'authController',
                controllerAs: 'authCtrl'
            });
    }]);

    mod.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$log', '$injector', function ($q, $log, $injector) {
            return {
                'responseError': function (rejection) {
                    var authService = $injector.get('authService');
                    if(rejection.status === 401){
                        $log.debug('error 401', rejection);
                        authService.goToLogin();
                    }
                    if(rejection.status === 403){
                        $log.debug('error 403', rejection);
                        authService.goToForbidden();
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

        mod.run(['authService', '$rootScope', function(auth, $rootScope){
            auth.userAuthenticated().then(function(response){
                if(response.status === 200 && response.data){
                    $rootScope.$broadcast('logged-in', response.data);
                }
            })
        }]);
    }]);
})(window.angular);


