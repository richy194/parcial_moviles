// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJWGDo0BI_wSrry5U_5C1PXKnA3aZXmfc",
  authDomain: "compritaasw.firebaseapp.com",
  projectId: "compritaasw",
  storageBucket: "compritaasw.appspot.com",
  messagingSenderId: "995933320417",
  appId: "1:995933320417:web:d6750ef36778c6298a73a0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta auth y firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

