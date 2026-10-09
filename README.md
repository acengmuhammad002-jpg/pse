# UNO CERITA: School Well-being (Game Web 3D Interaktif)

Game web 3D interaktif edukatif yang dirancang khusus untuk anak sekolah dasar/menengah dalam mengeksplorasi **4 Dimensi School Well-being** tanpa membutuhkan fasilitator manusia. Seluruh alur berjalan otomatis dengan logika pendamping digital yang hangat, suportif, dan ramah anak.

---

## 🌟 Fitur Utama & Kesesuaian Spesifikasi

### 1. Pengaturan Awal & Setup Lobby
- **Halaman Utama (Lobby):** Menampilkan judul *"UNO CERITA: School Well-being"*, kartu 3D melayang dengan efek float animasi lembut, serta tombol *"Mulai Bermain"*.
- **Pilihan Jumlah Pemain:** Tombol pilihan instan untuk 2, 3, atau 4 pemain.
- **Form Nama Pemain:** Kolom teks sederhana untuk mengisi nama masing-masing anak. **Hanya diketik di awal**. Setelah masuk ke arena game, seluruh interaksi 100% menggunakan klik tombol tanpa perlu mengetik apapun lagi.

### 2. Visualisasi Meja Permainan 3D (Three.js WebGL)
- **Meja Bundar 3D:** Sudut pandang isometrik / top-down miring ramah anak dengan meja berpelitur kayu dan karpet beludru biru.
- **Penataan Kursi 3D:** Posisi kursi melingkari meja dengan penanda cahaya (emissive glow) yang menyala dinamis menandai pemain yang sedang aktif gilirannya.
- **Area Tengah Meja:**
  - **Draw Pile (Tumpukan Deck 3D):** Model tumpukan kartu 3D dengan kartu penutup belakang.
  - **Discard Pile 3D:** Kartu aktif yang berada tepat di tengah meja.
  - **Indikator Arah Putaran 3D:** Cincin panah bercahaya di atas permukaan meja yang berputar searah atau berlawanan jarum jam sesuai efek kartu.
- **Animasi 3D:**
  - Animasi kartu melengkung parabola terlempar ke tengah saat dimainkan.
  - Animasi kartu meluncur dari deck ke tangan pemain saat mengambil kartu.
  - Animasi kartu +2 melayang langsung ke kursi teman yang dijadikan target lempar.

### 3. Sistem Kartu & 4 Dimensi School Well-being
- 🔴 **Merah (HEALTH):** Perasaan, energi, kebugaran fisik, dan kenyamanan diri.
- 🟡 **Kuning (HAVING):** Kondisi fisik, fasilitas sekolah, kebersihan kelas, dan keamanan lingkungan.
- 🟢 **Hijau (LOVING):** Pertemanan, hubungan sosial, rasa diterima, kebersamaan, dan saling tolong.
- 🔵 **Biru (BEING):** Potensi diri, kreativitas, rasa percaya diri, dan kebebasan berekspresi.
- **Kartu Aksi Khusus:**
  - **Reverse:** Membalik arah putaran meja secara visual dan mengubah arah giliran.
  - **Kartu +2 (Target Lempar Bebas):** Muncul modal ramah anak *"Pilih teman yang mau kamu lempar kartu +2!"*, lalu pemain yang dipilih mengambil 2 kartu.
  - **Wild & Wild +4:** Pemilihan dimensi warna baru secara bebas.
- **Safe Pass:** Tombol *"Safe Pass (Lewati)"* selalu tersedia di setiap pertanyaan untuk melindungi kenyamanan anak tanpa adanya penalti atau pengurangan skor.

### 4. Respon Otomatis Pengganti Fasilitator (NO TYPING)
- **Setiap kali pemain melempar kartu**, sistem langsung menampilkan **Modal Pop-up Pertanyaan 3D interaktif** sebelum giliran berpindah.
- **Metode Menjawab Cepat:** Terdapat 3–4 tombol respon ungkapan perasaan konkret tanpa ketik.
- **Logika Otomatis Pengganti Fasilitator:**
  - *Respon Positif/Netral:* Apresiasi instan penyemangat kelompok (*"Keren banget! Semangat positifmu menular ke teman-teman! ✨"*).
  - *Respon Cenderung Negatif/Lelah:* Dialog empatik hangat + **1 Pertanyaan Lanjutan pemulihan diri** (pilihan solusi seperti tarik napas, istirahat tenang, atau ngobrol bareng sahabat).
- Semua pilihan jawaban tercatat rapi ke dalam state riwayat refleksi.

### 5. Sistem Skor & Akhir Permainan
- **Team Well-being Meter:** Bar persentase bersama (0% - 100%) di HUD atas layar, bertambah setiap ada pemain yang merespon cerita.
- **Kondisi Berakhir:** Salah satu pemain menghabiskan kartu di tangan, atau meter mencapai 100%.

### 6. Rangkuman Refleksi Akhir (Summary Report)
- **Profil Tim:** Menampilkan dimensi yang paling banyak dieksplorasi (Health, Having, Loving, Being).
- **Kartu Catatan Anak:** Kotak ringkasan positif untuk setiap nama anak tanpa penghakiman.
- **Pesan Afirmasi:** Kalimat penutup hangat untuk kelas.
- **Tombol Main Lagi:** Reset ke menu awal.

---

## 🚀 Cara Menjalankan Game Secara Lokal

### 1. Menjalankan Server Development / Preview
Buka PowerShell di direktori proyek:
```powershell
cd "C:\Users\FUJITSU\.gemini\antigravity\scratch\uno-cerita-3d"
# Menggunakan Node.js standalone
$env:Path = "C:\Users\FUJITSU\node_standalone\node-v20.18.0-win-x64;" + $env:Path
npm run preview
```
Buka browser di: **http://localhost:5173**
