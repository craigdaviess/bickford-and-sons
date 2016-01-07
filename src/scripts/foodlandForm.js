

$("#foodland-form").submit(function(e){
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
