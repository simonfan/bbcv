require.config({
	urlArgs: 'bust=0.06989291799254715',
	baseUrl: '/js',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		bbcv: 'bbcv',
		backbone: '../bower_components/backbone/backbone',
		bbmv: '../bower_components/bbmv/built/bbmv',
		bbdv: '../bower_components/bbdv/built/bbdv',
		'jquery-selector-data-prefix': '../bower_components/jquery-selector-data-prefix/built/jquery-selector-data-prefix',
		'jquery-value': '../bower_components/jquery-value/built/jquery-value',
		jquery: '../bower_components/jquery/dist/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		pipe: '../bower_components/pipe/built/pipe',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore',
		q: '../bower_components/q/q',
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
