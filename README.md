# Validating an HTML Form

## Required fields

To ensure a required field is filled out, use the [`<input>` required attribute](http://www.w3schools.com/tags/att_input_required.asp). When present, it will ensure that a form cannot be submitted without completing a required field.

```
<form>
  <label>First name:</label>
  <input type="text" name="first_name" required>
  <input type="submit">
</form>
```

## Email address

The most simple way to vaildate an email address is with the [`<input>` type attribute](http://www.w3schools.com/html/html_form_input_types.asp). By setting the type attribute of an input field to "email", the browser will automatically check an email address is valid before submitting the form.

``` html
<form>
  <label>Email address:</label>
  <input type="email" name="email">
  <input type="submit">
</form>
```

Unfortunately this is not a foolproof solution. Different browsers implement this rule very differently. For example Chrome only requires `-@-`, and does not check for a domain extension. One approach is to validate the input against a regular expression. I've done this in JavaScript/jQuery using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation), like so.

```js
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
```

## Age

There is no inbuilt method for calculating and validating age in an HTML form. With JavaScript, you will first need a function to calculate the age based on day, month and year inputs. Mine is as follows.

```js
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
```

You will then need to validate the age against your age limit, and adjust the page accordingly. Rather than manipulating the native browser validation messages, I chose to hide the form and display a warning message.

```js

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
```

## Post-script

Whilst client-side validation is great for serving immediate feedback to the user, it is easy to bypass by disabling JavaScript. It should be combined with server-side validation to minimise security risk.
