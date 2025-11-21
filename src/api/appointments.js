import api from "./apiClient";
export async function getAppointmentsForPatient(patientId) {
  return api.request(
    `/appointments?patientId=${encodeURIComponent(patientId)}`
  );
}
