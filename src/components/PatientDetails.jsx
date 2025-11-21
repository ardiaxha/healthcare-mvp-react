import React from "react";
import AppointmentList from "./AppointmentList";

export default function PatientDetails({ patient, appointments, doctorsMap }) {
  if (!patient)
    return <div className="muted">Select a patient to view details.</div>;

  return (
    <div className="panel patient-details">
      <div className="scrollable">
        <h2>{patient.name}</h2>
        <div className="muted">ID: {patient.id}</div>
        <div style={{ marginTop: 8 }}>
          <strong>Age:</strong> {patient.age || "—"} &nbsp;{" "}
          <strong>Gender:</strong> {patient.gender || "—"}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>Medical history</strong>
          <div
            className="muted"
            style={{ marginTop: 6, whiteSpace: "pre-wrap" }}
          >
            {patient.medicalHistory || "No medical history"}
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid rgba(255,255,255,0.03)",
            margin: "12px 0",
          }}
        />

        <h3 style={{ marginTop: 0 }}>Appointments</h3>
        <AppointmentList appointments={appointments} doctorsMap={doctorsMap} />
      </div>
    </div>
  );
}
