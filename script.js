var validation = new RegExp(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);
var validationMessage = "Please enter a valid email address";

$(document).ready(function(){

    $("input[type=email]").change( function(){
        var email = this.value

        if (validation.test(email) === false){

            this.setCustomValidity(validationMessage);
            return false;
        } else {

            this.setCustomValidity('');
        }
    });
});
