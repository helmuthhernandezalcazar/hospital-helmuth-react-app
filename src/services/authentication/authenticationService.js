function executeAuthentication(username, password) {
  let basicAuthHeader = createBasicAuthHeader(username, password);
  return fetch("http://localhost:8080/login", {
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
  return sessionStorage.getItem("token");
}

function deleteSessionToken() {
  sessionStorage.removeItem("token");
}

function getUsernameFromToken() {
  const decodedCredentials = window.atob(getSessionToken().slice(6));
  const username = decodedCredentials.split(":")[0];
  return username;
}

export const authenticationService = {
  createBasicAuthHeader,
  executeAuthentication,
  getSessionToken,
  deleteSessionToken,
  getUsernameFromToken,
};
