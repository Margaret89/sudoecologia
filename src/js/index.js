import {$, Inputmask} from './common';

// Стрелка наверх
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-move-up').addClass('visible');
	}else{
		$('.js-move-up').removeClass('visible');
	}
});
$('.js-move-up').on('click', function(){$('body,html').animate({scrollTop:0},500);return false;});


// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');

// Слайдер проектов
if($('.js-project-slider').length){
	$('.js-project-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="14" height="24"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arroe-right" width="14" height="24"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				}
			},
		]
	});
}

// Слайдер партнеров
if($('.js-partners-slider').length){
	$('.js-partners-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="14" height="24"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arroe-right" width="14" height="24"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					arrows: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			},
		]
	});

	$('.js-partners-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
		var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
		
		$('.js-partners-progress').css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
	});
}

// Валидация форм
function errorField(form, event) {
	form.find('.js-form-site-item').removeClass('error');
	form.find('.form-site-msg-error').remove();
	
	form.find('input[type=email]').each(function(){
		mailValid($(this));
	});

	form.find('.js-input-mail').each(function(){
		mailValid($(this));
	});

	function mailValid(elem) {
		var email = $(elem).val().trim();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		if (!pattern.test(email) && (email.length > 1)) {
			$(elem).closest('.js-form-site-item').addClass('error');
			$(elem).attr('placeholder','Укажите корректный E-mail');
		}
	}

	form.find('input,textarea,select').filter('[required]').each(function(){
		if($(this).val().length < 1){
			$(this).closest('.js-form-site-item').addClass('error');

			if($(this).hasClass('js-phone')){
				$(this).attr('placeholder','Укажите ваш номер телефона');
			} else {
				$(this).attr('placeholder','Заполните поле');
			}
		}

		if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
			$(this).closest('.js-form-site-polit').append('<div class="form-site-msg-error">Подтвердите обработку персональных данных</div>')
		}
		if($(this).attr('type') == 'radio' && !$('input[name="'+$(this).attr("name")+'"]').is(':checked')){
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).closest('.js-form-site-item').append('<div class="form-site-msg-error">Заполните поле</div>')
		}
	});

	if(form.find('.js-form-site-item.error').length){
		event.preventDefault();
	}
}

if($('.js-valid-form').length){
	$('.js-valid-form').on('click', '.js-btn-submit', function(e){
		var $form = $(this).closest('form');
		errorField($form, e);
	});

	$('.js-valid-form').on('submit', 'form', function(e){
		var successTitle = $(this).closest('.js-valid-form').data('success');
		var successText = $(this).closest('.js-valid-form').data('text');
		var tempSuccessTitle = $('.js-success-alert-title').text();

		if(successTitle){
			$('.js-success-alert-title').text(successTitle);
		} else {
			$('.js-success-alert-title').text(tempSuccessTitle);
		}

		if(successText == 'none'){
			$('.js-success-alert-text').css('display', 'none');
		} else {
			$('.js-success-alert-text').css('display', 'block');
		}

		$.fancybox.close();
		$.fancybox.open({
			src  : '#msg-success',
			type : 'inline',
			opts : {
				
			}
		});
		$(this)[0].reset();

		e.preventDefault();
	});
}

// Открыть/Закрыть мобильное меню
if($('.js-open-menu').length){
	$('.js-open-menu').on('click', function(){
		$('.js-main-menu').toggleClass('active');
		$(this).toggleClass('active');
		$('.js-body').toggleClass('no-scroll');
	});
}

$('.js-main-menu-arr').on('click', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
	$(this).closest('.js-main-menu-link').siblings('.js-main-menu-sub').slideToggle(300);
});
