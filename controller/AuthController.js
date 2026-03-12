// import { login } from "../services/api.js";
import { register } from "../services/api.js";

if (localStorage.getItem("token")) {
	window.location.href = "/index.html";
}

// const loginForm = document.querySelector("#login-form");

// loginForm.addEventListener("submit", async (e) => {
// 	e.preventDefault();
// 	const email = document.querySelector("#email").value;
// 	const password = document.querySelector("#password").value;
// 	const response = await login(email, password);
// 	console.log(response);
// });

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const name = document.querySelector("#name").value;
	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;
	try {
		registerForm.classList.add("loading");
		const response = await register(name, email, password);
		const result = await response.json();

		localStorage.setItem("token", result.token);

		if (!response.ok) {
			document.querySelector(".messsage").innerHTML = result.message;
		}
		if (response.status === 201) {
			document.querySelector(".message").innerHTML = result.message;
			registerForm.classList.remove("loading");
			registerForm.reset();
			window.location.href = "/index.html";
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
});

export function logout() {
	document.querySelector("#logoutBtn").addEventListener("click", () => {
		localStorage.removeItem("token");
		console.log("RADI");
	});
}
