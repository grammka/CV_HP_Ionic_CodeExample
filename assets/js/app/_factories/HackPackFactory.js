angular.module('HPApp').factory('HackPackFactory', function($state, hackPackAPI) {
	return {
		getPosts: function() {
			console.debug('HP posts are loading...');

			return hackPackAPI.getAllPosts().then(function(response) {
				return response.data;
			});
		}
	};
});
