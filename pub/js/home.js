const authCookies = getAuthCookies();
const cookieUser = JSON.parse(authCookies.userJson)[0];
let user = loadUser();

const transactionForm = {
    form: document.getElementById('transaction-form'),
    messages: document.getElementById('form-messages'),
    openFormButton: document.getElementById('transaction-button'),
    transactionTypeSelect: document.getElementById('transaction-type-select'),
    receiver: document.getElementById('receiver'),
    amount: document.getElementById('amount'),
    submit: document.getElementById('submit-transaction')
}

function loadUser() {
    const request = new XMLHttpRequest();
    request.onload = () => {
        let responseObj = null;
        try {
            responseObj = JSON.parse(request.responseText);
        } catch (e) {
            console.error('Could not parse json');
        }

        if (responseObj) {
            if (request.status == 200) {
                user = responseObj;
                addUserInfo();
            }
        }
    };
    let accountNumber = cookieUser.customer.account.account_id;
    request.open('get', 'http://wjcrypto.project.localhost/api/bank/account/' + accountNumber);
    request.setRequestHeader('Authorization', authCookies.authString);
    request.send();
}


function addUserInfo() {
    changeCustomerType();
    document.getElementById('customer-name').innerText = user.customer.name;
    document.getElementById('number').innerText = user.customer.account.account_id;
    document.getElementById('address').innerText = getAddress();
    document.getElementById('balance').innerText = user.customer.account.balance;
}

function getAddress() {
    let address = user.customer.customer_address[0];
    return address.street + ", Nº " + address.number + ", " + address.neighborhood + ", " + address.city + ", " + address.country + ", " + address.zipcode
}

function changeCustomerType() {
   let  customerType = user.customer.customer_type;
   let firstDoc = 'RG: ';
   let secondDoc = 'CPF: ';
   let dateName = 'Date of birth: ';

   if (customerType.customer_type_id == 2) {
       firstDoc = 'CNPJ: ';
       secondDoc = 'IE: ';
       dateName = 'Date of establishment: ';
   }
    document.getElementById('doc-1-label').innerText = firstDoc + user.customer.document[0].document_number;
    document.getElementById('doc-2-label').innerText = secondDoc + user.customer.document[1].document_number;
    document.getElementById('dof-label').innerText = dateName + new Date(user.customer.dof).toLocaleDateString().split(' ')[0];
}

function getAuthCookies() {
    let authString = "";
    let userJson = "";

    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf("authString=") == 0) {
            authString = c.substring("authString=".length, c.length);
        }
        if (c.indexOf("userJson=") == 0) {
            userJson = c.substring("userJson=".length, c.length);
        }
    }
    if (authString == "" || userJson == "") {
        window.location = "index.php"
        return ""
    }
    return {authString: authString, userJson: userJson};
}

transactionForm.openFormButton.addEventListener('click', (event) => {
  toggleForm();
});

function toggleForm() {
    document.getElementById('transaction-div').classList.toggle("closed-transaction-form");
    document.getElementById('transaction-div').classList.toggle("expanded-transaction-form");
    transactionForm.openFormButton.classList.toggle('pressed-button')
}

transactionForm.transactionTypeSelect.addEventListener('change', () => {
    let type = transactionForm.transactionTypeSelect.selectedIndex;
    if (type == 3) {
        document.getElementById('receiver-field').style.display = "block";
        document.getElementById('form-fieldset').style.display = "block";
        transactionForm.receiver.required = true;
    } else if (type == 1 || type == 2) {
        document.getElementById('receiver-field').style.display = "none";
        document.getElementById('form-fieldset').style.display = "block";
        transactionForm.receiver.required = false;
    } else if (type == 0) {
        document.getElementById('receiver-field').style.display = "none";
        document.getElementById('form-fieldset').style.display = "none";
        transactionForm.receiver.required = false;
    }
});

function getRequestBody() {
    return JSON.stringify({
        transaction: {
            sender_account_id: user.customer.account.account_id,
            receiver_account_id: getReceiverAccount(),
            amount: transactionForm.amount.value,
            transaction_type_id: transactionForm.transactionTypeSelect.selectedIndex
        }
    })
}

function getReceiverAccount() {
    if (transactionForm.transactionTypeSelect.selectedIndex == 3) {
        return transactionForm.receiver.value;
    } else {
        return user.customer.account.account_id;
    }
}

transactionForm.submit.addEventListener('click', (event) => {
    transactionForm.form.reportValidity();
    event.preventDefault();
    if (transactionForm.form.checkValidity()) {
        const request = new XMLHttpRequest();
        request.onload = () => {
            let responseObj = null;
            try {
                responseObj = JSON.parse(request.responseText);
            } catch (e) {
                console.error('Could not parse json');
            }
            if (responseObj) {
                if (request.status == 400) {
                    handleMessage(handleMessage(responseObj));
                } else if (request.status == 200) {
                    openSuccessModal();
                }
            }
        };
        let accountNumber = cookieUser.customer.account.account_id;
        request.open('post', 'http://wjcrypto.project.localhost/api/bank/transaction/create/');
        request.setRequestHeader('Authorization', authCookies.authString);
        request.send(getRequestBody());
    }
});

function handleMessage(responseObj) {
    let response = responseObj
    if (0 in response) {
        response = responseObj[0];
    }

    addMessageToForm(response);
}

function addMessageToForm(message) {
    clearMessages();
    const li = document.createElement('li');
    li.textContent = getCorrectErrorText(message.error);
    transactionForm.messages.appendChild(li);
    transactionForm.messages.style.display = "block";
}

function getCorrectErrorText(text) {
    let substring = "Entity Wjcrypto\\Account\\Model\\Account";
    if (text.includes(substring)) {
        return "The specified receiver account doesn't exist";
    } else {
        return text;
    }

}

function clearMessages() {
    while (transactionForm.messages.firstChild) {
        transactionForm.messages.removeChild(transactionForm.messages.firstChild);
        transactionForm.messages.style.display = "none";
    }
}

function openSuccessModal() {
    const modal = document.getElementById("success-modal");
    const button = document.getElementById("ok-button");
    button.onclick = () => {window.location.reload()} ;
    modal.style.display = "block";
}

function clearAuthCookies() {
    document.cookie = "authString=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userJson=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    clearAuthCookies();
    window.location = "index.php";

})