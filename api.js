// ming 10 - patch api dasar & async/await
export async function ambilKutipan() {
	try {
		const res = await fetch("https://dummyjson.com/quotes/random");
		const data = await res.json();
		document.getElementById("kutipan-harian").textContent = `"${data.quote}" — ${data.author}`;
	} catch (error) {
		console.error("Gagal mengambil kutipan:", error);
		document.getElementById("kutipan-harian").textContent = "Kutipan gagal dimuat.";
	}
}

// ming 11 - widget cuaca dengan api
export async function ambilCuaca(kota) {
	const apiKey = "79d327ba0f48458ec0db4591523ad8d3";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric&lang=id`;

	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error("Kota tidak ditemukan");
		const data = await res.json();

		document.getElementById("info-cuaca").innerHTML = `
		<strong><p>${data.name}: ${data.main.temp}°C</p></strong>
		<p>${data.weather[0].description}</p>
		`;
	} catch (error) {
		document.getElementById("info-cuaca").textContent = error.message;
	}
}

// ming 12 - menggabungkan beberapa sumber data
export async function muatSemuaWidget() {
	document.getElementById("status").textContent = "Memuat data...";

	await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);

	document.getElementById("status").textContent = "Data berhasil dimuat";
}
