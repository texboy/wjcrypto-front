const newCustomerForm = {
    form: document.getElementById('new-user-form'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    typeSelect: document.getElementById('customer-type-select'),
    name: document.getElementById('name'),
    dof: document.getElementById('dof'),
    telephone: document.getElementById('telephone'),
    street: document.getElementById('street'),
    number: document.getElementById('number'),
    neighborhood: document.getElementById('neighborhood'),
    city: document.getElementById('city'),
    country: document.getElementById('country'),
    zipcode: document.getElementById('zipcode'),
    doc1: document.getElementById('doc-1'),
    doc2: document.getElementById('doc-2'),
    submit: document.getElementById('submit'),
    messages: document.getElementById('form-messages'),
};



loadCustomerTypeOptions();


function loadCustomerTypeOptions () {
    const request = new XMLHttpRequest();
    request.onload = () => {
        let responseObj = null;
        try {
            responseObj = JSON.parse(request.responseText);
        } catch (e) {
            console.error('Could not parse json');
        }
        if (responseObj) {
            if (request.status === 200) {
                responseObj.forEach(type => {
                    addTypesToSelect(type)
                });
            } else {
                clearMessages();
                responseObj.forEach(error => {
                    addMessageToForm(error.error)
                });
            }
        }
    };
    request.open('get', 'http://wjcrypto.project.localhost/api/customer/types');
    request.send();
}

function addTypesToSelect(type) {

    let option = document.createElement("option");
    let typeText = "individual";
    if (type.value === 'pj') {
        typeText = "legal entity";
    }
    option.value = type.customer_type_id;
    option.text = typeText
    newCustomerForm.typeSelect.add(option);
}

function addMessageToForm(message) {
    const li = document.createElement('li');
    li.textContent = message;
    newCustomerForm.messages.appendChild(li);
    newCustomerForm.messages.style.display = "block";
    window.scrollTo({top: 0, behavior: 'smooth'})
}

function clearMessages() {
    while (newCustomerForm.messages.firstChild) {
        newCustomerForm.messages.removeChild(newCustomerForm.messages.firstChild);
        newCustomerForm.messages.style.display = "none";
    }
}

newCustomerForm.typeSelect.addEventListener('change', () => {
    let optionIndex = newCustomerForm.typeSelect.selectedIndex;
    let type = newCustomerForm.typeSelect.options[optionIndex].value;
    if( type == 1) {
        showIndividualCustomerFields();
    } else if (type == 2) {
        showLegalCustomerFields();
    } else {
        document.getElementById('customer-info').classList.add('hidden-customer-section');
    }
})

function showIndividualCustomerFields() {
    document.getElementById('customer-info').classList.remove('hidden-customer-section');
    document.getElementById('customer-name-label').innerText = 'Name';
    document.getElementById('customer-dof-label').innerText = 'Date of birth';
    document.getElementById('doc-1-label').innerText = 'RG:';
    document.getElementById('doc-2-label').innerText = 'CPF:';
}

function showLegalCustomerFields() {
    document.getElementById('customer-info').classList.remove('hidden-customer-section');
    document.getElementById('customer-name-label').innerText = 'Company name';
    document.getElementById('customer-dof-label').innerText = 'Date of establishment';
    document.getElementById('doc-1-label').innerText = 'CNPJ:';
    document.getElementById('doc-2-label').innerText = 'IE:';
}

newCustomerForm.submit.addEventListener('click', (event)=> {
    newCustomerForm.form.reportValidity();
    event.preventDefault();
    if(newCustomerForm.form.checkValidity()) {
        const request = new XMLHttpRequest();
        request.onload = () => {
            let responseObj = null;
            try {
                responseObj = JSON.parse(request.responseText);
            } catch (e) {
                console.error('Could not parse json');
            }

            if (responseObj) {
                handleReponse(responseObj, request);
            }
        };

        request.open('post', 'http://wjcrypto.project.localhost/api/bank/account/register');
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(getRequestBody()));
    }
});

function handleReponse(response, request) {
    if (request.status == 400) {
        clearMessages();
        response.forEach(error => {
            addMessageToForm(error.error);
        });
    } else {
        openSuccessModal();
    }
}

function getRequestBody() {
    return{
        user: {
            username: newCustomerForm.username.value,
            password: newCustomerForm.password.value,
            customer: {
                name:  newCustomerForm.name.value,
                customer_type_id: getCustomerTypeId(),
                dof: newCustomerForm.dof.value,
                telephone: newCustomerForm.telephone.value,
                customer_address: [
                    {
                        street: newCustomerForm.street.value,
                        number: newCustomerForm.number.value,
                        neighborhood: newCustomerForm.neighborhood.value,
                        city: newCustomerForm.city.value,
                        country: newCustomerForm.country.value,
                        zipcode: newCustomerForm.zipcode.value
                    }
                ],
                documents: getDocuments()
            }
        }
    }
}

function getCustomerTypeId() {
    let optionIndex = newCustomerForm.typeSelect.selectedIndex
    return newCustomerForm.typeSelect.options[optionIndex].value;
}

function getDocuments() {

    let firstType = "1";
    let secondType = "2";

    let optionIndex = newCustomerForm.typeSelect.selectedIndex
    let customerType = newCustomerForm.typeSelect.options[optionIndex].value;

    if(getCustomerTypeId() == 2) {
        firstType = "3";
        secondType = "4";
    }
    return [
        {
            document_number: newCustomerForm.doc1.value,
            document_type_id: firstType
        },
        {
            document_number: newCustomerForm.doc2.value,
            document_type_id: secondType
        }];
}

function openSuccessModal() {
    const modal = document.getElementById("success-modal");
    const button = document.getElementById("go-to-login");
    button.onclick = () => {window.location = "index.php"};
    modal.style.display = "block";
}