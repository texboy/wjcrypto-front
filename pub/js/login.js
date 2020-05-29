const form = {
    form: document.getElementById('login-form'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    submit: document.getElementById('submit'),
    messages: document.getElementById('form-messages'),
    link: document.getElementById('new-account'),
};

toggleSubmitButton();
checkAuth();

function checkAuth() {
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
    if (authString != "" || userJson != "") {
        window.location = "home.php"
    }
}



form.submit.addEventListener('click', (event)=> {
    event.preventDefault();
    toggleSubmitButton();
    const request = new XMLHttpRequest();
    request.onload = () => {
        let responseObj = null;
        try {
            responseObj = JSON.parse(request.responseText);
        } catch (e) {
            console.error('Could not parse json');
        }

        if (responseObj) {
            handleReponse(responseObj, request, basicAuth);
        }
    };
    const basicAuth = 'Basic ' + btoa(form.username.value + ":" + form.password.value);
    request.open('get', 'http://wjcrypto.project.localhost/api/auth/user');
    request.setRequestHeader('Authorization',basicAuth);


    if (form.username.value === "" || form.password.value === "") {
        addMessageToForm('Username or Password cannot be empty')
        toggleSubmitButton();
    } else {
        request.send();
    }
});

function handleReponse (responseObj, request, basicAuth) {
    if (request.status === 200) {
        clearMessages();
        addLoaderRing();
        addAuthUserCookie(basicAuth, JSON.stringify(responseObj));
        setTimeout(function () {
            window.location = 'home.php';
        }, 1000);
    }else {
        toggleSubmitButton();
        addMessageToForm(responseObj.error);
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
        form.messages.style.display = "none";
    }
}

function toggleSubmitButton() {
    form.submit.disabled = !form.submit.disabled;
    form.submit.classList.toggle('disabled-button');
}

function addLoaderRing() {
    let loader = document.createElement('i');
    loader.innerHTML = ' <i class="fa fa-spinner fa-spin"></i>'
    form.submit.appendChild(loader);
    form.link.removeAttribute('href');
}

function addAuthUserCookie(authString, userJson) {
    var date = new Date();
    date.setTime(date.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = 'authString' + "=" + authString + ";" + expires + ";path=/";
    document.cookie = 'userJson' + "=" + userJson + ";" + expires + ";path=/";
}
