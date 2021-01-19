/*
Name: 			Theme Base
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	8.2.0
*/

// Theme
window.theme = {};

// Theme Common Functions
window.theme.fn = {

	getOptions: function(opts) {

		if (typeof(opts) == 'object') {

			return opts;

		} else if (typeof(opts) == 'string') {

			try {
				return JSON.parse(opts.replace(/'/g,'"').replace(';',''));
			} catch(e) {
				return {};
			}

		} else {

			return {};

		}

	}

};

// Animate
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__animate';

	var PluginAnimate = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginAnimate.defaults = {
		accX: 0,
		accY: -80,
		delay: 100,
		duration: '750ms',
		minWindowWidth: 767,
		forceAnimation: false
	};

	PluginAnimate.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginAnimate.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this;

			if($('body').hasClass('loading-overlay-showing')) {
				$(window).on('loading.overlay.ready', function(){
					self.animate();
				});
			} else {
				self.animate();
			}

			return this;
		},

		animate: function() {
			var self = this,
				$el = this.options.wrapper,
				delay = 0,
				duration = this.options.duration,
				elTopDistance = $el.offset().top,
				windowTopDistance = $(window).scrollTop();

			$el.addClass('appear-animation animated');

			if (!$('html').hasClass('no-csstransitions') && $(window).width() > self.options.minWindowWidth && elTopDistance >= windowTopDistance || self.options.forceAnimation == true) {

				$el.appear(function() {

					$el.one('animation:show', function(ev) {
						delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);
						duration = ($el.attr('data-appear-animation-duration') ? $el.attr('data-appear-animation-duration') : self.options.duration);

						if (duration != '750ms') {
							$el.css('animation-duration', duration);
						}

						$el.css('animation-delay', delay + 'ms');

						$el.addClass($el.attr('data-appear-animation') + ' appear-animation-visible');
					});

					$el.trigger('animation:show');

				}, {
					accX: self.options.accX,
					accY: self.options.accY
				});

			} else {

				$el.addClass('appear-animation-visible');

			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginAnimate: PluginAnimate
	});

	// jquery plugin
	$.fn.themePluginAnimate = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginAnimate($this, opts);
			}

		});
	};

}).apply(this, [window.theme, jQuery]);

