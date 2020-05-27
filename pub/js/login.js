const form = {
    form: document.getElementById('login-form'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    submit: document.getElementById('submit'),
    messages: document.getElementById('form-messages'),
};

form.submit.addEventListener('click', (event)=> {
    event.preventDefault();

    const request = new XMLHttpRequest();
    request.onload = () => {
        let responseOjb = null;
        try {
            responseOjb = JSON.parse(request.responseText);
        } catch (e) {
            console.error('Could not parse json');
        }

        if (responseOjb) {
            handleReponse(responseOjb);
        }
    };
    const basicAuth = 'Basic ' + btoa(form.username.value + ":" + form.password.value);
    request.open('get', 'http://wjcrypto.project.localhost/api/auth/user');
    request.setRequestHeader('Authorization',basicAuth);


    if (form.username.value === "" || form.password.value === "") {
        addMessageToForm('Username or Password cannot be empty')
    } else {
        console.log(form.username.value === "");
        request.send();
    }
});

function handleReponse (responseOjb) {
    if (responseOjb.code == 401 ) {
        addMessageToForm(responseOjb.error);
    }
}
function addMessageToForm(message) {
    clearMessages();
    const li = document.createElement('li');
    li.textContent = message;
    form.messages.appendChild(li);
    form.messages.style.display = "block";
}

function clearMessages() {
    while (form.messages.firstChild) {
        form.messages.removeChild(form.messages.firstChild);
        form.messages.style.display = "node";
    }
}