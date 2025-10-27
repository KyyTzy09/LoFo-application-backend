<p align="center">
  <a href="https://lofo-api.up.railway.app" target="_blank">
    <img src="https://i.pinimg.com/736x/42/9e/7b/429e7ba595baf2832b43aa6c48a50662.jpg" width="200" alt="NestJS Logo" />
  </a>
</p>
<h1 align="center">📦 Lofo API</h1> <p align="center"> Backend REST API yang dibangun menggunakan <b>NestJS</b> untuk aplikasi mobile <b>Lofo</b>. </p>
🚀 Gambaran Umum

Lofo API adalah layanan backend yang dirancang untuk aplikasi mobile yang memungkinkan pengguna untuk:
```
🔐 Melakukan autentikasi dengan aman (login/registrasi)

🏷️ Membuat dan mengelola barang

🧾 Menghasilkan serta mengambil QR Code untuk setiap barang
```
🧩 Teknologi yang Digunakan
```
Framework: NestJS

ORM: Prisma

Database: PostgreSQL (melalui Neon.tech
)

Bahasa: TypeScript

Autentikasi: JWT (JSON Web Token)

Lainnya: Swagger untuk dokumentasi API, Cloudinary untuk upload gambar (opsional)
```
🛠️ Langkah Instalasi
``` bash
# 1. Instal dependensi
   npm install

# 2. Konfigurasi variabel lingkungan
   Buat file .env di root proyek:
```

```
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_URL="your_cloudinary_url"
PORT=3000
```

3. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

4. Menjalankan Proyek

```bash
# Mode development
npm run start:dev

# Mode production
npm run start:prod
```

📘 Dokumentasi API

```bash
# Dokumentasi Swagger dapat diakses setelah server dijalankan di:
👉 http://localhost:3000/api/docs
```

```bash
🧱 Struktur Folder
src/
 ┣ module/
    ┣ auth/                # Autentikasi (login, registrasi, JWT)
    ┣ item/               # CRUD Barang dan pembuatan QR Code
    ┣ profile/
    ┣ user/
    ┣ qr/               # modul terpisah untuk pembuatan Qr code
 ┣ common/              # Utilitas bersama (DTO, dekorator, format respons)
 ┣ main.ts              # Titik masuk aplikasi
 ┣ app.module.ts        # Modul utama
```

🔑 Fitur Utama

```
✅ Autentikasi pengguna menggunakan JWT
👤 Manajemen profile pengguna
🧩 Operasi CRUD untuk data barang
🧾 Pembuatan QR Code secara otomatis untuk setiap barang
🌩️ Upload gambar (opsional, menggunakan Cloudinary)
📖 Dokumentasi API otomatis dengan Swagger
```

🧑‍💻 Catatan Pengembangan

```bash
Ditulis menggunakan TypeScript dan memanfaatkan dekorator NestJS untuk arsitektur yang bersih.

Setiap modul memiliki DTO terpisah untuk request dan response.

Struktur API konsisten menggunakan ApiResponseType<T> agar respons mudah diprediksi.
```

<p align="center">Dibuat dengan penuh ❤️ oleh <b>Kyynotsepuh</b> menggunakan NestJS</p>