// Animated Letters
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__animatedLetters';

	var PluginAnimatedLetters = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginAnimatedLetters.defaults = {
		animationName: 'fadeIn',
		animationSpeed: 50,
		startDelay: 500,
		minWindowWidth: 768,
		letterClass: ''
	};

	PluginAnimatedLetters.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			var self = this;

			this.$el = $el;
			this.initialText = $el.text();

			// If it's inside a carousel, wait for the initializaion of the carousel
			if( self.$el.closest('.owl-carousel').get(0) ) {
				self.$el.closest('.owl-carousel').on('initialized.owl.carousel', function(){
					self
						.setData()
						.setOptions(opts)
						.build()
						.events();					
				});

				return this;
			}

			this
				.setData()
				.setOptions(opts)
				.build()
				.events();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginAnimatedLetters.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self    = this,
				letters = self.$el.text().split('');

			if( $(window).width() < self.options.minWindowWidth ) {
				return this;
			}

			// Add class to show
			self.$el.addClass('initialized');			

			// Set Min Height to avoid flicking issues
			self.setMinHeight();

			self.$el.text('');

			setTimeout(function(){
				for( var i = 0; i < letters.length; i++ ) {
					var letter = letters[i];
					
					self.$el.append( '<span class="letter '+ ( self.options.letterClass ? self.options.letterClass + ' ' : '' ) + self.options.animationName +' animated" style="animation-delay: '+ ( i * self.options.animationSpeed ) +'ms;">' + letter + '</span>' );

				}
			}, self.options.startDelay);

			return this;
		},

		setMinHeight: function() {
			var self = this;

			// if it's inside carousel
			if( self.$el.closest('.owl-carousel').get(0) ) {
				self.$el.closest('.owl-carousel').addClass('d-block');
				self.$el.css( 'min-height', self.$el.height() );
				self.$el.closest('.owl-carousel').removeClass('d-block');
			} else {
				self.$el.css( 'min-height', self.$el.height() );
			}

			return this;
		},

		destroy: function() {
			var self = this;

			self.$el
				.html( self.initialText )
				.css( 'min-height', '' );

			return this;
		},

		events: function() {
			var self = this;

			// Destroy
			self.$el.on('animated.letters.destroy', function(){
				self.destroy();
			});

			// Initialize
			self.$el.on('animated.letters.initialize', function(){
				self.build();
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginAnimatedLetters: PluginAnimatedLetters
	});

	// jquery plugin
	$.fn.themePluginAnimatedLetters = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginAnimatedLetters($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Carousel
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__carousel';

	var PluginCarousel = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginCarousel.defaults = {
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			479: {
				items: 1
			},
			768: {
				items: 2
			},
			979: {
				items: 3
			},
			1199: {
				items: 4
			}
		},
		navText: [],
		refresh: false
	};

	PluginCarousel.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			// If has data-icon inside, initialize only after icons get rendered
			// Prevent flicking issues
			if( $el.find('[data-icon]').get(0) ) {
				var self = this;

				$(window).on('icon.rendered', function(){
					if ($el.data(instanceName)) {
						return this;
					}

					setTimeout(function(){
						self
							.setData()
							.setOptions(opts)
							.build();
					}, 1000);
				});

				return this;
			}

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.owlCarousel))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper;

			// Add Theme Class
			$el.addClass('owl-theme');

			// Add Loading
			$el.addClass('owl-loading');

			// Force RTL according to HTML dir attribute
			if ($('html').attr('dir') == 'rtl') {
				this.options = $.extend(true, {}, this.options, {
					rtl: true
				});
			}

			if (this.options.items == 1) {
				this.options.responsive = {}
			}

			if (this.options.items > 4) {
				this.options = $.extend(true, {}, this.options, {
					responsive: {
						1199: {
							items: this.options.items
						}
					}
				});
			}

			// Auto Height Fixes
			if (this.options.autoHeight) {
				var itemsHeight = [];

				$el.find('.owl-item').each(function(){
					if( $(this).hasClass('active') ) {
						itemsHeight.push( $(this).height() );
					}
				});

				$(window).afterResize(function() {
					$el.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
				});

				$(window).on('load', function() {
					$el.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
				});
			}

			// Initialize OwlCarousel
			$el.owlCarousel(this.options).addClass('owl-carousel-init animated fadeIn');

			// Remove "animated fadeIn" class to prevent conflicts
			setTimeout(function(){
				$el.removeClass('animated fadeIn');
			}, 1000);

			// Owl Carousel Wrapper
			if( $el.closest('.owl-carousel-wrapper').get(0) ) {
				setTimeout(function(){
					$el.closest('.owl-carousel-wrapper').css({
						height: ''
					});
				}, 500);
			}

			// Nav Offset
			self.navigationOffsets();

			// Nav Outside
			if( $el.hasClass('nav-outside') ) {
				$(window).on('owl.carousel.nav.outside', function(){
					if( $(window).width() < 992 ) {
						self.options.stagePadding = 40;
						$el.addClass('stage-margin');
					} else {
						self.options.stagePadding = 0;
						$el.removeClass('stage-margin');
					}

					$el.owlCarousel('destroy').owlCarousel( self.options );

					// Nav Offset
					self.navigationOffsets();
				});

				// Window Resize
				$(window).on('load', function(){
					$(window).afterResize(function(){
						$(window).trigger('owl.carousel.nav.outside');
					});
				});

				// First Load
				$(window).trigger('owl.carousel.nav.outside');
			}

			// Nav style 5 (SVG Arrows)
			if( $el.hasClass('nav-svg-arrows-1') ) {
				var svg_arrow = '' +
					'<svg version="1.1" viewBox="0 0 15.698 8.706" width="17" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
						'<polygon stroke="#212121" stroke-width="0.1" fill="#212121" points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "/>' +
					'</svg>';

				$el.find('.owl-next, .owl-prev').append( svg_arrow );
			}

			// Sync
			if( $el.attr('data-sync') ) {
				$el.on('change.owl.carousel', function(event) {
					if (event.namespace && event.property.name === 'position') {
					    var target = event.relatedTarget.relative(event.property.value, true);
					    $( $el.data('sync') ).owlCarousel('to', target, 300, true);				        
				  	}
				});
			}

			// Carousel Center Active Item
			if( $el.hasClass('carousel-center-active-item') ) {
				var itemsActive    = $el.find('.owl-item.active'),
					indexCenter    = Math.floor( ($el.find('.owl-item.active').length - 1) / 2 ),
					itemCenter     = itemsActive.eq(indexCenter);

				itemCenter.addClass('current');

				$el.on('change.owl.carousel', function(event) {
				  	$el.find('.owl-item').removeClass('current');
					
					setTimeout(function(){
					  	var itemsActive    = $el.find('.owl-item.active'),
					  		indexCenter    = Math.floor( ($el.find('.owl-item.active').length - 1) / 2 ),
					  		itemCenter     = itemsActive.eq(indexCenter);

					  	itemCenter.addClass('current');
					}, 100);
				});

				// Refresh
				$el.trigger('refresh.owl.carousel');

			}

			// AnimateIn / AnimateOut Fix
			if( self.options.animateIn || self.options.animateOut ) {
				$el.on('change.owl.carousel', function(event) {

					// Hide elements inside carousel
				    $el.find('[data-appear-animation], [data-plugin-animated-letters]').addClass('d-none');

				    // Animated Letters
				    $el.find('[data-plugin-animated-letters]').trigger('animated.letters.destroy');

				    // Remove "d-none" class before show the element. This is useful when using background images inside a carousel. Like ken burns effect
				    $el.find('.owl-item:not(.active) [data-carousel-onchange-show]').removeClass('d-none');

				});

				$el.on('changed.owl.carousel', function(event) {
					setTimeout(function(){

					    // Appear Animation
					    if( $el.find('.owl-item.cloned [data-appear-animation]').get(0) ) {
					    	$el.find('.owl-item.cloned [data-appear-animation]').each(function() {
								var $this = $(this),
									opts;

								var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
								if (pluginOptions)
									opts = pluginOptions;

								$this.themePluginAnimate(opts);
							});
					    }

						// Show elements inside carousel
					    $el.find('.owl-item.active [data-appear-animation], [data-plugin-animated-letters]').removeClass('d-none');

					    // Animated Letters
					    $el.find('.owl-item.active [data-plugin-animated-letters]').trigger('animated.letters.initialize');

					    // Background Video
					    $el.find('.owl-item.cloned.active [data-plugin-video-background]').trigger('video.background.initialize');

					}, 1000);
				    
				});
			}

			// Render Background Videos inside carousel. Just a trigger on window is sufficient to render
			if( $el.find('[data-plugin-video-background]').get(0) ) {
				$(window).resize();
			}

			// Remove Loading
			$el.removeClass('owl-loading');

			// Remove Height
			$el.css('height', 'auto');

			// Carousel Navigate By ID and item index
			self.carouselNavigate();

			// Refresh Carousel
			if( self.options.refresh ) {
				$el.owlCarousel('refresh');
			}

			return this;
		},

		navigationOffsets: function() {
			var self 			 = this,
				$el  			 = this.options.wrapper,
				navHasTransform  = $el.find('.owl-nav').css('transform') == 'none' ? false : true,
				dotsHasTransform = $el.find('.owl-dots').css('transform') == 'none' ? false : true;

			// ************* NAV *****************
			// Nav Offset - Horizontal
			if( self.options.navHorizontalOffset && !self.options.navVerticalOffset ) {
				if( !navHasTransform ) {
					$el.find('.owl-nav').css({
						transform: 'translate3d('+ self.options.navHorizontalOffset +', 0, 0)'
					});
				} else {
					$el.find('.owl-nav').css({
						left: self.options.navHorizontalOffset
					});
				}
			}

			// Nav Offset - Vertical
			if( self.options.navVerticalOffset && !self.options.navHorizontalOffset ) {
				if( !navHasTransform ) {
					$el.find('.owl-nav').css({
						transform: 'translate3d(0, '+ self.options.navVerticalOffset +', 0)'
					});
				} else {
					$el.find('.owl-nav').css({
						top: 'calc( 50% - '+ self.options.navVerticalOffset +' )'
					});
				}
			}

			// Nav Offset - Horizontal & Vertical
			if( self.options.navVerticalOffset && self.options.navHorizontalOffset ) {
				if( !navHasTransform ) {
					$el.find('.owl-nav').css({
						transform: 'translate3d('+ self.options.navHorizontalOffset +', '+ self.options.navVerticalOffset +', 0)'
					});
				} else {
					$el.find('.owl-nav').css({
						top: 'calc( 50% - '+ self.options.navVerticalOffset +' )',
						left: self.options.navHorizontalOffset
					});
				}
			}

			// ********** DOTS *********************
			// Dots Offset - Horizontal
			if( self.options.dotsHorizontalOffset && !self.options.dotsVerticalOffset ) {
				$el.find('.owl-dots').css({
					transform: 'translate3d('+ self.options.dotsHorizontalOffset +', 0, 0)'
				});
			}

			// Dots Offset - Vertical
			if( self.options.dotsVerticalOffset && !self.options.dotsHorizontalOffset ) {
				if( !dotsHasTransform ) {
					$el.find('.owl-dots').css({
						transform: 'translate3d(0, '+ self.options.dotsVerticalOffset +', 0)'
					});
				} else {
					$el.find('.owl-dots').css({
						top: 'calc( 50% - '+ self.options.dotsVerticalOffset +' )'
					});
				}
			}

			// Dots Offset - Horizontal & Vertical
			if( self.options.dotsVerticalOffset && self.options.dotsHorizontalOffset ) {
				$el.find('.owl-dots').css({
					transform: 'translate3d('+ self.options.dotsHorizontalOffset +', '+ self.options.dotsVerticalOffset +', 0)'
				});
			}

			return this;
		},

		carouselNavigate: function() {
			var self      = this,
				$el       = this.options.wrapper,
				$carousel = $el.data('owl.carousel');

			if( $('[data-carousel-navigate]').get(0) ) {
				$('[data-carousel-navigate-id="#'+ $el.attr('id') +'"]').each(function(){
					var $this = $(this),
						hasCarousel = $( $this.data('carousel-navigate-id') ).get(0),
						toIndex = $this.data('carousel-navigate-to');

					if( hasCarousel ) {

						$this.on('click', function(){
							$carousel.to( parseInt(toIndex) - 1 );
						});

					}
				});

				$el.on('change.owl.carousel', function(){
					$('[data-carousel-navigate-id="#'+ $el.attr('id') +'"]').removeClass('active');
				});

				$el.on('changed.owl.carousel', function(e){
					$('[data-carousel-navigate-id="#'+ $el.attr('id') +'"][data-carousel-navigate-to="'+ ( e.item.index + 1 ) +'"]').addClass('active');
				});
			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginCarousel: PluginCarousel
	});

	// jquery plugin
	$.fn.themePluginCarousel = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginCarousel($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Counter
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__counter';

	var PluginCounter = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginCounter.defaults = {
		accX: 0,
		accY: 0,
		appendWrapper: false,
		prependWrapper: false,
		speed: 3000,
		refreshInterval: 100,
		decimals: 0,
		onUpdate: null,
		onComplete: null
	};

	PluginCounter.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.countTo))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper;

			$.extend(self.options, {
				onComplete: function() {
					
					if ($el.data('append')) {
						if( self.options.appendWrapper ) {
							var appendWrapper = $( self.options.appendWrapper );

							appendWrapper.append( $el.data('append') );

							$el.html( $el.html() + appendWrapper[0].outerHTML );
						} else {
							$el.html($el.html() + $el.data('append'));
						}
					}

					if ($el.data('prepend')) {
						if( self.options.prependWrapper ) {
							var prependWrapper = $( self.options.prependWrapper );

							prependWrapper.append( $el.data('prepend') );

							$el.html( $el.html() + prependWrapper[0].outerHTML );
						} else {
							$el.html($el.data('prepend') + $el.html());
						}
					}
				}
			});

			$el.appear(function() {

				$el.countTo(self.options);

			}, {
				accX: self.options.accX,
				accY: self.options.accY
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginCounter: PluginCounter
	});

	// jquery plugin
	$.fn.themePluginCounter = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginCounter($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Icon
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var instanceName = '__icon';

	var PluginIcon = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginIcon.defaults = {
		color: '#2388ED',
		animated: false,
		delay: 300,
		onlySVG: false
	};

	PluginIcon.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginIcon.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self  	 = this,
				$el   	 = this.options.wrapper,
				color 	 = self.options.color,
				elTopDistance = $el.offset().top,
				windowTopDistance = $(window).scrollTop(),
				duration = ( self.options.animated && !self.options.strokeBased ) ? 200 : 100;

			// Check origin
			if( window.location.origin === 'file://' ) {
				$el.css('opacity', 1);
				return;
			}

			// Duration
			if( self.options.duration ) {
				duration = self.options.duration;
			}

			// SVG Content
			var SVGContent = $.get({
				url: $el.attr('src'), 
				success: function(data, status, xhr){
					var iconWrapper = $('<div class="animated-icon animated fadeIn">'+ xhr.responseText +'</div>'),
						uniqid = 'icon_' + Math.floor(Math.random() * 26) + Date.now();

					iconWrapper.find('svg').attr('id', uniqid);

					if( $el.attr('width') ) {
						iconWrapper.find('svg')
							.attr('width', $el.attr('width'))
							.attr('height', $el.attr('width'));						
					}

					$el.replaceWith(iconWrapper);

					if( self.options.extraClass ) {
						iconWrapper.addClass( self.options.extraClass );
					}

					if( self.options.onlySVG ) {
						$(window).trigger('icon.rendered');
						return this;
					}

					$el = iconWrapper;

					var icon = new Vivus(uniqid, {start: 'manual', type: 'sync', selfDestroy: true, duration: duration, onReady: function(obj){
						var styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style"),
							animateStyle = '';

						// SVG Fill Based
						if( self.options.animated && !self.options.strokeBased || !self.options.animated && color && !self.options.strokeBased ) {
							animateStyle = 'stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;';
							
							// Set Style on SVG inside object
							styleElement.textContent = '#' + uniqid + ' path, #' + uniqid + ' line, #' + uniqid + ' rect, #' + uniqid + ' circle, #' + uniqid + ' polyline { fill: '+ color +'; stroke: '+ color +'; '+ animateStyle + (self.options.svgStyle ? self.options.svgStyle : "") + ' } .finished path { fill-opacity: 1; }';
							obj.el.appendChild(styleElement);
						}

						// SVG Stroke Based
						if( self.options.animated && self.options.strokeBased || !self.options.animated && color && self.options.strokeBased ) {

							// Set Style on SVG inside object
							styleElement.textContent = '#' + uniqid + ' path, #' + uniqid + ' line, #' + uniqid + ' rect, #' + uniqid + ' circle, #' + uniqid + ' polyline { stroke: '+ color +'; ' + (self.options.svgStyle ? self.options.svgStyle : "") + '}';
							obj.el.appendChild(styleElement);
						}

						$.event.trigger('theme.plugin.icon.svg.ready');
					}});

					// Isn't animated
					if( !self.options.animated ) {
						setTimeout(function(){
							icon.finish();
						}, 10);
						$el.css({ opacity: 1 });
					}

					// Animated
					if( self.options.animated && $(window).width() > 767 ) {
						// First Load
						if( $el.visible( true ) ) {
							self.startIconAnimation( icon, $el );
						} else if( elTopDistance < windowTopDistance ) {
							self.startIconAnimation( icon, $el );
						}

						// On Scroll
						$(window).on('scroll', function(){
							if( $el.visible( true ) ) {
								self.startIconAnimation( icon, $el );
							}
						});

					} else {
						
						$el.css({ opacity: 1 });
						icon.finish();
						
						$(window).on('theme.plugin.icon.svg.ready', function(){
							setTimeout(function(){
								icon.el.setAttribute('class', 'finished');
								icon.finish();
							}, 300);
						});
						
					}

					$(window).trigger('icon.rendered');
				}
			});

			return this;
		},
		startIconAnimation: function(icon, $el) {
			var self = this;

			// Animate for better performance
			$({to:0}).animate({to:1}, ((self.options.strokeBased) ? self.options.delay : self.options.delay + 300 ), function() {
				$el.css({ opacity: 1 });
			});

			$({to:0}).animate({to:1}, self.options.delay, function() {
				icon.play(1);

				setTimeout(function(){
					icon.el.setAttribute('class', 'finished');
				}, icon.duration * 5 );
			});
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginIcon: PluginIcon
	});

	// jquery plugin
	$.fn.themePluginIcon = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginIcon($this, opts);
			}

		});
	};

}).apply(this, [window.theme, jQuery]);

