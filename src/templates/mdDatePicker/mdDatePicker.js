angular.module('mdPickers.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('mdDatePicker.html',
    '<md-dialog aria-label="" class="md-datepicker" ng-class="{\'portrait\': !$mdMedia(\'gt-md\') }">\n' +
    '    <md-dialog-content layout="row" layout-wrap>\n' +
    '        <div layout="column" layout-align="start center">\n' +
    '            <md-toolbar layout-align="center center" class="md-datepicker-dow md-primary"><span>{{ datepicker.currentMoment.format("dddd") }}</span>\n' +
    '            </md-toolbar>\n' +
    '            <md-toolbar layout-align="center center" class="md-datepicker-date md-hue-1 md-primary" layout="column">\n' +
    '                <div class="md-datepicker-month">{{ datepicker.currentMoment.format("MMM") }}</div>\n' +
    '                <div class="md-datepicker-day">{{ datepicker.currentMoment.format("DD") }}</div>\n' +
    '                <md-select class="md-datepicker-year" placeholder="{{ datepicker.currentMoment.format(\'YYYY\') }}"\n' +
    '                           ng-model="datepicker.year" ng-change="datepicker.setYear()">\n' +
    '                    <md-option ng-value="year" ng-repeat="year in datepicker.yearsOptions">{{ year }}</md-option>\n' +
    '                </md-select>\n' +
    '            </md-toolbar>\n' +
    '        </div>\n' +
    '        <div layout="column" layout-align="start center" class="md-datepicker-calendar">\n' +
    '            <div layout="row" layout-align="space-between center" class="md-datepicker-monthyear">\n' +
    '                <md-button aria-label="mese precedente" class="md-icon-button" ng-click="datepicker.prevMonth()">\n' +
    '                    <md-icon md-font-set="material-icons">chevron_left</md-icon>\n' +
    '                </md-button>\n' +
    '                <md-select class="md-datepicker-month" placeholder="{{ datepicker.currentMoment.format(\'MMMM\') }}"\n' +
    '                           ng-model="datepicker.month" ng-change="datepicker.setMonth()">\n' +
    '                    <md-option ng-value="month" ng-repeat="month in datepicker.monthOptions">{{ month }}</md-option>\n' +
    '                </md-select>\n' +
    '                <md-button aria-label="mese successivo" class="md-icon-button" ng-click="datepicker.nextMonth()">\n' +
    '                    <md-icon md-font-set="material-icons">chevron_right</md-icon>\n' +
    '                </md-button>\n' +
    '            </div>\n' +
    '            <div layout="row" layout-align="space-around center" class="md-datepicker-week-days">\n' +
    '                <div layout layout-align="center center" ng-repeat="d in datepicker.weekDays track by $index">\n' +
    '                    {{ d }}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div layout="row" layout-wrap class="md-datepicker-days">\n' +
    '                <div layout layout-align="center center"\n' +
    '                     ng-repeat-start="n in datepicker.getDaysInMonth() track by $index">\n' +
    '                    <md-button aria-label="seleziona giorno" ng-if="n !== false"\n' +
    '                               ng-class="{\'md-accent\': datepicker.currentMoment.date() == n}"\n' +
    '                               ng-click="datepicker.selectDate(n)">\n' +
    '                        {{ n }}\n' +
    '                    </md-button>\n' +
    '                </div>\n' +
    '                <div flex ng-if="($index + 1) % 7 == 0" ng-repeat-end></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </md-dialog-content>\n' +
    '    <div class="md-actions" layout="row">\n' +
    '        <md-button ng-click="datepicker.cancel()" aria-label="annulla">Cancel</md-button>\n' +
    '        <md-button ng-click="datepicker.confirm()" aria-label="ok">OK</md-button>\n' +
    '    </div>\n' +
    '</md-dialog>');
}]);
