export default function discharge(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}`, {
    method: "PATCH",
    body: JSON.stringify({
      dischargeDate: new Date(),
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
