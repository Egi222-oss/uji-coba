const contactForm = document.getElementById('contactForm');
        const contactList = document.getElementById('contactList');
        const searchInput = document.getElementById('searchInput');
        const emptyState = document.getElementById('emptyState');

        // Mengambil data dari LocalStorage atau array kosong jika belum ada
        let contacts = JSON.parse(localStorage.getItem('myContacts')) || [];

        // Fungsi untuk merender kontak ke layar
        function renderContacts(filter = '') {
            contactList.innerHTML = '';
            
            const filteredContacts = contacts.filter(c => 
                c.name.toLowerCase().includes(filter.toLowerCase()) ||
                c.email.toLowerCase().includes(filter.toLowerCase()) ||
                c.location.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredContacts.length === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                filteredContacts.forEach((contact, index) => {
                    const initials = contact.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                    
                    const contactItem = `
                        <div class="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition gap-4">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
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
                                <button onclick="deleteContact(${contact.id})" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition border border-transparent hover:border-red-100" title="Hapus">
                                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    contactList.innerHTML += contactItem;
                });
            }
            // Refresh ikon Lucide setiap kali render ulang
            lucide.createIcons();
        }

        // Fungsi Tambah Kontak
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newContact = {
                id: Date.now(), // Unique ID berdasarkan waktu
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                location: document.getElementById('location').value
            };

            contacts.push(newContact);
            saveToStorage();
            renderContacts();
            contactForm.reset(); // Kosongkan form setelah simpan
        });

        // Fungsi Hapus Kontak
        function deleteContact(id) {
            if (confirm('Apakah Anda yakin ingin menghapus kontak ini?')) {
                contacts = contacts.filter(c => c.id !== id);
                saveToStorage();
                renderContacts();
            }
        }

        // Fungsi Cari Kontak
        searchInput.addEventListener('input', (e) => {
            renderContacts(e.target.value);
        });

        // Simpan ke LocalStorage
        function saveToStorage() {
            localStorage.setItem('myContacts', JSON.stringify(contacts));
        }

        // Inisialisasi awal
        renderContacts();

displayContacts();