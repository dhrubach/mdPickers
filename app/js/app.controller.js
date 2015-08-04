/**
 * Created by Dhruba on 03-Aug-15.
 */
(function () {
    'use strict';

    angular
        .module('mdDatePickerDemoApp')
        .controller('mdDatePickerDemoController', mdDatePickerDemoController);

    mdDatePickerDemoController.$inject = ['$scope'];

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
})();
