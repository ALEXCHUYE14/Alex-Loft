🛒 M & A Home & Style — Tienda de Decoración y Moda

`M & A Home & Style` es una tienda web híbrida que combina artículos para el hogar (decoración, muebles, cocina, dormitorio) y moda (polos, camisas, pantalones, zapatillas). Esta versión incluye un hero slider dual (HOME / STYLE), colecciones destacadas, carrito persistente, autenticación con Firebase (email, Google, Facebook), notificaciones push (FCM) y captura de formularios con Netlify.

**Características Principales:**
- **Hero Slider Home/Style:** Una única portada que rota entre una imagen para Hogar y otra para Style (cada 3 segundos), con CTA para ver cada colección.
- **Colecciones destacadas:** Sección con filas para `Hogar` y `Style` y subfiltros (Decoración, Sala, Cocina, Dormitorio, Polos, Camisas, Pantalones, Zapatillas).
- **Catálogo mixto:** Soporta productos de hogar y moda en la misma galería.
- **Autenticación:** Registro/inicio de sesión con email, Google y Facebook (Firebase Auth).
- **Notificaciones push:** Soporta Firebase Cloud Messaging (FCM) mediante `sw.js` para notificaciones de ofertas.
- **Formularios Netlify:** Los formularios de login/registro están marcados con `data-netlify="true"` como respaldo y para capturar leads al desplegar en Netlify.
- **Checkout vía WhatsApp:** El pedido se compone y abre una conversación WhatsApp con los detalles (productos, cantidades, total).

**Tecnologías:**
- Diseño: Tailwind CSS + Animate.css
- Lógica: JavaScript (ES6+)
- Autenticación y BBDD en cliente: Firebase Auth + Firestore (opcional, recomendado)
- Mensajería: Firebase Cloud Messaging (FCM)
- Service Worker: `sw.js` para recibir notificaciones en background
- Hosting / Forms: Netlify

**Archivos clave:**
- `index.html` — HTML principal, meta SEO, hero slider, colecciones y modal de login.
- `script.js` — Lógica de UI, catálogo, filtros, slider, colecciones y autenticación.
- `sw.js` — Service worker configurado para FCM.

Cómo editar el catálogo
- Edita el array `products` en `script.js`.
- Cada producto debe tener: `{ id, name, price, category, img }`.
- Categorías actuales soportadas: `Decoración`, `Sala`, `Cocina`, `Dormitorio`, `Moda`, `Zapatillas`.

Ejemplo de producto:
```js
{ id: 12, name: "Polo Básico Premium", price: 89, category: "Moda", img: "https://images.unsplash.com/...?q=80&w=800" }
```

Configuración rápida — Firebase
1. Crea un proyecto en https://console.firebase.google.com
2. Habilita Authentication: Email/Contraseña, Google y Facebook (en Providers).
3. Crea una Firestore DB para almacenar usuarios y tokens (opcional).
4. Habilita Cloud Messaging y obtén tu **VAPID key**.
5. Reemplaza los placeholders en `index.html` (el bloque de SDK) y en `sw.js` con tus credenciales:

- `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`
- `vapidKey` / `YOUR_VAPID_KEY` en `script.js` para `getToken()`

Notas: Para Facebook necesitas configurar una App en https://developers.facebook.com y añadir el dominio autorizado.

Netlify (formularios y despliegue)
- Los formularios de login/registro incluyen `data-netlify="true"` y `name`/`form-name` para que Netlify los capture automáticamente.
- Para desplegar: crea un repositorio Git o arrastra los archivos a Netlify. Si conectas un repo, Netlify se encargará del build (no hay build en este proyecto estático).

Pruebas locales
1. Abre `index.html` en un navegador moderno (Chrome o Edge recomendado).
2. Prueba el slider; debe rotar cada 3s.
3. Prueba los botones `Ver colección Hogar` y `Ver colección Style` — deben filtrar la galería.
4. Regístrate e inicia sesión (si configuras Firebase) y acepta notificaciones para almacenar el token en Firestore.

Consideraciones de seguridad
- Este proyecto guarda información útil en el cliente para demos. En producción, mueve la lógica de usuarios y tokens a un backend seguro.
- Nunca publiques claves privadas (use environment variables o Netlify Functions para operaciones seguras).

Contacto y créditos
- M & A Home & Style — Lima, Perú — 2026
- Si quieres, puedo ayudarte a: configurar Firebase, generar VAPID keys, o añadir Netlify Functions para manejar suscripciones y enviar notificaciones.