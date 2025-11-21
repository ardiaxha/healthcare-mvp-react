import React from "react";

export default function PatientList({
  patients,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
  onRefresh,
}) {
  return (
    <div>
      <div className="controls">
        <input
          className="search"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search patients..."
        />
        <button onClick={onRefresh} title="Refresh">
          ⟳
        </button>
      </div>
      <div className="list" role="list">
        {patients.length === 0 && <div className="muted">No patients.</div>}
        {patients.map((p) => (
          <div
            key={p.id}
            role="listitem"
            tabIndex={0}
            className={`item ${
              String(p.id) === String(selectedId) ? "active" : ""
            }`}
            onClick={() => onSelect(p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(p.id);
            }}
          >
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div className="muted">
              {p.age ? p.age + " yrs" : ""} {p.gender ? "· " + p.gender : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
