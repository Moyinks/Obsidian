# OBSIDIAN: Zero-Knowledge Secure Workspace

### 🔒 Military-Grade Encryption in the Browser
**Live Demo:** [Insert your Vercel Link Here]

Obsidian is a Progressive Web App (PWA) that provides a secure, zero-knowledge workspace for notes and file storage. Unlike standard cloud apps, Obsidian performs **Client-Side End-to-End Encryption (E2EE)**.

Data is encrypted in the browser using the **Web Crypto API** before it ever touches the network. The database (Supabase) only stores the ciphertext. Even as the developer, **I cannot read user data.**

---

## 🚀 Key Features

* **Zero-Knowledge Architecture:** User data is encrypted with a master key that is never stored on any server.
* **AES-GCM Encryption:** Uses industry-standard 256-bit encryption for all notes and files.
* **PBKDF2 Key Derivation:** Master keys are derived using 100,000+ iterations to prevent brute-force attacks.
* **Secure Cloud Storage:** Encrypted binary blobs are stored in Supabase Storage.
* **Offline-First PWA:** Works without internet using Service Workers and Cache API.
* **Audit Logging:** Tracks encryption/decryption events locally for user transparency.

## 🛠️ Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+), CSS3 (No Frameworks)
* **Cryptography:** Native Web Crypto API (`window.crypto.subtle`)
* **Backend:** Supabase (PostgreSQL + Storage)
* **Auth:** Supabase Auth (Identity Management only)
* **Security:** Row Level Security (RLS) policies ensuring strict data isolation.

## 📐 How It Works (The Security Model)

1.  **Key Generation:** Upon signup, a random UUID Master Key is generated.
2.  **Derivation:** When the user enters this key, it is salted and hashed (PBKDF2) to create a session crypto key in RAM.
3.  **Encryption:**
    * Text is converted to an `ArrayBuffer`.
    * A unique `IV` (Initialization Vector) is generated.
    * The data is encrypted using `AES-GCM`.
4.  **Storage:** The JSON payload `{'iv': [...], 'data': [...]}` is sent to the database.
5.  **Decryption:** The process is reversed locally. If the Master Key is incorrect, the mathematical decryption fails, returning garbage data.

## ⚠️ "But what if I lose my key?"
**The data is gone forever.**
This is a feature, not a bug. Because the architecture is truly zero-knowledge, there is no "Backdoor" or "Admin Reset." Privacy is absolute.

---

### Author
**Moses Olayinka**
*Frontend Engineer & PWA Specialist*
