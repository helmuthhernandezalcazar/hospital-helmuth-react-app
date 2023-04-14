import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import MedicalFLoorList from "./components/MedicalFloorList";
import NavBar from "./components/NavBar";
import PatientDetailPage from "./components/PatientDetailPage";
import PatientsPage from "./components/PatientsPage";
import RoomList from "./components/RoomList/RoomList";
import LoginPage from "./components/LoginPage";
import { authenticationService } from "./services/authentication/authenticationService";
import { useEffect, useState } from "react";

function App() {
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
          path="/plantas"
          element={
            loggedUser ? (
              <>
                <NavBar />
                <MedicalFLoorList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/plantas/:id/habitaciones"
          element={
            loggedUser ? (
              <>
                <NavBar />
                <RoomList />
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
            loggedUser ? (
              <>
                <NavBar />
                <MainPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
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

export default App;
