# Address book
 Aplikasi buku alamat sederhana untuk menyimpan dan mengelola informasi kontak.
# Link
 - Url Deployment:
 - Repisitory
# Features
 - Add, edit, and delete contacts
 - Search contacts by name or email
# Tech Stack
 - HTML 
 - CSS
 - JavaScript
# Flowchart

```mermaid
flowchart TD
    A[Start] --> B[Display Contact List]
    B --> C{User Action}
    C -->|Add Contact| D[Show The Contact Form]
    C -->|Edit Contact| E[Show Edit Contact Form]
    C -->|Delete Contact| F[Confirm Deletion]
    D --> G[Save New Contact]
    E --> H[Update Contact]
    F --> I[Remove Contact]
    G --> B
    H --> B
    I --> B
    B --> J[End]
```