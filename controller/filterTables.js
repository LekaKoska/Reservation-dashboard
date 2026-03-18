import { getReservations } from "../model/tables.js";
import { renderReservations } from "../view/renderView.js";
import { freeTableStatus } from "../helpers/freeTableStatus.js";
import { reservedTableStatus } from "../helpers/reservedTableStatus.js";

export const initFilter = () => {
	document.querySelector(".filters").addEventListener("click", (e) => {
		const button = e.target.closest(".filter-btn");
		if (!button) return;

		if (button.dataset.location) {
			const location = String(button.dataset.location);
			renderReservations(
				getReservations().filter((table) => table.location == location),
			);
			return;
		}
		switch (button.dataset.status) {
			case "all":
				renderReservations(getReservations());
				break;
			case "available":
				renderReservations(getReservations().filter(freeTableStatus));
				break;
			case "taken":
				renderReservations(getReservations().filter(reservedTableStatus));
				break;
		}
	});
};
