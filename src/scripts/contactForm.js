
// when enquiry type gets selected
$("#enquiry-type").on('change', function() {

  $(".form_name, .form_email, .form_postcode, .form_phone, .form_message, .form_send, .contact-warning").removeClass("hide-item");
  $(".enquiry-message").hide();
  $('.form-error').each(function(){
    $(this).html('');
    $(this).hide();
  });

  if ($(this).val() == "General Enquiry") {
    $(".form_street, .form_suburb, .form_state").addClass("hide-item");
  }
  if ($(this).val() == "Product Issue") {
    $(".form_street, .form_suburb, .form_state").removeClass("hide-item");
    $(".form_street label, .form_suburb label, .form_state label").addClass("req");
  }
  if ($(this).val() == "Trade Enquiry") {
    $(".form_street, .form_suburb, .form_state").removeClass("hide-item");
    $(".form_street label, .form_suburb label, .form_state label").removeClass("req");
  }
});


$(".contact-form").submit(function(e){
  e.preventDefault();

  var formSerialize = $(this).serialize();
  var url = $(this).attr('action');

  //clear errors if any
  $('.form-error').each(function(){
    $(this).html('');
    $(this).hide();
  });

  $('#send').attr('disabled','disabled');

  $.ajax({
    type: "POST", // HTTP method POST or GET
    url: url, //Where to make Ajax calls
    dataType:"json", // Data type, HTML, json etc.
    data: formSerialize, //Form variables
    success:function(response){
      $('#send').removeAttr("disabled");
      if (response.success) {
        $('.contact-form').trigger("reset"); //reset the form
        swal("Success", "Thank you for your message, we will get back to you as soon as possible. We have sent a confirmation email to '"+response.email+"'.", "success");
        $(".contact-form .form_name, .contact-form .form_email, .form_postcode, .form_phone, .form_street, .form_suburb, .form_state, .form_message, .form_send, .contact-warning").addClass("hide-item");
      }
      else {
        //console.log(response.error);
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)){
            $('.contact-form .form_' +key+ ' .form-error').show();
            $('.contact-form .form_' +key+ ' .form-error').html(response.error[key]);
          }
        }
      }
    },
    error:function (xhr, ajaxOptions, thrownError){
      $('#send').removeAttr("disabled");
      alert(thrownError);
    }
  });//end ajax

});
