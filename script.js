// Menangani klik tombol "Add to Cart"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const checkoutButton = document.getElementById('checkout');
const checkoutSection = document.getElementById('checkout-section');
const checkoutForm = document.getElementById('checkout-form');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');

// Menyimpan item di keranjang dalam array
let cart = [];

// Menambahkan item ke keranjang
function addItemToCart(productId, productName, productPrice, size, quantity) {
    const item = {
        id: productId,
        name: productName,
        price: productPrice,
        size: size,
        quantity: quantity
    };
    cart.push(item);
    updateCart();
}

// Mengupdate tampilan keranjang
function updateCart() {
    cartItems.innerHTML = ''; // Kosongkan daftar item keranjang
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.size} - ${item.quantity} x Rp${item.price}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Rp${total.toLocaleString()}`;
}

// Menampilkan modal untuk memilih ukuran dan jumlah
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseInt(productElement.getAttribute('data-price'), 10);

        // Tampilkan modal untuk memilih ukuran dan jumlah
        modal.style.display = 'flex';

        modalForm.onsubmit = (e) => {
            e.preventDefault();
            const size = document.getElementById('size').value;
            const quantity = parseInt(document.getElementById('quantity').value, 10);

            // Menambahkan item ke keranjang
            addItemToCart(productId, productName, productPrice, size, quantity);

            // Tutup modal setelah item ditambahkan
            modal.style.display = 'none';
        };
    });
});

// Menutup modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Menutup modal jika area di luar modal diklik
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Menangani klik tombol checkout
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong! Silakan tambahkan produk terlebih dahulu.');
    } else {
        checkoutSection.style.display = 'block'; // Menampilkan bagian checkout
        // Menampilkan daftar produk di bagian checkout
        checkoutItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.size} - ${item.quantity} x Rp${item.price}`;
            checkoutItems.appendChild(li);
            total += item.price * item.quantity;
        });
        checkoutTotal.textContent = `Rp${total.toLocaleString()}`;
    }
});

// Menghandle pengiriman formulir checkout
checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = document.getElementById('checkout-name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (name && address && payment) {
        alert(`Terima kasih, ${name}! Pembelian Anda berhasil.\n\nAlamat Pengiriman: ${address}\nMetode Pembayaran: ${payment}`);
        
        // Kosongkan keranjang setelah checkout
        cart = [];
        updateCart(); // Update tampilan keranjang
        checkoutSection.style.display = 'none'; // Menyembunyikan bagian checkout
    } else {
        alert('Harap isi semua kolom sebelum melanjutkan.');
    }
});
