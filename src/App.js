import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import MedicalFLoorList from "./components/MedicalFloorList";
import NavBar from "./components/NavBar";
import PatientDetailPage from "./components/PatientDetailPage";
import PatientsPage from "./components/PatientsPage";
import RoomList from "./components/RoomList/RoomList";
import LoginPage from "./components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/plantas",
    element: (
      <>
        <NavBar />
        <MedicalFLoorList />
      </>
    ),
  },
  {
    path: "/plantas/:id/habitaciones",
    element: (
      <>
        <NavBar />
        <RoomList />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <MainPage />
      </>
    ),
  },
  {
    path: "/pacientes",
    element: (
      <>
        <NavBar />
        <PatientsPage />
      </>
    ),
  },
  {
    path: "/paciente/:id",
    element: (
      <>
        <NavBar />
        <PatientDetailPage />
      </>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
