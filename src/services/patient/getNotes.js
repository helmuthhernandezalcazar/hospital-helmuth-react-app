export default function getNotes(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/notes`)
    .then((response) => response.json())
    .then((data) => {
      return data._embedded.notes;
    });
}
