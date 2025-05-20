// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJWGDo0BI_wSrry5U_5C1PXKnA3aZXmfc",
  authDomain: "compritaasw.firebaseapp.com",
  projectId: "compritaasw",
  storageBucket: "compritaasw.appspot.com", // corregido (estaba mal como .firebasestorage.app)
  messagingSenderId: "995933320417",
  appId: "1:995933320417:web:d6750ef36778c6298a73a0"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de Auth
export const auth = getAuth(app);
