import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import MedicalFLoorList from "./components/MedicalFloorList";
import NavBar from "./components/NavBar";
import PatientDetailCard from "./components/PatientDetails";
import PatientsPage from "./components/PatientsPage";
import PatientTable from "./components/PatientsPage/PatientTable";

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
    element: <PatientDetailCard></PatientDetailCard>,
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
