angular.module('HPApp').run(function(
	$ionicPlatform,
	$rootScope, $location, $translate,
	principal, localization, rolesCondition
) {

	//$rootScope.host         = $location.host() == 'localhost' ? 'justinvarilek.com' : $location.host();
	$rootScope.RC           = rolesCondition;
	$rootScope.host         = 'justinvarilek.com';
	$rootScope.apiPath      = 'http://api.' + $rootScope.host + '/';
	$rootScope.wsPath       = (location.protocol == 'http:' ? 'ws' : 'wss') + ':' + $rootScope.apiPath + 'websocket';


	localization.update();


	//$ionicPlatform.ready(function() {
	//	// Hide the accessory bar by default
	//	// (remove this to show the accessory bar above the keyboard for form inputs)
	//	if (window.cordova && window.cordova.plugins.Keyboard) {
	//		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	//	}
	//
	//	if (window.StatusBar) {
	//		//StatusBar.styleDefault();
	//	}
	//});


	$rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
		console.debug('requested state is [' + toState.name + ']');

		$rootScope.toState = toState;
		$rootScope.toStateParams = toStateParams;

		if (!principal.isRequested()) {
			event.preventDefault();
			principal.identity();
		}
	});

});
