import { reservations } from "../model/tables.js";
import { renderTimeSlots } from "../view/renderTimes.js";

export function handleTableClick(event, state) {
	const isFree = event.target.classList.contains("free");
	const timesContainer = state.reservationBox.querySelector(".times");
	if (isFree) {
		const tableId = event.target.dataset.id;
		state.selectedTable = reservations.find((table) => table.id == tableId);
		state.timeSlots = state.selectedTable.timeSlots;
		renderTimeSlots(state.timeSlots, timesContainer);

		state.reservationBox.classList.remove("modal-hidden");
	}
}
