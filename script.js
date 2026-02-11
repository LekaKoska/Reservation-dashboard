let activeFilters = {
	status: "all",
	capacity: null,
};

const reservations = [
	{
		id: 1,
		name: "Table 1",
		capacity: 4,
		status: "free",
		timeSlots: ["18:00", "19:00", "20:00"],
	},
	{
		id: 2,
		name: "Table 2",
		capacity: 6,
		status: "reserved",
		timeSlots: ["19:30", "21:20", "22:00"],
	},
	{
		id: 3,
		name: "Table 3",
		capacity: 2,
		status: "selected",
		timeSlots: ["18:00", "19:30", "21:00"],
	},
	{
		id: 4,
		name: "Table 4",
		capacity: 3,
		status: "free",
		timeSlots: ["15:00", "16:45", "18:50"],
	},
];

document.querySelector(".filters").addEventListener("click", (e) => {
	const button = e.target.closest(".filter-btn");
	if (!button) return;

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

function reservedTableStatus(table) {
	return table.status === "reserved";
}
function freeTableStatus(table) {
	return table.status === "free";
}

function renderReservations(data) {
	const reservationGrid = document.getElementById("reservationGrid");
	reservationGrid.innerHTML = "";

	data.forEach((table) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.classList.add(table.status);

		card.dataset.id = table.id;
		if (table.status === "reserved") {
			card.innerHTML = `${table.name}, ${table.capacity}, ${table.status}`;
		} else {
			card.innerHTML = `${table.name}, ${table.capacity}, ${table.timeSlots.join(", ")}, ${table.status}`;
		}

		reservationGrid.appendChild(card);
	});
}
let selectedTable = null;

const reservationBox = document.getElementById("reservationModal");
const btnCancel = reservationBox.querySelector(".btn-cancel");
const btnConfirm = reservationBox.querySelector(".btn-confirm");

let timeSlots = [];
let selectedTime = null;
reservationGrid.addEventListener("click", (event) => {
	const isFree = event.target.classList.contains("free");
	const timesContainer = reservationBox.querySelector(".times");
	timesContainer.innerHTML = "";
	if (isFree) {
		const tableId = event.target.dataset.id;
		selectedTable = reservations.find((table) => table.id == tableId);
		timeSlots = selectedTable.timeSlots;
		timeSlots.forEach((time) => {
			const slot = document.createElement("div");
			slot.classList.add("time-slot");
			slot.textContent = time;
			timesContainer.appendChild(slot);
		});

		reservationBox.classList.remove("modal-hidden");
	}
});

const timesContainer = reservationBox.querySelector(".times");

timesContainer.addEventListener("click", (e) => {
	if (!e.target.classList.contains("time-slot")) return;

	document
		.querySelectorAll(".time-slot")
		.forEach((slot) => slot.classList.remove("active"));

	e.target.classList.add("active");

	selectedTime = e.target.textContent;
});

btnConfirm.addEventListener("click", () => {
	if (!selectedTable || !selectedTime) {
		alert("Select time first");
		return;
	}

	selectedTable.timeSlots = selectedTable.timeSlots.filter(
		(time) => time !== selectedTime,
	);

	if (selectedTable.timeSlots.length === 0) {
		selectedTable.status = "reserved";
	}

	selectedTable = null;
	selectedTime = null;

	reservationBox.classList.add("modal-hidden");

	renderReservations(reservations);
});

btnCancel.addEventListener("click", () => {
	selectedTable = null;
	reservationBox.classList.add("modal-hidden");
});
