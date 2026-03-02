
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

        function toggleCart() {
            const drawer = document.getElementById('cart-drawer');
            const isOpen = !drawer.classList.contains('translate-x-full');
            drawer.classList.toggle('translate-x-full');
            if (typeof showOverlay === 'function') { isOpen ? hideOverlay() : showOverlay(); }
        }
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const isOpen = !menu.classList.contains('-translate-x-full');
            menu.classList.toggle('-translate-x-full');
            if (typeof showOverlay === 'function') { isOpen ? hideOverlay() : showOverlay(); }
        }
        function openPaymentModal() { if(cart.length > 0) document.getElementById('payment-modal').classList.replace('hidden', 'flex'); }
        function closePaymentModal() { document.getElementById('payment-modal').classList.replace('flex', 'hidden'); }

        // BUSQUEDA Y FILTROS
        function searchProducts(query) {
            const q = query.toLowerCase().trim();
            if (!q) { renderGrid(products); document.getElementById('cat-title').innerText = 'Explora la tienda'; showView('home-view'); return; }
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
            const count = filtered.length;
            document.getElementById('cat-title').innerText = `${count} resultado${count !== 1 ? 's' : ''} para "${query}"`;
            renderGrid(filtered);
            showView('home-view');
        }

        // Búsqueda desde menú hamburguesa: cierra el menú al presionar Enter
        function mobileSearch(event, value) {
            if (event.key === 'Enter') {
                doMobileSearch();
            }
        }

        function doMobileSearch() {
            const input = document.getElementById('mobile-search-input');
            const query = input ? input.value : '';
            searchProducts(query);
            // Cerrar el menú móvil para mostrar los resultados
            const menu = document.getElementById('mobile-menu');
            if (menu && !menu.classList.contains('-translate-x-full')) {
                menu.classList.add('-translate-x-full');
            }
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
            if(!name || !text) { showToast('Por favor completa tu nombre y comentario', 'error'); return; }
            reviews.unshift({ name, text });
            renderReviews();
            document.getElementById('rev-name').value = '';
            document.getElementById('rev-text').value = '';
            showToast('¡Gracias por compartir tu experiencia! ⭐', 'success');
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
            const sizeLabel = document.getElementById('selected-size-label');
            if (sizeLabel) sizeLabel.innerText = '';

            const sizeSec = document.getElementById('size-section');
            let sizes = [];

            if (p.category === 'Zapatillas') {
                sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
                document.getElementById('size-label-text').innerText = 'Talla de Zapatilla: ';
            } else if (p.category === 'Moda') {
                sizes = ['S', 'M', 'L', 'XL'];
                document.getElementById('size-label-text').innerText = 'Talla de Ropa: ';
            }

            if (sizes.length > 0) {
                sizeSec.classList.remove('hidden');
                document.getElementById('size-grid').innerHTML = sizes.map(val => `
                    <button onclick="setSize('${val}', this)" class="size-btn border dark:border-slate-700 py-3 text-[11px] font-black rounded-xl transition hover:bg-black hover:text-white dark:hover:bg-gold dark:hover:text-black">${val}</button>
                `).join('');
            } else {
                sizeSec.classList.add('hidden');
                selSize = 'N/A';
            }
            showView('detail-view');
        }

        function setSize(s, el) {
            selSize = s;
            document.querySelectorAll('#size-grid button').forEach(b => b.classList.remove('selected'));
            el.classList.add('selected');
            const label = document.getElementById('selected-size-label');
            if (label) label.innerText = s;
        }

        function setCol(c, el) {
            selColor = c;
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
            el.classList.add('selected');
        }

        function updateQty(n) { pdpQty = Math.max(1, pdpQty + n); document.getElementById('pdp-qty').innerText = pdpQty; }

        // CARRITO Y WHATSAPP
        function addToCart() {
            if(!selColor) { showToast('Selecciona un color para continuar', 'error'); return; }
            if(!selSize)  { showToast('Selecciona una talla para continuar', 'error'); return; }
            const existing = cart.find(i => i.id === currentPDP.id && i.color === selColor && i.size === selSize);
            if(existing) existing.qty += pdpQty;
            else cart.push({ ...currentPDP, color: selColor, size: selSize, qty: pdpQty, uid: Date.now() });
            updateCartUI();
            toggleCart();
            showToast(`${currentPDP.name} añadido al carrito 🛍`, 'success');
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
            const orderNum = generateOrderNumber();
            const total = document.getElementById('total-price').innerText;
            
            // Show order confirmation modal
            closePaymentModal();
            toggleCart();
            showOrderConfirmation(orderNum, method, total);
            
            // Build WhatsApp message
            let msg = `*M & A HOME & STYLE - NUEVO PEDIDO*\n--------------------------\n*Pedido:* ${orderNum}\n*Pago:* ${method}\n\n`;
            cart.forEach(i => msg += `📦 *${i.name}*\nTalla: ${i.size} | Color: ${i.color} | Cant: ${i.qty}\nSub: S/ ${(i.price*i.qty).toFixed(2)}\n\n`);
            msg += `*TOTAL A PAGAR: ${total}*\n--------------------------\n`;
            if(method === 'INTERBANK') msg += `_Solicito validar pago a Cuenta Interbank: 003-773-013259712394-93_`;
            else msg += `_Solicito código QR para pago por Yape/Plin_`;
            
            // Store for later WhatsApp share
            window._lastOrderMsg = msg;
            window._lastOrderNum = orderNum;
        }

        function generateOrderNumber() {
            const ts = Date.now().toString().slice(-6);
            const rand = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            return `#MA-${ts}${rand}`;
        }

        function showOrderConfirmation(orderNum, method, total) {
            const modal = document.getElementById('order-confirmation-modal');
            document.getElementById('order-number').innerText = orderNum;
            document.getElementById('order-method').innerText = method === 'YAPE' ? '📱 Yape / Plin' : '🏦 Interbank';
            document.getElementById('order-total').innerText = total;
            document.getElementById('order-email').innerText = 'pedidos@mandahomestyle.com';
            
            // Order summary items
            const summaryEl = document.getElementById('order-summary-items');
            summaryEl.innerHTML = cart.map(i => `
                <div class="flex justify-between items-center text-xs py-1">
                    <span class="font-bold truncate max-w-[200px]">${i.name} <span class="text-gray-400">(x${i.qty})</span></span>
                    <span class="font-black text-gold ml-2">S/ ${(i.price * i.qty).toFixed(2)}</span>
                </div>
            `).join('');
            
            modal.classList.replace('hidden', 'flex');
            
            // Clear cart after order
            cart = [];
            updateCartUI();
        }

        function closeOrderConfirmation() {
            document.getElementById('order-confirmation-modal').classList.replace('flex', 'hidden');
        }

        function shareOrderWhatsApp() {
            if (window._lastOrderMsg) {
                window.open(`https://wa.me/51924996961?text=${encodeURIComponent(window._lastOrderMsg)}`);
            }
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

        // ===== TOAST NOTIFICATIONS =====
        function showToast(message, type = 'info', duration = 3000) {
            const container = document.getElementById('toast-container');
            if (!container) return;
            const icons = { success: '✓', error: '✕', info: '★' };
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `<span style="font-size:14px;margin-right:6px">${icons[type]||'★'}</span>${message}`;
            container.appendChild(toast);
            requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, duration);
        }

        // ===== WISHLIST =====
        let wishlist = JSON.parse(localStorage.getItem('alex_wishlist')) || [];

        function toggleWishlist(id, event) {
            event.stopPropagation();
            const idx = wishlist.indexOf(id);
            if (idx === -1) {
                wishlist.push(id);
                showToast('Añadido a favoritos ❤', 'success');
            } else {
                wishlist.splice(idx, 1);
                showToast('Eliminado de favoritos', 'info');
            }
            localStorage.setItem('alex_wishlist', JSON.stringify(wishlist));
            // Update all wishlist buttons for this product
            document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(btn => {
                btn.classList.toggle('active', wishlist.includes(id));
            });
        }

        // ===== BADGE LOGIC =====
        const newProductIds = [12, 13, 17, 18, 19]; // IDs marcados como "Nuevo"
        const saleProductIds = [15, 16, 3, 7];       // IDs marcados como "Oferta"

        function getBadgeHTML(id) {
            if (newProductIds.includes(id)) return `<span class="product-badge badge-new">Nuevo</span>`;
            if (saleProductIds.includes(id)) return `<span class="product-badge badge-sale">Oferta</span>`;
            return '';
        }

        // ===== ENHANCED RENDER GRID (with wishlist + badges + animations) =====
        function renderGrid(data) {
            const grid = document.getElementById('grid-container');
            if (!data.length) {
                grid.innerHTML = `<div class="col-span-6 text-center py-20 opacity-40">
                    <p class="text-4xl mb-4">🔍</p>
                    <p class="font-black uppercase text-sm">Sin resultados</p>
                    <p class="text-xs mt-2">Intenta con otro término de búsqueda</p>
                </div>`;
                // Also update mobile carousel
                renderMobileCarousel(data);
                return;
            }
            grid.innerHTML = data.map(p => `
                <div onclick="openPDP(${p.id})" class="product-card group cursor-pointer">
                    <div class="aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-slate-800 mb-4 relative">
                        <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" loading="lazy">
                        ${getBadgeHTML(p.id)}
                        <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" data-id="${p.id}" onclick="toggleWishlist(${p.id}, event)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                    <h4 class="text-[10px] font-black uppercase italic truncate">${p.name}</h4>
                    <p class="text-sm text-gray-400 mt-1 italic font-light">S/ ${p.price.toFixed(2)}</p>
                </div>
            `).join('');
            lucide.createIcons();
            // Also update mobile carousel
            renderMobileCarousel(data);
            // Trigger card animations
            requestAnimationFrame(() => observeCards());
        }

        // ===== INTERSECTION OBSERVER for card animations =====
        function observeCards() {
            const cards = document.querySelectorAll('.product-card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('visible'), i * 60);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            cards.forEach(card => observer.observe(card));
        }

        // ===== SCROLL TO TOP =====
        function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
        window.addEventListener('scroll', () => {
            const btn = document.getElementById('scroll-top-btn');
            if (btn) btn.classList.toggle('visible', window.scrollY > 400);
        });

        // ===== OVERLAY (close drawers on outside click) =====
        function showOverlay() { document.getElementById('overlay').classList.add('active'); }
        function hideOverlay() { document.getElementById('overlay').classList.remove('active'); }
        function closeAllDrawers() {
            document.getElementById('cart-drawer').classList.add('translate-x-full');
            document.getElementById('mobile-menu').classList.add('-translate-x-full');
            hideOverlay();
        }

        // ===== COOKIE CONSENT =====
        function initCookieBanner() {
            const consent = localStorage.getItem('cookie_consent');
            if (!consent) {
                setTimeout(() => {
                    const banner = document.getElementById('cookie-banner');
                    if (banner) banner.classList.add('show');
                }, 1800);
            }
        }

        function acceptCookies() {
            localStorage.setItem('cookie_consent', 'all');
            hideCookieBanner();
            showToast('Preferencias guardadas ✓', 'success');
        }

        function rejectCookies() {
            localStorage.setItem('cookie_consent', 'essential');
            hideCookieBanner();
        }

        function hideCookieBanner() {
            const banner = document.getElementById('cookie-banner');
            if (banner) {
                banner.classList.remove('show');
                setTimeout(() => banner.style.display = 'none', 600);
            }
        }

        // ===== PICKUP POINTS =====
        const pickupData = {
            Lima: [
                { name: 'Agencia Olva Courier - Miraflores', address: 'Av. Larco 1150, Miraflores', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '01-234-5678' },
                { name: 'Agencia Shalom - San Isidro', address: 'Av. Javier Prado Este 2875, San Isidro', hours: 'Lun-Sáb 8am-8pm', open: true, phone: '01-345-6789' },
                { name: 'Agencia Olva - San Juan de Lurigancho', address: 'Av. Gran Chimú 290, SJL', hours: 'Lun-Sáb 9am-6pm', open: true, phone: '01-456-7890' },
                { name: 'Agencia Shalom - Los Olivos', address: 'Av. Universitaria 3456, Los Olivos', hours: 'Lun-Sáb 9am-7pm', open: false, phone: '01-567-8901' },
                { name: 'Agencia Olva - Surco', address: 'Av. Benavides 5678, Surco', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '01-678-9012' },
                { name: 'Agencia Shalom - Callao', address: 'Av. Sáenz Peña 234, Callao', hours: 'Lun-Sáb 8am-6pm', open: true, phone: '01-789-0123' },
            ],
            Arequipa: [
                { name: 'Agencia Olva - Centro Arequipa', address: 'Calle Mercaderes 234, Cercado', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '054-234-567' },
                { name: 'Agencia Shalom - Cayma', address: 'Av. Ejército 1234, Cayma', hours: 'Lun-Sáb 9am-6pm', open: true, phone: '054-345-678' },
                { name: 'Agencia Olva - Paucarpata', address: 'Av. Kennedy 567, Paucarpata', hours: 'Lun-Sáb 9am-6pm', open: false, phone: '054-456-789' },
            ],
            Trujillo: [
                { name: 'Agencia Olva - Centro Trujillo', address: 'Jr. Pizarro 456, Centro', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '044-234-567' },
                { name: 'Agencia Shalom - El Porvenir', address: 'Av. Sánchez Carrión 789, El Porvenir', hours: 'Lun-Sáb 8am-6pm', open: true, phone: '044-345-678' },
                { name: 'Agencia Olva - Florencia de Mora', address: 'Av. Túpac Amaru 123, Florencia de Mora', hours: 'Lun-Sáb 9am-5pm', open: true, phone: '044-456-789' },
            ],
            Piura: [
                { name: 'Agencia Olva - Centro Piura', address: 'Av. Grau 345, Centro', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '073-234-567' },
                { name: 'Agencia Shalom - Castilla', address: 'Av. Progreso 678, Castilla', hours: 'Lun-Sáb 9am-6pm', open: true, phone: '073-345-678' },
            ],
            Cusco: [
                { name: 'Agencia Olva - Centro Cusco', address: 'Av. El Sol 456, Centro', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '084-234-567' },
                { name: 'Agencia Shalom - San Sebastián', address: 'Av. La Cultura 789, San Sebastián', hours: 'Lun-Sáb 9am-6pm', open: false, phone: '084-345-678' },
            ],
            Chiclayo: [
                { name: 'Agencia Olva - Centro Chiclayo', address: 'Av. Balta 234, Centro', hours: 'Lun-Sáb 9am-7pm', open: true, phone: '074-234-567' },
                { name: 'Agencia Shalom - La Victoria', address: 'Av. Leguía 567, La Victoria', hours: 'Lun-Sáb 9am-6pm', open: true, phone: '074-345-678' },
            ]
        };

        function showPickupPoints(city, el) {
            // Update active city button
            document.querySelectorAll('.city-btn').forEach(btn => btn.classList.remove('active'));
            if (el) el.classList.add('active');
            else {
                document.querySelectorAll('.city-btn').forEach(btn => {
                    if (btn.textContent.trim() === city) btn.classList.add('active');
                });
            }
            showPickupPointsDirect(city);
        }

        function detectLocation() {
            if (!navigator.geolocation) {
                showToast('Geolocalización no disponible', 'error');
                return;
            }
            showToast('Detectando tu ubicación...', 'info');
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    // Simple lat-based city detection for Peru
                    let city = 'Lima';
                    if (lat < -15.5 && lat > -16.5) city = 'Arequipa';
                    else if (lat < -8.0 && lat > -8.5) city = 'Trujillo';
                    else if (lat < -5.0 && lat > -5.5) city = 'Piura';
                    else if (lat < -13.0 && lat > -14.0) city = 'Cusco';
                    else if (lat < -6.5 && lat > -7.0) city = 'Chiclayo';
                    
                    // Activate city button
                    document.querySelectorAll('.city-btn').forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.textContent.trim() === city) btn.classList.add('active');
                    });
                    showPickupPointsDirect(city);
                    showToast(`📍 Ciudad detectada: ${city}`, 'success');
                },
                () => {
                    showToast('No se pudo detectar la ubicación', 'error');
                }
            );
        }

        function showPickupPointsDirect(city) {
            const points = pickupData[city] || [];
            const grid = document.getElementById('pickup-points-grid');
            if (!grid) return;
            grid.innerHTML = points.map(p => `
                <div class="pickup-card">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <h5 class="font-black text-xs uppercase tracking-wide mb-1">${p.name}</h5>
                            <p class="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                ${p.address}
                            </p>
                        </div>
                        <span class="pickup-badge ${p.open ? 'pickup-badge-open' : 'pickup-badge-closed'} ml-2 flex-shrink-0">
                            ${p.open ? '● Abierto' : '● Cerrado'}
                        </span>
                    </div>
                    <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${p.hours}</p>
                        <a href="tel:${p.phone}" class="text-[10px] font-black text-gold hover:underline">${p.phone}</a>
                    </div>
                </div>
            `).join('');
        }

        // ===== MOBILE CAROUSEL =====
        function renderMobileCarousel(data) {
            const carousel = document.getElementById('mobile-carousel');
            const dotsContainer = document.getElementById('carousel-dots');
            if (!carousel) return;

            carousel.innerHTML = data.map((p, idx) => `
                <div onclick="openPDP(${p.id})" class="mobile-carousel-item product-card group">
                    <div class="aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-gray-50 dark:bg-slate-800 mb-3 relative">
                        <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" loading="lazy">
                        ${getBadgeHTML(p.id)}
                        <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" data-id="${p.id}" onclick="toggleWishlist(${p.id}, event)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>
                    <h4 class="text-[10px] font-black uppercase italic truncate">${p.name}</h4>
                    <p class="text-sm text-gray-400 mt-1 italic font-light">S/ ${p.price.toFixed(2)}</p>
                </div>
            `).join('');

            // Render dots (show max 8 dots)
            const dotCount = Math.min(data.length, 8);
            if (dotsContainer) {
                dotsContainer.innerHTML = Array.from({length: dotCount}, (_, i) =>
                    `<div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="scrollCarouselTo(${i})"></div>`
                ).join('');
            }

            // Update dots on scroll
            carousel.addEventListener('scroll', () => {
                const itemWidth = carousel.querySelector('.mobile-carousel-item')?.offsetWidth || 1;
                const gap = 16;
                const idx = Math.round(carousel.scrollLeft / (itemWidth + gap));
                document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === idx);
                });
            }, { passive: true });

            lucide.createIcons();
            requestAnimationFrame(() => observeCards());
        }

        function scrollCarouselTo(idx) {
            const carousel = document.getElementById('mobile-carousel');
            if (!carousel) return;
            const item = carousel.querySelectorAll('.mobile-carousel-item')[idx];
            if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        // ===== INIT
        renderGrid(products);
        renderMobileCarousel(products);
        renderCollections();
        renderReviews();
        updateCartUI();
        showPickupPointsDirect('Lima');
        initCookieBanner();
        lucide.createIcons();
        setTimeout(() => observeCards(), 100);
    
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
    