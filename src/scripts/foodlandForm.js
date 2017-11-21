

$("#foodland-form").submit(function(e){
  e.preventDefault();

  var url = $(this).attr('action');

  var formSerialize = new FormData(this);
  var image = $('#image_uploads')[0].files[0];

  if (image.size > (10 * 1024 * 1024)) {
    $('#foodland-form .form_reciept .form-error').show();
    $('#foodland-form .form_reciept .form-error').html('File size too big. Limit of 10MB.');
    return;
  }

  formSerialize.append('image_uploads', image);

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
    processData: false,
    contentType: false,
    success:function(response){
      $('#send').removeAttr("disabled");
      if (response.success) {
        //console.log(response);
        $('#foodland-form').trigger("reset"); //reset the form
        swal("Success", "Thank you for your entry", "success");
      }
      else {
        //console.log(response.error);
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)){
            $('#foodland-form .form_' +key+ ' .form-error').show();
            $('#foodland-form .form_' +key+ ' .form-error').html(response.error[key]);
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
