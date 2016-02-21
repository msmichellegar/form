# Validating an HTML Form

## Required fields

To ensure a required field is filled out, use the [< input > required attribute](http://www.w3schools.com/tags/att_input_required.asp). When present, it will ensure that a form cannot be submitted without completing a particular field.

```
<form>
  <label>Username:</label>
  <input type="text" name="first_name" required>
  <input type="submit">
</form>
```
