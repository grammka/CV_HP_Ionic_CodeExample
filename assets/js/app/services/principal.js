angular.module('HPApp').factory('principal', function(
	$rootScope, $state,
	redirect,
	authAPI
) {

	var _requested      = false,
		_authenticated  = false;

	return {
		isRequested: function() {
			return _requested;
		},

		isAuthenticated: function() {
			return _authenticated;
		},

		authenticate: function(identity) {
			_authenticated = identity != null;
		},

		redirect: function() {
			if (_authenticated) {
				if (
					!$rootScope.toState.name.indexOf('root.tabs') ||
					['landing', 'registration', 'signIn'].indexOf($rootScope.toState.name) >= 0
				) {
					redirect.inside();
				} else {
					$state.go($rootScope.toState.name, $rootScope.toStateParams || {});
				}
			} else {
				if (
					!$rootScope.toState.name.indexOf('root.tabs')
				) {
					$state.go('signIn');
				} else {
					$state.go($rootScope.toState.name, $rootScope.toStateParams || {});
				}
			}
		},

		identity: function() {
			var self = this;

			_requested = true;

			// used in ConfirmEmail
			$rootScope.initToState = $rootScope.toState;
			$rootScope.initToStateParams = $rootScope.toStateParams;

			authAPI.getCurrent()
				.success(function(userData) {
					console.debug('authorize finished: user Data received');

					self.authenticate(userData);
				})
				.error(function() {
					$rootScope.returnToState = $rootScope.toState;
					$rootScope.returnToStateParams = $rootScope.toStateParams;

					console.debug('authorize finished: user didn\'t authorized');

					self.authenticate(null);
				})
				.finally(function() {
					self.redirect();
				});
		}
	};
});
