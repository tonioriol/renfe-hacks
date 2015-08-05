var elixir = require('laravel-elixir');

elixir(function (mix) {
	mix.copy('manifest.json', 'build/manifest.json');
	mix.copy('background.js', 'build/background.js');
	mix.copy('img', 'build');
	mix.browserify('renfe-hacks.js', 'build/renfe-hacks.js', './');
});