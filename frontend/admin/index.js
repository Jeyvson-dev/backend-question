import Request from '../util/requests.js';

const requestInstance = new Request();

render()
function render(){

    document.addEventListener('DOMContentLoaded', () => {
        const loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', login);
    });

}

function login() {

    const requestOptions = returnRequestOptions()

    requestInstance.postRequestToLogin(requestOptions)
        .then((result) => {

            if (result.access_token) {

                localStorage.setItem('token_jwt_logged_user', result.access_token);
                window.location.href = './questions/';

            } else {

                throw new Error('Unexpected result structure');
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
function returnRequestOptions() {

    let login = document.getElementById('login').value
    let password = document.getElementById('password').value

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "user": login,
        "password": password
    });
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    return requestOptions;
}