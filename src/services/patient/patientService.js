function discharge(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}`, {
    method: "PATCH",
    body: JSON.stringify({
      dischargeDate: new Date(),
      room: null,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
}

function getMeasurements(patientId) {
  return fetch(`http://localhost:8080/patients/${patientId}/measurements`);
}

export const patientService = { discharge, getMeasurements };
