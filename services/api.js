const URL = "http://127.0.0.1:8000/api";

export async function fetchTables() {
	const response = await fetch(`${URL}/tables`);

	if (!response.ok) {
		throw new Error("Request failed");
	}
	const data = await response.json();
	return data;
}

export async function register(name, email, password) {
	const response = await fetch(`${URL}/auth/register`, {
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

	await fetch(`${URL}/auth/logout`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	localStorage.removeItem("token");
	localStorage.removeItem("user_name");
};

export async function login(email, password) {
	const response = await fetch(`${URL}/auth/login`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	return response;
}

export async function getUser() {
	const token = localStorage.getItem("token");
	if (!token) return;

	try {
		const response = await fetch(`${URL}/user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			localStorage.removeItem("token");
			return;
		}
		const user = await response.json();
		if (user.email_verified_at == null) {
			window.location.href = "/verify_mail.html";
			return;
		}

		window.location.href = "/index.html";
	} catch (err) {
		console.error(err);
	}
}

export async function resendMailVerification() {
	const token = localStorage.getItem("token");
	const response = await fetch(`${URL}/email/verification-notification`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	return response;
}
