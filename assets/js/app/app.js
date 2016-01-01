angular.module('HPApp', [
	'ionic',
	'ui.router',
	'ngSanitize',
	'ngAnimate',

	'datePicker',
	'angular-storage',
	'LocalStorageModule',
	'pascalprecht.translate',
	'angularMoment',
	'angular-loading-bar',
	'smart'
]);

window.onerror = function(message, url, lineNumber) {
	$('#errors').html(message + ' ' + lineNumber + ' ---- ' + url);

	return true;
};
