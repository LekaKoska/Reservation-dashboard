import { reservations } from "../model/tables.js";
import { initFilter } from "./filterTables.js";
import { renderReservations } from "../view/renderView.js";
import { handleTableClick } from "./handleTable.js";
import { initTables } from "./tableController.js";
import { logout } from "../services/api.js";
import { tableReservation } from "./tableReservation.js";

export function initApp() {
	initFilter();
	initTables();
	const reservationBox = document.getElementById("reservationModal");
	const btnCancel = reservationBox.querySelector(".btn-cancel");
	const btnConfirm = reservationBox.querySelector(".btn-confirm");
	const preOrder = document.querySelector(".reservation");

	const state = {
		selectedTable: null,
		reservationBox,
		preOrder,
		ignoreDocumentClick: false,
	};

	const closePreOrder = () => {
		state.selectedTable = null;
		document.querySelector("#reservation-form").reset();
		preOrder.classList.add("modal-hidden");
	};
	document.addEventListener("click", (e) => {
		if (state.ignoreDocumentClick) return;
		if (preOrder.classList.contains("modal-hidden")) return;
		if (preOrder.contains(e.target)) return;
		if (e.target.closest("#reservationGrid")) return;

		closePreOrder();
	});

	const reservationGrid = document.getElementById("reservationGrid");
	reservationGrid.addEventListener("click", (e) => handleTableClick(e, state));

	btnConfirm.addEventListener("click", () => {
		if (!state.selectedTable || !state.selectedTime) {
			console.log("REZERVISAN");
		}

		state.selectedTable = null;
		state.selectedTime = null;

		reservationBox.classList.add("modal-hidden");

		renderReservations(reservations);
	});

	btnCancel.addEventListener("click", () => {
		state.selectedTable = null;
		reservationBox.classList.add("modal-hidden");
	});

	const logoutBtn = document.querySelector("#logoutBtn");
	logoutBtn.addEventListener("click", async (e) => {
		e.preventDefault();
		await logout();
		window.location.href = "/login.html";
	});
	const name = localStorage.getItem("user_name");
	const firstName = name.trim().split(" ")[0];
	const cleanName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	document.querySelector(".helloMsg").textContent = `Hello, ${cleanName}`;

	renderReservations(reservations);
}
