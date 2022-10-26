import React from "react";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";

const PatientsPage = () => {
  return (
    <div className="container-fluid">
      <h1>Pacientes ingresados</h1>
      <PatientForm />
      <PatientTable />
    </div>
  );
};

export default PatientsPage;
