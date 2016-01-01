angular.module('HPApp').controller('SettingsCtrl', function(
	$scope,
	localization, store, staticData, snapFeedOptions,
	authAPI, usersAPI
) {

	var _PASSWORD_FORM = {
		old_password: null,
		new_password: null,
		repeat_new_password: null
	};

	$scope.model = {
		user: store.get('user'),

		interfaceLanguageOptions: [{label: 'English', value: 'enUS'}, {label: 'Русский', value: 'ruRU'}],

		notifications: (function() {
			var notifications = {};

			angular.forEach(store.get('user').notification_settings, function(value, key) {
				notifications[key] = {
					label: 'SETTINGS.EMAIL_NOTIFICATIONS.FORM.' + (key.toUpperCase()),
					value: value
				};
			});

			return notifications;
		})(),

		changePassForm: angular.copy(_PASSWORD_FORM),
		changeEmailForm: {
			email: store.get('user').email || null,
			password: null
		}
	};



	$scope.logout = authAPI.logout;

	$scope.switchInterfaceLanguage = function() {
		usersAPI.update('me', {interface_language: $scope.model.user.interface_language}).success(function() {
			localization.update($scope.model.user.interface_language);
			staticData.load(true);
			snapFeedOptions.load(true);
		});
	};

	$scope.toggleNotification = function(key) {
		var data = {};

		data[key] = $scope.model.notifications[key].value;
	};

});
