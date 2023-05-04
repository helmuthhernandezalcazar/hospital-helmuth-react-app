import { authenticationService } from "../authentication/authenticationService";

async function findEmployeeByEmailOnToken() {
  const username = authenticationService.getUsernameFromToken();
  return fetch(
    `http://localhost:8080/employees/search/findByEmail?email=${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authenticationService.getSessionToken(),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
}

export const employeeService = { findEmployeeByEmailOnToken };
