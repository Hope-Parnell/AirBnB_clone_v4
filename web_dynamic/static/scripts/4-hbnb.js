$(document).ready(() => {
  placesPost('{}');
  const amenitiesDict = {};
  $('li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenitiesDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesDict[$(this).data('id')];
    }
    const values = Object.values(amenitiesDict);
    let str = values.join(', ');
    if (str.length > 30) { str = str.slice(0, 30) + '...'; }
    $('.amenities h4').text(str);
    if (values.length === 0) $('.amenities h4').html('&nbsp;');
  });
  $.get('http://127.0.0.1:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $('button').click((evt) => {
    evt.preventDefault();
    $('article').remove();
    placesPost(JSON.stringify({ amenities: Object.keys(amenitiesDict) }));
  });
  function placesPost (input) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: input,
      dataType: 'json',
      contentType: 'application/json',
      success: (places) => {
        for (const place of places) {
          const guestS = (place.max_guest !== 1) ? 's' : '';
          const roomS = (place.number_rooms !== 1) ? 's' : '';
          const bathroomS = (place.number_bathrooms !== 1) ? 's' : '';
          const html = `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${guestS}</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${roomS}</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathroomS}</div>
              </div>
              <div class="user">
                    </div>
                    <div class="description">
                ${place.description}
                    </div>
            </article>`;
          $('.places').append(html);
        }
      }
    });
  }
});
