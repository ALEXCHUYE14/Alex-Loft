🛒 Alex Store | Premium Streetwear E-commerce
Alex Store es una plataforma de e-commerce de alto impacto visual diseñada para la venta de sneakers y moda urbana. Esta versión v10 incluye una arquitectura híbrida de navegación, carrito persistente y cierre de ventas automatizado por WhatsApp.

🚀 Características Principales
Menú de Alta Eficiencia: Navegación por categorías y buscador integrados en la misma línea.

Checkout Inteligente: Envía pedidos detallados (Producto, Talla, Color, Total) directamente al WhatsApp del vendedor.

Marketing Psicológico: * Urgencia: Banner superior con contador de cuenta regresiva.

Prueba Social: Carrusel de testimonios dinámicos.

Celebración: Efecto de confeti al finalizar el pedido.

Experiencia de Usuario (UX): Modo oscuro nativo, loaders de marca y diseño 100% responsivo.

Persistencia: El carrito se guarda automáticamente en el navegador del cliente.

🛠️ Tecnologías
Diseño: Tailwind CSS + Animate.css

Iconografía: Lucide Icons

Lógica: JavaScript Vanilla (ES6+)

Efectos: Canvas-Confetti API

Pasarela: WhatsApp Business API integration

📦 Cómo añadir o modificar productos
Para gestionar tu catálogo de 35 o más productos, debes editar la constante products dentro de la etiqueta <script> al final del archivo HTML.

Estructura de un producto:
Cada producto debe seguir este formato exacto para que la tienda lo muestre correctamente:

JavaScript
{
    id: 1,                          // ID único (incremental)
    name: "Nombre del Producto",    // Nombre que verá el cliente
    price: 899,                     // Precio en números (sin S/)
    category: "Zapatillas",         // Categoría: "Zapatillas", "Hombre", "Mujer" o "Accesorios"
    img: "URL_DE_LA_IMAGEN"         // Enlace directo a la foto (puedes usar Unsplash o subir las tuyas)
}
Pasos para subir productos reales:
Busca la línea const products = [...].

Elimina los objetos de prueba (o el bucle while que genera copias).

Pega tus productos siguiendo la estructura de arriba.

Tallas automáticas: El sistema detecta la categoría. Si es "Zapatillas", mostrará tallas numéricas (38, 40, etc.). Si es ropa, mostrará tallas S, M, L, XL.

⚙️ Configuración Personalizada
Para que la tienda funcione con tus datos personales, ajusta lo siguiente:

Número de WhatsApp: Busca el número 51924996961 en el código y reemplázalo por el tuyo (con código de país).

Datos Bancarios: En el Modal de Pago (dentro del HTML), cambia el número de cuenta Interbank por el tuyo actual.

Contador de Oferta: Puedes ajustar el tiempo del contador editando la variable let timer = 3600 * 2.5; (actualmente configurado para 2.5 horas).

🌐 Despliegue (Hosting)
Al ser un proyecto de un solo archivo (index.html), puedes alojarlo gratis en:

GitHub Pages (Recomendado)

Netlify

Vercel

Solo arrastra el archivo al panel de control de cualquiera de estos servicios y tu tienda estará en línea en segundos.

👤 Créditos
Alex Store Dev - Lima, Perú - 2026 "Elevando el estilo urbano, un pedido a la vez."