import { reservations } from "../model/tables.js";
import { renderReservations } from "../view/renderView.js";
import { freeTableStatus } from "../helpers/freeTableStatus.js";
import { reservedTableStatus } from "../helpers/reservedTableStatus.js";

export const initFilter = () => {
	document.querySelector(".filters").addEventListener("click", (e) => {
		const button = e.target.closest(".filter-btn");
		if (!button) return;

		// capacity buttons have a data-capacity attribute
		if (button.dataset.capacity) {
			const capacity = parseInt(button.dataset.capacity, 10);
			renderReservations(
				reservations.filter((table) => table.capacity >= capacity),
			);
			return;
		}

		// status buttons use data-status
		switch (button.dataset.status) {
			case "all":
				renderReservations(reservations);
				break;
			case "free":
				renderReservations(reservations.filter(freeTableStatus));
				break;
			case "reserved":
				renderReservations(reservations.filter(reservedTableStatus));
				break;
		}
	});
};
