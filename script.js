// ming 1 - Setup Project & Struktur HTML/CSS/JS
console.log("DailyBoard siap dijalankan!");


// ming 2 - Seleksi & Manipulasi DOM
const app = document.getElementById("app");


const judul = document.createElement("h1");
judul.innerHTML = `<center>Selamat datang di DailyBoard Evan!</center>`;
// judul.textContent = "Selamat datang di DailyBoard Evan!";
app.appendChild(judul);

// Mengubah gaya elemen lewat JS
judul.style.color = "#2563eb";

// memunculkan minggu 12
const sumberData = document.createElement("p");
sumberData.id = "status";
app.appendChild(sumberData);


// card daftar tugas
const appdiv = document.createElement("div");
appdiv.className = "appdiv";
app.appendChild(appdiv);

const tugas = document.createElement("section");
tugas.className = "section-tugas";
tugas.innerHTML = `<h3>Daftar Tugas</h3>`;
appdiv.appendChild(tugas);

// card catatan
const catatan = document.createElement("section");
catatan.className = "section-catatan";
catatan.innerHTML =
`<h3>Daftar Catatan</h3><textarea id="incat" placeholder="Masukan Catatan"></textarea>
<button id="tomcat">Tambah Catatan</button>
<div id="daftar-catatan"></div>`;
appdiv.appendChild(catatan);

// card kutipan
const kutipan = document.createElement("section");
kutipan.className = "section-kutipan";
kutipan.innerHTML = `<h3>Kutipan Harian</h3>`;
app.appendChild(kutipan);

// card cuaca
const cuaca = document.createElement("section");
cuaca.className = "section-cuaca";
cuaca.innerHTML = `<h3>Cuaca Hari ini</h3>`;
appdiv.appendChild(cuaca);



// // ming 3 - Event Handling << yang ini tidak digunakan
// const tombol = document.createElement("button");
// tombol.textContent = "Tambah";
// app.appendChild(tombol);

// tombol.addEventListener("click", () => {
//     console.log(input.value)
//     alert("Tombol berhasil di klik cek console!");
// });

// // Event pada input
// const input = document.createElement("input");
// app.appendChild(input);

// input.addEventListener("input", (e) => {
//     console.log("Nilai input:", e.target.value);
// });


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

        // const tombolHapus = document.createElement("button");
        // tombolHapus.textContent = "Hapus";
        // tombolHapus.addEventListener("click", () => hapusTugas(tugas.id));

        // li.appendChild(tombolHapus);
        // list.appendChild(li);

    });
}

// ming 6 - tandai selesai & filter tugas
function toggleSelesai(id) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );
    simpanKeStorage();
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
        
        //membuat variable id dan class dnd
        li.className = "tugas-item";
        li.dataset.id = tugas.id;

        const namaTugas = document.createElement("span");
        namaTugas.textContent = tugas.nama;
        namaTugas.style.textDecoration = tugas.selesai ? "line-through" : "none";
        li.appendChild(namaTugas);
        li.addEventListener("click", () => toggleSelesai(tugas.id));

        // tombol edit tugas
        li.addEventListener("dblclick", () => {
            const namaBaru = prompt("Edit nama tugas", tugas.nama);

            if (namaBaru == null) {
                return;
            }

            if (validasilnput(namaBaru)) {
                editTugas(tugas.id, namaBaru);
            }
        });

        // tombol Hapus tugas
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapusTugas(tugas.id));


        li.appendChild(tombolHapus);
        list.appendChild(li);
    });

    aktifkanDragDrop();
}

// ming 7 - menyimpan data ke localhost
function simpanKeStorage() {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatDariStorage() {
    const data = localStorage.getItem("daftarTugas");
    daftarTugas = data ? JSON.parse(data) : [];
}
muatDariStorage();
renderTugas();


// Panggil setiap kali data berubah 
function tambahTugas(nama) {
    daftarTugas.push({ id: Date.now(), nama, selesai: false });
    simpanKeStorage();
    renderTugas();
}




// ming 8 - filter catatan Cepat (Notes)
let daftarCatatan = [];

function tambahCatatan(isi) {
    daftarCatatan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString() });
    simpanCatatanKeStorage();
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
})
muatCatatanDariStorage();
renderCatatan();

// sambungan minggu 8 - localstorage catatan
function simpanCatatanKeStorage() {
    localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage() {
    const data = localStorage.getItem("daftarCatatan");
    daftarCatatan = data ? JSON.parse(data) : [];
}


// ming 9 - edit data & validasi input
function editTugas(id, namaBaru) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, nama: namaBaru } : t
    );
    simpanKeStorage();
    renderTugas();
}

