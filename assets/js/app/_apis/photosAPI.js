angular.module('HPApp').factory('photosAPI', function(
	$rootScope
) {

	var PhotosAPI = {};


	PhotosAPI.upload = function(path, file) {
		return Upload.upload({
			url: $rootScope.apiPath + path,
			method: 'POST',
			file: {'photo': file},
			withCredentials: true
		});
	};


	return PhotosAPI;

});
