/**
 * Created with IntelliJ IDEA.
 * User: karab
 * Date: 13/10/14
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */

angular.module('kamel.services').factory('HttpSrv',['$http', '$location', 'StorageSrv', '$resource', function ($http, $location, StorageSrv, $resource) {
    'use strict';

    var webServiceLocationTest = properties.webServiceLocation;

    return {
        // utils.call for ajax call
        /**
         *
         * @param uri
         * @param options - {authentication:true/false, method:'GET'/'POST', data:{parameter:object}, sucess:callback on success, error: callback on error}
         * @returns {*}
         */
        call: function (uri, options) {

            //Default values
            var config = angular.extend({
                authentication: false,cache : false,
                // data to send to the server
                method: 'GET',
                data: {},
                success: function (data, status, headers, config) {
                },
                error: function (data, status, headers, config) {
                    $location.url('/no-network');
                }
            }, options);
             /*
            if (config.authentication && config.method !== 'POST') {
                console.error('Use "POST" method if you need authentication.');
            }
                  */
            return $http({
                method: config.method,
                cache:false,
                url: webServiceLocationTest + uri + "?no-cache=" + Math.random(),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: (function () {
                  /*  if (config.authentication) {
                        (function () {
                            //Duplicate from Auth.getUser() cause of circular dependency
                            var user = StorageSrv.get('user', true);
                            if (user) {
                                config.data.token = user.token;
                                config.data.userId = user.userId;
                            }
                            return config.data;
                        })();
                    }*/
                    return config.data;
                })()
            })
                .success(function (data, status, header) {
                    if (!data.statusCode || data.statusCode === 11 || data.statusCode === 1) {
                        config.error.apply(null, arguments);
                    } else {
                        config.success.apply(null, arguments);
                    }
                })
                .error(function (data, status, headers) {
                    config.error.apply(null, arguments);
                });
        },

        getLocalResource: function(path){
            return $resource(path, {}, { getData: {method:'GET', isArray: true}});
        }
    };


}]);
