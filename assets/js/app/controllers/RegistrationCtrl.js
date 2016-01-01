angular.module('HPApp').controller('RegistrationCtrl', function(
	$rootScope, $scope, $state, $location, $timeout, $translate,
	principal, redirect, staticData, regExp, localStorageService,
	authAPI
) {

	if (principal.isAuthenticated()) {
		return redirect.byRole();
	}



	var _CARD_INFO = {
			number: null,
			cvc: null,
			holder: null,
			month: null,
			year: null
		},
		_FORM = {
			email: null,
			password: null,
			role: null,
			hackpack: null,
			subscription: null,
			cardInfo: angular.copy(_CARD_INFO),
			company: {
				name: null,
				website: null
			},
			socials: {
				facebook: null,
				twitter: null,
				linkedin: null
			},
			rulesConfirmed: false
		};


	$scope.model = {
		invitedDataLoaded: false,
		invitedByCompany: false,
		inviteCode: $rootScope.toState.name == 'request.byInvitation' && $rootScope.toStateParams.code,
		//roles: staticData.getUserRolesOptions(),
		roles: [
			{value: 'Journalist', label: 'COMMON.ROLES.JOURNALIST'},
			{value: 'Photographer', label: 'COMMON.ROLES.PHOTOGRAPHER'},
			{value: 'Videographer', label: 'COMMON.ROLES.VIDEOGRAPHER'},
			{value: 'Fixer', label: 'COMMON.ROLES.FIXER'},
			{value: 'Expert', label: 'COMMON.ROLES.EXPERT'},
			{value: 'Editor', label: 'COMMON.ROLES.EDITOR_MEDIA_OUTLET'},
			{value: 'PR', label: 'COMMON.ROLES.PR'},
			{value: 'NGO', label: 'COMMON.ROLES.NGO'}
		],
		hackPacks: staticData.get('hackpacks'),
		searchCompanyExist: null,
		searchCompanyConfirmed: false,
		disabledFields: {
			role: false,
			companyWebsite: false,
			companyName: false
		},
		forms: {
			CardInfo: null
		},
		form: angular.copy(_FORM),
		socialLoading: false,
		texts: {
			subscriptionDesc: {
				Editor: 'CONFIG.STEPS.SUBSCRIPTION.DESC_BY_ROLES.EDITOR',
				Expert: 'CONFIG.STEPS.SUBSCRIPTION.DESC_BY_ROLES.EXPERT',
				PR: 'CONFIG.STEPS.SUBSCRIPTION.DESC_BY_ROLES.PR',
				NGO: 'CONFIG.STEPS.SUBSCRIPTION.DESC_BY_ROLES.NGO'
			}
		},
		subscriptions: {
			Editor: [
				{
					title: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EDITOR.TITLE',
					subTitle: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EDITOR.SUBTITLE',
					price: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EDITOR.PRICE',
					priceDesc: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EDITOR.PRICE_DESC',
					priceList: (function() {
						var i = 0, arr = [];
						while(i<10) {
							arr.push('CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EDITOR.PRICE_LIST.' + i++);
						}
						return arr;
					})(),
					selectLink: '',
					value: 'full_access'
				}
			],
			Expert: [
				{
					title: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EXPERT.TITLE',
					subTitle: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EXPERT.SUBTITLE',
					price: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EXPERT.PRICE',
					priceDesc: '',
					priceList: (function() {
						var i = 0, arr = [];
						while(i<11) {
							arr.push('CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.EXPERT.PRICE_LIST.' + i++);
						}
						return arr;
					})(),
					selectLink: '',
					value: 'full_access'
				}
			],
			PR: [
				{
					title: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.PR.TITLE',
					subTitle: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.PR.SUBTITLE',
					price: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.PR.PRICE',
					priceDesc: '',
					priceList: (function() {
						var i = 0, arr = [];
						while(i<7) {
							arr.push('CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.PR.PRICE_LIST.' + i++);
						}
						return arr;
					})(),
					selectLink: '',
					value: 'full_access'
				}
			],
			NGO: [
				{
					title: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.NGO.TITLE',
					subTitle: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.NGO.SUBTITLE',
					price: 'CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.NGO.PRICE',
					priceDesc: '',
					priceList: (function() {
						var i = 0, arr = [];
						while(i<7) {
							arr.push('CONFIG.STEPS.SUBSCRIPTION.PLAN_BY_ROLES.NGO.PRICE_LIST.' + i++);
						}
						return arr;
					})(),
					selectLink: '',
					value: 'full_access'
				}
			]
		}
	};

	$scope.regExp = regExp;



	if (localStorageService.get('registrationFormValues')) {
		angular.extend($scope.model.form, localStorageService.get('registrationFormValues'));
	}

	$scope.$watch('model.form', function() {
		localStorageService.set('registrationFormValues', $scope.model.form);
	}, true);



	$scope.onRoleChanged = function() {
		var form = angular.copy(_FORM);
		form.role = $scope.model.form.role;
		if ($scope.model.inviteCode) {
			form.email = $scope.model.form.email;
			form.code = $scope.model.form.code;
		}
		$scope.model.form = form;
	};



	$scope.signWithSocial = function(socialName) {
		OAuth.redirect(socialName, 'http://m.' + $rootScope.host + '/registration/');
	};

	function finishSocialAuth(socialName, response) {
		$scope.model.socialLoading = true;
		$scope.$apply(function() {
			$scope.model.socialLoading = false;
			$scope.model.form.socials[socialName] = response;
		});
	}

	if (OAuth.callback('facebook')) {
		OAuth.callback('facebook').done(function(response) {
			finishSocialAuth('facebook', {
				access_token: response.access_token
			});
		});
	}

	if (OAuth.callback('twitter')) {
		OAuth.callback('twitter').done(function(response) {
			finishSocialAuth('twitter', {
				oauth_token: response.oauth_token,
				oauth_token_secret: response.oauth_token_secret
			});
		});
	}

	if (OAuth.callback('linkedin')) {
		OAuth.callback('linkedin').done(function(response) {
			finishSocialAuth('linkedin', {
				oauth_token: response.oauth_token,
				oauth_token_secret: response.oauth_token_secret
			});
		});
	}



	// Company ----------------------------------------------------------------- /

	$scope.onCompanySearch = function(company) {
		if (company) {
			$scope.model.searchCompanyExist = true;
			$scope.model.form.company = angular.extend($scope.model.form.company, company);
		} else {
			$scope.model.searchCompanyExist = false;
		}
	};

	$scope.onCompanySearchClear = function() {
		$scope.model.searchCompanyExist = null;
	};

	$scope.confirmSelectedCompany = function() {
		$scope.model.searchCompanyConfirmed = true;
	};

	$scope.declineSelectedCompany = function() {
		$scope.model.form.company = {
			name: null,
			website: null
		};
		$scope.model.searchCompanyConfirmed = false;
		$scope.model.searchCompanyExist = false;
	};

	// Finish ----------------------------------------------------------------- /

	$scope.submitConfig = function() {
		$scope.model.form.interface_language = $translate.use();
		authAPI.signUp($scope.model.form).success(function(response) {
			// TODO think how to move principal.authenticate to AuthAPI. Problem: "Circular dependency found: principal <- authAPI <- principal"
			principal.authenticate(response);
			$state.go('emailConfirmation');
		});
	};



	if ($scope.model.inviteCode) {
		$scope.model.form.code = $scope.model.inviteCode.replace(/[\W\d]/g, '');

		authAPI.getInviteData($scope.model.inviteCode).success(function(response) {
			$scope.model.invitedDataLoaded = true;
			$scope.model.form = angular.extend($scope.model.form, response);

			if (response.company) {
				$scope.model.invitedByCompany = true;
				$scope.model.disabledFields = {
					role: true,
					companyWebsite: true,
					companyName: true
				};
			}
		});
	} else {
		$scope.model.invitedDataLoaded = true;
	}

});
