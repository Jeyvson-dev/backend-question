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

        return fetch("http://localhost:3000/question/", requestOptions)
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

}
export default Request;
