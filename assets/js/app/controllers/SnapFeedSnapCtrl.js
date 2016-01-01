angular.module('HPApp').controller('SnapFeedSnapCtrl', function(
	$scope, $stateParams, $state,
	store,
	snapFeedAPI
) {

	console.debug('Controller [SnapFeed Snap] loaded');

	$scope.model = {
		user: store.get('user'),
		snap: null,
		messages: null,

		newMessageForm: {
			text: null
		},
		newCommentForm: {
			text: null
		}
	};



	$scope.removeSnap = function() {
		snapFeedAPI.removeSnap($stateParams.snapId).success(function() {
			//Notification.success('Your Snap removed!');
			$state.go('ws.snapFeed.list');
		});
	};

	var submitNewMessageRequesting = false;
	$scope.submitNewMessage = function() {
		var text = $scope.model.newMessageForm.text;

		if (!submitNewMessageRequesting) {
			if ($scope.model.user.is_confirmed && text) {
				submitNewMessageRequesting = true;

				text = Autolinker.link(text, {className: "t-link"});

				snapFeedAPI.sendMessage($stateParams.snapId, text)
					.success(function(message) {
						$scope.model.messages.unshift(message);
						$scope.model.newMessageForm.text = null;
						submitNewMessageRequesting = false;
					})
					.error(function() {
						submitNewMessageRequesting = false;
					});
			}
		}
	};

	var submitNewCommentRequesting = false;
	$scope.submitNewComment = function() {
		var text = $scope.model.newCommentForm.text;

		if (!submitNewCommentRequesting) {
			if ($scope.model.user.is_confirmed && text) {
				submitNewCommentRequesting = true;

				text = Autolinker.link(text, {className: "t-link"});

				snapFeedAPI.sendComment($stateParams.snapId, text, message.author.id)
					.success(function(comment) {
						message.comments.push(comment);
						$scope.model.newCommentForm.text = null;
						submitNewCommentRequesting = false;
					})
					.error(function() {
						submitNewCommentRequesting = false;
					});
			}
		}
	};



	snapFeedAPI.getSnap($stateParams.snapId).success(function(snap) {
		$scope.model.snap = snap;

		var messages = {};

		if ($scope.model.user.id == snap.author.id) {
			angular.forEach(snap.comments, function(snapComment, index) {
				if (!messages[snapComment.author.id] && !snapComment.target) {
					messages[snapComment.author.id] = snapComment;
					messages[snapComment.author.id].comments = [];
					messages[snapComment.author.id].index = index;
				}
			});

			angular.forEach(snap.comments, function(snapComment, index) {
				if (snapComment.target && messages[snapComment.target]) {
					messages[snapComment.target].comments.push(snapComment);
				}

				if (messages[snapComment.author.id] && messages[snapComment.author.id].index != index) {
					messages[snapComment.author.id].comments.push(snapComment);
				}
			});
		} else {
			messages = snap.comments;
		}

		$scope.model.messages = messages;
	});

});
