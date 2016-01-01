angular.module('HPApp').factory('usersAPI', function(
	$rootScope, $http, $location, $filter, $stateParams,
	store, apiRequest
) {

	var UsersAPI = {};

	function getUserId(userId) {
		return userId || $stateParams.userId || store.get('user.sv.id');
	}


	UsersAPI.get = function(params) {
		return apiRequest('users', 'GET', params || {});
	};

	UsersAPI.getNextUsersPage = function(url, params) {
		return $http.get(url, {params: params || {}});
	};

	UsersAPI.getById = function(userId) {
		return apiRequest('users/' + userId)
			.error(function() {
				noty({
					text: $filter('translate')('NOTIFICATIONS.USER_PROFILE_NOT_FOUND'),
					type: 'error'
				});
			});
	};

	UsersAPI.update = function(userId, data) {
		userId = getUserId(userId);

		return apiRequest('users/' + userId, 'PATCH', data)
			.success(function(response) {
				if (store.get('user.sv.id') == userId) {
					UsersAPI.set(response);
				}
			});
	};


	return UsersAPI;

});
