export async function fetchTables() {
	const response = await fetch("http://127.0.0.1:8000/api/tables");

	if (!response.ok) {
		throw new Error("Request failed");
	}
	const data = await response.json();
	return data;
}
