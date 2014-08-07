define(['bbcv', 'jquery', 'backbone', 'bbmv'],
function (bbcv,  $      ,  Backbone ,  bbmv ) {


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
		collection       : collection,

	//	modelView        : bbmv,
		modelHtmlTemplate: [
			'<div class="row">',
				'<div class="col-md-3">',
					'<span data-bind-name="html">',
						'<%= name %>',
					'</span>',
					'<input data-bind-name="value" value="<%= name %>" data-bind-on="keyup">',
				'</div>',
				'<div class="col-md-3">',
					'<span data-bind-last-name="html"></span>',
					'<input data-bind-last-name="value" data-bind-on="keyup">',
				'</div>',
			'</div>'
		].join(' ')
	});

	window.cview = extendedBbcv({
		el: $('#collection'),
	});




	// define a view for adder
	var adderView = bbmv.extend({

		addPerson: function addPerson() {
			// use toJSON method to pass only attributes.
			collection.add(this.model.toJSON());

			// clear model
			this.model.clear();
		},
	})


	window.beingAddedModel = new Backbone.Model();

	window.addv = adderView({
		el: $('#adder'),
		model: beingAddedModel
	});
});
