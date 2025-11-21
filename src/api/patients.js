import api from "./apiClient";
export async function getPatients() {
  return api.request("/patients");
}
export async function getPatient(id) {
  return api.request(`/patients/${id}`);
}
