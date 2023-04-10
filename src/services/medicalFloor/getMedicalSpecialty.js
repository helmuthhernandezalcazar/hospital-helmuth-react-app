import { authenticationService } from "../authentication/authenticationService";

export default function getMedicalSpecialty(medicalFloorId) {
  return fetch(
    `http://localhost:8080/medicalFloors/${medicalFloorId}/medicalSpecialty`,
    {
      method: "GET",
      headers: {
        AuthoriZation: authenticationService.getSessionToken(),
      },
    }
  )
    .then((response) => response.json())
    .then((medicalSpecialty) => {
      return medicalSpecialty;
    });
}
