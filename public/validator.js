// Resources
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
// http://docs.jquery.com/Plugins/Authoring
// http://www.cristalab.com/tutoriales/crear-plugins-para-jquery-c251l/
// http://www.designchemical.com/blog/index.php/jquery/jquery-tooltips-create-your-own-tooltip-plugin/
(function($){
    $.fn.validable = function(options) {
        var $this = $(this);
        if($this.hasClass("required")){
            return true;
        } else {
            return false;
        }
    };
    $.fn.isValid = function(options){
        var $this = $(this);
        if(validable($this)){
            var classes = getClasses($this);
            $.each(classes.split(" "), function(index, value) {
                if(validators.hasOwnProperty(value)){
                    validations[value].validate($this);
                }
            });
        } else {
            return undefined;
        }
    };
    var validators = {
        'types'    : ['required', 'email'],
        'required' : {
            errorMessage : 'This field is mandatory',
            showError    : function($element){
                $element.addClass("error");
                $element.before("<label class='error'>" + errorMessage + "</label>");
            },
            validate     : function($element){
                if($element.val() === ""){
                    showError($element);
                    return true;
                } else{
                    return false;
                }
            }
        },
        'email'    : {
            errorMessage : 'Please privide a valid email address',
            regExpresion : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            showError    : function($element){
                $element.addClass("error");
                $element.before("<label class='error'>" + errorMessage + "</label>");
            },
            validate     : function($element){
                if(regExpresion.test($element.val())){
                    return false;
                } else {
                    showError();
                    return true;
                }
            }
        }
    }
})(jQuery);
//
// create closure
//
(function($){
  //
  // plugin definition
  //
  $.fn.hilight = function(options) {
    debug(this);
    // build main options before element iteration
    var opts = $.extend({}, $.fn.hilight.defaults, options);
    // iterate and reformat each matched element
    return this.each(function() {
      $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      // update element styles
      $this.css({
        backgroundColor: o.background,
        color: o.foreground
      });
      var markup = $this.html();
      // call our format function
      markup = $.fn.hilight.format(markup);
      $this.html(markup);
    });
  };
  //
  // private function for debugging
  //
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('hilight selection count: ' + $obj.size());
  };
  //
  // define and expose our format function
  //
  $.fn.hilight.format = function(txt) {
    return '<strong>' + txt + '</strong>';
  };
  //
  // plugin defaults
  //
  $.fn.hilight.defaults = {
    foreground: 'red',
    background: 'yellow'
  };
//
// end of closure
//
})(jQuery);

$(document).ready(function(){
  $('input#submit').click(function(){
    var $form = $(this).closest("form");
    var $elements_to_valide = $form.children(".required");
    validate($elements_to_valide);
    return false;
  });
  $("p").hilight();
});
