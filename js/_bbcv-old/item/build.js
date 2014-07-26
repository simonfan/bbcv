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
	var _ = require('lodash'),
		$ = require('jquery'),
		backbone = require('lowercase-backbone');


	exports.itemTemplate = '<div>bb-collection-view item replace "itemTemplate" property</div>';


	exports.itemAppend = function itemAppend(index, $el) {

		// get the view that represents the model before this one.
		var viewBefore = this.getViewAt(index - 1);

		if (viewBefore) {
			// if htere is a view before,
			// insert this.$el after that view's $el
			return $el.insertAfter(viewBefore.$el);

		} else {
			// otherwise, the collectionView is still empty,
			// thus just append to the container
			return $el.appendTo(this.$el);

		}

	};

	/**
	 * Must return an view object with a 'remove' method.
	 * The itemView is responsible for actions
	 */
	exports.itemView = backbone.view;

	/**
	 * Builds the itemvieW.
	 *
	 * @method buildItemView
	 * @param options {Object}
	 */
	exports.buildItemView = function buildItemView(model) {

		// [1] render the template
		//     and get the $el.
		var html = _.isFunction(this.itemTemplate) ? this.itemTemplate(model.attributes) : this.itemTemplate,
			$el = $(html);

		// [2] get index
		var index = this.collection.indexOf(model);

		// [3] place
		$el = this.itemAppend(index, $el);

		// [4] build the view
		// [4.1] build view options
		var viewOptions = {
			el             : $el,
			model          : model,
			index          : index,
			collection     : this.collection,
			collectionView : this,
		};

		// [4.2] if 'this.itemView' is set as an array,
		//       instantiate all views.
		var builder = this.itemView,
			// var to hold the view.
			view = builder(viewOptions);

		// [5] store
		this.byIndex.splice(index, 0, view);

		return view;
	};

});
