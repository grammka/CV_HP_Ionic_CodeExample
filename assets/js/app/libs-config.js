angular.module('datePicker').constant('datePickerConfig', {
	template: 'app/templates/datepicker.html',
	view: 'month',
	views: ['year', 'month', 'date', 'hours', 'minutes'],
	step: 5
});

$.noty.defaults.layout = 'topRight';
$.noty.defaults.theme = 'relax';
$.noty.defaults.timeout = 5000;
//$.noty.defaults.animation.open = 'animated bounceInRight';
//$.noty.defaults.animation.close = 'animated bounceOutRight';

OAuth.initialize('qfUYisKP9b8sdaHrYjGcI__WaxI');
