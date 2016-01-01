angular.module('HPApp').factory('hackPackAPI', function(
	$rootScope, $http, $state, $stateParams,
	store, apiRequest
) {

	var HackPackAPI = {};

	function getSlug(slug) {
		return slug || $state.params.slug || store.get('user.sv.last_hackpack') || 'Russia';
	}



	HackPackAPI.getBySlug = function(slug) {
		return apiRequest('hackpack/' + getSlug(slug));
	};

	HackPackAPI.getAllPosts = function() {
		return apiRequest('hackpack/all_messages');
	};

	HackPackAPI.getPosts = function(slug) {
		return apiRequest('hackpack/' + getSlug(slug) + '/messages');
	};

	HackPackAPI.getNextPostsPage = function(url) {
		return $http.get(url);
	};

	HackPackAPI.createPost = function(slug, message, opengraph) {
		return apiRequest('hackpack/' + getSlug(slug) + '/messages', 'POST', {text: message, opengraph: opengraph});
	};


	return HackPackAPI;

});
