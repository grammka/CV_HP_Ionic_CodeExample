angular.module('HPApp').factory('LandingFactory', function(usersAPI) {
	return {
		getMapData: function() {
			console.debug('landing map data is loading...');
			return usersAPI.getUsersForMap().then(function(response) {
				return response.data;
			});
		},
		getCharsData: function() {
			console.debug('landing chars data is loading...');
			return usersAPI.getUsersRolesForChars().then(function(response) {
				return response.data;
			});
		}
	};
});
