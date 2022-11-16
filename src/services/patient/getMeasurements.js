export default function getMeasurements(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/measurements`)
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.measurements;
    });
}
