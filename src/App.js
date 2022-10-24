import { useEffect, useState } from "react";
import MedicalFloorCard from "./components/MedicalFloorCard";
import MedicalFLoorList from "./components/MedicalFloorList";
import NavBar from "./components/NavBar";

function App() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/patients")
      .then((response) => response.json())
      .then((data) => setPatients(data._embedded.patients));
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <MedicalFLoorList />
      <ul>
        {patients.map((patient, index) => {
          console.log(patient);
          return (
            <li key={index}>
              {patient.firstName} <a href={patient._links.room.href}>Room</a>
            </li>
          );
        })}
        <li>adasd</li>
      </ul>
    </>
  );
}

export default App;
