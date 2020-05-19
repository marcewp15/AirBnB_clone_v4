$(document).ready(function () {
  const $checkboxes = $("input[type='checkbox']")
  const amenId = [];
  const amenName = [];
  $checkboxes.change(function () {
    if (this.checked) {
      amenId.push($(this).attr('data-id'));
      amenName.push($(this).attr('data-name'));
      $('.amenities h4').text(amenName);
    } else {
      const i = amenId.indexOf($(this).attr('data-id'));
      amenId.splice(i, 1);
      amenName.splice(i, 1);
      if (amenName.length > 0) {
        $('.amenities h4').text(amenName);
      } else {
        $('.amenities h4').html('&nbsp;');
      }
    }
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
  if (data.status == 'OK' && textStatus === 'success') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});


// post places http://0.0.0.0:5001/ap1/v1/places_search/
function ajaxCall (url, params = {}) {
    $.ajax({
	type: 'POST',
	url: url,
	data: JSON.stringify(params),
	contentType: 'application/json; charset=utf-8',
	dataType: 'JSON'
    }).done(function (data) {
	data.sort();
	for (let i = 0; i < data.length; i++) {
	    let place = data[i];

	    if (!place.description) { place.description = ''; }

	    let placeHtml = '<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div></div><div class="description"><br />' + place.description + '</div></article>';
	    $('section.places').append(placeHtml);
	}
    });
}


ajaxCall('http://0.0.0.0:5001/api/v1/places_search/');

$('button').on('click', function() {
    ajaxCall('http://0.0.0.0:5001/api/v1/places_search/', {'amenities': amenName});
});
