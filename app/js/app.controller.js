/**
 * Created by Dhruba on 03-Aug-15.
 */
define(['angular', 'moment', 'src/app.module'], function (angular, moment, demoApp) {
    'use strict';

    var controller = demoApp.controller('mdDatePickerDemoController', mdDatePickerDemoController);

    controller.$inject = ['$scope'];

    return controller;

    function mdDatePickerDemoController($scope) {
        var vm = this;

        vm.selectedDate = new Date();

        vm.formattedDate = moment().format('DD/MM/YYYY');

        $scope.$watch('vm.selectedDate', function(newval, oldval) {
            if(newval != oldval) {
                vm.formattedDate = moment(newval).format('DD/MM/YYYY');
            }
        });
    }
});
