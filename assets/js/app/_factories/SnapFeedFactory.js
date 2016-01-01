angular.module('HPApp').factory('SnapFeedFactory', function($state, snapFeedAPI) {
	return {
		getSnaps: function() {
			console.debug('Snaps list is loading...');

			return snapFeedAPI.getSnaps().then(function(response) {
				return response.data;
			});
		}
	};
});
