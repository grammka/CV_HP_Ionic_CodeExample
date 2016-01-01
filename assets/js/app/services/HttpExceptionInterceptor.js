angular.module('HPApp').factory('HttpExceptionInterceptor', function($q) {
	return {
		responseError: function(rejection) {
			//console.error(rejection.status);

			return $q.reject(rejection);
		}
	};
});