// edit catatan
function editCatatan(id, catatanBaru) {
    daftarCatatan = daftarCatatan.map((c) =>
        c.id === id ? { ...c, isi: catatanBaru } : c
    );
    simpanCatatanKeStorage();
    renderCatatan();
}

// hapus catatan
function hapusCatatan(catatanId) {
    daftarCatatan = daftarCatatan.filter((c) => c.id !== catatanId);
    simpanCatatanKeStorage();
    renderCatatan();
}

function validasilnput(nilai) {
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


// ming 10 - patch api dasar & async/await

// div untuk kutipan
const kutipanDiv = document.createElement("div");
kutipanDiv.id = "kutipan-harian";
kutipanDiv.textContent = "Mengambil Kutipan....";
kutipan.appendChild(kutipanDiv);

// tombol segarkan kutipan
const segarKutipan = document.createElement("button");
segarKutipan.textContent = "Refresh Kutipan";
kutipan.appendChild(segarKutipan);

window.addEventListener("DOMContentLoaded", () => {
    segarKutipan.addEventListener("click", ambilKutipan);
});

async function ambilKutipan() {
    try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        document.getElementById("kutipan-harian").textContent = `"${data.quote}" — ${data.author}`;
    } catch (error) {
        console.error("Gagal mengambil kutipan:", error);
        document.getElementById("kutipan-harian").textContent = "Kutipan gagal dimuat.";
    }
}

ambilKutipan();

// ming 11 - widget cuaca dengan api
async function ambilCuaca(kota) {
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

// form input cuaca
const inputKota = document.createElement("input");
inputKota.placeholder = "Masukkan nama kota";
cuaca.appendChild(inputKota);

// tombol cuaca
const tombolCuaca = document.createElement("button");
tombolCuaca.textContent = "Cari Hasil";
cuaca.appendChild(tombolCuaca);

const tampilCuaca = document.createElement("div");
tampilCuaca.id = "info-cuaca";
cuaca.appendChild(tampilCuaca);

tombolCuaca.addEventListener("click", () => {
    const kota = inputKota.value.trim();

    if (kota == null) {
        document.getElementById("info-cuaca").textContent = "Masukkan nama kota!";
        return;
    }
    document.getElementById("info-cuaca").textContent = "Mencari cuaca...";
    ambilCuaca(kota);
});

// ming 12 - menggambungkan beberapa sumber data
async function muatSemuaWidget() {
    document.getElementById("status").textContent = "Memuat data...";

    await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);

    document.getElementById("status").textContent = "Data berhasil dimuat";
}

window.addEventListener("DOMContentLoaded", muatSemuaWidget);

// ming 13 - drag and drop
function aktifkanDragDrop() {
    const items = document.querySelectorAll(".tugas-item");
    let draggedElement = null;

    items.forEach((item) => {
        item.setAttribute("draggable", true);
        item.style.cursor = "grab";  // agar kursor membuka tangan

        // ketika kursor ditekannya
        item.addEventListener("dragstart", (e) => {
            dragElement = item;
            e.dataTransfer.setData("text/plain", item.dataset.id);
        });

        // ketika kursor dilepasnya
        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        });

        // logika drop agar bisa berpindah
        item.addEventListener("drop", (e) => {
            e.preventDefault();
            
            if (item !== dragElement) {
                const dragId = parseInt(dragElement.dataset.id);
                const targetId = parseInt(item.dataset.id);
                
                // Cari nama tugasnya
                const draggedIndex = daftarTugas.findIndex(t => t.id === dragId);
                const targetIndex = daftarTugas.findIndex(t => t.id === targetId);
                
                // Tukar posisi
                [daftarTugas[draggedIndex], daftarTugas[targetIndex]] = 
                [daftarTugas[targetIndex], daftarTugas[draggedIndex]];
                
                simpanKeStorage();
                renderTugas();
            }
        });
    });
}

// ming 14 - dark mode & pencarian
const toggleTema = document.getElementById("toggle-tema");

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
});


// Terapkan tema tersimpan saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark-mode");
    }
});


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
        
        // klik untuk toggle selesai
        const namaTugas = document.createElement("span");
        namaTugas.textContent = tugas.nama;
        namaTugas.style.textDecoration = tugas.selesai ? "line-through" : "none";
        li.appendChild(namaTugas);
        li.addEventListener("click", () => toggleSelesai(tugas.id));

        // tombol edit
        li.addEventListener("dblclick", () => {
            const namaBaru = prompt("Edit nama tugas", tugas.nama);
            if (namaBaru && validasilnput(namaBaru)) {
                editTugas(tugas.id, namaBaru);
            }
        });

        // tombol hapus
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => hapusTugas(tugas.id));


        li.appendChild(tombolHapus);
        list.appendChild(li);
    });
}