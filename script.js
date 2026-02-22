
        // BASE DE DATOS EXPANDIDA (35 PRODUCTOS) - Hogar + Moda
        const products = [
          { id: 1, name: "Lámpara Moderna de Mesa", price: 299, category: "Decoración", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" },
          { id: 2, name: "Sofá Minimalista Gris", price: 1599, category: "Sala", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800" },
          { id: 3, name: "Juego de Ollas Antiadherentes", price: 450, category: "Cocina", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800" },
          { id: 4, name: "Cama King Size con Cabecero", price: 899, category: "Dormitorio", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
          { id: 5, name: "Espejo Decorativo Dorado", price: 199, category: "Decoración", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" },
          { id: 6, name: "Mesa de Centro de Madera", price: 350, category: "Sala", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" },
          { id: 7, name: "Batidora de Mano Profesional", price: 150, category: "Cocina", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800" },
          { id: 8, name: "Cómoda de 6 Cajones", price: 650, category: "Dormitorio", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800" },
          { id: 9, name: "Alfombra Persa Moderna", price: 280, category: "Decoración", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" },
          { id: 10, name: "Silla Ergonómica de Oficina", price: 320, category: "Sala", img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800" },
          { id: 11, name: "Set de Vajilla para 6", price: 180, category: "Cocina", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800" },
          // Moda: polos, camisas, pantalones, zapatillas
          { id: 12, name: "Polo Básico Premium", price: 89, category: "Moda", img: "https://images.unsplash.com/photo-1520975698518-6b0b6f6b4aaf?q=80&w=800" },
          { id: 13, name: "Camisa Oxford Blanca", price: 129, category: "Moda", img: "https://images.unsplash.com/photo-1520975698518-6b0b6f6b4aaf?q=80&w=800" },
          { id: 14, name: "Camisa Columbia Outdoor", price: 159, category: "Moda", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800" },
          { id: 15, name: "Pantalón Chino Slim", price: 139, category: "Moda", img: "https://images.unsplash.com/photo-1530845648478-0b2f6b3d4a2f?q=80&w=800" },
          { id: 16, name: "Jeans Clásicos Oscuros", price: 149, category: "Moda", img: "https://images.unsplash.com/photo-1520975911208-9a8c0f3f3c0b?q=80&w=800" },
          { id: 17, name: "Zapatillas Urbanas Neo", price: 499, category: "Zapatillas", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" },
          { id: 18, name: "Sneakers Classic White", price: 419, category: "Zapatillas", img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=800" },
          { id: 19, name: "Zapatillas Trail Columbia", price: 539, category: "Zapatillas", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800" }
        ];
        // Autocompletar a 35 para la demo
        while(products.length < 35) {
            const p = products[Math.floor(Math.random()*products.length)];
            products.push({...p, id: products.length + 1, name: p.name + " Premium " + products.length});
        }

        const reviews = [
            { name: "Carlos P.", text: "La atención por WhatsApp es increíble. Mi sofá llegó en 24h a Piura." },
            { name: "Milagros S.", text: "Calidad top. Compré una lámpara y el diseño es muy moderno. Recomendado." },
            { name: "Jorge R.", text: "Confiables al 100%. Pagué por Interbank y todo el proceso fue transparente." }
        ];

        let cart = JSON.parse(localStorage.getItem('alex_v9')) || [];
        let currentPDP = null, selColor = '', selSize = '', pdpQty = 1;

        // UI ACTIONS
        window.addEventListener('load', () => setTimeout(() => {
            const l = document.getElementById('loader');
            l.style.opacity = '0';
            setTimeout(() => l.style.display = 'none', 700);
        }, 1500));

        function toggleDarkMode() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
        if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

        function showView(v) {
            document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
            document.getElementById(v).classList.add('active');
            window.scrollTo(0,0);
        }

        function toggleCart() { document.getElementById('cart-drawer').classList.toggle('translate-x-full'); }
        function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('-translate-x-full'); }
        function openPaymentModal() { if(cart.length > 0) document.getElementById('payment-modal').classList.replace('hidden', 'flex'); }
        function closePaymentModal() { document.getElementById('payment-modal').classList.replace('flex', 'hidden'); }

        // BUSQUEDA Y FILTROS
        function searchProducts(query) {
            const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
            renderGrid(filtered);
            showView('home-view');
        }

        function filterBy(cat) {
            const filtered = products.filter(p => p.category === cat);
            document.getElementById('cat-title').innerText = cat;
            renderGrid(filtered);
            showView('home-view');
        }
                                                                                                                                                                                                                                                                                                                                                                                    
        // Filtrado por grupos: 'home' -> decoración y habitaciones; 'style' -> moda y zapatillas
        function filterByGroup(group) {
          let cats = [];
          if (group === 'home') cats = ['Decoración', 'Sala', 'Cocina', 'Dormitorio'];
          else if (group === 'style') cats = ['Moda', 'Zapatillas'];
          const filtered = products.filter(p => cats.includes(p.category));
          document.getElementById('cat-title').innerText = group === 'home' ? 'Hogar' : 'Style';
          renderGrid(filtered);
          showView('home-view');
        }

        function renderGrid(data) {
            const grid = document.getElementById('grid-container');
            grid.innerHTML = data.map(p => `
                <div onclick="openPDP(${p.id})" class="group cursor-pointer">
                    <div class="aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-slate-800 mb-4 relative">
                        <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
                    </div>
                    <h4 class="text-[10px] font-black uppercase italic truncate">${p.name}</h4>
                    <p class="text-sm text-gray-400 mt-1 italic font-light">S/ ${p.price.toFixed(2)}</p>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // REVIEWS & CAROUSEL
        function renderReviews() {
            const track = document.getElementById('testimonial-track');
            track.innerHTML = reviews.map(r => `
                <div class="testimonial-card text-center">
                    <div class="flex justify-center text-gold mb-6"><i data-lucide="star" fill="currentColor"></i><i data-lucide="star" fill="currentColor"></i><i data-lucide="star" fill="currentColor"></i><i data-lucide="star" fill="currentColor"></i><i data-lucide="star" fill="currentColor"></i></div>
                    <p class="text-xl italic leading-relaxed px-4">"${r.text}"</p>
                    <p class="mt-8 font-black text-gold uppercase text-[10px] tracking-[0.4em]">— ${r.name}</p>
                </div>
            `).join('');
            lucide.createIcons();
        }

        let reviewIdx = 0;
        setInterval(() => {
            reviewIdx = (reviewIdx + 1) % reviews.length;
            const track = document.getElementById('testimonial-track');
            if(track) track.style.transform = `translateX(-${reviewIdx * 100}%)`;
        }, 5000);

        function addReview() {
            const name = document.getElementById('rev-name').value;
            const text = document.getElementById('rev-text').value;
            if(!name || !text) return;
            reviews.unshift({ name, text });
            renderReviews();
            document.getElementById('rev-name').value = '';
            document.getElementById('rev-text').value = '';
            alert("¡Gracias por compartir tu experiencia!");
        }

        // PRODUCT DETAIL (PDP)
        function openPDP(id) {
            const p = products.find(x => x.id === id);
            currentPDP = p;
            document.getElementById('pdp-img').src = p.img;
            document.getElementById('pdp-name').innerText = p.name;
            document.getElementById('pdp-price').innerText = `S/ ${p.price.toFixed(2)}`;
            document.getElementById('pdp-cat').innerText = p.category;
            
            pdpQty = 1; document.getElementById('pdp-qty').innerText = 1;
            selColor = ''; selSize = '';
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));

            const hasSize = [].includes(p.category); // No sizes for home items
            const sizeSec = document.getElementById('size-section');
            if(hasSize) {
                sizeSec.classList.remove('hidden');
                const t = []; // No sizes
                document.getElementById('size-grid').innerHTML = t.map(val => `
                    <button onclick="setSize('${val}', this)" class="border dark:border-slate-700 py-4 text-[10px] font-black rounded-xl transition hover:bg-black hover:text-white dark:hover:bg-gold dark:hover:text-black">${val}</button>
                `).join('');
            } else { sizeSec.classList.add('hidden'); selSize = 'N/A'; }
            showView('detail-view');
        }

        function setSize(s, el) {
            selSize = s;
            document.querySelectorAll('#size-grid button').forEach(b => b.classList.remove('bg-black', 'text-white', 'dark:bg-gold', 'dark:text-black'));
            el.classList.add('bg-black', 'text-white', 'dark:bg-gold', 'dark:text-black');
        }

        function setCol(c, el) {
            selColor = c;
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
            el.classList.add('selected');
        }

        function updateQty(n) { pdpQty = Math.max(1, pdpQty + n); document.getElementById('pdp-qty').innerText = pdpQty; }

        // CARRITO Y WHATSAPP
        function addToCart() {
            if(!selColor || !selSize) return alert("Selecciona color y talla para continuar.");
            const existing = cart.find(i => i.id === currentPDP.id && i.color === selColor && i.size === selSize);
            if(existing) existing.qty += pdpQty;
            else cart.push({ ...currentPDP, color: selColor, size: selSize, qty: pdpQty, uid: Date.now() });
            updateCartUI(); toggleCart();
        }

        function updateCartUI() {
            const container = document.getElementById('cart-items');
            let total = 0;
            container.innerHTML = cart.map(i => {
                const sub = i.price * i.qty; total += sub;
                return `
                    <div class="flex gap-4 border-b dark:border-slate-800 pb-6">
                        <img src="${i.img}" class="w-16 h-20 object-cover rounded-xl">
                        <div class="flex-1">
                            <h5 class="text-[10px] font-black uppercase italic">${i.name}</h5>
                            <p class="text-[9px] text-gray-400 mt-1 uppercase">${i.size} | ${i.color}</p>
                            <div class="flex justify-between mt-3">
                                <span class="text-xs font-black">S/ ${sub.toFixed(2)}</span>
                                <button onclick="removeFromCart(${i.uid})" class="text-[9px] font-black uppercase text-red-500">Quitar</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            document.getElementById('total-price').innerText = `S/ ${total.toFixed(2)}`;
            document.getElementById('cart-count').innerText = cart.length;
            localStorage.setItem('alex_v9', JSON.stringify(cart));
        }

        function removeFromCart(uid) { cart = cart.filter(i => i.uid !== uid); updateCartUI(); }

        function sendOrder(method) {
            let msg = `*M & A HOME & STYLE - NUEVO PEDIDO*\n--------------------------\n*Pago:* ${method}\n\n`;
            cart.forEach(i => msg += `📦 *${i.name}*\nTalla: ${i.size} | Color: ${i.color} | Cant: ${i.qty}\nSub: S/ ${(i.price*i.qty).toFixed(2)}\n\n`);
            msg += `*TOTAL A PAGAR: ${document.getElementById('total-price').innerText}*\n--------------------------\n`;
            if(method === 'INTERBANK') msg += `_Solicito validar pago a Cuenta Interbank: 003-773-013259712394-93_`;
            else msg += `_Solicito código QR para pago por Yape/Plin_`;
            
            window.open(`https://wa.me/51924996961?text=${encodeURIComponent(msg)}`);
        }

        // HERO SLIDER
        let slideIdx = 0;
        const slides = document.querySelectorAll('.slide');
        setInterval(() => {
          if (!slides.length) return;
          slides[slideIdx].classList.remove('active');
          slideIdx = (slideIdx + 1) % slides.length;
          slides[slideIdx].classList.add('active');
        }, 3000);

        // Colecciones destacadas: renderizar bloques Home y Style
        function renderCollections() {
          const homeCats = ['Decoración', 'Sala', 'Cocina', 'Dormitorio'];
          const styleCats = ['Moda', 'Zapatillas'];

          const homeItems = products.filter(p => homeCats.includes(p.category)).slice(0,8);
          const styleItems = products.filter(p => styleCats.includes(p.category)).slice(0,8);

          const homeContainer = document.getElementById('coleccion-home');
          const styleContainer = document.getElementById('coleccion-style');

          if (homeContainer) {
            homeContainer.innerHTML = homeItems.map(p => `
              <div onclick="openPDP(${p.id})" class="group cursor-pointer">
                <div class="aspect-[3/4] rounded-[1.25rem] overflow-hidden bg-gray-50 dark:bg-slate-800 mb-3 relative">
                  <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
                </div>
                <h5 class="text-[10px] font-black uppercase italic truncate">${p.name}</h5>
                <p class="text-sm text-gray-400 mt-1 italic font-light">S/ ${p.price.toFixed(2)}</p>
              </div>
            `).join('');
          }

          if (styleContainer) {
            styleContainer.innerHTML = styleItems.map(p => `
              <div onclick="openPDP(${p.id})" class="group cursor-pointer">
                <div class="aspect-[3/4] rounded-[1.25rem] overflow-hidden bg-gray-50 dark:bg-slate-800 mb-3 relative">
                  <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
                </div>
                <h5 class="text-[10px] font-black uppercase italic truncate">${p.name}</h5>
                <p class="text-sm text-gray-400 mt-1 italic font-light">S/ ${p.price.toFixed(2)}</p>
              </div>
            `).join('');
          }
          lucide.createIcons();
        }

        function filterCollection(group, subcat) {
          let cats = [];
          if (group === 'home') cats = [subcat];
          else if (group === 'style') cats = [subcat];

          const filtered = products.filter(p => cats.includes(p.category) || (group === 'style' && subcat === 'Moda' && p.category === 'Moda'));
          const containerId = group === 'home' ? 'coleccion-home' : 'coleccion-style';
          const container = document.getElementById(containerId);
          if (!container) return;
          container.innerHTML = filtered.slice(0,8).map(p => `
            <div onclick="openPDP(${p.id})" class="group cursor-pointer">
              <div class="aspect-[3/4] rounded-[1.25rem] overflow-hidden bg-gray-50 dark:bg-slate-800 mb-3 relative">
                <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
              </div>
              <h5 class="text-[10px] font-black uppercase italic truncate">${p.name}</h5>
              <p class="text-sm text-gray-400 mt-1 italic font-light">S/ ${p.price.toFixed(2)}</p>
            </div>
          `).join('');
          lucide.createIcons();
        }

        // INIT
        renderGrid(products);
        renderCollections();
        renderReviews();
        updateCartUI();
        lucide.createIcons();
    
// Login/Register functions with Firebase
function showLoginModal() {
  document.getElementById('login-modal').classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.add('hidden');
}

function showTab(tab) {
  document.getElementById('login-tab').classList.toggle('hidden', tab !== 'login');
  document.getElementById('register-tab').classList.toggle('hidden', tab !== 'register');
  document.getElementById('login-btn').classList.toggle('bg-gold', tab === 'login');
  document.getElementById('login-btn').classList.toggle('text-black', tab === 'login');
  document.getElementById('register-btn').classList.toggle('bg-gold', tab === 'register');
  document.getElementById('register-btn').classList.toggle('text-black', tab === 'register');
}

async function register(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  try {
    const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
    const user = userCredential.user;
    await window.setDoc(window.doc(window.db, 'users', user.uid), {
      name: name,
      email: email,
      notifications: true
    });
    document.cookie = "user=" + email + "; path=/; max-age=86400";
    alert('Registrado exitosamente. Ahora puedes recibir notificaciones.');
    requestNotificationPermission();
    closeLoginModal();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await window.signInWithEmailAndPassword(window.auth, email, password);
    document.cookie = "user=" + email + "; path=/; max-age=86400";
    alert('Iniciado sesión. Ahora puedes recibir notificaciones.');
    requestNotificationPermission();
    closeLoginModal();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function signInWithGoogle() {
  const provider = new window.GoogleAuthProvider();
  try {
    const result = await window.signInWithPopup(window.auth, provider);
    const user = result.user;
    await window.setDoc(window.doc(window.db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      notifications: true
    }, { merge: true });
    document.cookie = "user=" + user.email + "; path=/; max-age=86400";
    alert('Iniciado con Google. Ahora puedes recibir notificaciones.');
    requestNotificationPermission();
    closeLoginModal();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function signInWithFacebook() {
  const provider = new window.FacebookAuthProvider();
  try {
    const result = await window.signInWithPopup(window.auth, provider);
    const user = result.user;
    await window.setDoc(window.doc(window.db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      notifications: true
    }, { merge: true });
    document.cookie = "user=" + user.email + "; path=/; max-age=86400";
    alert('Iniciado con Facebook. Ahora puedes recibir notificaciones.');
    requestNotificationPermission();
    closeLoginModal();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await window.getToken(window.messaging, { vapidKey: 'YOUR_VAPID_KEY' });
      const user = window.auth.currentUser;
      if (user) {
        await window.setDoc(window.doc(window.db, 'users', user.uid), {
          fcmToken: token
        }, { merge: true });
      }
      console.log('FCM Token:', token);
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
}

// Auth state listener
window.onAuthStateChanged(window.auth, (user) => {
  if (user) {
    console.log('User signed in:', user.email);
    const userBtn = document.querySelector('button[onclick="showLoginModal()"]');
    userBtn.innerHTML = '<i data-lucide="log-out" class="w-6 h-6"></i>';
    userBtn.onclick = () => {
      window.signOut(window.auth);
      document.cookie = "user=; path=/; max-age=0";
      alert('Sesión cerrada');
    };
  } else {
    console.log('User signed out');
    const userBtn = document.querySelector('button[onclick="showLoginModal()"]');
    userBtn.innerHTML = '<i data-lucide="user" class="w-6 h-6"></i>';
    userBtn.onclick = showLoginModal;
  }
  lucide.createIcons();
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
    