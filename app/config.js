//noinspection Annotator
/**
 * Created by Dhruba on 06-Aug-15.
 */
require.config({
    baseUrl: '.',
    paths: {
        'angular': 'bower_components/angular/angular.min',
        'angular-animate': 'bower_components/angular-animate/angular-animate.min',
        'angular-aria': 'bower_components/angular-aria/angular-aria.min',
        'angular-material': 'bower_components/angular-material/angular-material.min',
        'moment': 'bower_components/moment/min/moment.min',
        'src': 'js'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular', 'angular-animate', 'angular-aria']
        }
    }
});
