import React, { useRef } from "react";

const PatientForm = () => {
  const firstName = useRef(null);
  const lastName = useRef(null);

  const handleSubmit = () => {
    const postData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
    };
    console.log(JSON.stringify(postData, null, 2));
    fetch("http://localhost:8080/patients", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  return (
    <div className="form-group shadow p-3 mb-5 bg-body rounded">
      <label>
        Nombre <input type="text" className="form-control" ref={firstName} />
      </label>
      <label>
        Apellidos <input type="text" className="form-control" ref={lastName} />
      </label>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Registrar
      </button>
    </div>
  );
};

export default PatientForm;
