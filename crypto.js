// crypto.js
// Step 2: Derive a cryptographic key from a user passphrase

const CryptoEngine = (() => {
  'use strict';

  const ITERATIONS = 150000; // strong but still usable
  const HASH = 'SHA-256';
  const KEY_LENGTH = 256;

  async function deriveKeyFromPassphrase(passphrase, salt) {
    const encoder = new TextEncoder();

    // Convert passphrase to key material
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // Derive AES-GCM key
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: ITERATIONS,
        hash: HASH
      },
      keyMaterial,
      {
        name: 'AES-GCM',
        length: KEY_LENGTH
      },
      false, // key is NOT extractable
      ['encrypt', 'decrypt']
    );
  }

  function generateSalt() {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    return salt;
  }

  return {
    deriveKeyFromPassphrase,
    generateSalt
  };
})();

// STEP 3: Encrypt & decrypt data using AES-GCM

async function encryptData(cryptoKey, plaintext) {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM standard

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    cryptoKey,
    encoder.encode(plaintext)
  );

  return {
    ciphertext: arrayBufferToBase64(encryptedBuffer),
    iv: arrayBufferToBase64(iv)
  };
}

async function decryptData(cryptoKey, encryptedPayload) {
  const decoder = new TextDecoder();

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: base64ToArrayBuffer(encryptedPayload.iv)
    },
    cryptoKey,
    base64ToArrayBuffer(encryptedPayload.ciphertext)
  );

  return decoder.decode(decryptedBuffer);
}

// ---- helpers (encoding) ----

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// expose new functions
CryptoEngine.encryptData = encryptData;
CryptoEngine.decryptData = decryptData;