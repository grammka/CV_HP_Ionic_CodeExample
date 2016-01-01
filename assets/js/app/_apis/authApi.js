angular.module('HPApp').factory('authAPI', function(
	$state, $filter,
	localization, store, notifyErrors,
	apiRequest
) {
	var AuthAPI = {};


	AuthAPI.getCurrent = function() {
		return apiRequest('users/me')
			.success(function(response) {
				store.set('user', response);

				if (response.interface_language) {
					localization.update(response.interface_language);
				}
			});
	};

	AuthAPI.signIn = function(data) {
		return apiRequest('auth/password', 'POST', data)
			.success(function(response) {
				store.set('user', response);
			})
			.error(function(response, statusCode) {
				notifyErrors(response);
			});
	};

	var socialAuthErrorResponseCounts = 0;
	AuthAPI.authWithSocial = function(socialName, doneCb, errorCb) {
		OAuth.popup(socialName)
			.done(function(response) {
				doneCb && doneCb(response);
			})
			.fail(function(response, statusCode) {
				errorCb && errorCb(response);

				$('#errors').html(response, statusCode);

				//if (!socialAuthErrorResponseCounts) {
				//	noty({
				//		text: $filter('translate')('NOTIFICATIONS.OOPS_SMTH_GOES_WORNG') + ' ' + $filter('translate')('NOTIFICATIONS.TRY_AGAIN'),
				//		type: 'error'
				//	});
				//  socialAuthErrorResponseCounts++;
				//} else {
				//	noty({
				//		text: $filter('translate')('NOTIFICATIONS.OOPS_SMTH_GOES_WORNG') + ' ' + $filter('translate')('NOTIFICATIONS.CONTACT_ADMIN'),
				//		type: 'error'
				//	});
				//}
			});
	};

	AuthAPI.logout = function() {
		return apiRequest('auth/logout')
			.success(function() {
				store.set('user', null);
				$state.go('root.signIn');
			});
	};


	return AuthAPI;

});
