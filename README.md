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

Unfortunately this is not a foolproof solution. Different browsers implement this rule very differently. For example Chrome only requires `-@-`, and does not check for a domain extension. One approach is to validate the input against a regular expression. I've done this in JavaScript, like so.

``` JavaScript
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
