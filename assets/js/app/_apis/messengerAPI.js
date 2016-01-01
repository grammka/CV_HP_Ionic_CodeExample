angular.module('HPApp').factory('messengerAPI', function($http, sharedData, apiRequest) {

	var MessengerAPI = {};


	/**
	 *
	 * @param params {{owner_id: Number, items_per_page: Number}}
	 * @returns {*}
	 */
	MessengerAPI.getChats = function(params) {
		console.debug('Chats list is loading');
		return apiRequest('chat', 'GET', params);
	};

	MessengerAPI.getNextChatsPage = function(url, params) {
		return $http.get(url, {params: params || {}});
	};

	MessengerAPI.createChat = function(userId, opponentId) {
		return apiRequest('chat', 'POST', {my_id: userId, opponent_id: opponentId})
			.success(function() {
				mixpanel.track('Chat opened');
			})
			.error(function(response, statusCode) {
				mixpanel.track('Error: Chat opened', {
					data: {userId: userId, opponentId: opponentId},
					statusCode: statusCode,
					response: response
				});
			});
	};

	MessengerAPI.getMessages = function(chatId) {
		return apiRequest('chat/' + chatId);
	};

	MessengerAPI.getPrevMessagesPage = function(url) {
		return $http.get(url);
	};

	MessengerAPI.sendMessage = function(chatId, message) {
		return apiRequest('chat/' + chatId, 'POST', {text: message});
	};

	MessengerAPI.removeChat = function(chatId) {
		return apiRequest('chat/' + chatId, 'DELETE');
	};


	return MessengerAPI;

});
