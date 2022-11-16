export default function getTriage(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/triage`)
    .then((response) => response.json())
    .then((triage) => {
      return triage;
    });
}
