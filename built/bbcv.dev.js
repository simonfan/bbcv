/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define('bbcv/iterators',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	// events
	exports.onItemViews = function onItemViews() {
		var args = Array.prototype.slice.call(arguments);

		_.each(this.modelViews, function (view) {
			view.on.apply(view, args);
		});

		return this;
	};

	// Underscore methods that we want to implement on the Collection.
	// 90% of the core usefulness of Backbone Collections is actually implemented
	// right here:
	var _methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
	'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
	'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
	'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
	'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
	'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'];

	_.each(_methods, function (method) {
		exports[method] = function () {

			var args = Array.prototype.slice.call(arguments);

			// add modelViews
			args.unshift(this.modelViews);

			return _[method].apply(_, args);
		};
	});

});

/**
 * Defines the event handler for 'add' events on the collection.
 *
 * @module collection-dock
 * @submodule event-hanlders
 */
define('bbcv/event-handlers',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

	// external
	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleAdd
	 * @private
	 * @param model {model Object}
	 */
	exports.handleAdd = function handleAdd(model) {

		this.addModelView(model);
	};

	/**
	 * Handles remove events on the collection.
	 *
	 * @method handleRemove
	 * @private
	 * @param model {model Object}
	 */
	exports.handleRemove = function handleRemove(model) {
		this.removeModelView(model);
	};

	/**
	 * Handles reset events on the collection.
	 *
	 * @method handleReset
	 * @private
	 * @param model {model Object}
	 */
	exports.handleReset = function handleReset(collection, options) {

		// This is just to be faster: remove everything at once!
		this.$el.html('');

		collection.each(this.handleRemove);

		collection.each(this.handleAdd);
	};


	/**
	 * Handles resort events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	exports.handleResort = function handleResort(collection, options) {
		this.handleReset(collection, options);
	};

});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define('bbcv/model-view',['require','exports','module','lodash'],function (require, exports, module) {
	

	// external
	var _ = require('lodash');

	/**
	 * Retrieves the view object at a given index.
	 *
	 * @method at
	 * @param index {Number}
	 */
	exports.getModelViewAt = function getModelViewAt(index) {
		return this.modelViews[index];
	};


	/**
	 * Retrieves the view that represents a given model.
	 * Does that by looking up for the model cid.
	 *
	 * @method getModelView
	 */
	exports.getModelView = function getModelView(model) {

		var mcid = model.cid;

		return _.find(this.modelViews, function (view) {
			return view.model.cid === mcid;
		});
	};





	/**
	 * Removes the view from the 'modelViews' array
	 * AND invokes the view's 'remove' method.
	 *
	 * @method removeModelViewAt
	 * @param index {Number}
	 * @return promise [description]
	 */
	exports.removeModelViewAt = function removeModelViewAt(index) {
		var view = this.modelViews.splice(index, 1)[0];

		if (view) {
			return view.remove();
		}
	};


	/**
	 * Deletes the view for a given model/mcid from the modelViews hash.
	 *
	 * @method getModelView
	 * @param mcid {Number}
	 */
	exports.removeModelView = function removeModelView(model) {

		var mcid = model.cid;

		var index = _.findIndex(this.modelViews, function (view) {
			return view.model.cid === mcid;
		});

		return this.removeModelViewAt(index);
	};


	/**
	 * Private method that adds the model $el to the dom.
	 *
	 * @param  {[type]} $el   [description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	function _modelElAdd($el, index, cview) {
		// get the view that represents the model before cview one.
		var viewBefore = cview.getModelViewAt(index - 1);

		if (viewBefore) {
			// if htere is a view before,
			// insert cview.$el after that view's $el
			return $el.insertAfter(viewBefore.$el);

		} else {
			// otherwise, the collectionView is still empty,
			// thus just append to the container
			return $el.appendTo(cview.$el);
		}
	}



	/**
	 * Builds the itemvieW.
	 *
	 * @method addModelView
	 * @param options {Object}
	 */
	exports.addModelView = function addModelView(model) {

		// [1] render the template
		//     and get the $el.
		var html = _.isFunction(this.modelTemplate) ? this.modelTemplate(model.attributes) : this.modelTemplate,
			$el  = $(html);

		// [2] get index
		var index = this.collection.indexOf(model);

		// [3] place
		_modelElAdd($el, index, this);

		// [4] build the view
		// [4.1] build view options
		var viewOptions = {
			el             : $el,
			model          : model,
			index          : index,
			collection     : this.collection,
			collectionView : this,
		};

		// [4.2] effective invoke method
		var view = this.modelView(viewOptions);

		// [5] store
		this.modelViews.splice(index, 0, view);

		return view;
	};


});

//     bbcv
//     (c) sf
//     bbcv is licensed under the sf terms.

/**
 * AMD module.
 *
 * @module bbcv
 */

define('bbcv',['require','exports','module','lowercase-backbone','bbmv','bbcv/iterators','bbcv/event-handlers','bbcv/model-view'],function (require, exports, module) {
	

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
