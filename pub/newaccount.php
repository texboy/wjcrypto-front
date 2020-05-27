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
<form action="" method="post">

    <h1>Sign Up</h1>

    <fieldset>
        <legend><span class="number">1</span> User info</legend>

        <label for="username">Username:</label>
        <input required type="text" id="username" name="user_username">

        <label for="password">Password:</label>
        <input required type="password" id="password" name="user_password">

    </fieldset>

    <fieldset>
        <label for="name">Username:</label>
        <input required type="text" id="name" name="customer_name">

        <label for="password">Password:</label>
        <input required type="password" id="password" name="user_password">
    </fieldset>

    <label for="job">Job Role</label>
    <select id="job" name="user_job">
        <option value="frontend_developer">Front-End Developer</option>
        <option value="php_developer">PHP Developer</option>
        <option value="python_developer">Python Developer</option>
        <option value="rails_developer">Rails Developer</option>
        <option value="web_designer">Web Designer</option>
        <option value="wordpress_developer">Wordpress Developer</option>
    </select>

    <label>Interests</label>
    <input type="checkbox" id="development" value="interest_development" name="user_interest"><label class="light" for="development">Development</label><br>
    <input type="checkbox" id="design" value="interest_design" name="user_interest"><label class="light" for="design">Design</label><br>
    <input type="checkbox" id="business" value="interest_business" name="user_interest"><label class="light" for="business">Business</label>

    <button type="submit">Sign Up</button>

</form>
</body>
</html>