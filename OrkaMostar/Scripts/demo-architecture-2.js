/*
Name: 			Architecture 2
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	8.2.0
*/

(function( $ ) {

	'use strict';

	/*
	* Slider Background
	*/
	var $slider = $('#slider'),
		direction = '';

	$slider.on('click', '.owl-next', function(){
		direction = 'next';
	});

	$slider.on('click', '.owl-prev', function(){
		direction = 'prev';
	});

	$slider.on('changed.owl.carousel', function(e){
		
		$('.custom-slider-background .custom-slider-background-image-stage').each(function(){
			var $stage       = $(this),
				$stageOuter  = $stage.closest('.custom-slider-background-image-stage-outer'),
				$currentItem = $stage.find('.custom-slider-background-image-item').eq( e.item.index ),
				nItems       = $stage.find('.custom-slider-background-image-item').length;

			var distance = $stage.hasClass('reverse') ? ( $currentItem.outerHeight() * nItems ) - ( $currentItem.outerHeight() * ( e.item.index + 1 ) ) : $currentItem.outerHeight() * e.item.index,
				mathSymbol = $stage.hasClass('reverse') ? '-' : '-'; 

			$stage.css({
				transform: 'translate3d(0, '+ mathSymbol + distance +'px, 0)'
			});
		});

	});

	// Once we have all ready, show the slider
	$slider.on('initialized.owl.carousel', function(){
		setTimeout(function(){
			$('.custom-slider-background').addClass('show');
		}, 800);
	});

	// Hide nav on first load of page
	$slider.on('initialized.owl.carousel', function(){
		setTimeout(function(){
			$slider.find('.owl-nav').addClass('hide');
		}, 200);
	});

	// Show nav once the slider animation is completed
	$('.custom-slider-background').parent().on('transitionend', function(){
		setTimeout(function(){
			$slider.find('.owl-nav').addClass('show');
			$('.custom-slider-background').addClass('custom-box-shadow-1');
		}, 2000);
	});

	/*
	* Page Header
	*/
	$('.custom-page-header-1-wrapper > div').on('animationend', function(){
		setTimeout(function(){
			$('.custom-page-header-1-wrapper').addClass('custom-box-shadow-1');
		}, 1000);
	});

}).apply( this, [ jQuery ]);