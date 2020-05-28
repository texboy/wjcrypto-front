<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="shortcut icon" href="media/favicon-update.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Home</title>
</head>
<body>
<div id="success-modal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Success !</h2>
        </div>
        <div class="modal-body">
            <button class="go-to-login" id="ok-button" type="button">Ok!</button>
        </div>
        <div class="modal-footer">
            <h3>Modal Footer</h3>
        </div>
    </div>
</div>
<div class="user-info" >
    <div class="login-title-box">
        <h1 class="login-title"> <span class="login-title-red">W</span>Jcrypto</h1>
    </div>
    <h1 id="customer-name">Customer Name</h1>
    <div class="account-content">
        <span class="text-field account-num">Account Nº: <span id="number">1</span></span>
        <span class="text-field account-balance">Total Balance: R$<span id="balance">100</span></span>
    </div>

    <h1 class="text-field account-balance">Customer Info:</h1>
    <div class="account-content">
        <span class="text-field">Address: <span id="address">Rua 1, Nº 1, Bairo, Cidade, Pais, 8888888</span></span>
        <span class="text-field" id="doc-1-label">RG: <span id="doc-1-label">123465489</span></span>
        <span class="text-field" id="doc-2-label">CPF: <span id="doc-2-label">123465432</span></span>
        <span class="text-field" id="dof-label">Date of birth: <span id="dof">07/03/1998</span></span>
    </div>
    <button type="button" id="statement-button">Electronic Statement</button>
    <button type="button" id="transaction-button">Transaction</button>
    <div class = "closed-transaction-form" id="transaction-div">
        <ul id="form-messages"></ul>

        <form id = "transaction-form">
               <label for="type">Type:</label>
               <select name="type" id="transaction-type-select">
                   <option value="0">-Select a option-</option>
                   <option value="1">Deposit</option>
                   <option value="2">Withdraw</option>
                   <option value="3">Transfer</option>
               </select>

           <fieldset id="form-fieldset" style="display: none" >
               <div id="receiver-field" style="display: none">
                   <label for="receiver">Receiver Account Number:</label>
                   <input type="number" id="receiver" name="receiver">
               </div>
               <label for="amount">Amount:</label>
               <input type="number" required id="amount" name="amount">
               <button type="submit" id="submit-transaction">Submit Transaction</button>
           </fieldset>
       </form>
    </div>

</div>
<script src="js/home.js"></script>
</body>
</html>