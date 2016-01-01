angular.module('HPApp').factory('colleaguesAPI', function(apiRequest) {

	var ColleaguesAPI = {};


	ColleaguesAPI.getByUserId = function(userId) {
		return apiRequest('users/' + userId + '/colleagues');
	};


	return ColleaguesAPI;

});
