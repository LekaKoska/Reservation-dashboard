export function renderReservations(data) {
	const reservationGrid = document.getElementById("reservationGrid");
	reservationGrid.innerHTML = "";

	data.forEach((table) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.classList.add(table.status);

		card.dataset.id = table.id;
		if (table.status === "taken") {
			card.innerHTML = `${table.table_id}, ${table.location}, ${table.status}`;
		} else {
			card.innerHTML = `${table.table_id}, ${table.location}, ${table.status}`;
		}

		reservationGrid.appendChild(card);
	});
}
