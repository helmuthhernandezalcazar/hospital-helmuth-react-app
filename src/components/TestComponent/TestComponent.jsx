import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const TestComponent = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/patients/7/measurements")
      .then((response) => response.json())
      .then((data) => setNotes(data._embedded.measurements));
  }, []);
  var nota1 = notes[0];
  return (
    <div>
      <h3>{nota1 && notes.length > 2 && JSON.stringify(notes)}</h3>
    </div>
  );
};

export default TestComponent;
