angular.module('HPApp').factory('ProfileFactory', function(
	$q, $state,
	usersAPI, colleaguesAPI
) {
	return {
		loadAllData: function(userId) {
			var deferred = $q.defer();

			usersAPI.getById(userId)
				.success(function() {

				})
				.error(function() {
					$state.go('404');
				});

			return deferred.promise;
		},

		getUserData: function(userId) {
			console.debug('user data is loading...');

			//TODO add condition to get Data from store

			return usersAPI.getById(userId).then(function(response) {
				return response.data;
			});
		},

		getPortfolioData: function(userId) {
			console.debug('user portfolio is loading...');

			return usersAPI.getArticles(userId).then(function(response) {
				return response.data;
			});
		},

		getColleaguesData: function(userId) {
			console.debug('user colleagues are loading...');

			return colleaguesAPI.getByUserId(userId).then(function(response) {
				return response.data;
			});
		},

		getSuggestionsData: function() {
			console.debug('user suggestions are loading...');

			return colleaguesAPI.getFacebookFriends().then(function(response) {
				return response.data;
			});
		}
	};
});
