// ---- 1. DATA PRODUK ----
// Untuk menambah produk baru, cukup tambahkan objek baru di array ini.
// Tidak perlu menyentuh file HTML sama sekali.
const produkList = [
  {
    nama:       'Bolu Cermai',
    harga:      'Rp 25.000',
    lencana:      { label: 'Baru!',      icon: 'fa-solid fa-sparkles',  kelas: 'lencana-hijau' },
    badge2:     { label: 'Oleh-oleh',  icon: 'fa-solid fa-gift',       kelas: 'lencana-kuning' },
    deskripsi:  'Bolu cermai lembut dengan cita rasa asam manis yang khas dari buah cermai pilihan. Perpaduan sempurna antara tekstur bolu yang lembut dengan sensasi segar buah cermai yang unik. Cocok dijadikan oleh-oleh khas Tanjungpinang yang berbeda dari yang lain.',
    komposisi:  'Tepung terigu, telur, gula, margarin, buah cermai',
    info:       'Tanpa pengawet buatan',
    gambar:     'img/bolu.png',
    tag:        { label: 'Baru!',   kelas: '' }
  },
  {
    nama:       'Kacang Telur',
    harga:      'Rp 20.000',
    lencana:      { label: 'Best Seller', icon: 'fa-solid fa-fire',      kelas: 'lencana-merah' },
    badge2:     { label: 'Oleh-oleh',  icon: 'fa-solid fa-gift',       kelas: 'lencana-kuning' },
    deskripsi:  'Kacang telur gurih dan renyah dengan lapisan tepung yang sempurna. Kacang berkualitas tinggi dipadukan dengan bumbu rahasia Nayla Snack menghasilkan cita rasa yang khas dan sulit dilupakan. Cocok untuk camilan santai maupun oleh-oleh khas Tanjungpinang.',
    komposisi:  'Kacang tanah, tepung terigu, telur, gula, garam, minyak goreng',
    info:       'Tersedia berbagai ukuran kemasan',
    gambar:     'img/kacang.png',
    tag:        { label: 'Best Seller', kelas: '' }
  },
  {
    nama:       'Nayla Stick',
    harga:      'Rp 15.000',
    lencana:      { label: 'Favorit',    icon: 'fa-solid fa-star',       kelas: 'lencana-hijau' },
    badge2:     { label: 'Oleh-oleh',  icon: 'fa-solid fa-gift',       kelas: 'lencana-kuning' },
    deskripsi:  'Stick gurih renyah dengan bumbu khas Nayla Snack yang adiktif, menghadirkan cita rasa savory yang tak terlupakan. Renyah di setiap gigitan, cocok untuk teman nonton, ngemil sore, atau dijadikan oleh-oleh yang disukai semua usia.',
    komposisi:  'Tepung terigu, telur, bumbu rempah khas, minyak goreng',
    info:       'Tanpa pengawet buatan',
    gambar:     'img/stick.png',
    tag:        { label: 'Favorit', kelas: '' }
  }
];


// ---- 2. RENDER PRODUK ----

// Render kartu kecil di section Preview (halaman Home)
function renderPreview() {
  const grid = document.getElementById('grid-pratinjau');
  grid.innerHTML = produkList.map(p => `
    <article class="kartu-produk" onclick="showPage('products')">
      <figure class="gambar-kartu-produk">
        <img src="${p.gambar}" alt="${p.nama}">
      </figure>
      <div class="isi-kartu-produk">
        <h3>${p.nama}</h3>
        <span class="label-produk">${p.tag.label}</span>
      </div>
    </article>
  `).join('');
}

