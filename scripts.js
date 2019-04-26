(function($) {
	$(document).ready(function() {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', './catalog.json', true);
		xhr.send();

		xhr.onreadystatechange = function() {
			console.log(xhr.readyState);

			if (xhr.readyState === 4) {
				if (xhr.status != 200) {
					console.log(xhr.status + ': ' + xhr.statusText);
				} else {
					console.log(JSON.parse(xhr.responseText));
				}
			}
		};


		var catalogData = '';

		$.ajax({
			url: "./catalog.json",
			async: false,
			success: function(data){
				catalogData = data;
			}
		});

		if(catalogData.length > 0) {
			$('.site').append('<h2>Список товаров</h2>');
			$('.site').append('<div class="catalog__list"></div>');

			var catalogList = $('.catalog__list');

			$.each(catalogData, function(i, item) {

				catalogList.append('<div id="' + item['id'] + '" class="catalog__item"></div>');

				var catalogItem = $('#' + item['id']),
					itemHtml = 
					'<div class="item__title">' + item['title'] + '</div>'
					+ '<div class="item__thumb"><a href="' + item['fullimage'] + '"><img src="' + item['thumbnail'] + '" /></a></div>'
					+ '<div class="item__desc">' + item['description'] + '</div>'
					+ '<div class="item__price"><s>' + item['oldprice'] + '</s>' + item['price'] + '</div>'
					+ '<button class="item__order">Заказать</button>';

				catalogItem.append(itemHtml);
			});

			catalogList.find('.item__order').click(function(){
				$('.order__form').removeClass('hide');
			});

			$('.order__form .form__close').click(function(){
				$('.order__form').addClass('hide');
			});

			$('.order__form').submit(function(event) {
				event.preventDefault();

				var formData = $(this).find('form').serializeArray();
				console.log(formData);

				alert('Форма отправлена');
			});
		}

	});
}(jQuery));