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
import TestComponent from "./components/TestComponent";

const router = createBrowserRouter([
  {
    path: "/plantas",
    element: <MedicalFLoorList />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/pacientes",
    element: <PatientsPage />,
  },
  {
    path: "/paciente/:id",
    element: <PatientDetailPage />,
  },
  {
    path: "/test",
    element: <TestComponent />,
  },
]);

function App() {
  return (
    <>
      <NavBar></NavBar>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
