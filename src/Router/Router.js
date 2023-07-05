import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MainPage from "../components/MainPage";
import NavBar from "../components/NavBar";
import PatientDetailPage from "../components/PatientDetailPage";
import PatientsPage from "../components/PatientsPage";
import MedicalFloorPage from "../components/MedicalFloorPage/RoomList";
import LoginPage from "../components/LoginPage";
import { authenticationService } from "../services/authentication/authenticationService";
import { useEffect, useState } from "react";

function Router() {
  const [loggedUser, setLoggedUser] = useState(
    authenticationService.getSessionToken() !== null
  );

  useEffect(() => {
    console.log(authenticationService.getSessionToken());
    console.log(loggedUser);
  }, [loggedUser]);

  const login = () => setLoggedUser(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/plantas/:id/habitaciones"
          element={
            loggedUser ? (
              <>
                <NavBar />
                <MedicalFloorPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/pacientes"
          element={
            loggedUser ? (
              <>
                <NavBar />
                <PatientsPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/paciente/:id"
          element={
            loggedUser ? (
              <>
                <NavBar />
                <PatientDetailPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <MainPage loggedUser={loggedUser} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/login"
          element={
            loggedUser ? <Navigate to="/" /> : <LoginPage login={login} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
