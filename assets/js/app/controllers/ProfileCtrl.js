angular.module('HPApp').controller('ProfileCtrl', [
	'$scope', '$state',
	'usersAPI', 'colleaguesAPI',
	function(
		$scope, $state,
		usersAPI, colleaguesAPI
	) {

		$scope.model = {
			user: null,
			colleagues: null
		};



		$scope.openNestedProfile = function(userId) {
			$state.go($state.current.name, {userId: userId});
		};



		usersAPI.getById($state.params.userId).success(function(response) {
			$scope.model.user = response;
		});

		colleaguesAPI.getByUserId($state.params.userId).success(function(response) {
			$scope.model.colleagues = response;
		});

	}
]);

