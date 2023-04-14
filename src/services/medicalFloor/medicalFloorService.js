import { authenticationService } from "../authentication/authenticationService";

function getAll() {
  return fetch("http://localhost:8080/medicalFloors", {
    method: "GET",
    headers: {
      Authorization: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.medicalFloors;
    });
}

function getById(id) {
  fetch("http://localhost:8080/medicalFloors/" + id, {
    method: "GET",
    headers: {
      AuthoriZation: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => data);
}

function getMedicalSpecialty(medicalFloorId) {
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

function getRooms(medicalFloorId) {
  return fetch(`http://localhost:8080/medicalFloors/${medicalFloorId}/rooms`, {
    method: "GET",
    headers: {
      AuthoriZation: authenticationService.getSessionToken(),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.rooms;
    });
}

export const medicalFloorService = {
  getAll,
  getById,
  getMedicalSpecialty,
  getRooms,
};
