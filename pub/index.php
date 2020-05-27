<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="shortcut icon" href="media/favicon-update.ico">
    <title>WJcrypto</title>
</head>
<body>

<form id="login-form">
    <div class="login-title-box">
        <h1 class="login-title"> <span class="login-title-red">W</span>Jcrypto</h1>
    </div>
    <ul id="form-messages"></ul>
    <h1>Login</h1>

    <fieldset>
        <label for="username">Username:</label>
        <input type="text" required id="username" name="username">

        <label for="password">Password:</label>
        <input type="password" required id="password" name="password">
        <a href="newaccount.php" >Create new account</a>
    </fieldset>
    <button type="submit" id="submit">Sign Up</button>
</form>
<script src="js/login.js"></script>
</body>
</html>