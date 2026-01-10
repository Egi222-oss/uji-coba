document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const searchInput = document.getElementById('searchInput');
    const emptyState = document.getElementById('emptyState');
    const deleteAllBtn = document.getElementById('deleteAllBtn'); // Selector baru

    let contacts = JSON.parse(localStorage.getItem('myContacts')) || [];

    const renderContacts = (filter = '') => {
        contactList.innerHTML = '';
        
        const filtered = contacts.filter(c => 
            c.name.toLowerCase().includes(filter.toLowerCase()) ||
            c.phone.includes(filter) ||
            c.email.toLowerCase().includes(filter.toLowerCase()) ||
            c.location.toLowerCase().includes(filter.toLowerCase())
        );

        // Tampilkan/Sembunyikan tombol Hapus Semua berdasarkan jumlah kontak
        if (contacts.length > 0) {
            deleteAllBtn.classList.remove('hidden');
        } else {
            deleteAllBtn.classList.add('hidden');
        }

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filtered.forEach(contact => {
                const initials = contact.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                
                const card = document.createElement('div');
                card.className = "p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition gap-4";
                card.innerHTML = `
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                            ${initials}
                        </div>
                        <div class="space-y-1">
                            <h3 class="font-bold text-slate-800 text-lg">${contact.name}</h3>
                            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                <span class="flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5"></i> ${contact.phone}</span>
                                ${contact.email ? `<span class="flex items-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5"></i> ${contact.email}</span>` : ''}
                                ${contact.location ? `<span class="flex items-center gap-1.5 text-blue-600 font-medium"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-blue-600"></i> ${contact.location}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="deleteContact(${contact.id})" class="p-2 text-red-500 hover:bg-red-50 rounded-xl transition border border-red-100 shadow-sm" title="Hapus Kontak">
                            <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                    </div>
                `;
                contactList.appendChild(card);
            });
        }
        if (window.lucide) lucide.createIcons();
    };

    // Fungsi Hapus Satuan
    window.deleteContact = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
            contacts = contacts.filter(c => c.id !== id);
            localStorage.setItem('myContacts', JSON.stringify(contacts));
            renderContacts();
        }
    };

    // Fungsi Hapus Semua
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('PERINGATAN: Hapus semua kontak yang tersimpan?')) {
            contacts = [];
            localStorage.setItem('myContacts', JSON.stringify(contacts));
            renderContacts();
        }
    });

    // Handler lainnya (Simpan & Search)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newContact = {
            id: Date.now(),
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value
        };
        contacts.push(newContact);
        localStorage.setItem('myContacts', JSON.stringify(contacts));
        renderContacts();
        contactForm.reset();
    });

    searchInput.addEventListener('input', (e) => renderContacts(e.target.value));

    renderContacts();
});