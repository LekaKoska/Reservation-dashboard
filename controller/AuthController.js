import { login, register } from "../services/api.js";

if (localStorage.getItem("token")) {
	window.location.href = "/index.html";
}

const registerForm = document.querySelector("#register-form");
if (registerForm) {
	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const name = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		try {
			registerForm.classList.add("loading");
			const response = await register(name, email, password);
			const result = await response.json();

			const message = document.querySelector(".message");
			if (response.status === 422) {
				message.classList.add("error");
				message.innerHTML = result.message;
				return;
			}
			if (response.status === 201) {
				localStorage.setItem("token", result.token);
				localStorage.setItem("user_name", result.data.name);
				message.classList.add("success");
				message.innerHTML = result.message;
				registerForm.classList.remove("loading");
				registerForm.reset();
				window.location.href = "/index.html";
			}
		} catch (err) {
			console.error(`Error: ${err}`);
		}
	});
}
const loginForm = document.querySelector("#login-form");
if (loginForm) {
	try {
		loginForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			const email = document.querySelector("#email").value;
			const password = document.querySelector("#password").value;
			const response = await login(email, password);
			const result = await response.json();
			console.log(result);

			const message = document.querySelector(".message");
			if (response.status === 422) {
				message.classList.add("error");
				message.innerHTML = result.message;
				return;
			}
		});
	} catch (err) {
		console.error(`Error: ${err}`);
	}
}