// Lightbox
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__lightbox';

	var PluginLightbox = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginLightbox.defaults = {
		tClose: 'Close (Esc)', // Alt text on close button
		tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
		gallery: {
			tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
			tNext: 'Next (Right arrow key)', // Alt text on right arrow
			tCounter: '%curr% of %total%' // Markup for "1 of 7" counter
		},
		image: {
			tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
		},
		ajax: {
			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
		},
		callbacks: {
			open: function() {
				$('html').addClass('lightbox-opened');
			},
			close: function() {
				$('html').removeClass('lightbox-opened');
			}
		}
	};

	PluginLightbox.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginLightbox.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.magnificPopup))) {
				return this;
			}

			this.options.wrapper.magnificPopup(this.options);

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginLightbox: PluginLightbox
	});

	// jquery plugin
	$.fn.themePluginLightbox = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginLightbox($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Loading Overlay
(function(theme, $) {

	'use strict';

	theme = theme || {};

	var loadingOverlayTemplate = [
		'<div class="loading-overlay">',
			'<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
		'</div>'
	].join('');

	var LoadingOverlay = function( $wrapper, options ) {
		return this.initialize( $wrapper, options );
	};

	LoadingOverlay.prototype = {

		options: {
			css: {},
			hideDelay: 100
		},

		initialize: function( $wrapper, options ) {
			this.$wrapper = $wrapper;

			this
				.setVars()
				.setOptions( options )
				.build()
				.events();

			this.$wrapper.data( 'loadingOverlay', this );
		},

		setVars: function() {
			this.$overlay = this.$wrapper.find('.loading-overlay');

			return this;
		},

		setOptions: function( options ) {
			if ( !this.$overlay.get(0) ) {
				this.matchProperties();
			}
			this.options     = $.extend( true, {}, this.options, options, theme.fn.getOptions(this.$wrapper.data('plugin-options')) );

			this.loaderClass = this.getLoaderClass( this.options.css.backgroundColor );

			return this;
		},

		build: function() {
			if ( !this.$overlay.closest(document.documentElement).get(0) ) {
				if ( !this.$cachedOverlay ) {
					this.$overlay = $( loadingOverlayTemplate ).clone();

					if ( this.options.css ) {
						this.$overlay.css( this.options.css );
						this.$overlay.find( '.loader' ).addClass( this.loaderClass );
					}
				} else {
					this.$overlay = this.$cachedOverlay.clone();
				}

				this.$wrapper.append( this.$overlay );
			}

			if ( !this.$cachedOverlay ) {
				this.$cachedOverlay = this.$overlay.clone();
			}

			return this;
		},

		events: function() {
			var _self = this;

			if ( this.options.startShowing ) {
				_self.show();
			}

			if ( this.$wrapper.is('body') || this.options.hideOnWindowLoad ) {
				$( window ).on( 'load error', function() {
					_self.hide();
				});
			}

			if ( this.options.listenOn ) {
				$( this.options.listenOn )
					.on( 'loading-overlay:show beforeSend.ic', function( e ) {
						e.stopPropagation();
						_self.show();
					})
					.on( 'loading-overlay:hide complete.ic', function( e ) {
						e.stopPropagation();
						_self.hide();
					});
			}

			this.$wrapper
				.on( 'loading-overlay:show beforeSend.ic', function( e ) {
					if ( e.target === _self.$wrapper.get(0) ) {
						e.stopPropagation();
						_self.show();
						return true;
					}
					return false;
				})
				.on( 'loading-overlay:hide complete.ic', function( e ) {
					if ( e.target === _self.$wrapper.get(0) ) {
						e.stopPropagation();
						_self.hide();
						return true;
					}
					return false;
				});

			return this;
		},

		show: function() {
			this.build();

			this.position = this.$wrapper.css( 'position' ).toLowerCase();
			if ( this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed' ) {
				this.$wrapper.css({
					position: 'relative'
				});
			}
			this.$wrapper.addClass( 'loading-overlay-showing' );
		},

		hide: function() {
			var _self = this;

			setTimeout(function() {
				_self.$wrapper.removeClass( 'loading-overlay-showing' );
				
				if ( this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed' ) {
					_self.$wrapper.css({ position: '' });
				}

				$(window).trigger('loading.overlay.ready');
			}, _self.options.hideDelay);
		},

		matchProperties: function() {
			var i,
				l,
				properties;

			properties = [
				'backgroundColor',
				'borderRadius'
			];

			l = properties.length;

			for( i = 0; i < l; i++ ) {
				var obj = {};
				obj[ properties[ i ] ] = this.$wrapper.css( properties[ i ] );

				$.extend( this.options.css, obj );
			}
		},

		getLoaderClass: function( backgroundColor ) {
			if ( !backgroundColor || backgroundColor === 'transparent' || backgroundColor === 'inherit' ) {
				return 'black';
			}

			var hexColor,
				r,
				g,
				b,
				yiq;

			var colorToHex = function( color ){
				var hex,
					rgb;

				if( color.indexOf('#') >- 1 ){
					hex = color.replace('#', '');
				} else {
					rgb = color.match(/\d+/g);
					hex = ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
				}

				if ( hex.length === 3 ) {
					hex = hex + hex;
				}

				return hex;
			};

			hexColor = colorToHex( backgroundColor );

			r = parseInt( hexColor.substr( 0, 2), 16 );
			g = parseInt( hexColor.substr( 2, 2), 16 );
			b = parseInt( hexColor.substr( 4, 2), 16 );
			yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

			return ( yiq >= 128 ) ? 'black' : 'white';
		}

	};

	// expose to scope
	$.extend(theme, {
		LoadingOverlay: LoadingOverlay
	});

	// expose as a jquery plugin
	$.fn.loadingOverlay = function( opts ) {
		return this.each(function() {
			var $this = $( this );

			var loadingOverlay = $this.data( 'loadingOverlay' );
			if ( loadingOverlay ) {
				return loadingOverlay;
			} else {
				var options = opts || $this.data( 'loading-overlay-options' ) || {};
				return new LoadingOverlay( $this, options );
			}
		});
	}

	// auto init
	$('[data-loading-overlay]').loadingOverlay();

}).apply(this, [window.theme, jQuery]);

// Masonry
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__masonry';

	var PluginMasonry = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginMasonry.defaults = {

	};

	PluginMasonry.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginMasonry.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.isotope))) {
				return this;
			}

			var self = this,
				$window = $(window);

			self.$loader = false;

			if (self.options.wrapper.parents('.masonry-loader').get(0)) {
				self.$loader = self.options.wrapper.parents('.masonry-loader');
				self.createLoader();
			}

			self.options.wrapper.one('layoutComplete', function(event, laidOutItems) {
				self.removeLoader();
			});

			self.options.wrapper.waitForImages(function() {
				self.options.wrapper.isotope(self.options);	
			});

			// IE10/11 fix
			if( $('html').hasClass('ie10') || $('html').hasClass('ie11') ) {
				var padding = parseInt( self.options.wrapper.children().css('padding-left') ) + parseInt( self.options.wrapper.children().css('padding-right') );
			}

			$(window).on('resize', function() {
				setTimeout(function() {
					self.options.wrapper.isotope('layout');
				}, 300);
			});

			setTimeout(function() {
				self.removeLoader();
			}, 3000);

			return this;
		},

		createLoader: function() {
			var self = this;

			var loaderTemplate = [
				'<div class="bounce-loader">',
					'<div class="bounce1"></div>',
					'<div class="bounce2"></div>',
					'<div class="bounce3"></div>',
				'</div>'
			].join('');

			self.$loader.append(loaderTemplate);

			return this;
		},

		removeLoader: function() {

			var self = this;

			if (self.$loader) {

				self.$loader.removeClass('masonry-loader-showing');

				setTimeout(function() {
					self.$loader.addClass('masonry-loader-loaded');
				}, 300);

			}

		}
	};

	// expose to scope
	$.extend(theme, {
		PluginMasonry: PluginMasonry
	});

	// jquery plugin
	$.fn.themePluginMasonry = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginMasonry($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Parallax
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__parallax';

	var PluginParallax = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginParallax.defaults = {
		speed: 1.5,
		horizontalPosition: '50%',
		offset: 0,
		parallaxDirection: 'top',
		parallaxHeight: '180%',
		scrollableParallax: false,
		scrollableParallaxMinWidth: 991,
		startOffset: 7,
		transitionDuration: '200ms',
		cssProperty: 'width',
		cssValueStart: 40,
		cssValueEnd: 100,
		cssValueUnit: 'vw'
	};

	PluginParallax.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginParallax.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			var self = this,
				$window = $(window),
				offset,
				yPos,
				bgpos,
				background,
				rotateY;

			// Scrollable
			if( self.options.scrollableParallax && $(window).width() > self.options.scrollableParallaxMinWidth ) {
				var $scrollableWrapper = self.options.wrapper.find('.scrollable-parallax-wrapper');

				if( $scrollableWrapper.get(0) ) {

					var progress 	 = ( $(window).scrollTop() > ( self.options.wrapper.offset().top + $(window).outerHeight() ) ) ? self.options.cssValueEnd : self.options.cssValueStart,
						cssValueUnit = self.options.cssValueUnit ? self.options.cssValueUnit : '';

					$scrollableWrapper.css({
						'background-image' : 'url(' + self.options.wrapper.data('image-src') + ')',
						'background-size' : 'cover',
						'background-position' : 'center',
						'background-attachment' : 'fixed',
						'transition' : 'ease '+ self.options.cssProperty +' '+ self.options.transitionDuration,
						'width' : progress + '%'
					});

					$(window).on('scroll', function(e){
						if( self.options.wrapper.visible( true ) ) {
							var $window = $(window),
								scrollTop = $window.scrollTop(),
						    	elementOffset = self.options.wrapper.offset().top,
						     	currentElementOffset = (elementOffset - scrollTop);

						   	var scrollPercent = Math.abs( +( currentElementOffset - $window.height() ) / (self.options.startOffset ? self.options.startOffset : 7) );
						 	
						 	// Increment progress value according scroll position
						 	if( scrollPercent <= self.options.cssValueEnd && progress <= self.options.cssValueEnd ) {
						 		progress = self.options.cssValueStart + scrollPercent;
						 	}

						 	// Adjust CSS end value
						 	if( progress > self.options.cssValueEnd ) {
						 		progress = self.options.cssValueEnd;
						 	}

						 	// Adjust CSS start value
						 	if( progress < self.options.cssValueStart ) {
						 		progress = self.options.cssValueStart;
						 	}

						 	var styles = {}
						 	styles[self.options.cssProperty] = progress + cssValueUnit;

							$scrollableWrapper.css(styles);
						}
					});

				}

				return;
			}

			// Create Parallax Element
			if( self.options.fadeIn ) {
				background = $('<div class="parallax-background fadeIn animated"></div>');
			} else {
				background = $('<div class="parallax-background"></div>');
			}

			// Set Style for Parallax Element
			background.css({
				'background-image' : 'url(' + self.options.wrapper.data('image-src') + ')',
				'background-size' : 'cover',
				'position' : 'absolute',
				'top' : 0,
				'left' : 0,
				'width' : '100%',
				'height' : self.options.parallaxHeight
			});

			// Add Parallax Element on DOM
			self.options.wrapper.prepend(background);

			// Set Overlfow Hidden and Position Relative to Parallax Wrapper
			self.options.wrapper.css({
				'position' : 'relative',
				'overflow' : 'hidden'
			});

			// Parallax Effect on Scroll & Resize
			var parallaxEffectOnScrolResize = function() {
				$window.on('scroll resize', function() {
					offset  = self.options.wrapper.offset();
					yPos    = -($window.scrollTop() - (offset.top - 100)) / ((self.options.speed + 2 ));
					plxPos  = (yPos < 0) ? Math.abs(yPos) : -Math.abs(yPos);
					rotateY = ( $('html[dir="rtl"]').get(0) ) ? ' rotateY(180deg)' : ''; // RTL

					if( self.options.parallaxDirection == 'bottom' ) {
						self.options.offset = 250;
					}

					var y = ( (plxPos - 50) + (self.options.offset) );
					if( self.options.parallaxDirection == 'bottom' ) {
						y = ( y < 0 ) ? Math.abs( y ) : -Math.abs( y );
					}

					background.css({
						'transform' : 'translate3d(0, '+ y +'px, 0)' + rotateY,
						'background-position-x' : self.options.horizontalPosition
					});
				});

				$window.trigger('scroll');
			}

			if (!$.browser.mobile) {
				parallaxEffectOnScrolResize();
			} else {
				if( self.options.enableOnMobile == true ) {
					parallaxEffectOnScrolResize();
				} else {
					self.options.wrapper.addClass('parallax-disabled');
				}
			}

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginParallax: PluginParallax
	});

	// jquery plugin
	$.fn.themePluginParallax = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginParallax($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Progress Bar
(function(theme, $) {

	theme = theme || {};

	var instanceName = '__progressBar';

	var PluginProgressBar = function($el, opts) {
		return this.initialize($el, opts);
	};

	PluginProgressBar.defaults = {
		accX: 0,
		accY: -50,
		delay: 1
	};

	PluginProgressBar.prototype = {
		initialize: function($el, opts) {
			if ($el.data(instanceName)) {
				return this;
			}

			this.$el = $el;

			this
				.setData()
				.setOptions(opts)
				.build();

			return this;
		},

		setData: function() {
			this.$el.data(instanceName, this);

			return this;
		},

		setOptions: function(opts) {
			this.options = $.extend(true, {}, PluginProgressBar.defaults, opts, {
				wrapper: this.$el
			});

			return this;
		},

		build: function() {
			if (!($.isFunction($.fn.appear))) {
				return this;
			}

			var self = this,
				$el = this.options.wrapper,
				delay = 1;

			$el.appear(function() {

				delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);

				$el.addClass($el.attr('data-appear-animation'));

				setTimeout(function() {

					$el.animate({
						width: $el.attr('data-appear-progress-animation')
					}, 1500, 'easeOutQuad', function() {
						$el.find('.progress-bar-tooltip').animate({
							opacity: 1
						}, 500, 'easeOutQuad');
					});

				}, delay);

			}, {
				accX: self.options.accX,
				accY: self.options.accY
			});

			return this;
		}
	};

	// expose to scope
	$.extend(theme, {
		PluginProgressBar: PluginProgressBar
	});

	// jquery plugin
	$.fn.themePluginProgressBar = function(opts) {
		return this.map(function() {
			var $this = $(this);

			if ($this.data(instanceName)) {
				return $this.data(instanceName);
			} else {
				return new PluginProgressBar($this, opts);
			}

		});
	}

}).apply(this, [window.theme, jQuery]);

