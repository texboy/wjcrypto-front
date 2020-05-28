<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="shortcut icon" href="media/favicon-update.ico">
    <title>New account</title>
</head>
<body>

<div id="success-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Success !</h2>
        </div>
        <div class="modal-body">
            <button class="go-to-login" id="go-to-login" type="button">Got to Login!</button>
        </div>
        <div class="modal-footer">
            <h3>Modal Footer</h3>
        </div>
    </div>
</div>

<form id="new-user-form" action="" method="post">
    <h1>Sign Up</h1>
    <ul id="form-messages">
    </ul>
    <fieldset>
        <legend><span class="number">1</span> User info</legend>
        <label for="username">Username:</label>
        <input  required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="username" name="user_username">
        <label for="password">Password:</label>
        <input required pattern="\S.*\S" title="No whitespaces allowed" type="password" id="password" name="user_password">
    </fieldset>

    <fieldset>
        <legend><span class="number">2</span> Customer type</legend>
        <label for="type">Type:</label>
        <select name="type" id="customer-type-select">
            <option value="0">-Select a option-</option>
        </select>
    </fieldset>
    <div class="hidden-customer-section" id="customer-info">
        <fieldset>
            <legend><span class="number">3</span> Customer info</legend>
            <label for="name" id="customer-name-label">Name:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="name" name="customer_name">
            <label for="dof" id="customer-dof-label">Date of birth</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="date" name="dof" id="dof">
            <label for="telephone">Telephone</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" name="telephone" id="telephone">
        </fieldset>

        <fieldset>
            <legend><span class="number">4</span> Customer Address</legend>
            <label for="street">Street:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="street" name="street">
            <label for="street">Number:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="number" name="number">
            <label for="neighborhood">Neighborhood:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="neighborhood" name="neighborhood">
            <label for="city">City:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="city" name="city">
            <label for="country">Country:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="country" name="country">
            <label for="country">Zipcode:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="zipcode" name="zipcode">
        </fieldset>

        <fieldset>
            <legend><span class="number">5</span> Customer Documents</legend>
            <label for="doc-1" id="doc-1-label">RG:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="doc-1" name="doc-1">
            <label for="doc-2" id="doc-2-label">CPF:</label>
            <input required pattern="\S.*\S" title="No whitespaces allowed" type="text" id="doc-2" name="doc-2">
        </fieldset>

        <button type="submit" id="submit">Sign Up</button>
    </div>
</form>
<script src="js/new-account.js"></script>
</body>
</html>
