document.addEventListener('DOMContentLoaded', () => {
    // Definisi Elemen DOM
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const searchInput = document.getElementById('searchInput');
    const emptyState = document.getElementById('emptyState');
    const deleteAllBtn = document.getElementById('deleteAllBtn');

    // Load Data dari LocalStorage
    let contacts = JSON.parse(localStorage.getItem('myContacts')) || [];

    // --- FUNGSI UTAMA ---

    // Fungsi Render Daftar Kontak
    const renderContacts = (filter = '') => {
        contactList.innerHTML = '';
        
        // Filter Data berdasarkan input pencarian
        const filtered = contacts.filter(c => 
            c.name.toLowerCase().includes(filter.toLowerCase()) ||
            c.phone.includes(filter) ||
            c.email.toLowerCase().includes(filter.toLowerCase()) ||
            c.location.toLowerCase().includes(filter.toLowerCase())
        );

        // Kontrol Tombol Hapus Semua
        if (contacts.length > 0) {
            deleteAllBtn.classList.remove('hidden');
        } else {
            deleteAllBtn.classList.add('hidden');
        }

        // Kontrol Tampilan Jika Kosong
        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            
            filtered.forEach(contact => {
                // Buat Inisial Nama (Contoh: "Budi Santoso" -> "BS")
                const initials = contact.name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2);
                
                const card = document.createElement('div');
                card.className = "p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/80 transition-all gap-4";
                card.innerHTML = `
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-blue-100">
                            ${initials}
                        </div>
                        <div class="space-y-1">
                            <h3 class="font-bold text-slate-800 text-lg leading-tight">${contact.name}</h3>
                            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
                                <span class="flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5 text-blue-500"></i> ${contact.phone}</span>
                                ${contact.email ? `<span class="flex items-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5 text-blue-500"></i> ${contact.email}</span>` : ''}
                                ${contact.location ? `<span class="flex items-center gap-1.5 text-indigo-600"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${contact.location}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="deleteContact(${contact.id})" class="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 group" title="Hapus Kontak">
                            <i data-lucide="trash-2" class="w-5 h-5 group-active:scale-90 transition-transform"></i>
                        </button>
                    </div>
                `;
                contactList.appendChild(card);
            });
        }
        
        // Render Ikon Lucide setelah elemen baru ditambahkan ke DOM
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    // Fungsi Simpan Kontak Baru
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newContact = {
            id: Date.now(), // ID Unik
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value
        };

        contacts.unshift(newContact); // Tambahkan ke awal array
        saveData();
        renderContacts();
        contactForm.reset(); // Reset form setelah sukses
    });

    // Fungsi Hapus Kontak Per Item (Dibuat Global)
    window.deleteContact = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
            contacts = contacts.filter(c => c.id !== id);
            saveData();
            renderContacts();
        }
    };

    // Fungsi Hapus Semua Kontak
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('PERINGATAN! Semua kontak akan dihapus secara permanen. Lanjutkan?')) {
            contacts = [];
            saveData();
            renderContacts();
        }
    });

    // Fungsi Cari Kontak (Input Event)
    searchInput.addEventListener('input', (e) => {
        renderContacts(e.target.value);
    });

    // Fungsi Simpan ke LocalStorage
    function saveData() {
        localStorage.setItem('myContacts', JSON.stringify(contacts));
    }

    // Render Awal saat Halaman Dibuka
    renderContacts();
});