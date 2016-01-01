angular.module('HPApp').controller('MessengerCtrl', [
	'$scope',
	'store',
	'messengerAPI',
	function(
		$scope,
		store,
		messengerAPI
	) {

		$scope.model = {
			chats: null
		};



		messengerAPI.getChats({user_id: store.get('user.id')}).success(function(response) {
			$scope.model.chats = response.results;
		});

	}
]);

