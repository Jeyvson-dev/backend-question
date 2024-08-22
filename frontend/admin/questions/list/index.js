import Request from '../../../util/requests.js';

const requestInstance = new Request();

render()

function render() {

  document.addEventListener('DOMContentLoaded', () => {

    const token_jwt_logged_user = localStorage.getItem('token_jwt_logged_user');
    const requestOptions = returnRequestOptions(token_jwt_logged_user);

    requestInstance.getRequestQuestions(requestOptions)
      .then((result) => {
        
        if (result) {

          console.log(result);

        } else {

          throw new Error('Unexpected result structure');
        }
      })
      .catch((error) => {
        console.error(error);
      });

  });

}

function returnRequestOptions(token_jwt_logged_user) {

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token_jwt_logged_user);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return requestOptions

}