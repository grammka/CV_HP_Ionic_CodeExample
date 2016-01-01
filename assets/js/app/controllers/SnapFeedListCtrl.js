angular.module('HPApp').controller('SnapFeedListCtrl', function(
	$scope,
    snapFeedAPI
) {

	console.debug('Controller [SnapFeedList] loaded');

	$scope.model = {
		snaps: null,
		nextPageUrl: null
	};



	function loadFirstSnaps() {
		return snapFeedAPI.getSnaps().success(function(response) {
			$scope.model.snaps = response.results;
			$scope.model.nextPageUrl = response.next;
		});
	}

	$scope.refresh = function() {
		loadFirstSnaps().finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMore = function() {
		if (!$scope.model.snaps) {
			loadFirstSnaps().finally(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		} else {
			snapFeedAPI.getNextSnapsPage($scope.model.nextPageUrl).success(function(response) {
				$scope.model.snaps = $scope.model.snaps.concat(response.results);
				$scope.model.nextPageUrl = response.next;

				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	};

});
