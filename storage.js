// ming 7 - menyimpan data tugas ke localhost
export function simpanKeStorage(daftarTugas) {
	localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

export function muatDariStorage() {
	const data = localStorage.getItem("daftarTugas");
	return data ? JSON.parse(data) : [];
}

// sambungan minggu 8 - localstorage catatan
export function simpanCatatanKeStorage(daftarCatatan) {
	localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

export function muatCatatanDariStorage() {
	const data = localStorage.getItem("daftarCatatan");
	return data ? JSON.parse(data) : [];
}

// ming 14 - menyimpan tema ke localstorage
export function simpanTema(modeAktif) {
	localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
}

export function muatTema() {
	return localStorage.getItem("tema");
}
