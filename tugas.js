import { simpanKeStorage, muatDariStorage } from "./storage.js";

export function buatTugas(tugas, validasilnput) {
	// mingguan tugas ke 3
	// Event pada input
	const input = document.createElement("input");
	input.placeholder = "Masukkan Tugas";
	input.className = "input-tugas";
	tugas.appendChild(input);

	// tombol tambah tugas
	const tombol = document.createElement("button");
	tombol.textContent = "Tambah";
	tugas.appendChild(tombol);

	tombol.addEventListener("click", () => {
		if (validasilnput(input.value)) {
			tambahTugas(input.value);
			input.value = "";
			alert("Tugas berhasil ditambahkan!");
		}
	});

	// input pencarian minggu 14
	const inputCari = document.createElement("input");
	inputCari.id = "cari-tugas";
	inputCari.placeholder = "Cari tugas";
	tugas.appendChild(inputCari);

	// button semua, selesai, belum
	const tmblSemua = document.createElement("button");
	tmblSemua.textContent = "Semua";
	tmblSemua.className = "tmbl-semua";
	tmblSemua.addEventListener("click", () => renderTugas("semua"));
	tugas.appendChild(tmblSemua);

	const tmblSelesai = document.createElement("button");
	tmblSelesai.textContent = "Selesai";
	tmblSelesai.className = "tmbl-selesai";
	tmblSelesai.addEventListener("click", () => renderTugas("selesai"));
	tugas.appendChild(tmblSelesai);

	const tmblBelum = document.createElement("button");
	tmblBelum.textContent = "Belum";
	tmblBelum.className = "tmbl-belum";
	tmblBelum.addEventListener("click", () => renderTugas("belum"));
	tugas.appendChild(tmblBelum);

	// tugas mingguan ke 4
	const li = document.createElement("ul");
	li.id = "daftar-tugas";
	tugas.appendChild(li);

	// ming 4 - Menampilkan Daftar Tugas
	let daftarTugas = [
		{ id: 1, nama: "Belajar JavaScript", selesai: false },
		{ id: 2, nama: "Olahraga pagi", selesai: false },
	];

	function renderTugas() {
		const list = document.getElementById("daftar-tugas");
		list.innerHTML = "";

		daftarTugas.forEach((tugas) => {
			const li = document.createElement("li");
			li.textContent = tugas.nama;
			list.appendChild(li);
		});
	}
	renderTugas();

	// ming 5 - Tambah & Hapus Tugas
	let nextId = 3;

	function tambahTugas(nama) {
		daftarTugas.push({ id: nextId++, nama, selesai: false });
		renderTugas();
	}

	function hapusTugas(id) {
		daftarTugas = daftarTugas.filter((t) => t.id !== id);
		renderTugas();
	}

	function renderTugas() {
		const list = document.getElementById("daftar-tugas");
		list.innerHTML = "";

		daftarTugas.forEach((tugas) => {
			const li = document.createElement("li");
			li.textContent = tugas.nama;
		});
	}

	// ming 6 - tandai selesai & filter tugas
	function toggleSelesai(id) {
		daftarTugas = daftarTugas.map((t) =>
			t.id === id ? { ...t, selesai: !t.selesai } : t
		);
		simpanKeStorage(daftarTugas);
		renderTugas();
	}

	// Filter tugas
	function renderTugas(filter = "semua") {
		const list = document.getElementById("daftar-tugas");
		list.innerHTML = "";

		const tugasTersaring = daftarTugas.filter((t) => {
			if (filter === "selesai") return t.selesai;
			if (filter === "belum") return !t.selesai;
			return true;
		});

		tugasTersaring.forEach((tugas) => {
			const li = document.createElement("li");
			li.className = "tugas-item";
			li.dataset.id = tugas.id;

			const namaTugas = document.createElement("span");
			namaTugas.textContent = tugas.nama;
			namaTugas.style.textDecoration = tugas.selesai ? "line-through" : "none";
			li.appendChild(namaTugas);
			li.addEventListener("click", () => toggleSelesai(tugas.id));

			li.addEventListener("dblclick", () => {
				const namaBaru = prompt("Edit nama tugas", tugas.nama);

				if (namaBaru == null) {
					return;
				}

				if (validasilnput(namaBaru)) {
					editTugas(tugas.id, namaBaru);
				}
			});

			const tombolHapus = document.createElement("button");
			tombolHapus.textContent = "Hapus";
			tombolHapus.addEventListener("click", () => hapusTugas(tugas.id));

			li.appendChild(tombolHapus);
			list.appendChild(li);
		});

		aktifkanDragDrop();
	}

	// ming 7 - menyimpan data ke localhost
	daftarTugas = muatDariStorage();
	renderTugas();

	// Panggil setiap kali data berubah
	function tambahTugas(nama) {
		daftarTugas.push({ id: Date.now(), nama, selesai: false });
		simpanKeStorage(daftarTugas);
		renderTugas();
	}

	// ming 9 - edit data & validasi input
	function editTugas(id, namaBaru) {
		daftarTugas = daftarTugas.map((t) =>
			t.id === id ? { ...t, nama: namaBaru } : t
		);
		simpanKeStorage(daftarTugas);
		renderTugas();
	}

	// ming 13 - drag and drop
	function aktifkanDragDrop() {
		const items = document.querySelectorAll(".tugas-item");
		let dragElement = null;

		items.forEach((item) => {
			item.setAttribute("draggable", true);
			item.style.cursor = "grab";

			item.addEventListener("dragstart", (e) => {
				dragElement = item;
				e.dataTransfer.setData("text/plain", item.dataset.id);
			});

			item.addEventListener("dragover", (e) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "move";
			});

			item.addEventListener("drop", (e) => {
				e.preventDefault();

				if (item !== dragElement) {
					const dragId = parseInt(dragElement.dataset.id);
					const targetId = parseInt(item.dataset.id);
					const dragIndex = daftarTugas.findIndex((t) => t.id === dragId);
					const targetIndex = daftarTugas.findIndex((t) => t.id === targetId);

					[daftarTugas[dragIndex], daftarTugas[targetIndex]] =
						[daftarTugas[targetIndex], daftarTugas[dragIndex]];

					simpanKeStorage(daftarTugas);
					renderTugas();
				}
			});
		});
	}

	// ming 16 Optimasi Performa & Deployment
	function debounce(fn, delay = 300) {
		let timer;

		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => fn(...args), delay);
		};
	}

	// Pencarian Tugas
	const cariTugasDebounced = debounce((kataKunci) => {
		const hasil = daftarTugas.filter((t) => t.nama.toLowerCase().includes(kataKunci));
		renderTugasKustom(hasil);
	}, 300);

	document.getElementById("cari-tugas").addEventListener("input", (e) => {
		const kataKunci = e.target.value.toLowerCase();
		cariTugasDebounced(kataKunci);
	});

	// agar bisa memunculkan pencariannya
	function renderTugasKustom(cariTugasNama) {
		const list = document.getElementById("daftar-tugas");
		list.innerHTML = "";

		cariTugasNama.forEach((tugas) => {
			const li = document.createElement("li");
			li.className = "tugas-item";

			const namaTugas = document.createElement("span");
			namaTugas.textContent = tugas.nama;
			namaTugas.style.textDecoration = tugas.selesai ? "line-through" : "none";
			li.appendChild(namaTugas);
			li.addEventListener("click", () => toggleSelesai(tugas.id));

			li.addEventListener("dblclick", () => {
				const namaBaru = prompt("Edit nama tugas", tugas.nama);
				if (namaBaru && validasilnput(namaBaru)) {
					editTugas(tugas.id, namaBaru);
				}
			});

			const tombolHapus = document.createElement("button");
			tombolHapus.textContent = "Hapus";
			tombolHapus.addEventListener("click", () => hapusTugas(tugas.id));

			li.appendChild(tombolHapus);
			list.appendChild(li);
		});
	}
}
