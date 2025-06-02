# 📱 Compritas - App de Listas de Compras

Una aplicación móvil desarrollada con React Native y Firebase que permite gestionar listas de compras de manera práctica y sincronizada. 

Incluye autenticación, modo oscuro, recordatorios semanales, y sincronización en la nube gracias a Firestore.

---

## 🚀 Tecnologías Utilizadas

- React Native (Expo)
- Firebase Authentication
- Firebase Firestore
- AsyncStorage
- Expo Notifications

---

## 🔑 Funcionalidades

- Registro e inicio de sesión con correo y contraseña
- Crear, editar y gestionar listas de compras
- Añadir productos, marcarlos como comprados (con tachado)
- Sincronización automática con Firestore
- Persistencia local con AsyncStorage
- Modo claro / oscuro
- Cierre de sesión y eliminación de cuenta
- Recordatorio semanal (lunes 10:00am) con notificación push

---

## 📷 Capturas de Pantalla (Wireframe)

- Pantalla de login y registro
- Pantalla principal de listas
- Detalle de lista con productos
- Ajustes con opciones útiles

---

## 🛠️ Instalación Local

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/compritas-app.git
cd compritas-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el proyecto:

```bash
npx expo start
```

4. Escanea el QR con la app Expo Go en tu dispositivo físico (recomendado)

---

## 🔒 Configuración Firebase

1. Crea un proyecto en https://console.firebase.google.com
2. Habilita Authentication con correo/contraseña
3. Habilita Firestore en modo de prueba
4. Reemplaza el objeto `firebaseConfig` en `services/firebase.js` con tus credenciales

---

## 📅 Notas Técnicas

- Las listas están almacenadas en la colección `lists` (con campo uid del usuario)
- Cada lista tiene una subcolección `productos`
- Las notificaciones funcionan solo en dispositivos físicos
- El modo oscuro se guarda en AsyncStorage

---

## 👨‍💻 Autor

Desarrollado por Richy — Proyecto académico de Aplicaciones Móviles.

Si te gustó este proyecto, no olvides darle ⭐ en GitHub.

---

## 📝 Licencia

Este proyecto es de uso académico. Puedes modificarlo libremente para aprender y practicar.
