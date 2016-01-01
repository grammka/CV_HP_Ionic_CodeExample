angular.module('HPApp').controller('HackPacksCtrl', function(
	$scope,
	hackPackAPI
) {

	console.debug('Controller [HackPack] loaded');

	$scope.model = {
		posts: null,
		nextPageUrl: null
	};



	function loadFirstPosts() {
		return hackPackAPI.getPosts().success(function(response) {
			$scope.model.posts = response.results;
			$scope.model.nextPageUrl = response.next;
		});
	}

	$scope.refresh = function() {
		loadFirstPosts().finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMore = function() {
		if (!$scope.model.posts) {
			loadFirstPosts().finally(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		} else {
			hackPackAPI.getNextPostsPage($scope.model.nextPageUrl)
				.success(function(response) {
					$scope.model.posts = $scope.model.posts.concat(response.results);
					$scope.model.nextPageUrl = response.next;
				})
				.finally(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}
	};

});

