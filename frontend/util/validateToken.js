class ValidateToken {
    validateLoggedUser(token_jwt_logged_user) {

        const completeUrl = window.location.href;
        const url = completeUrl.split(/(https?:\/\/)|(\/+)/).filter(Boolean);
        const constUrltoIndex = url[0] + url[1];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token_jwt_logged_user);

        const requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        fetch("http://localhost:3000/auth/validate-token", requestOptions)
            .then((response) => {

                if (response.ok) {

                } else {

                    window.location.href = constUrltoIndex + '/frontend/admin';

                }
            }).catch((error) => console.error(error));

    }
}

export default ValidateToken;
