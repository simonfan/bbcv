define(['bbcv', 'jquery', 'backbone'], function (bbcv, $, Backbone) {


	var PersonModel = Backbone.Model.extend({
		defaults: {
			name: 'First Name',
			lastName: 'Last Name',
		}
	});

	window.collection = new Backbone.Collection([
		{ name: 'Simon', lastName: 'Fan' },
		{ name: 'Rebecca', lastName: 'Duarte' },
		{ name: 'Lais', lastName: 'Fonseca' },
		{ name: 'Ricardo' }
	], { model: PersonModel });


	var extendedBbcv = bbcv.extend({
		collection   : collection,
		modelTemplate: [
			'<div class="row">',
				'<div class="col-md-3" data-bind-name="html"></div>',
				'<div class="col-md-3" data-bind-last-name="html"></div>',
			'</div>'
		].join(' ')
	});

	window.cview = extendedBbcv({
		el: $('#collection'),
	});



});
