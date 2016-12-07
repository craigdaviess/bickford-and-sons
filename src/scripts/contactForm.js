var enquirySelection;
var enquirySet = function(){
  $(".form_enquiry-type, .form_name, .form_email, .form_postcode, .form_phone, .form_message, .contact-warning, .subcheck-container, .form_send").removeClass("hide-item");
  $(".enquiry-message, .pre-enquiry").addClass('hide-item');
  $('.form-error').each(function(){
    $(this).html('');
    $(this).hide();
  });


  if (enquirySelection.hasClass("general-option") || enquirySelection.val() == "General Enquiry") {
    $(".form_street, .form_suburb, .form_state, .form_product, .form_company").addClass("hide-item");
    $("#enquiry-type").val("General Enquiry"); // needed for pre selection
  }
  if (enquirySelection.hasClass("product-option") || enquirySelection.val() == "Product Feedback") {
    $(".form_company").addClass("hide-item");
    $(".form_street, .form_suburb, .form_state, .form_product").removeClass("hide-item");
    $(".form_street label, .form_suburb label, .form_state label").addClass("req");
    $("#enquiry-type").val("Product Feedback");
  }
  if (enquirySelection.hasClass("trade-option") || enquirySelection.val() == "Trade Enquiry") {
    $(".form_product").addClass("hide-item");
    $(".form_street, .form_suburb, .form_state, .form_company").removeClass("hide-item");
    $(".form_street label, .form_suburb label, .form_state label").removeClass("req");
    $("#enquiry-type").val("Trade Enquiry");
  }

};

// when enquiry type gets selected
$(".pre-enquiry-option").on('click', function(){
  enquirySelection = $(this);
  enquirySet();
});
$("#enquiry-type").on('change', function() {
  enquirySelection = $(this);
  enquirySet();
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
        if ($(".form_subcheck").is(":checked")) {
          ga('send', 'event', 'eNews Subscribe', 'signup'); // let google analytics know
        }
        $(".form_enquiry-type, .contact-form .form_name, .contact-form .form_email, .form_product, .form_postcode, .form_phone, .form_company, .form_street, .form_suburb, .form_state, .form_message, .contact-warning, .subcheck-container, .form_send").addClass("hide-item");
        $(".enquiry-message, .pre-enquiry").removeClass('hide-item');
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
