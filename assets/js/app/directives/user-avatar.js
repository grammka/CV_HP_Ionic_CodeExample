angular.module('HPApp').directive('userAvatar', function(userAvatar) {
	return {
		restrict: 'AE',
		scope: {
			data: '='
		},
		template: '<div class="sq-img avatar" />',
		replace: true,

		link: function($scope, $element) {

			$element.html(userAvatar($scope.data));

			$scope.$watch('data.photo', function(n, o) {
				if (n != o) {
					$element.html(userAvatar($scope.data));
				}
			});

		}
	};
});
