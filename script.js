$(document).ready(function(){
    validateEmail();
    validateAge();

    $("#back-button").click(function() {
        $("#age-message").fadeOut(function() {
            $("form").fadeIn();
        })
    });
});

function validateEmail() {
    var email;
    var validation = new RegExp(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);
    var validationMessage = "Please enter a valid email address";


    $("input[type=email]").change( function(){
        email = this.value

        if (validation.test(email) === false){

            this.setCustomValidity(validationMessage);
            return false;
        } else {

            this.setCustomValidity('');
        }
    });
}

function getAge() {
    var birthDate = new Date($("#month").val() + " " + $("#day").val() + ", " + $("#year").val());
    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth();
    var birthDay = birthDate.getDate();

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();

    var age = currentYear - birthYear;

    if (currentMonth < birthMonth - 1) {
        age--;
    }

    if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
        age--;
    }

    return age;
}

function validateAge() {
    var age;

    $("form").submit(function(event) {
        age =  getAge();

        if (age < 15) {
            event.preventDefault();
            $("form").fadeOut(function() {
                $("#age-message").fadeIn();
            });
        }

    });

}
