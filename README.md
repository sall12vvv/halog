
# WhatsApp Bot Auto-Tolak Video Call

Bot WhatsApp menggunakan Baileys yang otomatis menolak video call pada jam tertentu, mengirim pesan ke penelepon, dan memblokir kontak jika spam.

## Fitur:
- Menolak video call saat jam larangan (default 22:00 - 06:00).
- Kirim pesan otomatis ke penelepon.
- Blokir otomatis jika spam VC lebih dari 3x.

---

## Cara Pasang & Jalankan

### 1. Clone Repository
```bash
git clone https://github.com/halog/whatsapp-vc-blocker.git
cd whatsapp-vc-blocker
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Bot
```bash
node index.js
```

QR code akan muncul, scan pakai WhatsApp untuk pairing akun.

---

## Ubah Jam Larangan VC

Buka file `index.js`, ubah bagian berikut:

```js
const jamMulai = 22; // jam mulai blok VC
const jamAkhir = 6;  // jam akhir blok VC
```

---

## Catatan

- Bot hanya menolak **video call**, bukan voice call.
- Pastikan koneksi internet stabil saat bot berjalan.
