angular.module('HPApp').factory('redirect', [
	'$rootScope', '$state',
	'store',
	function(
		$rootScope, $state,
	    store
	) {

		var Redirect = {};


		Redirect.checkEmailConfirmed = function() {
			var deferred = $q.defer();

			if (checkUserParams.isEmailConfirmed()) {
				deferred.resolve();
			} else {
				deferred.reject();
				$state.go('request.confirmEmail');
			}

			return deferred.promise;
		};

		Redirect.checkTermsConfirmed = function() {
			var deferred = $q.defer();

			if (checkUserParams.isTermsConfirmed()) {
				deferred.resolve();
			} else {
				deferred.reject();
				$state.go('termsConfirmation');
			}

			return deferred.promise;
		};



		Redirect.inside = function() {
			Redirect.checkEmailConfirmed().then(function() {
				Redirect.checkTermsConfirmed().then(function() {
					var state       = $rootScope.returnToState || $rootScope.toState,
						stateParams = $rootScope.returnToStateParams || $rootScope.toStateParams || {};

					if (!state.name.indexOf('ws.')) {
						$state.go(state.name, stateParams);
					} else {
						Redirect.byRole();
					}
				});
			});
		};

		Redirect.byRole = function() {
			var state, params;

			if (rolesCondition('Expert') || rolesCondition('PR') || rolesCondition('NGO')) {
				state   = 'ws.profile';
				params  = {userId: store.get('user.id')};
			} else {
				state   = 'ws.hackPack';
				params  = {slug: (store.get('user.last_hackpack') || 'Russia')};
			}

			$state.go(state, params);
		};


		return Redirect;

	}
]);
