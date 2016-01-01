angular.module('HPApp').controller('SignInCtrl', function(
	$scope, $timeout, $stateParams,
	redirect, localization,
	authAPI
) {

	$scope.model = {
		form: {
			email: null,
			password: null
		}
	};



	$scope.switchLanguage = function() {
		localization.switch();
	};

	$scope.submitSignInForm = function() {
		authAPI.signIn({
			email: $scope.model.form.email,
			password: $scope.model.form.password
		})
			.success(redirect.byRole);
	};

});
