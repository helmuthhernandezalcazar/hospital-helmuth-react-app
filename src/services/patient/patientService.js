function getAll(params) {
  return fetch("http://localhost:8080/patients?projection=patientProjection", {
    params,
  });
}
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

export const patientService = { getAll, discharge, getMeasurements };
