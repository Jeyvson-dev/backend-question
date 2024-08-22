import ValidateToken from './validateToken.js';
render();
function render(){

    document.addEventListener("DOMContentLoaded", () => {

        const token_jwt_logged_user = localStorage.getItem('token_jwt_logged_user');
    
        const validateToken = new ValidateToken();
    
        validateToken.validateLoggedUser(token_jwt_logged_user);
    
    });

}
