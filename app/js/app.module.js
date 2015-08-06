/**
 * Created by Dhruba on 06-Aug-15.
 */
define(['angular', 'src/mdPickers'], function(angular) {
    'use strict';

    return angular.module('mdDatePickerDemoApp', ['ngMaterial', 'mdPickers'])
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('pink');
        });
});
