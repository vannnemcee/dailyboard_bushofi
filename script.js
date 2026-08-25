import { ambilKutipan, ambilCuaca, muatSemuaWidget } from "./api.js";
import { buatTugas } from "./tugas.js";
import {
    simpanTema,
    muatTema
} from "./storage.js";
import { buatCatatan, validasilnput } from "./catatan.js";

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

// nampilkan tugas dari tugas.js
buatTugas(tugas, validasilnput);

// nampilin catatan dari catatan.js
buatCatatan(catatan);


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

window.addEventListener("DOMContentLoaded", muatSemuaWidget);

// ming 14 - dark mode & pencarian
const toggleTema = document.getElementById("toggle-tema");

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    simpanTema(modeAktif);
});


// Terapkan tema tersimpan saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    if (muatTema() === "gelap") {
        document.body.classList.add("dark-mode");
    }
});