// Render kartu detail di halaman Products
function renderProducts() {
  const list = document.getElementById('daftar-produk');
  list.innerHTML = produkList.map(p => `
    <article class="kartu-produk-penuh">
      <div class="dalam-produk-penuh">
        <figure class="gambar-produk-penuh">
          <img src="${p.gambar}" alt="${p.nama}">
        </figure>
        <div class="isi-produk-penuh">
          <h2>${p.nama}</h2>
          <p class="harga-produk">${p.harga}</p>
          <p>${p.deskripsi}</p>
          <button class="tombol tombol-hijau" onclick="showPage('contact');scrollToForm()">
            <i class="fa-brands fa-whatsapp"></i> Pesan Sekarang
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Render pilihan produk di dropdown form pemesanan
function renderSelectOptions() {
  const select = document.getElementById('produkSelect');
  select.innerHTML = '<option value="">-- Pilih Produk --</option>' +
    produkList.map(p => `<option value="${p.nama}">${p.nama}</option>`).join('');
}

// Jalankan semua render saat halaman pertama kali dibuka
renderPreview();
renderProducts();
renderSelectOptions();


// ---- 3. NAVIGASI ----
function showPage(id) {
  // Sembunyikan semua halaman, tampilkan yang dipilih
  document.querySelectorAll('.halaman').forEach(p => p.classList.remove('aktif'));
  document.getElementById('page-' + id).classList.add('aktif');

  // Update style link navbar yang aktif
  document.querySelectorAll('.tautan-nav a').forEach(a => a.classList.remove('aktif'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('aktif');

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToForm() {
  // Scroll ke form pemesanan setelah pindah halaman (diberi jeda kecil)
  setTimeout(() => {
    const form = document.getElementById('order-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
}


// ---- 4. MOBILE MENU ----
function toggleMenu() {
  document.getElementById('menu-mobile').classList.toggle('terbuka');
}
function closeMenu() {
  document.getElementById('menu-mobile').classList.remove('terbuka');
}


// ---- 5. FAQ ----
function toggleFaq(el) {
  // Toggle class terbuka pada pertanyaan dan jawabannya
  el.classList.toggle('terbuka');
  el.nextElementSibling.classList.toggle('terbuka');
}


// ---- 6. FORM PEMESANAN ----
let orderItems = []; // Array untuk menyimpan daftar pesanan sementara

function addItem() {
  const produk = document.getElementById('produkSelect').value;
  const jumlah = parseInt(document.getElementById('jumlahInput').value);

  if (!produk) { alert('Pilih produk terlebih dahulu!'); return; }
  if (!jumlah || jumlah < 1) { alert('Masukkan jumlah yang valid!'); return; }

  // Jika produk sudah ada, tambahkan jumlahnya (tidak duplikat)
  const existing = orderItems.find(i => i.produk === produk);
  if (existing) {
    existing.jumlah += jumlah;
  } else {
    orderItems.push({ produk, jumlah });
  }

  renderItems();
  // Reset input setelah ditambahkan
  document.getElementById('produkSelect').value = '';
  document.getElementById('jumlahInput').value  = '';
}

function removeItem(idx) {
  orderItems.splice(idx, 1);
  renderItems();
}

function renderItems() {
  const container = document.getElementById('orderItems');
  if (orderItems.length === 0) { container.innerHTML = ''; return; }
  container.innerHTML = orderItems.map((item, i) => `
    <div class="item-pesanan-baris">
      <span>${item.produk}</span>
      <span class="jumlah-qty">${item.jumlah} pcs</span>
      <button class="hapus-item" onclick="removeItem(${i})">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');
}

function kirimPesanan() {
  const nama      = document.getElementById('nama').value.trim();
  const noWa      = document.getElementById('noWa').value.trim();
  const paymentEl = document.querySelector('input[name="payment"]:checked');

  // Validasi semua field wajib
  if (!nama)          { alert('Nama tidak boleh kosong!'); return; }
  if (!noWa)          { alert('No. WhatsApp tidak boleh kosong!'); return; }
  if (orderItems.length === 0) { alert('Tambahkan minimal 1 produk pesanan!'); return; }
  if (!paymentEl)     { alert('Pilih metode pembayaran!'); return; }

  // Susun pesan WhatsApp
  const produkStr = orderItems.map(i => `  • ${i.produk} x${i.jumlah} pcs`).join('\n');
  const pesan = [
    'Halo Nayla Snack!',
    '',
    'Saya ingin memesan:',
    '',
    `*Nama:* ${nama}`,
    `*No. WA:* ${noWa}`,
    '',
    '*Pesanan:*',
    produkStr,
    '',
    `*Metode Bayar:* ${paymentEl.value}`,
    '',
    'Mohon dikonfirmasi. Terima kasih!'
  ].join('\n');

  const waUrl = 'https://wa.me/6285835768565?text=' + encodeURIComponent(pesan);
  window.open(waUrl, '_blank');
}


// ---- 7. NAVBAR SCROLL EFFECT ----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 20
      ? '0 4px 24px rgba(0,0,0,0.13)'
      : '0 2px 16px rgba(0,0,0,0.08)';
});
