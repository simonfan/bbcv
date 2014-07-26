define(['bbcv', 'should', 'jquery', 'backbone'],
function (bbcv,  should ,  $      ,  Backbone ) {

	'use strict';


	describe('bbcv basics', function () {
		beforeEach(function () {
			this.$fixture = $('<div id="fixture"></div>').appendTo($('body'));
		});

		afterEach(function () {
			this.$fixture.remove();
		});

		it('presents collection items on initialization', function (done) {


			var fruits = new Backbone.Collection([
				{ name: 'Banana', id: 0 },
				{ name: 'Apple', id: 2 }
			]);

			var view = bbcv({
				el: this.$fixture,
				collection: fruits
			});

			setTimeout(_.bind(function () {
				this.$fixture.children().length.should.eql(2);
				done();
			}, this), 0);
		})


		/**
		 * ITEM
		 */
		describe('item', function () {
			beforeEach(function (done) {
				this.view = bbcv({ el: this.$fixture });

				this.fruits = new Backbone.Collection();

				// attach
				this.view.attach(this.fruits);

				// add
				this.fruits.add([
					{ id: 1, name: 'Banana' },
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				// run at next tick.
				setTimeout(done, 10);
			});
		});




		/**
		 *
		 * Handle Add
		 *
		 *
		 */
		describe('handleAdd', function () {


			it('handles adding', function () {

				var fruits = new Backbone.Collection();

				var d = bbcv({
					el: this.$fixture,
					collection: fruits,
				});

				// add a model on the collection
				fruits.add({
					id: 1,
					name: 'Banana'
				});


				this.$fixture.children().length.should.eql(1);


				fruits.add([
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				this.$fixture.children().length.should.eql(3);

			});
		});



		/**
		 *
		 * Handle remove
		 *
		 *
		 */
		describe('handleRemove', function () {
			beforeEach(function (done) {
				this.fruits = new Backbone.Collection();

				this.view = bbcv({
					el: this.$fixture,
					collection: this.fruits
				});

				// add
				this.fruits.add([
					{ id: 1, name: 'Banana' },
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				// next tick
				setTimeout(done, 100);
			});

			it('handles removal', function (done) {

				this.fruits.remove(this.fruits.get(3));

				// test on next tick
				setTimeout(_.bind(function () {
					this.$fixture.children().length.should.eql(2);

					done();
				}, this), 0);

			})
		});
	});

});
