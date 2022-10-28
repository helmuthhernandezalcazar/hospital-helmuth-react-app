import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const PatientForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    fetch("http://localhost:8080/patients", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <form
      className="form-group shadow p-3 mb-5 bg-body rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row">
        <div className="col">
          <label>
            Nombre
            <input
              type="text"
              className="form-control"
              name="firstName"
              {...register("firstName")}
            />
          </label>
        </div>
        <div className="col">
          <label>
            Apellidos
            <input
              type="text"
              className="form-control"
              name="lastName"
              {...register("lastName")}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>
            DNI
            <input
              type="text"
              className="form-control"
              name="dni"
              {...register("dni")}
            />
          </label>
        </div>
        <div className="col">
          <label>
            Teléfono
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              {...register("phoneNumber")}
            />
          </label>
        </div>
      </div>
      <div className="row">
        <label>
          Síntomas
          <textarea
            type="text"
            className="form-control"
            name="symptoms"
            rows="3"
            {...register("symptoms")}
          />
        </label>
      </div>
      <div className="row">
        <div className="col">
          <label>
            Triaje
            <select
              className="form-control"
              name="triage"
              {...register("triage")}
            >
              <option value="/triages/1">Nivel 1</option>
              <option value="/triages/2">Nivel 2</option>
              <option value="/triages/3">Nivel 3</option>
              <option value="/triages/4">Nivel 4</option>
              <option value="/triages/5">Nivel 5</option>
            </select>
          </label>
        </div>
        <div className="col">
          <input
            type="submit"
            className="btn btn-primary"
            value="Registrar"
            style={{ marginTop: 20 }}
          />
        </div>
      </div>
    </form>
  );
};

export default PatientForm;
