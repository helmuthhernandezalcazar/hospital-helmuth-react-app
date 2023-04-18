import { authenticationService } from "../authentication/authenticationService";

export default function getEmptyRooms() {
  return fetch(`http://localhost:8080/rooms/search/findByPatientNull`, {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.rooms;
    });
}
