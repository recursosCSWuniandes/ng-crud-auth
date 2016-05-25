(function (ng) {

    var mod = ng.module('authModule', [
        'ui.router',
        'checklist-model',
        'ngMessages',
        'ui.bootstrap',
        'stormpath',
        'stormpath.templates'
    ]);

    mod.config(['$stateProvider', 'authServiceProvider', function ($stateProvider, auth) {
            var authConfig = auth.getValues();
            $stateProvider
                    .state(authConfig.loginState, {
                        url: authConfig.loginState,
                        templateUrl: 'src/templates/login.html',
                        controller: 'loginCtrl',
                        controllerAs: 'authCtrl'
                    })
                    .state(authConfig.registerState, {
                        url: authConfig.registerState,
                        templateUrl: 'src/templates/register.html',
                        controller: 'registerCtrl',
                        controllerAs: 'authCtrl'
                    })
                    .state(authConfig.forgotPassState, {
                        url: authConfig.forgotPassState,
                        templateUrl: 'src/templates/forgotPass.html',
                        controller: 'forgotCtrl',
                        controllerAs: 'authCtrl'
                    })
                    .state(authConfig.forbiddenState, {
                        url: authConfig.forbiddenState,
                        templateUrl: 'src/templates/forbidden.html',
                        controller: 'forbiddenCtrl'
                    });
        }]);

    mod.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$log', '$injector', function ($q, $log, $injector) {
                    return {
                        request: function (config) {
                            config.withCredentials = true;
                            return config;
                        }
                    };
                }]);
        }]);
})(window.angular);


