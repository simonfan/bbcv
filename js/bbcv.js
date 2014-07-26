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

	var view = require('lowercase-backbone').view;

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
				'modelTemplate',
				'modelView',
				'collection',
			], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);

			// views by index
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

		modelTemplate: '<div>bb-collection-view item replace "modelTemplate" property</div>',
		modelView: require('bbmv'),
	});

	bbcv.assignProto(require('bbcv/iterators'))
		.assignProto(require('bbcv/event-handlers'))
		.assignProto(require('bbcv/model-view'));
});
