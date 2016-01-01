angular.module('HPApp').directive('gridGallery', function() {
	return {
		restrict: 'E',
		template: '<div class="grid-gallery" />',
		replace: true,

		scope: {
			images: '='
		},

		link: function($scope, $element) {

			function initMosaic() {
				var imagesHtml = '';

				angular.forEach($scope.images, function(img) {
					imagesHtml += '<img src="' + img.thumb + '" style="width: ' + img.thumb_width + 'px; height: ' + img.thumb_height + 'px;" />';
				});

				$element.html(imagesHtml).hide();

				$element.show().jMosaic({
					min_row_height: 120,
					margin: 3
				});
			}

			function loadSoloImage() {
				var img     = $scope.images[0],
					$item   = $('<div class="grid-gallery__solo-item" style="background-image: url(' + img.thumb + ')"></div>'),
					visibleHeight = $element.width() / img.thumb_width * img.thumb_height;

				$item.height(visibleHeight > 400 ? 400 : visibleHeight);
				$element.html($item);
			}

			if ($scope.images.length == 1) {
				loadSoloImage();
			} else {
				initMosaic();
			}

		}
	};
});
