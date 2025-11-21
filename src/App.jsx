import React, { useEffect, useState, useCallback } from "react";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import { getPatients } from "./api/patients";
import { getDoctors } from "./api/doctors";
import { getAppointmentsForPatient } from "./api/appointments";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [doctorsMap, setDoctorsMap] = useState({});
  const [selected, setSelected] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [filter, setFilter] = useState("");

  const loadAll = useCallback(async () => {
    try {
      const [pList, dList] = await Promise.all([getPatients(), getDoctors()]);
      setPatients(pList);
      const map = Object.fromEntries(dList.map((d) => [String(d.id), d]));
      setDoctorsMap(map);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (selected == null) {
      setAppointments(null);
      return;
    }
    setAppointments(null);
    getAppointmentsForPatient(selected)
      .then(setAppointments)
      .catch((err) => {
        console.error(err);
        setAppointments([]);
      });
  }, [selected]);

  const visible = patients.filter((p) =>
    p.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const handleRefresh = useCallback(async () => {
    setFilter("");
    setSelected(null);
    setAppointments(null);
    await loadAll();
  }, [loadAll]);

  return (
    <div className="app">
      <div className="header">
        <h1>Healthcare MVP Patients & Appointments</h1>
      </div>

      <div className="layout">
        <div className="panel">
          <PatientList
            patients={visible}
            selectedId={selected}
            onSelect={setSelected}
            filter={filter}
            onFilterChange={setFilter}
            onRefresh={handleRefresh}
          />
        </div>

        <div className="panel">
          <PatientDetails
            patient={patients.find((p) => String(p.id) === String(selected))}
            appointments={appointments}
            doctorsMap={doctorsMap}
          />
        </div>
      </div>
    </div>
  );
}
