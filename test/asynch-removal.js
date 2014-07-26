define(['bbcv', 'should', 'lowercase-backbone', 'q', 'jquery'],
function(bbcv ,  should ,  backbone           , q  , $       ) {
	'use strict';

	describe('bbcv asynch-removal', function () {
		beforeEach(function () {
			this.$fixture = $('<div id="fixture"></div>').appendTo($('body'));
		});

		afterEach(function () {
			this.$fixture.remove();
		});


		it('is fine (:', function (done) {

			var fruits = backbone.collection([
				{ name: 'Banana', id: 0 },
				{ name: 'Apple', id: 2 }
			]);


			var delayableView = backbone.view.extend({
				remove: function () {
					return q.delay(true, this.delay);
				}
			});

			var view = bbcv({
				el        : this.$fixture,
				collection: fruits,
				modelView : delayableView.extend({ delay: 1000 })
			});



			setTimeout(function () {
				// run tests at next tick

				var removalTime = new Date();
				var removal = view.removeModelView(fruits.get(0));

				q.isPromise(removal).should.be.true;

				removal.done(function () {

					// check that time was taken
					var lapse = new Date() - removalTime;
					lapse.should.be.greaterThan(1000);
					lapse.should.be.lessThan(1150);
					done();
				});


			}, 0);

		});
	});
});
