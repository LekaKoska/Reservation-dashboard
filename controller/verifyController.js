import { getUser, resendMailVerification } from "../services/api.js";

const verifyBlock = document.querySelector(".verifyBlock");

if (verifyBlock) {
	const verifyBtn = verifyBlock.querySelector("#resendBtn");

	if (verifyBtn) {
		try {
			verifyBtn.addEventListener("click", async (e) => {
				e.preventDefault();
				const response = await resendMailVerification();
				const result = await response.json();
				verifyBtn.disabled = true;
				verifyBtn.innerHTML = result.message;
				return;
			});
		} catch (err) {
			console.error(err);
		}
	}
}

async function checkVerification() {
	try {
		const response = await getUser();

		if (!response.ok) {
			throw new Error("Invalid or expired token");
		}

		const user = await response.json();

		if (user.email_verified_at !== null) {
			window.location.href = "/index.html";
		}
	} catch (err) {
		console.error(err);
	}
}

setInterval(checkVerification, 7000);
