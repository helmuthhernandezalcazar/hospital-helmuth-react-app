import { authenticationService } from "../authentication/authenticationService";

export default function getRooms(medicalFloorId) {
  return fetch(`http://localhost:8080/medicalFloors/${medicalFloorId}/rooms`, {
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
