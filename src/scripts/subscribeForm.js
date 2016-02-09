$(".sub-form").submit(function(e){

    //prevent regualr submit action
    e.preventDefault();

    //disable button so can't click twice
    $('#subscribe').attr('disabled','disabled');

    //clear errors if any
    $('.form-error').each(function(){
      $(this).html('');
      $(this).hide();
    });


    var formSerialize = $(this).serialize();
    var url = $(this).attr('action');

    $.post(url, formSerialize, function(response){
      //console.log(response);
      //re-enable button
      $('#subscribe').removeAttr("disabled");

      if (response.success) {

        $('.sub-form').trigger('reset'); //reset the form

        swal("Success", response.message, "success");
        ga('send', 'event', 'eNews Subscribe', 'signup'); // let google analytics know
        //$('form').replaceWith('Success!');
      } else {
        //console.log(response.error);
        //loop through errors and display
        for (var key in response.error) {
          if (response.error.hasOwnProperty(key)){
            $('.sub-form .form_' +key+ ' .form-error').html(response.error[key]);
            $('.sub-form .form_' +key+ ' .form-error').show();
          }
        }

    }

   },'JSON');//end post

});
