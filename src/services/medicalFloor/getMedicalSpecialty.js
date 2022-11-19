export default function getMedicalSpecialty(medicalFloorId) {
  return fetch(
    `http://localhost:8080/medicalFloors/${medicalFloorId}/medicalSpecialty`
  )
    .then((response) => response.json())
    .then((medicalSpecialty) => {
      return medicalSpecialty;
    });
}