// Scroll to Top
(function(theme, $) {

	theme = theme || {};

	$.extend(theme, {

		PluginScrollToTop: {

			defaults: {
				wrapper: $('body'),
				offset: 150,
				buttonClass: 'scroll-to-top',
				iconClass: 'fas fa-chevron-up',
				delay: 1000,
				visibleMobile: false,
				label: false,
				easing: 'easeOutBack'
			},

			initialize: function(opts) {
				initialized = true;

				// Don't initialize if the page has Section Scroll
				if( $('body[data-plugin-section-scroll]').get(0) ) {
					return;
				}

				this
					.setOptions(opts)
					.build()
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts);

				return this;
			},

			build: function() {
				var self = this,
					$el;

				// Base HTML Markup
				$el = $('<a />')
					.addClass(self.options.buttonClass)
					.attr({
						'href': '#',
					})
					.append(
						$('<i />')
						.addClass(self.options.iconClass)
				);

				// Visible Mobile
				if (!self.options.visibleMobile) {
					$el.addClass('hidden-mobile');
				}

				// Label
				if (self.options.label) {
					$el.append(
						$('<span />').html(self.options.label)
					);
				}

				this.options.wrapper.append($el);

				this.$el = $el;

				return this;
			},

			events: function() {
				var self = this,
					_isScrolling = false;

				// Click Element Action
				self.$el.on('click', function(e) {
					e.preventDefault();
					$('body, html').animate({
						scrollTop: 0
					}, self.options.delay, self.options.easing);
					return false;
				});

				// Show/Hide Button on Window Scroll event.
				$(window).scroll(function() {

					if (!_isScrolling) {

						_isScrolling = true;

						if ($(window).scrollTop() > self.options.offset) {

							self.$el.stop(true, true).addClass('visible');
							_isScrolling = false;

						} else {

							self.$el.stop(true, true).removeClass('visible');
							_isScrolling = false;

						}

					}

				});

				return this;
			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Nav
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		Nav: {

			defaults: {
				wrapper: $('#mainNav'),
				scrollDelay: 600,
				scrollAnimation: 'easeOutQuad'
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.build()
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			build: function() {
				var self = this,
					$html = $('html'),
					$header = $('#header'),
					$headerNavMain = $('#header .header-nav-main'),
					thumbInfoPreview;

				// Preview Thumbs
				self.$wrapper.find('a[data-thumb-preview]').each(function() {
					thumbInfoPreview = $('<span />').addClass('thumb-info thumb-info-preview')
											.append($('<span />').addClass('thumb-info-wrapper')
												.append($('<span />').addClass('thumb-info-image').css('background-image', 'url(' + $(this).data('thumb-preview') + ')')
										   )
									   );

					$(this).append(thumbInfoPreview);
				});

				// Side Header / Side Header Hamburguer Sidebar (Reverse Dropdown)
				if($html.hasClass('side-header') || $html.hasClass('side-header-hamburguer-sidebar')) {
					
					// Side Header Right / Side Header Hamburguer Sidebar Right
					if($html.hasClass('side-header-right') || $html.hasClass('side-header-hamburguer-sidebar-right')) {
						if(!$html.hasClass('side-header-right-no-reverse')) {
							$header.find('.dropdown-submenu').addClass('dropdown-reverse');
						}
					}

				} else {
					
					// Reverse
					self.checkReverse = function() {
						self.$wrapper.find('.dropdown, .dropdown-submenu').removeClass('dropdown-reverse');

						self.$wrapper.find('.dropdown:not(.manual):not(.dropdown-mega), .dropdown-submenu:not(.manual)').each(function() {
							if(!$(this).find('.dropdown-menu').visible( false, true, 'horizontal' )  ) {
								$(this).addClass('dropdown-reverse');
							}
						});
					}

					self.checkReverse();

	 				$(window).on('resize', function() {
						self.checkReverse();
	 				});

				}

				// Clone Items
				if($headerNavMain.hasClass('header-nav-main-clone-items')) {

			    	$headerNavMain.find('nav > ul > li > a').each(function(){
				    	var parent = $(this).parent(),
				    		clone  = $(this).clone(),
				    		clone2 = $(this).clone(),
				    		wrapper = $('<span class="wrapper-items-cloned"></span>');

				    	// Config Classes
				    	$(this).addClass('item-original');
				    	clone2.addClass('item-two');

				    	// Insert on DOM
				    	parent.prepend(wrapper);
				    	wrapper.append(clone).append(clone2);
				    });

				}

				// Floating
				if($('#header.header-floating-icons').get(0) && $(window).width() > 991) {

					var menuFloatingAnim = {
						$menuFloating: $('#header.header-floating-icons .header-container > .header-row'),

						build: function() {
							var self = this;

							self.init();
						},
						init: function(){
							var self  = this,
								divisor = 0;

							$(window).scroll(function() {
							    var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height()),
							    	st = $(this).scrollTop();

								divisor = $(document).height() / $(window).height();

							    self.$menuFloating.find('.header-column > .header-row').css({
							    	transform : 'translateY( calc('+ scrollPercent +'vh - '+ st / divisor +'px) )' 
							    });
							});
						}
					}

					menuFloatingAnim.build();

				}

				// Slide
				if($('.header-nav-links-vertical-slide').get(0)) {
					var slideNavigation = {
						$mainNav: $('#mainNav'),
						$mainNavItem: $('#mainNav li'),

						build: function(){
							var self = this;

							self.menuNav();
						},
						menuNav: function(){
							var self = this;

							self.$mainNavItem.on('click', function(e){
								var currentMenuItem 	= $(this),
									currentMenu 		= $(this).parent(),
									nextMenu        	= $(this).find('ul').first(),
									prevMenu        	= $(this).closest('.next-menu'),
									isSubMenu       	= currentMenuItem.hasClass('dropdown') || currentMenuItem.hasClass('dropdown-submenu'),
									isBack          	= currentMenuItem.hasClass('back-button'),
									nextMenuHeightDiff  = ( ( nextMenu.find('> li').length * nextMenu.find('> li').outerHeight() ) - nextMenu.outerHeight() ),
									prevMenuHeightDiff  = ( ( prevMenu.find('> li').length * prevMenu.find('> li').outerHeight() ) - prevMenu.outerHeight() );

								if( isSubMenu ) {
									currentMenu.addClass('next-menu');
									nextMenu.addClass('visible');
									currentMenu.css({
										overflow: 'visible',
										'overflow-y': 'visible'
									});
									
									if( nextMenuHeightDiff > 0 ) {
										nextMenu.css({
											overflow: 'hidden',
											'overflow-y': 'scroll'
										});
									}

									for( i = 0; i < nextMenu.find('> li').length; i++ ) {
										if( nextMenu.outerHeight() < ($('.header-row-side-header').outerHeight() - 100) ) {
											nextMenu.css({
												height: nextMenu.outerHeight() + nextMenu.find('> li').outerHeight()
											});
										}
									}

									nextMenu.css({
										'padding-top': nextMenuHeightDiff + 'px'
									});
								}

								if( isBack ) {
									currentMenu.parent().parent().removeClass('next-menu');
									currentMenu.removeClass('visible');

									if( prevMenuHeightDiff > 0 ) {
										prevMenu.css({
											overflow: 'hidden',
											'overflow-y': 'scroll'
										});
									}
								}

								e.stopPropagation();
							});
						}
					}

					$(window).trigger('resize');
					
					if( $(window).width() > 991 ) {
						slideNavigation.build();
					}

					$(document).ready(function(){
						$(window).afterResize(function(){
							if( $(window).width() > 991 ) {
								slideNavigation.build();
							}
						});
					});
				}

				// Header Nav Main Mobile Dark
				if($('.header-nav-main-mobile-dark').get(0)) {
					$('#header:not(.header-transparent-dark-bottom-border):not(.header-transparent-light-bottom-border)').addClass('header-no-border-bottom');
				}

				// Keyboard Navigation / Accessibility
				if( $(window).width() > 991 ) {
					this.focusMenuWithChildren();
				}
				
				return this;
			},

			focusMenuWithChildren: function() {
				// Get all the link elements within the primary menu.
				var links, i, len,
					menu = document.querySelector( 'html:not(.side-header):not(.side-header-hamburguer-sidebar):not(.side-header-overlay-full-screen) .header-nav-main > nav' );

				if ( ! menu ) {
					return false;
				}

				links = menu.getElementsByTagName( 'a' );

				// Each time a menu link is focused or blurred, toggle focus.
				for ( i = 0, len = links.length; i < len; i++ ) {
					links[i].addEventListener( 'focus', toggleFocus, true );
					links[i].addEventListener( 'blur', toggleFocus, true );
				}

				//Sets or removes the .focus class on an element.
				function toggleFocus() {
					var self = this;

					// Move up through the ancestors of the current link until we hit .primary-menu.
					while ( -1 === self.className.indexOf( 'header-nav-main' ) ) {
						// On li elements toggle the class .focus.
						if ( 'li' === self.tagName.toLowerCase() ) {
							if ( -1 !== self.className.indexOf( 'open' ) ) {
								self.className = self.className.replace( ' open', '' );
							} else {
								self.className += ' open';
							}
						}
						self = self.parentElement;
					}
				}
			},

			events: function() {
				var self    = this,
					$html   = $('html'),
					$header = $('#header'),
					$window = $(window),
					headerBodyHeight = $('.header-body').outerHeight();

				$header.find('a[href="#"]').on('click', function(e) {
					e.preventDefault();
				});

				// Mobile Arrows
				if( $html.hasClass('side-header-hamburguer-sidebar') ) {
					$header.find('.dropdown-toggle, .dropdown-submenu > a')
						.append('<i class="fas fa-chevron-down fa-chevron-right"></i>');
				} else {
					$header.find('.dropdown-toggle, .dropdown-submenu > a')
						.append('<i class="fas fa-chevron-down"></i>');
				}
				
				$header.find('.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-chevron-down, .dropdown-submenu a[href!="#"] .fa-chevron-down').on('click', function(e) {
					e.preventDefault();
					if ($window.width() < 992) {
						$(this).closest('li').toggleClass('open');

						// Adjust Header Body Height
						var height = ( $header.hasClass('header-effect-shrink') && $html.hasClass('sticky-header-active') ) ? theme.StickyHeader.options.stickyHeaderContainerHeight : headerBodyHeight;
						$('.header-body').animate({
					 		height: ($('.header-nav-main nav').outerHeight(true) + height) + 10
					 	}, 0);
					}
				});

				$header.find('li a.active').addClass('current-page-active');

				// Add Open Class
				$header.find('.header-nav-click-to-open .dropdown-toggle[href="#"], .header-nav-click-to-open .dropdown-submenu a[href="#"], .header-nav-click-to-open .dropdown-toggle > i').on('click', function(e) {
					if( !$('html').hasClass('side-header-hamburguer-sidebar') && $window.width() > 991 ) {
						e.preventDefault();
						e.stopPropagation();
					}

					if ($window.width() > 991) {
						e.preventDefault();
						e.stopPropagation();

						$header.find('li a.active').removeClass('active');

						if( $(this).prop('tagName') == 'I' ) {
							$(this).parent().addClass('active');
						} else {
							$(this).addClass('active');
						}

						if (!$(this).closest('li').hasClass('open')) {

							var $li = $(this).closest('li'),
								isSub = false;

							if ( $(this).parent().hasClass('dropdown-submenu') ) {
								isSub = true;
							}

							$(this).closest('.dropdown-menu').find('.dropdown-submenu.open').removeClass('open');
							$(this).parent('.dropdown').parent().find('.dropdown.open').removeClass('open');

							if (!isSub) {
								$(this).parent().find('.dropdown-submenu.open').removeClass('open');
							}

							$li.addClass('open');

							$(document).off('click.nav-click-to-open').on('click.nav-click-to-open', function (e) {
								if (!$li.is(e.target) && $li.has(e.target).length === 0) {
									$li.removeClass('open');
									$li.parents('.open').removeClass('open');
									$header.find('li a.active').removeClass('active');
									$header.find('li a.current-page-active').addClass('active');
								}
							});

						} else {
							$(this).closest('li').removeClass('open');
							$header.find('li a.active').removeClass('active');
							$header.find('li a.current-page-active').addClass('active');
						}

						$window.trigger({
							type: 'resize',
							from: 'header-nav-click-to-open'
						});
					}
				});

				// Collapse Nav
				$header.find('[data-collapse-nav]').on('click', function(e) {
					$(this).parents('.collapse').removeClass('show');
				});

				// Top Features
				$header.find('.header-nav-features-toggle').on('click', function(e) {
					e.preventDefault();

					var $toggleParent = $(this).parent();

					if (!$(this).siblings('.header-nav-features-dropdown').hasClass('show')) {

						var $dropdown = $(this).siblings('.header-nav-features-dropdown');

						$('.header-nav-features-dropdown.show').removeClass('show');

						$dropdown.addClass('show');

						$(document).off('click.header-nav-features-toggle').on('click.header-nav-features-toggle', function (e) {
							if (!$toggleParent.is(e.target) && $toggleParent.has(e.target).length === 0) {
								$('.header-nav-features-dropdown.show').removeClass('show');
							}
						});

						if ($(this).attr('data-focus')) {
							$('#' + $(this).attr('data-focus')).focus();
						}

					} else {
						$(this).siblings('.header-nav-features-dropdown').removeClass('show');
					}
				});

				// Hamburguer Menu
				var $hamburguerMenuBtn = $('.hamburguer-btn:not(.side-panel-toggle)'),
					$hamburguerSideHeader = $('#header.side-header, #header.side-header-overlay-full-screen');
				
				$hamburguerMenuBtn.on('click', function(){
					if($(this).attr('data-set-active') != 'false') {
						$(this).toggleClass('active');
					}
					$hamburguerSideHeader.toggleClass('side-header-hide');
					$html.toggleClass('side-header-hide');

					$window.trigger('resize');
				});

				$('.hamburguer-close:not(.side-panel-toggle)').on('click', function(){
					$('.hamburguer-btn:not(.hamburguer-btn-side-header-mobile-show)').trigger('click');
				});				
				
				// Set Header Body Height when open mobile menu
				$('.header-nav-main nav').on('show.bs.collapse', function () {
				 	$(this).removeClass('closed');

				 	// Add Mobile Menu Opened Class
				 	$('html').addClass('mobile-menu-opened');

			 		$('.header-body').animate({
				 		height: ($('.header-body').outerHeight() + $('.header-nav-main nav').outerHeight(true)) + 10
				 	});

				 	// Header Below Slider / Header Bottom Slider - Scroll to menu position
				 	if( $('#header').is('.header-bottom-slider, .header-below-slider') && !$('html').hasClass('sticky-header-active') ) {
				 		self.scrollToTarget( $('#header'), 0 );
				 	}
				});

				// Set Header Body Height when collapse mobile menu
				$('.header-nav-main nav').on('hide.bs.collapse', function () {
				 	$(this).addClass('closed');

				 	// Remove Mobile Menu Opened Class
				 	$('html').removeClass('mobile-menu-opened');

			 		$('.header-body').animate({
				 		height: ($('.header-body').outerHeight() - $('.header-nav-main nav').outerHeight(true))
				 	}, function(){
				 		$(this).height('auto');
				 	});
				});

				// Header Effect Shrink - Adjust header body height on mobile
				$window.on('stickyHeader.activate', function(){
					if( $window.width() < 992 && $header.hasClass('header-effect-shrink') ) {
						if( $('.header-btn-collapse-nav').attr('aria-expanded') == 'true' ) {
							$('.header-body').animate({
						 		height: ( $('.header-nav-main nav').outerHeight(true) + theme.StickyHeader.options.stickyHeaderContainerHeight ) + ( ($('.header-nav-bar').get(0)) ? $('.header-nav-bar').outerHeight() : 0 ) 
						 	});
						}
					}
				});

				$window.on('stickyHeader.deactivate', function(){
					if( $window.width() < 992 && $header.hasClass('header-effect-shrink') ) {
						if( $('.header-btn-collapse-nav').attr('aria-expanded') == 'true' ) {
							$('.header-body').animate({
						 		height: headerBodyHeight + $('.header-nav-main nav').outerHeight(true) + 10
						 	});
						}
					}
				});

				// Remove Open Class on Resize		
				$window.on('resize.removeOpen', function(e) {
					if( e.from == 'header-nav-click-to-open' ) {
						return;
					}
					
					setTimeout(function() {
						if( $window.width() > 991 ) {
							$header.find('.dropdown.open').removeClass('open');
						}
					}, 100);
				});

				// Side Header - Change value of initial header body height
				$(document).ready(function(){
					if( $window.width() > 991 ) {
						var flag = false;
						
						$window.on('resize', function(e) {
							if( e.from == 'header-nav-click-to-open' ) {
								return;
							}

							$header.find('.dropdown.open').removeClass('open');

							if( $window.width() < 992 && flag == false ) {
								headerBodyHeight = $('.header-body').outerHeight();
								flag = true;

								setTimeout(function(){
									flag = false;
								}, 500);
							}
						});
					}
				});

				// Side Header - Set header height on mobile
				if( $html.hasClass('side-header') ) {
					if( $window.width() < 992 ) {
						$header.css({
							height: $('.header-body .header-container').outerHeight() + (parseInt( $('.header-body').css('border-top-width') ) + parseInt( $('.header-body').css('border-bottom-width') ))
						});
					}

					$(document).ready(function(){
						$window.afterResize(function(){
							if( $window.width() < 992 ) {
								$header.css({
									height: $('.header-body .header-container').outerHeight() + (parseInt( $('.header-body').css('border-top-width') ) + parseInt( $('.header-body').css('border-bottom-width') ))
								});
							} else {
								$header.css({
									height: ''
								});
							}
						});
					});
				}

				// Anchors Position
				$('[data-hash]').each(function() {

					var target = $(this).attr('href'),
						offset = ($(this).is("[data-hash-offset]") ? $(this).data('hash-offset') : 0);

					if( target.indexOf('#') != -1 && $(target).get(0)) {
						$(this).on('click', function(e) {
							e.preventDefault();

							if( !$(e.target).is('i') ) {

								// Close Collapse if open
								$(this).parents('.collapse.show').collapse('hide');

								// Close Side Header
								$hamburguerSideHeader.addClass('side-header-hide');
								$html.addClass('side-header-hide');
								
								$window.trigger('resize');

								self.scrollToTarget(target, offset);

								// Data Hash Trigger Click
								if( $(this).data('hash-trigger-click') ) {

									var $clickTarget = $( $(this).data('hash-trigger-click') ),
										clickDelay = $(this).data('hash-trigger-click-delay') ? $(this).data('hash-trigger-click-delay') : 0;

									if( $clickTarget.get(0) ) {
										setTimeout(function(){
											$clickTarget.trigger('click');
										}, clickDelay);
									}

								}
								
							}

							return;
						});
					}

				});

				// Floating
				if($('#header.header-floating-icons').get(0)) {

					$('#header.header-floating-icons [data-hash]').off().each(function() {

						var target = $(this).attr('href'),
							offset = ($(this).is("[data-hash-offset]") ? $(this).data('hash-offset') : 0);

						if($(target).get(0)) {
							$(this).on('click', function(e) {
								e.preventDefault();

									$('html, body').animate({
										scrollTop: $(target).offset().top - offset
									}, 600, 'easeOutQuad', function() {

									});

								return;
							});
						}

					});

				}

				// Side Panel Toggle
				if( $('.side-panel-toggle').get(0) ) {
					var init_html_class = $('html').attr('class');

					$('.side-panel-toggle').on('click', function(e){
						var extra_class = $(this).data('extra-class'),
							delay       = ( extra_class ) ? 100 : 0;

						e.preventDefault();

						if( $(this).hasClass('active') ) {
							$('html').removeClass('side-panel-open');
							$('.hamburguer-btn.side-panel-toggle:not(.side-panel-close)').removeClass('active');
							return false;
						}

						if( extra_class ) {
							$('.side-panel-wrapper').css('transition','none');
							$('html')
								.removeClass()
								.addClass( init_html_class )
								.addClass( extra_class );
						}

						setTimeout(function(){
							$('.side-panel-wrapper').css('transition','');
							$('html').toggleClass('side-panel-open');
						}, delay);
					});

					$(document).on('click', function(e){
						if( !$(e.target).closest('.side-panel-wrapper').get(0) && !$(e.target).hasClass('side-panel-toggle') ) {
							$('.hamburguer-btn.side-panel-toggle:not(.side-panel-close)').removeClass('active');
							$('html').removeClass('side-panel-open');
						}
					});
				}

				return this;
			},

			scrollToTarget: function(target, offset) {
				var self = this;

				$('body').addClass('scrolling');

				$('html, body').animate({
					scrollTop: $(target).offset().top - offset
				}, self.options.scrollDelay, self.options.scrollAnimation, function() {
					$('body').removeClass('scrolling');
				});

				return this;

			}

		}

	});

}).apply(this, [window.theme, jQuery]);

// Sticky Header
(function(theme, $) {

	theme = theme || {};

	var initialized = false;

	$.extend(theme, {

		StickyHeader: {

			defaults: {
				wrapper: $('#header'),
				headerBody: $('#header .header-body'),
				stickyEnabled: true,
				stickyEnableOnBoxed: true,
				stickyEnableOnMobile: true,
				stickyStartAt: 0,
				stickyStartAtElement: false,
				stickySetTop: 0,
				stickyEffect: '',
				stickyHeaderContainerHeight: false,
				stickyChangeLogo: false,
				stickyChangeLogoWrapper: true
			},

			initialize: function($wrapper, opts) {
				if (initialized) {
					return this;
				}

				initialized = true;
				this.$wrapper = ($wrapper || this.defaults.wrapper);

				this
					.setOptions(opts)
					.build()
					.events();

				return this;
			},

			setOptions: function(opts) {
				this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

				return this;
			},

			build: function() {
				if (!this.options.stickyEnableOnBoxed && $('html').hasClass('boxed') || $('html').hasClass('side-header-hamburguer-sidebar') || !this.options.stickyEnabled) {
					return this;
				}

				var self = this,
					$html = $('html'),
					$window = $(window),
					sideHeader = $html.hasClass('side-header'),
					initialHeaderTopHeight = self.options.wrapper.find('.header-top').outerHeight(),
					initialHeaderContainerHeight = self.options.wrapper.find('.header-container').outerHeight(),
					minHeight;

				// HTML Classes
				$html.addClass('sticky-header-enabled');

				if (parseInt(self.options.stickySetTop) < 0) {
					$html.addClass('sticky-header-negative');
				}

				// Notice Top Bar First Load
				if( $('.notice-top-bar').get(0) ) {
					if (parseInt(self.options.stickySetTop) == 1 || self.options.stickyEffect == 'shrink') {
						$('.body').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
						    setTimeout(function(){
								if( !$html.hasClass('sticky-header-active') ) {
								    self.options.headerBody.animate({
								    	top: $('.notice-top-bar').outerHeight()
								    }, 300, function(){
								    	if( $html.hasClass('sticky-header-active') ) {
								    		self.options.headerBody.css('top', 0);
								    	}
								    });
								}
						    }, 0);
						});
					}					
				}

				// Set Start At
				if(self.options.stickyStartAtElement) {

					var $stickyStartAtElement = $(self.options.stickyStartAtElement);

					$(window).on('scroll resize', function() {
						self.options.stickyStartAt = $stickyStartAtElement.offset().top;
					});

					$(window).trigger('resize');
				}

				// Define Min Height value
				if( self.options.wrapper.find('.header-top').get(0) ) {
					minHeight = ( initialHeaderTopHeight + initialHeaderContainerHeight );
				} else {
					minHeight = initialHeaderContainerHeight;
				}

				// Set Wrapper Min-Height
				if( !sideHeader ) {
					if( !$('.header-logo-sticky-change').get(0) ) {
						self.options.wrapper.css('height', self.options.headerBody.outerHeight());
					} else {
						$window.on('stickyChangeLogo.loaded', function(){
							self.options.wrapper.css('height', self.options.headerBody.outerHeight());
						});
					}

					if( self.options.stickyEffect == 'shrink' ) {
						
						// Prevent wrong visualization of header when reload on middle of page
						$(document).ready(function(){
							if( $window.scrollTop() >= self.options.stickyStartAt ) {
								self.options.wrapper.find('.header-container').on('transitionend webkitTransitionEnd oTransitionEnd', function(){
									self.options.headerBody.css('position', 'fixed');
								});
							} else {
								self.options.headerBody.css('position', 'fixed');
							}
						});

						self.options.wrapper.find('.header-container').css('height', initialHeaderContainerHeight);
						self.options.wrapper.find('.header-top').css('height', initialHeaderTopHeight);
					}
				}

				// Sticky Header Container Height
				if( self.options.stickyHeaderContainerHeight ) {
					self.options.wrapper.find('.header-container').css('height', self.options.wrapper.find('.header-container').outerHeight());
				}

				// Boxed
				if($html.hasClass('boxed') && self.options.stickyEffect == 'shrink') {
					if( (parseInt(self.options.stickyStartAt) == 0) && $window.width() > 991) {
						self.options.stickyStartAt = 30;
					}

					// Set Header Body Position Absolute
					self.options.headerBody.css('position','absolute');

					// Set position absolute because top margin from boxed layout
					$window.on('scroll', function(){
						if( $window.scrollTop() > $('.body').offset().top ) {
							self.options.headerBody.css({
								'position' : 'fixed',
								'top' : 0
							});								
						} else {
							self.options.headerBody.css({
								'position' : 'absolute',
								'top' : 0
							});
						}
					});
				}

				// Check Sticky Header / Flags prevent multiple runs at same time
				var activate_flag   	 = true,
					deactivate_flag 	 = false,
					initialStickyStartAt = self.options.stickyStartAt;

				self.checkStickyHeader = function() {

					// Notice Top Bar
					var $noticeTopBar = $('.notice-top-bar');
					if ( $noticeTopBar.get(0) ) {
						self.options.stickyStartAt = ( $noticeTopBar.data('sticky-start-at') ) ? $noticeTopBar.data('sticky-start-at') : $('.notice-top-bar').outerHeight();
					} else {
						self.options.stickyStartAt = initialStickyStartAt;
					}

					if( $window.width() > 991 && $html.hasClass('side-header') ) {
						$html.removeClass('sticky-header-active');
						activate_flag = true;
						return;
					}

					if ($window.scrollTop() >= parseInt(self.options.stickyStartAt)) {
						if( activate_flag ) {
							self.activateStickyHeader();
							activate_flag = false;
							deactivate_flag = true;
						}
					} else {
						if( deactivate_flag ) {
							self.deactivateStickyHeader();
							deactivate_flag = false;
							activate_flag = true;
						}
					}
				};
				
				// Activate Sticky Header
				self.activateStickyHeader = function() {

					if ($window.width() < 992) {
						if (!self.options.stickyEnableOnMobile) {
							self.deactivateStickyHeader();
							return;
						}
					} else {
						if (sideHeader) {
							self.deactivateStickyHeader();
							return;
						}
					}

					$html.addClass('sticky-header-active');

					// Sticky Effect - Reveal
					if( self.options.stickyEffect == 'reveal' ) {

						self.options.headerBody.css('top','-' + self.options.stickyStartAt + 'px');

						self.options.headerBody.animate({
							top: self.options.stickySetTop
						}, 400, function() {});

					}

					// Sticky Effect - Shrink
					if( self.options.stickyEffect == 'shrink' ) {

						// If Header Top
						if( self.options.wrapper.find('.header-top').get(0) ) {
							self.options.wrapper.find('.header-top').css({
								height: 0,
								'min-height': 0,
								overflow: 'hidden'
							});
						}

						// Header Container
						if( self.options.stickyHeaderContainerHeight ) {
							self.options.wrapper.find('.header-container').css({
								height: self.options.stickyHeaderContainerHeight,
								'min-height': 0
							});
						} else {
							self.options.wrapper.find('.header-container').css({
								height: (initialHeaderContainerHeight / 3) * 2, // two third of container height
								'min-height': 0
							});

							var y = initialHeaderContainerHeight - ((initialHeaderContainerHeight / 3) * 2);
							$('.main').css({
								transform: 'translate3d(0, -'+ y +'px, 0)',
								transition: 'ease transform 300ms'
							}).addClass('has-sticky-header-transform');

							if($html.hasClass('boxed')) {
								self.options.headerBody.css('position','fixed');
							}
						}

					}

					self.options.headerBody.css('top', self.options.stickySetTop);

					if (self.options.stickyChangeLogo) {
						self.changeLogo(true);
					}

					// Set Elements Style
					$('[data-sticky-header-style]').each(function() {
						var $el = $(this),
							css = theme.fn.getOptions($el.data('sticky-header-style-active')),
							opts = theme.fn.getOptions($el.data('sticky-header-style'));

						if( $window.width() > opts.minResolution ) {
							$el.css(css);
						}
					});

					$.event.trigger({
						type: 'stickyHeader.activate'
					});
				};

				// Deactivate Sticky Header
				self.deactivateStickyHeader = function() {

					$html.removeClass('sticky-header-active');

					// Sticky Effect - Shrink
					if( self.options.stickyEffect == 'shrink' ) {

						// Boxed Layout
						if( $html.hasClass('boxed') ) {

							// Set Header Body Position Absolute
							self.options.headerBody.css('position','absolute');

							if( $window.scrollTop() > $('.body').offset().top ) {
								// Set Header Body Position Fixed
								self.options.headerBody.css('position','fixed');								
							}

						} else {
							// Set Header Body Position Fixed
							self.options.headerBody.css('position','fixed');
						}

						// If Header Top
						if( self.options.wrapper.find('.header-top').get(0) ) {
							self.options.wrapper.find('.header-top').css({
								height: initialHeaderTopHeight,
								overflow: 'visible'
							});
						}

						// Header Container
						self.options.wrapper.find('.header-container').css({
							height: initialHeaderContainerHeight
						});

					}

					self.options.headerBody.css('top', 0);

					if (self.options.stickyChangeLogo) {
						self.changeLogo(false);
					}

					// Set Elements Style
					$('[data-sticky-header-style]').each(function() {
						var $el = $(this),
							css = theme.fn.getOptions($el.data('sticky-header-style-deactive')),
							opts = theme.fn.getOptions($el.data('sticky-header-style'));

						if( $window.width() > opts.minResolution ) {
							$el.css(css);
						}
					});

					$.event.trigger({
						type: 'stickyHeader.deactivate'
					});
				};

				// Always Sticky
				if (parseInt(self.options.stickyStartAt) <= 0) {
					self.activateStickyHeader();
				}

				// Set Logo
				if (self.options.stickyChangeLogo) {

					var $logoWrapper = self.options.wrapper.find('.header-logo'),
						$logo = $logoWrapper.find('img'),
						logoWidth = $logo.attr('width'),
						logoHeight = $logo.attr('height'),
						logoSmallTop = parseInt($logo.attr('data-sticky-top') ? $logo.attr('data-sticky-top') : 0),
						logoSmallWidth = parseInt($logo.attr('data-sticky-width') ? $logo.attr('data-sticky-width') : 'auto'),
						logoSmallHeight = parseInt($logo.attr('data-sticky-height') ? $logo.attr('data-sticky-height') : 'auto');

					if (self.options.stickyChangeLogoWrapper) {
						$logoWrapper.css({
							'width': $logo.outerWidth(true),
							'height': $logo.outerHeight(true)
						});
					}

					self.changeLogo = function(activate) {
						if(activate) {
							
							$logo.css({
								'top': logoSmallTop,
								'width': logoSmallWidth,
								'height': logoSmallHeight
							});

						} else {
							
							$logo.css({
								'top': 0,
								'width': logoWidth,
								'height': logoHeight
							});

						}
					}

					$.event.trigger({
						type: 'stickyChangeLogo.loaded'
					});

				}

				// Side Header
				var headerBodyHeight,
					flag = false;

				self.checkSideHeader = function() {
					if($window.width() < 992 && flag == false) {
						headerBodyHeight = self.options.headerBody.height();
						flag = true;
					}

					if(self.options.stickyStartAt == 0 && sideHeader) {
						self.options.wrapper.css('min-height', 0);
					}

					if(self.options.stickyStartAt > 0 && sideHeader && $window.width() < 992) {
						self.options.wrapper.css('min-height', headerBodyHeight);
					}
				}

				return this;
			},

			events: function() {
				var self = this;

				if (!this.options.stickyEnableOnBoxed && $('body').hasClass('boxed') || $('html').hasClass('side-header-hamburguer-sidebar') || !this.options.stickyEnabled) {
					return this;
				}

				if (!self.options.alwaysStickyEnabled) {
					$(window).on('scroll resize', function() {
						self.checkStickyHeader();
					});
				} else {
					self.activateStickyHeader();
				}

				$(window).on('load resize', function(){
					self.checkSideHeader();
				});

				return this;
			}

		}

	});

}).apply(this, [window.theme, jQuery]);