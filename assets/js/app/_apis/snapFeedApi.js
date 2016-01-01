angular.module('HPApp').factory('snapFeedAPI', function(
	$rootScope, $http,
	store, apiRequest,
	photosAPI
) {

	var SnapFeedAPI = {};


	// Snaps List ====================================================================== /

	SnapFeedAPI.getSnaps = function(filters) {
		return apiRequest('snapfeed', 'GET', filters || {});
	};

	SnapFeedAPI.getNextSnapsPage = function(url, filters) {
		return $http.get(url, {params: filters || {}});
	};

	SnapFeedAPI.getSnap = function(snapId) {
		return apiRequest('snapfeed/' + snapId);
	};

	SnapFeedAPI.hideSnap = function(snapId) {
		return apiRequest('snapfeed/hidden', 'POST', {item: snapId});
	};

	SnapFeedAPI.createSnap = function(data) {
		return apiRequest('snapfeed', 'POST', data);
	};

	SnapFeedAPI.uploadPhoto = function(snapId, file) {
		return photosAPI.upload('snapfeed/' + snapId + '/photos/', file);
	};

	SnapFeedAPI.removePhoto = function(photoId) {
		return apiRequest('snapfeed/photos/' + photoId, 'DELETE');
	};

	SnapFeedAPI.removeSnap = function(snapId) {
		return apiRequest('snapfeed/' + snapId, 'DELETE');
	};

	SnapFeedAPI.updateSnap = function(snapId, data) {
		return apiRequest('snapfeed/' + snapId, 'PATCH', data);
	};

	SnapFeedAPI.getMySnaps = function() {
		return apiRequest('snapfeed/my');
	};

	SnapFeedAPI.getOptions = function() {
		return apiRequest('snapfeed/options');
	};


	// Subscription ==================================================================== /

	SnapFeedAPI.getSubscriptions = function() {
		return apiRequest('snapfeed/subscription');
	};

	/**
	 *
	 * @param data {{ tags: array, categories: array, languages: array, countries: array }}
	 * @returns {*}
	 */
	SnapFeedAPI.subscribe = function(data) {
		return apiRequest('snapfeed/subscription', 'PATCH', data);
	};

	SnapFeedAPI.unsubscribe = function() {
		return apiRequest('snapfeed/subscription', 'DELETE');
	};


	// Notifications ================================================================== /

	SnapFeedAPI.getNotifications = function() {
		return apiRequest('snapfeed/notification_settings');
	};

	/**
	 *
	 * @param data {{ weekdays: array, times: array }}
	 * @returns {*}
	 */
	SnapFeedAPI.setNotifications = function(data) {
		return apiRequest('snapfeed/notification_settings', 'PATCH', data);
	};


	// Snap Page ====================================================================== /

	SnapFeedAPI.sendMessage = function(snapId, text) {
		return apiRequest('snapfeed/' + snapId + '/comments', 'POST', {text: text});
	};

	SnapFeedAPI.sendComment = function(snapId, userId, text) {
		return apiRequest('snapfeed/' + snapId + '/comments', 'POST', {text: text, target: userId});
	};


	return SnapFeedAPI;

});
