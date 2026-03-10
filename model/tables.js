import { fetchTables } from "../services/api.js";

export async function loadTables() {
	const tables = await fetchTables();
	return tables.data;
}
export const reservations = [];
