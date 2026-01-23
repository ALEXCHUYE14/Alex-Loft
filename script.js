
        // BASE DE DATOS EXPANDIDA (35 PRODUCTOS)
        const products = [
            { id: 1, name: "Jordan 4 Retro Military Blue", price: 899, category: "Zapatillas", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800" },
            { id: 2, name: "Nike Dunk Low Panda", price: 549, category: "Zapatillas", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800" },
            { id: 3, name: "Adidas Forum Bad Bunny", price: 750, category: "Zapatillas", img: "https://images.unsplash.com/photo-1551107644-793510986938?q=80&w=800" },
            { id: 4, name: "Nike Air Force 1 White", price: 480, category: "Zapatillas", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" },
            { id: 5, name: "Yeezy Boost 350 V2", price: 1150, category: "Zapatillas", img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=800" },
            { id: 6, name: "New Balance 550", price: 590, category: "Zapatillas", img: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?q=80&w=800" },
            { id: 7, name: "Hoodie Alex Oversize Black", price: 195, category: "Hombre", img: "https://images.unsplash.com/photo-1556316301-d83e540ca39a?q=80&w=800" },
            { id: 8, name: "Polo Street Soul", price: 95, category: "Hombre", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800" },
            { id: 9, name: "Conjunto Woman Urban", price: 290, category: "Mujer", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" },
            { id: 10, name: "Gorra NY Gold Edition", price: 110, category: "Accesorios", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800" },
            { id: 11, name: "Gorra NY Gold Edition", price: 110, category: "Accesorios", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800" }
        ];
        // Autocompletar a 35 para la demo
        while(products.length < 35) {
            const p = products[Math.floor(Math.random()*products.length)];
            products.push({...p, id: products.length + 1, name: p.name + " Elite " + products.length});
        }

        const reviews = [
            { name: "Carlos P.", text: "La atención por WhatsApp es increíble. Mis Jordan llegaron en 24h a Piura." },
            { name: "Milagros S.", text: "Calidad top. Compré un conjunto y la tela es muy premium. Recomendado." },
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

            const hasSize = ["Zapatillas", "Hombre", "Mujer"].includes(p.category);
            const sizeSec = document.getElementById('size-section');
            if(hasSize) {
                sizeSec.classList.remove('hidden');
                const t = p.category === "Zapatillas" ? [38, 39, 40, 41, 42, 43] : ["S", "M", "L", "XL"];
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
            let msg = `*ALEX STORE - NUEVO PEDIDO*\n--------------------------\n*Pago:* ${method}\n\n`;
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
            slides[slideIdx].classList.remove('active');
            slideIdx = (slideIdx + 1) % slides.length;
            slides[slideIdx].classList.add('active');
        }, 4000);

        // INIT
        renderGrid(products);
        renderReviews();
        updateCartUI();
        lucide.createIcons();
    