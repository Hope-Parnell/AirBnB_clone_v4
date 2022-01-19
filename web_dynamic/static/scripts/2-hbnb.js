$(document).ready(() => {
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
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
