//     bbcv
//     (c) sf
//     bbcv is licensed under the sf terms.

/**
 * AMD module.
 *
 * @module bbcv
 */

define(function (require, exports, module) {
	'use strict';

	var view = require('lowercase-backbone').view,
		_    = require('lodash');

	var _init = view.prototype.initialize;

	var bbcv = module.exports = view.extend({
		initialize: function initialize(options) {
			_init.call(this, options);

			this.initializeBBCV(options);
		},

		/**
		 * Initialization logic for collectionDock
		 *
		 * @method initializeCollectionView
		 * @param options {Object}
		 */
		initializeBBCV: function initializeBBCV(options) {

			options = options || {};

			// set some options on instantiation
			_.each([
				'resortEvent',
				'modelHtmlTemplate',
				'modelHtml',
				'modelView',
				'collection',
				'parseModelHtmlTemplateData',
				'containerSelector'
			], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);


			// Compile template (if needed)
			// and set it to the modelHtml property.
			if (!this.modelHtml) {

				// get template compiler
				var compile = options.compileTemplate || this.compileTemplate;

				// if no modelHtml is found, compile the template and set a function for modelHtml.
				var compiled = _.isFunction(this.modelHtmlTemplate) ?
					this.modelHtmlTemplate : compile(this.modelHtmlTemplate);

				this.modelHtml = function renderModelHtml(model) {
					// retrieve template data
					var data = _.isFunction(this.parseModelHtmlTemplateData) ?
						this.parseModelHtmlTemplateData(model) :
						model.toJSON();

					return compiled(data);
				};
			}

			// find the right $container element
			// defaults to the $el of the view.
			this.$container = this.containerSelector ? this.$el.find(this.containerSelector) : this.$el;


			// array property at which modelViews are stored by index
			this.modelViews = [];

			// Make sure there is a collection
			var collection = this.collection;

			if (!this.collection) {
				throw new Error('No collection given for collection view');
			}

			// events
			_.bindAll(this, ['handleAdd', 'handleRemove', 'handleReset', 'handleResort']);
			this.listenTo(collection, 'add', this.handleAdd)
				.listenTo(collection, 'remove', this.handleRemove)
				.listenTo(collection, 'reset', this.handleReset)
				.listenTo(collection, this.resortEvent, this.handleResort);

			this.handleReset(collection);
		},


		/**
		 * The name of the event of the collection
		 * that should trigger handleResort on the view.
		 * @type {String}
		 */
		resortEvent: 'resort',


		/**
		 * The function that compiles the modelHtmlTemplate.
		 * The default compiler is lodash's _.template.
		 *
		 * @type {[type]}
		 */
		compileTemplate: _.template,


		/**
		 * The html template.
		 *
		 * Function => The compiled template. Will be invoked with the model's
		 * 			   ATTRIBUTES object (not with the model itself)
		 * String   => The source format of the template.
		 * 			   Will be compiled on bbcv initialization.
		 *
		 * @type {String}
		 */
		modelHtmlTemplate: '<div>bb-collection-view item replace "modelHtml" property</div>',

		/**
		 * String   => The html string that should be inserted for each model
		 * Function => A function, that, given the MODEL, should return an html string
		 * Boolean (false) => Indicates that no static html was defined, thus we need to
		 * 					  check for modelHtmlTemplate instead
		 * @type {String|Function|Boolean}
		 */
		modelHtml: false,
		modelView: require('lowercase-backbone').view,
	});

	bbcv.assignProto(require('bbcv/iterators'))
		.assignProto(require('bbcv/event-handlers'))
		.assignProto(require('bbcv/model-view'));
});
