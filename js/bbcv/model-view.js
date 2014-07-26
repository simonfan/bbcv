/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define(function (require, exports, module) {
	'use strict';

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
