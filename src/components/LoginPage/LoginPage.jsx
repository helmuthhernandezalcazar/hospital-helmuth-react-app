import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { authenticationService } from "../../services/authentication/authenticationService";
import getEmptyRooms from "../../services/room/getEmptyRooms";
import hospitalicon from "./hospital.png";

const LoginPage = (props) => {
  const { register, handleSubmit } = useForm();
  const [infoMsg, setInfoMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    const authToken = authenticationService.createBasicAuthHeader(
      data.user,
      data.password
    );
    fetch("http://localhost:8080/login", {
      method: "GET",
      headers: {
        Authorization: authToken,
      },
    }).then((response) => {
      console.log(data);
      if (response.status !== 200) setInfoMsg("error");
      if (response.status === 200) {
        setInfoMsg("succesful");
        props.login();
        window.sessionStorage.setItem("token", authToken);
        navigate("/");
      }
    });
  };

  return (
    <Container
      style={{
        width: "600px",
        marginTop: "150px",
      }}
    >
      <Form
        className="form-group shadow p-3 mb-5 bg-body rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 style={{ fontFamily: "Sans-serif", fontWeight: "bold" }}>
          Hospital Alcázar <img src={hospitalicon} width="8%"></img>
        </h2>

        <Form.Group style={{ marginTop: "16px" }}>
          <Form.Label style={{ fontFamily: "Sans-serif" }}>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserte su usuario"
            {...register("user")}
          />
        </Form.Group>
        <Form.Group style={{ marginTop: "16px" }}>
          <Form.Label style={{ fontFamily: "Sans-serif" }}>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserte su contraseña"
            {...register("password")}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: "16px", fontFamily: "Sans-serif" }}
        >
          Iniciar sesión ✓
        </Button>
        {infoMsg === "error" ? (
          <Alert variant="danger" style={{ marginTop: "8px" }}>
            Error de credenciales
          </Alert>
        ) : (
          <></>
        )}
      </Form>
    </Container>
  );
};
export default LoginPage;
