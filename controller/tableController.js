import { loadTables } from "../model/tables.js";
import { renderReservations } from "../view/renderView.js";

export async function initTables() {
	try {
		const tables = await loadTables();
		renderReservations(tables);
	} catch (error) {
		console.error("Failed to load tables", error);
	}
}
