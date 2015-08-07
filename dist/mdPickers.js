(function(window) {
'use strict';

angular.module("mdPickers", [
	"ngMaterial",
	"ngAnimate",
	"ngAria"
]);

function factory(angular, moment) {

    angular.module("mdPickers")
        .controller('DatePickerController', DatePickerController)
        .factory('$mdDatePicker', DatePickerFactory)
        .directive('mdDatePicker', DatePickerDirective);

    DatePickerController.$inject = ['$mdDialog', 'currentDate', '$mdMedia'];

    function DatePickerController($mdDialog, currentDate, $mdMedia) {
        var vm = this;

        vm.currentDate = currentDate;
        vm.currentMoment = moment(vm.currentDate);
        vm.weekDays = moment.weekdaysMin();
        vm.$mdMedia = $mdMedia;

        vm.yearsOptions = [];
        for (var i = 1900; i <= vm.currentMoment.year() + 12; i++) {
            vm.yearsOptions.push(i);
        }
        vm.year = vm.currentMoment.year();

        vm.setYear = function () {
            vm.currentMoment.year(vm.year);
        };

        vm.selectDate = function (dom) {
            vm.currentMoment.date(dom);
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.confirm = function () {
            $mdDialog.hide(vm.currentMoment.toDate());
        };

        vm.getDaysInMonth = function () {
            var days = vm.currentMoment.daysInMonth(),
                firstDay = moment(vm.currentMoment).date(1).day();

            var arr = [];
            for (var i = 1; i <= firstDay + days; i++) {
                arr.push(i > firstDay ? i - firstDay : false);
            }

            return arr;
        };

        vm.nextMonth = function () {
            vm.currentMoment.add(1, 'months');
            vm.year = vm.currentMoment.year();
        };

        vm.prevMonth = function () {
            vm.currentMoment.subtract(1, 'months');
            vm.year = vm.currentMoment.year();
        };
    }

    DatePickerFactory.$inject = ['$mdDialog'];

    function DatePickerFactory($mdDialog) {

        var datePicker = function (targetEvent, currentDate) {
            if (!angular.isDate(currentDate)) {
                currentDate = Date.now();
            }

            return $mdDialog.show({
                controller: 'DatePickerController',
                controllerAs: 'datepicker',
                template: '<md-dialog aria-label="" class="md-datepicker" ng-class="{ \'portrait\': !$mdMedia(\'gt-md\') }">' +
                '<md-dialog-content layout="row" layout-wrap>' +
                '<div layout="column" layout-align="start center">' +
                '<md-toolbar layout-align="center center" class="md-datepicker-dow md-primary"><span>{{ datepicker.currentMoment.format("dddd") }}</span></md-toolbar>' +
                '<md-toolbar layout-align="center center" class="md-datepicker-date md-hue-1 md-primary" layout="column">' +
                '<div class="md-datepicker-month">{{ datepicker.currentMoment.format("MMM") }}</div>' +
                '<div class="md-datepicker-day">{{ datepicker.currentMoment.format("DD") }}</div>' +
                '<md-select class="md-datepicker-year" placeholder="{{ datepicker.currentMoment.format(\'YYYY\') }}" ng-model="datepicker.year" ng-change="datepicker.setYear()">' +
                '<md-option ng-value="year" ng-repeat="year in datepicker.yearsOptions">{{ year }}</md-option>' +
                '</md-select>' +
                '</md-toolbar>' +
                '</div>' +
                '<div layout="column" layout-align="start center" class="md-datepicker-calendar">' +
                '<div layout="row" layout-align="space-between center" class="md-datepicker-monthyear">' +
                '<md-button aria-label="mese precedente" class="md-icon-button" ng-click="datepicker.prevMonth()"><md-icon md-font-set="material-icons"> chevron_left </md-icon></md-button>' +
                '{{ datepicker.currentMoment.format("MMMM YYYY") }}' +
                '<md-button aria-label="mese successivo" class="md-icon-button" ng-click="datepicker.nextMonth()"><md-icon md-font-set="material-icons"> chevron_right </md-icon></md-button>' +
                '</div>' +
                '<div layout="row" layout-align="space-around center" class="md-datepicker-week-days">' +
                '<div layout layout-align="center center" ng-repeat="d in datepicker.weekDays track by $index">{{ d }}</div>' +
                '</div>' +
                '<div layout="row" layout-wrap class="md-datepicker-days">' +
                '<div layout layout-align="center center" ng-repeat-start="n in datepicker.getDaysInMonth() track by $index">' +
                '<md-button aria-label="seleziona giorno" ng-if="n !== false" ng-class="{\'md-accent\': datepicker.currentMoment.date() == n}" ng-click="datepicker.selectDate(n)">{{ n }}</md-button>' +
                '</div>' +
                '<div flex ng-if="($index + 1) % 7 == 0" ng-repeat-end></div>' +
                '</div>' +
                '</div>' +
                '</md-dialog-content>' +
                '<div class="md-actions" layout="row">' +
                '<md-button ng-click="datepicker.cancel()" aria-label="annulla">Cancel</md-button>' +
                '<md-button ng-click="datepicker.confirm()" aria-label="ok">OK</md-button>' +
                '</div>' +
                '</md-dialog>',
                targetEvent: targetEvent,
                locals: {
                    currentDate: currentDate
                }
            });
        };

        return datePicker;
    }

    DatePickerDirective.$inject = ['$mdDatePicker', '$timeout'];

    function DatePickerDirective($mdDatePicker, $timeout) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if ('undefined' !== typeof attrs.type && 'date' === attrs.type && ngModel) {
                    angular.element(element).on("click", function (ev) {
                        ev.preventDefault();
                        $mdDatePicker(ev, ngModel.$modelValue).then(function (selectedDate) {
                            $timeout(function () {
                                ngModel.$setViewValue(moment(selectedDate).format("YYYY-MM-DD"));
                                ngModel.$render();
                            });
                        });
                    });
                }
            }
        }
    }
}

if (typeof define === 'function' && define.amd) {
    /* AMD module */
    define(['angular', 'moment'], factory);
} else {
    /* Browser global */
    factory(window.angular, window.moment);
}

})(window);