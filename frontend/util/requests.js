class Request {

    postRequestToLogin(requestOptions) {

        return fetch("http://localhost:3000/auth/login", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((errorData) => {
                        throw new Error(`Error: ${errorData.message}`);
                    });
                }
            });
    }

    getRequestQuestions(requestOptions) {

        return fetch("http://localhost:3000/question/get-all-question-with-alternatives", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((errorData) => {
                        throw new Error(`Error: ${errorData.message}`);
                    });
                }
            });
    }

    getRequestValidateToken(requestOptions){

        return fetch("http://localhost:3000/auth/validate-token", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            });

    }

}
export default Request;
