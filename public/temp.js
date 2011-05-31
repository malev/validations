function checkBoxGroupConditionals(object){
    var id = $(object).attr("id");
    var my_son = ".my_father_is_" + id;
    // hide all sons
    if($(my_son).length != 0) {
        $(my_son).hide();
    }
    var sons = $("#" + id +" :checked");
    for(i=0; i< sons.length; i++){
        var result = $(sons[i]).val();
        $("." + result).fadeIn("fast");
    }
    return false;
}
function pullDownMenuConditionals(object){
    var result = $(object).val();
    var id = $(object).attr("id");
    var my_son = ".my_father_is_" + id;

    // hide all sons
    if($(my_son).length != 0) {
        $(my_son).hide();
    }
    // if there is a son for this value, then make it visible
    if ($("." + result) != 0){
      $("." + result).fadeIn("fast");
    }
    return false;
}
function radioButtonConditionals(object){
    var result = $(object).val();
    var id = $(object).attr("id");
    var my_son = ".my_father_is_" + id;
    // hide all sons
    if($(my_son).length != 0) {
        $(my_son).hide();
    }
    // if there is a son for this value, then make it visible
    if ($("." + result) != 0){
      $("." + result).fadeIn("fast");
    }
    return false;
}

function validateEmail(elementValue){
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(elementValue)){ return "EMAIL_ERROR"; }
  return "";
}
function validatePhoneNumber(elementValue){
  //  (555) 555-1234
  //var phonePattern = /^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/;
  if ( elementValue.length < 10 || elementValue.length > 15 ) { return "PHONE_ERROR"; }
  return "";
}
function validateZipCode(elementValue){
  var zipPattern = /^\d{5}$/;
  if (!zipPattern.test(elementValue)) { return "ZIP_ERROR"; }
  return "";
}
function validateNotEmpty(elementValue){
  if (!elementValue.length) { return "REQUIRED_ERROR"; }
  return "";
}
function validateRequiredRadioGroup(element){
  var radio_inputs = element.children('input');
  for (var i=0; i < radio_inputs.length; i++){
    if (radio_inputs[i].checked){
      return "";
    }
  }
  return "RADIOGROUP_ERROR";
}
function validateCheckboxGroup(element){
  var check_boxes = element.children('input');
  for(var i=0; i < check_boxes.length; i++ ){
    if(check_boxes[i].checked){
      return "";
    }
  }
  return "CHECKBOXGROUP_ERROR";
}
function detectValidation(element){
  var typeOfValidation = $(element).attr('id');
  var innerData = $(element).val();
  switch(typeOfValidation) {
  case 'email':
    return validateEmail(innerData);
  case 'phone':
    return validatePhoneNumber(innerData);
  case 'zip':
    return validateZipCode(innerData);
  case 'radiogroup':
    return validateRequiredRadioGroup(element);
  case 'checkboxgroup':
    return validateCheckboxGroup(element);
  default:
    return validateNotEmpty(innerData);
  }
}
function resetValidations(){
  $(".required").removeClass('fail');
  $(".required_fields").fadeOut('fast');
}
$(document).ready(function(){
  // Scroll up once the document is loaded
  //$(window).load(function(){
    //$('#contentbig').scrollTo(0,0);
    //window.scrollTo(0,0);
	//$j('html, body').animate({scrollTop:0}, 'slow');
  //})
  // Sponsors slide show
  var step = 110;
  var sponsors_per_box = 7;
  var sponsors_length = $('.single_sponsor').length;
  // If there are 7 or less sponsors, then disable both arrows
  var min_x = (sponsors_length - sponsors_per_box) * -step;
  var max_x = 0;
  if (sponsors_length <= sponsors_per_box){
    $('a.left_arrow').addClass('disabled');
    $('a.right_arrow').addClass('disabled');
  }
  $('a.right_arrow').click(function(){
    // If disabled then nothing...
    if ($(this).hasClass('disabled')){
      return false;
    } else {
      // if enabled
      var current_x = parseInt($('div#sponsors_list').css('margin-left'));
      var new_x = current_x - step;
      $('div#sponsors_list').css('margin-left', new_x + 'px');
      // If gets to the bound and disabled the link
      if (new_x <= min_x) $('a.right_arrow').addClass('disabled');
      // Enable oposit arrow
      $('a.left_arrow').removeClass('disabled');
    }
    return false;
  });
  $('a.left_arrow').click(function(){
    // If disabled then nothing
    if ($('a.right_arrow').hasClass('dissabled')){
      return false;
    } else {
      var current_x = parseInt($('div#sponsors_list').css('margin-left'));
      var new_x = current_x + step;
      $('div#sponsors_list').css('margin-left', new_x + 'px');
      if (new_x == max_x) $('a.left_arrow').addClass('disabled');
      $('a.right_arrow').removeClass('disabled');
    }
    return false;
  });
  $('input#send').click(function(){
    resetValidations();
    var messages = "";
    var errors = [];
    var email_error = 0;
    var phone_error = 0;
    var zip_error = 0;
    var radiogroup_error = 0;
    var checkboxgroup_error = 0;
    var required_error = 0;
    $('.required').each(function(index){
      if ( errors[errors.length] = detectValidation($(this)) ) { $(this).addClass('fail'); }
    });
    for ( var i=0; i < errors.length; i++ ){
      switch(errors[i]){
        case "EMAIL_ERROR":
          if (!email_error){
            email_error = 1;
            messages += "The email is invalid.<br/>";
          }
          break
        case "PHONE_ERROR":
          if (!phone_error){
            phone_error = 1;
            messages += "The phone number is invalid.<br/>";
          }
          break;
        case "ZIP_ERROR":
          if (!zip_error){
            zip_error = 1;
            messages += "The zip code is invalid.<br/>";
          }
          break;
        case "RADIOGROUP_ERROR":
          if (!radiogroup_error){
            radiogroup_error = 1;
            messages += "You have to choose at least one option<br/>";
          }
          break;
        case "CHECKBOXGROUP_ERROR":
          if(!checkboxgroup_error){
            checkboxgroup_error = 1;
            messages += "You have to choose at least one option<br/>";
          }
          break;
        case "REQUIRED_ERROR":
          if (!required_error){
            required_error = 1;
            messages += "All fields are mandatory.<br/>";
          }
          break;
      }
    }
    if (messages){
      $('.required_fields').html(messages);
      $('.required_fields').fadeIn('slow');
      return false;
    }
    return true;
  });
  $(".father input:checkbox").change(function(){
    checkBoxGroupConditionals(this);
  })
  $(".father input:radio").change(function(){
    radioButtonConditionals(this);
  })
  $("select.father").change(function() {
    pullDownMenuConditionals(this);
  });
  /* Asterix remover for the labels */
  var $labels = $("label");
  for(var i=0; i < $labels.length; i++){
    var content = $labels[i].innerHTML;
    if(/.+\*$/.test(content)){
      $labels[i].innerHTML = content.slice(0, content.length - 1);
    }
  }
  alert("todos putos");
});
