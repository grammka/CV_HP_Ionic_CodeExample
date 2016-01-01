angular.module('HPApp').config([
	'$ionicConfigProvider',
	'$locationProvider',
	'$stateProvider',
	'$urlRouterProvider',
	'$httpProvider',
	'$translateProvider',
	'localStorageServiceProvider',
	'cfpLoadingBarProvider',
	function(
		$ionicConfigProvider,
		$locationProvider,
		$stateProvider,
		$urlRouterProvider,
		$httpProvider,
		$translateProvider,
		localStorageServiceProvider,
		cfpLoadingBarProvider
	) {

		// Configure ------------------------------------------------------------------------ /

		$ionicConfigProvider.tabs.position('bottom');
		$ionicConfigProvider.tabs.style('standard');

		$httpProvider.interceptors.push('HttpExceptionInterceptor');
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
		$httpProvider.defaults.headers.common['X-Requested-With'] ='XMLHttpRequest';

		localStorageServiceProvider.setPrefix('HPApi');

		cfpLoadingBarProvider.includeSpinner = false;

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$translateProvider
			.useSanitizeValueStrategy('escaped')
			.preferredLanguage('enUS')
			.useStaticFilesLoader({
				prefix: '/data/json/',
				suffix: '.json'
			})
			.fallbackLanguage(['ruRU', 'enUS']);


		// Routing ------------------------------------------------------------------------ /

		function getProfileState(viewName) {
			var views = {};

			views[viewName] = {
				controller: 'ProfileCtrl',
				templateUrl: 'templates/profile.html'
			};

			return {
				url: 'profile/:userId',
				views: views
			};
		}

		$urlRouterProvider.otherwise('/signin/');
		$urlRouterProvider.when('/', '/signin/');

		$stateProvider

			.state('root', {
				abstract: true,
				template: '<ion-nav-view />',
				resolve: {
					options: function(staticData) {
						return staticData.load();
					}
				}
			})
				.state('root.signIn', {
					url: '/signin/',
					controller: 'SignInCtrl',
					templateUrl: 'templates/signin.html'
				})
				.state('root.registration', {
					url: '/registration/',
					controller: 'RegistrationCtrl',
					templateUrl: 'templates/registration.html'
				})
				.state('root.tabs', {
					abstract: true,
					templateUrl: 'templates/tabs.html'
				})
					.state('root.tabs.search', {
						url: '/search/',
						views: {
							'search-tab': {
								controller: 'SearchCtrl',
								templateUrl: 'templates/search.html'
							}
						}
					})
						.state('root.tabs.searchProfile', getProfileState('search-tab'))
					.state('root.tabs.messengerChatsList', {
						url: '/messenger/',
						controller: 'MessengerCtrl',
						views: {
							'messenger-tab': {
								templateUrl: 'templates/messenger.chats.html'
							}
						}
					})
					.state('root.tabs.messengerChat', {
						url: '/messenger/',
						controller: 'MessengerChatCtrl',
						views: {
							'messenger-tab': {
								templateUrl: 'templates/messenger.chat.html'
							}
						}
					})
					.state('root.tabs.hackPacks', {
						url: '/hack-packs/',
						views: {
							'hack-packs-tab': {
								controller: 'HackPacksCtrl',
								templateUrl: 'templates/hack-packs.html'
							}
						}
					})
						.state('root.tabs.hackPacksProfile', getProfileState('hack-packs-tab'))
					.state('root.tabs.snapFeed', {
						url: '/snap-feed/list/',
						views: {
							'snap-feed-tab': {
								controller: 'SnapFeedListCtrl',
								templateUrl: 'templates/snap-feed.list.html'
							}
						}
					})
						.state('root.tabs.snapFeedSnap', {
							url: 'snap/:snapId',
							views: {
								'snap-feed-tab': {
									controller: 'SnapFeedSnapCtrl',
									templateUrl: 'templates/snap-feed.snap.html'
								}
							}
						})
						.state('root.tabs.snapFeedProfile', getProfileState('snap-feed-tab'))
					.state('root.tabs.settings', {
						url: '/settings/',
						views: {
							'settings-tab': {
								controller: 'SettingsCtrl',
								templateUrl: 'templates/settings.html'
							}
						}
					});

	}
]);
