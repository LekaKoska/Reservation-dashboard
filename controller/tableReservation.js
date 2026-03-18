import { reservation } from "../services/api.js";
import { renderReservations } from "../view/renderView.js";
import { reservations } from "../model/tables.js";

export async function tableReservation(state) {
	const user_id = localStorage.getItem("user_id");
	const guest_number = document.querySelector("#guest_number").value;
	const tableId = state.selectedTable.table_id;
	const response = await reservation(user_id, tableId, guest_number);
	if (response.ok) {
		const data = await response.json();
		alert(data.message || "Succsesfully registration!");
		state.selectedTable.status = "taken";
		renderReservations(reservations);
	} else {
		const error = await response.json();
		alert(error.message || "Error due reservation");
	}
}
