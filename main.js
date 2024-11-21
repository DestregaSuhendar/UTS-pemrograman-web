let keranjang = [];

// Navigasi antar halaman
document.getElementById('produkLink').addEventListener('click', () => tampilkanHalaman('produkSection'));
document.getElementById('keranjangLink').addEventListener('click', () => tampilkanHalaman('keranjangSection'));
document.getElementById('checkoutLink').addEventListener('click', () => tampilkanHalaman('checkoutSection'));

function tampilkanHalaman(id) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if (id === 'keranjangSection') tampilkanKeranjang();
    if (id === 'checkoutSection') hitungTotalCheckout();
}

// Menambahkan produk ke keranjang
document.querySelectorAll('.tambahKeranjang').forEach(button => {
    button.addEventListener('click', (e) => {
        const produk = e.target.closest('.produk');
        const id = produk.dataset.id;
        const nama = produk.dataset.nama;
        const harga = parseInt(produk.dataset.harga, 10); // Pastikan basis 10

        const item = keranjang.find(item => item.id === id);
        if (item) {
            item.jumlah++;
        } else {
            keranjang.push({ id, nama, harga, jumlah: 1 });
        }
        alert(`${nama} telah ditambahkan ke keranjang.`); // Perbaiki penggunaan template string
    });
});

function tampilkanKeranjang() {
    const tbody = document.querySelector('#keranjangTable tbody');
    tbody.innerHTML = '';
    keranjang.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>Rp ${item.harga.toLocaleString()}</td>
            <td><input type="number" value="${item.jumlah}" data-id="${item.id}" min="1"></td>
            <td>Rp ${(item.harga * item.jumlah).toLocaleString()}</td>
            <td><button class="hapus" data-id="${item.id}">Hapus</button></td>
        `;
        tbody.appendChild(row);
    });

    // Mengubah jumlah item
    document.querySelectorAll('#keranjangTable input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const item = keranjang.find(item => item.id === id);
            item.jumlah = parseInt(e.target.value, 10) || 1; // Pastikan nilai minimal 1
            tampilkanKeranjang();
        });
    });

    // Menghapus item
    document.querySelectorAll('.hapus').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            keranjang = keranjang.filter(item => item.id !== id); // Filter ID
            tampilkanKeranjang();
        });
    });
}

function hitungTotalCheckout() {
    const total = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
    document.getElementById('totalCheckout').textContent = `Rp ${total.toLocaleString()}`; // Perbaiki penggunaan template string
}

// Tombol pembayaran
document.getElementById('bayarButton').addEventListener('click', () => {
    alert('Pembayaran berhasil!');
    keranjang = [];
    tampilkanHalaman('produkSection');
    tampilkanKeranjang(); // Pastikan UI diperbarui
});
