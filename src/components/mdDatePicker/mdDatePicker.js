
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
            templateUrl: 'mdDatePicker.html',
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
