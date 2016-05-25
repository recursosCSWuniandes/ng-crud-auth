(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('forbiddenCtrl', ['$scope', 'authService', function ($scope, authSvc) {
        $scope.goToSuccess = function () {
            authSvc.goToSuccess();
        };
    }]);

})(window.angular);


