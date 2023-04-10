function executeAuthentication(username, password) {
  let basicAuthHeader = createBasicAuthHeader(username, password);
  return fetch("http://localhost:8080/patients", {
    headers: {
      authorization: basicAuthHeader,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function createBasicAuthHeader(username, password) {
  var header = "Basic " + window.btoa(username + ":" + password);
  return header;
}

function getSessionToken() {
  return window.sessionStorage.getItem("token");
}

export const authenticationService = {
  createBasicAuthHeader,
  executeAuthentication,
  getSessionToken,
};
