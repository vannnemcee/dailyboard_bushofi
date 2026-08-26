import {
	simpanCatatanKeStorage,
	muatCatatanDariStorage
} from "./storage.js";

export function buatCatatan(catatan) {
	// ming 8 - filter catatan Cepat (Notes)
	let daftarCatatan = [];

	function tambahCatatan(isi) {
		daftarCatatan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString() });
		simpanCatatanKeStorage(daftarCatatan);
		renderCatatan();
	}

	function renderCatatan() {
		const container = document.getElementById("daftar-catatan");
		container.innerHTML = "";

		daftarCatatan.forEach((catatan) => {
			const div = document.createElement("div");
			div.className = "catatan-item";
			div.innerHTML = `<p>${catatan.isi}</p><small>${catatan.tanggal}</small><br>`;
			container.appendChild(div);

			// tombol hapus catatan
			const tombolhapusCatatan = document.createElement("button");
			tombolhapusCatatan.textContent = "Hapus";
			tombolhapusCatatan.addEventListener("click", () => hapusCatatan(catatan.id));
			div.appendChild(tombolhapusCatatan);

			// tombol edit
			const tombolEditCatatan = document.createElement("button");
			tombolEditCatatan.textContent = "Edit";
			tombolEditCatatan.addEventListener("click", () => {
				const catatanBaru = prompt("Edit catatan", catatan.isi);

				if (catatanBaru === null) {
					return;
				}

				if (validasilnput(catatanBaru)) {
					editCatatan(catatan.id, catatanBaru);
				}
			});
			div.appendChild(tombolEditCatatan);
		});
	}

	// tugas input mingguan 8
	const TomCatatan = document.getElementById("tomcat");
	const inCatatan = document.getElementById("incat");

	TomCatatan.addEventListener("click", () => {
		const catatanIsi = inCatatan.value;

		if (catatanIsi.trim() === "") {
			alert("Input tidak boleh kosong");
			return;
		}

		tambahCatatan(catatanIsi);
		inCatatan.value = "";
	});
	daftarCatatan = muatCatatanDariStorage();
	renderCatatan();

	// edit catatan
	function editCatatan(id, catatanBaru) {
		daftarCatatan = daftarCatatan.map((c) =>
			c.id === id ? { ...c, isi: catatanBaru } : c
		);
		simpanCatatanKeStorage(daftarCatatan);
		renderCatatan();
	}

	// hapus catatan
	function hapusCatatan(catatanId) {
		daftarCatatan = daftarCatatan.filter((c) => c.id !== catatanId);
		simpanCatatanKeStorage(daftarCatatan);
		renderCatatan();
	}
}

export function validasilnput(nilai) {
	if (nilai.trim() === "") {
		alert("Input tidak boleh kosong!");
		return false;
	}
	if (nilai.length > 100) {
		alert("Input maksimal 100 karakter!");
		return false;
	}
	return true;
}
