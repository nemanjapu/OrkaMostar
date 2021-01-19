// Commom Plugins
(function($) {

	'use strict';

	// Scroll to Top Button.
	if (typeof theme.PluginScrollToTop !== 'undefined') {
		theme.PluginScrollToTop.initialize();
	}

	// Tooltips
	if ($.isFunction($.fn['tooltip'])) {
		$('[data-tooltip]:not(.manual), [data-plugin-tooltip]:not(.manual)').tooltip();
	}

	// Popover
	if ($.isFunction($.fn['popover'])) {
		$(function() {
			$('[data-plugin-popover]:not(.manual)').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.popover(opts);
			});
		});
	}

	// Validations
	if (typeof theme.PluginValidation !== 'undefined') {
		theme.PluginValidation.initialize();
	}

	// Match Height
	if ($.isFunction($.fn['matchHeight'])) {

		$('.match-height').matchHeight();

		// Featured Boxes
		$('.featured-boxes .featured-box').matchHeight();

		// Featured Box Full
		$('.featured-box-full').matchHeight();

	}

}).apply(this, [jQuery]);

// Animate
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginAnimate'])) {

		$(function() {
			$('[data-appear-animation]').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginAnimate(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Animated Letters
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginAnimatedLetters'])) {

		$(function() {
			$('[data-plugin-animated-letters]:not(.manual), .animated-letters').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginAnimatedLetters(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Carousel
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginCarousel'])) {

		$(function() {
			$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				if( $('body[data-loading-overlay]').get(0) ) {
					$(window).on('loading.overlay.ready', function(){
						$this.themePluginCarousel(opts);
					});
				} else {
					$this.themePluginCarousel(opts);
				}
			});
		});

	}

}).apply(this, [jQuery]);

// Counter
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginCounter'])) {

		$(function() {
			$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginCounter(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Animated Icon
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginIcon'])) {

		$(document).ready(function(){
			$(function() {

				$('[data-icon]:not(.svg-inline--fa)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginIcon(opts);
				});
				
			});
		});
	}

}).apply(this, [jQuery]);

// Lightbox
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginLightbox'])) {

		$(function() {
			$('[data-plugin-lightbox]:not(.manual), .lightbox:not(.manual)').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginLightbox(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Masonry
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginMasonry'])) {

		$(function() {
			$('[data-plugin-masonry]:not(.manual)').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginMasonry(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Parallax
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginParallax'])) {

		$(function() {
			$('[data-plugin-parallax]:not(.manual)').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginParallax(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Progress Bar
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginProgressBar'])) {

		$(function() {
			$('[data-plugin-progress-bar]:not(.manual), [data-appear-progress-animation]').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginProgressBar(opts);
			});
		});

	}

}).apply(this, [jQuery]);

// Commom Partials
(function($) {

	'use strict';

	// Sticky Header
	if (typeof theme.StickyHeader !== 'undefined') {
		theme.StickyHeader.initialize();
	}

	// Nav Menu
	if (typeof theme.Nav !== 'undefined') {
		theme.Nav.initialize();
	}

}).apply(this, [jQuery]);