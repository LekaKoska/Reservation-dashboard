export function renderTimeSlots(times, container) {
    container.innerHTML = "";
    times.forEach((time) => {
        const slot = document.createElement("div");
        slot.classList.add("time-slot");
        slot.textContent = time;
        container.appendChild(slot);
    });
}
