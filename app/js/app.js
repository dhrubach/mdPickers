/**
 * Created by Dhruba on 03-Aug-15.
 */
(function() {
    'use strict';

    angular
        .module('mdDatePickerDemoApp', ['ngMaterial', 'mdPickers'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('pink');
        });
})();