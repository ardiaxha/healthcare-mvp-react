import api from "./apiClient";
export async function getDoctors() {
  return api.request("/doctors");
}
