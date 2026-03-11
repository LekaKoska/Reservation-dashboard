import { fetchTables } from "../services/api.js";

export let reservations = [];

export async function loadTables() {
	const response = await fetchTables();
	reservations = response.data;
	return reservations;
}

export function getReservations() {
	return reservations;
}
