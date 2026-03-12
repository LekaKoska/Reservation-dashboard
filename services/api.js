export async function fetchTables() {
	const response = await fetch("http://127.0.0.1:8000/api/tables");

	if (!response.ok) {
		throw new Error("Request failed");
	}
	const data = await response.json();
	return data;
}

// export async function login(email, password) {
// 	const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Accept: "application/json",
// 		},
// 		body: JSON.stringify({ email, password }),
// 	});
// 	console.log(response);
// 	return response;
// }

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
