export async function fetchTables() {
	const response = await fetch("http://127.0.0.1:8000/api/tables");

	if (!response.ok) {
		throw new Error("Request failed");
	}
	const data = await response.json();
	return data;
}

export async function register(name, email, password) {
	const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			name,
			email,
			password,
			password_confirmation: password,
		}),
	});
	return response;
}

export const logout = async () => {
	const token = localStorage.getItem("token");

	await fetch("http://127.0.0.1:8000/api/auth/logout", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
	});
	localStorage.removeItem("token");
};
