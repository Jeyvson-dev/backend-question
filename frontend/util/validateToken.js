import Request from './requests.js'

class ValidateToken {
    validateLoggedUser(requestOptions) {

        const completeUrl = window.location.href;
        const url = completeUrl.split(/(https?:\/\/)|(\/+)/).filter(Boolean);
        const constUrltoIndex = url[0] + url[1];

        const requestInstance = new Request();

        requestInstance.getRequestValidateToken(requestOptions)
        .then((result) => {
            
            if (result) {

                return true

            } else {

                window.location.href = constUrltoIndex + '/frontend/admin';
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }
}

export default ValidateToken;
