import { reservations } from "../model/tables.js";
import { tableReservation } from "./tableReservation.js";

export function handleTableClick(event, state) {
	const isFree = event.target.classList.contains("available");
	if (isFree) {
		const tableId = event.target.dataset.id;
		state.selectedTable = reservations.find(
			(table) => table.table_id == tableId,
		);

		state.preOrder.classList.remove("modal-hidden");
		document
			.querySelector("#reservation-form")
			.addEventListener("submit", async (e) => {
				e.preventDefault();
				await tableReservation(state);
				state.preOrder.classList.add("modal-hidden");
				state.selectedTable = null;
			});
	}
}
