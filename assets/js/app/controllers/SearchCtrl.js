angular.module('HPApp').controller('SearchCtrl', function(
	$scope,
	usersAPI
) {

	console.debug('Controller [Search] loaded');

	$scope.model = {
		params: {},
		users: null,
		nextPageUrl: null
	};



	function loadFirstPosts() {
		return usersAPI.get($scope.model.params).success(function(response) {
			$scope.model.users = response.results;
			$scope.model.nextPageUrl = response.next;
		});
	}

	$scope.refresh = function() {
		loadFirstPosts().finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMore = function() {
		if (!$scope.model.users) {
			loadFirstPosts().finally(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		} else {
			usersAPI.getNextUsersPage($scope.model.nextPageUrl)
				.success(function(response) {
					$scope.model.users = $scope.model.users.concat(response.results);
					$scope.model.nextPageUrl = response.next;
				})
				.finally(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}
	};

});

