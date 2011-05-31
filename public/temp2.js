// Object Literals
requireRules = {
    requiredValide : {
        error         : false,
        keyword       : "required",
        errorClass    : "error",
        errorMessage  : "This field is mandatory.",
        canValide     : function($element){
            var classes = $element.attr("class").split(" ");
            if(classes.indexOf("required" >= 0)){
                return true;
            }
            return false;
        },
        validate : function($element){
            var value = $element.val();
            if(value === ""){
                this.error = true;
                return this;
            } else {
                return this;
            }
        }
        errorHandler : function($element){
            alert(errorMessage);
        }
    },
    requiredEmail : {
        error         : false,
        keyword       : 'email',
        error_class   : 'error',
        error_message : 'Please privide a valid email',
        reg_expr      : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        canValide     : function($element){
            var classes = $element.attr("class").split(" ");
            if(classes.indexOf(keyword >= 0)){
                return true;
            }
            return false;
        },
        validate      : function($element){
            var value = $element.val();
            if(reg_expr.test(value)){
                // The validation pass
                return this;
            } else {
                this.error = true;
                return this;
            }
        }
    },
    requiredZipcode : {
        error         : false,
        keyword       : 'zipcode',
        error_class   : 'error',
        error_message : 'Please privide a valid zipcode',
        reg_expr      : /^\d{5}$/,
        canValide     : function($element){
            var classes = $element.attr("class").split(" ");
            if(classes.indexOf(keyword >= 0)){
                return true;
            }
            return false;
        },
        validate      : function($element){
            var value = $element.val();
            if(reg_expr.test(value)){
                // The validation pass
                return this;
            } else {
                this.error = true;
                return this;
            }
        }
    }
};
function validators(){
    return [requiredValide, requiredEmail, requiredZipcode];
}
function detectValidator($element){
    $.each(validators(), function(index, validator){
        if(validator.canValide($element)){
            return validator;
        }
    });
}
function detectAndValide($elements){
    $.each($elements, function(index, element){
        var $element = $(element);
        var validator = detectValidator($element);

    });
}
