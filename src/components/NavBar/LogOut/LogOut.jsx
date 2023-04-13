import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { authenticationService } from "../../../services/authentication/authenticationService";
import logoutIcon from "./logout.png";

const LogOut = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleAccept = () => {
    authenticationService.deleteSessionToken();
    setShowModal(false);
    window.location.reload(false);
  };

  return (
    <>
      <Button
        variant="light"
        style={{ width: "40px" }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <img src={logoutIcon} width="110%" />
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Seguro que quiere cerrar sesión?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ModalLogOut = (props) => {
  const [show, setShow] = useState(props.showModal);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¿Seguro que quiere cerrar sesión?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogOut;