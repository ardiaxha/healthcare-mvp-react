import React from "react";

function fmtDateTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch (e) {
    return iso;
  }
}

export default function AppointmentList({ appointments, doctorsMap }) {
  if (!appointments) return <div className="muted">Loading appointments…</div>;
  if (appointments.length === 0)
    return <div className="muted">No appointments for this patient.</div>;
  return (
    <div>
      {appointments.map((a) => {
        const doc = doctorsMap[String(a.doctorId)];
        const docName = doc ? doc.name : `Doctor ${a.doctorId}`;
        return (
          <div key={a.id} className="appt">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{docName}</strong>
              </div>
              <div className="muted">{fmtDateTime(a.dateTime)}</div>
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              {a.reason || "—"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
