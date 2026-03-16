import { reservations } from "../model/tables.js";
import { initFilter } from "./filterTables.js";
import { renderReservations } from "../view/renderView.js";
import { handleTableClick } from "./handleTable.js";
import { initTables } from "./tableController.js";
import { logout } from "../services/api.js";

export function initApp() {
	initFilter();
	initTables();
	const reservationBox = document.getElementById("reservationModal");
	const btnCancel = reservationBox.querySelector(".btn-cancel");
	const btnConfirm = reservationBox.querySelector(".btn-confirm");

	const state = {
		selectedTable: null,
		timeSlots: [],
		selectedTime: null,
		reservationBox,
	};

	const reservationGrid = document.getElementById("reservationGrid");
	reservationGrid.addEventListener("click", (e) => handleTableClick(e, state));

	const timesContainer = reservationBox.querySelector(".times");
	timesContainer.addEventListener("click", (e) => {
		if (!e.target.classList.contains("time-slot")) return;

		document
			.querySelectorAll(".time-slot")
			.forEach((slot) => slot.classList.remove("active"));
		e.target.classList.add("active");
		state.selectedTime = e.target.textContent;
	});

	btnConfirm.addEventListener("click", () => {
		if (!state.selectedTable || !state.selectedTime) {
			alert("Select time first");
			return;
		}

		state.selectedTable.timeSlots = state.selectedTable.timeSlots.filter(
			(time) => time !== state.selectedTime,
		);

		if (state.selectedTable.timeSlots.length === 0) {
			state.selectedTable.status = "reserved";
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
