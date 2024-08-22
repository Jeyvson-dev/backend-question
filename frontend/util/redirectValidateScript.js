import ValidateToken from './validateToken.js';
render();
function render(){

    document.addEventListener("DOMContentLoaded", () => {

        const token_jwt_logged_user = localStorage.getItem('token_jwt_logged_user');
    
        const requestOptions = returnRequestOptions(token_jwt_logged_user);
        
        const validateToken = new ValidateToken();
    
        validateToken.validateLoggedUser(requestOptions);
    
    });
}
function returnRequestOptions(token_jwt_logged_user){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token_jwt_logged_user);

    const requestOptions = {
        method: "GET",
        headers: myHeaders
    };

    return requestOptions;
}
