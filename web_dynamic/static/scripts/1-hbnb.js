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
