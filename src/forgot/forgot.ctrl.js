(function (ng) {

    var mod = ng.module('authModule');

    mod.controller('forgotCtrl', ['$scope', '$cookies', 'authService', '$log', function ($scope, $cookies, authSvc, $log) {
        $scope.alerts = [];
        authSvc.userAuthenticated().then(function (data) {
            $scope.currentUser = data.data;
            if ($scope.currentUser !== "" && !$scope.menuitems) {
                $scope.setMenu($scope.currentUser);
            }
        });

        //Alerts
        this.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        function showMessage(msg, type) {
            var types = ["info", "danger", "warning", "success"];
            if (types.some(function (rc) {
                    return type === rc;
                })) {
                $scope.alerts.push({ type: type, msg: msg });
            }
        }

        this.showError = function (msg) {
            showMessage(msg, "danger");
        };

        this.showSuccess = function (msg) {
            showMessage(msg, "success");
        };

        this.forgotPass = function (user) {
            var self = this;
            if (user) {
                $scope.loading = true;
                authSvc.forgotPass(user).then(function () {}, function (data) {
                        self.showError(data.data.substring(66));
                    }
                ).finally(function () {
                    $scope.loading = false;
                });
            }
        };

        this.goBack = function () {
            authSvc.goToBack();
        };
    }]);

})(window.angular);