/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (ng) {

    var mod = ng.module('authModule', ['restangular', 'ngCookies']);
    mod.constant('defaultStatus', {status: false});
    mod.config(['RestangularProvider', function (rp) {
            rp.setBaseUrl('webresources');
        }]);

})(window.angular);


