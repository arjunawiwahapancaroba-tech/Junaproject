document.addEventListener("DOMContentLoaded", function() {
    // Selalu inisialisasi ikon di awal
    lucide.createIcons();

    // --- 1. LOGIKA MENU MOBILE (Sudah Diperbaiki & Final) ---
    function initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('close-menu-btn');

        if (btn && menu && closeBtn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                menu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            });
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                menu.classList.add('translate-x-full');
                document.body.style.overflow = 'auto';
            });
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.add('translate-x-full');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    }
    initMobileMenu();

    // --- 2. LOGIKA HERO SLIDER (Hanya di index.html) ---
    const sliderContainer = document.getElementById('hero-slider');
    if (sliderContainer) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-dot');
        const nextBtn = document.getElementById('next-slide');
        const prevBtn = document.getElementById('prev-slide');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            dots.forEach((dot, i) => {
                const isActive = i === index;
                dot.classList.toggle('active', isActive);
                dot.classList.toggle('w-8', isActive);
                dot.classList.toggle('bg-white', isActive);
                dot.classList.toggle('bg-white/50', !isActive);
            });
            currentSlide = index;
        }

        function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
        function prevSlide() { showSlide((currentSlide - 1 + slides.length) % slides.length); }
        function startAutoPlay() { slideInterval = setInterval(nextSlide, 7000); }
        function stopAutoPlay() { clearInterval(slideInterval); }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); });
            prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); });
        }
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { showSlide(index); stopAutoPlay(); });
        });
        showSlide(0);
        startAutoPlay();
    }

    // --- 3. SCROLL REVEAL ANIMATION (Berjalan di semua halaman) ---
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // --- 4. LOGIKA SMOOTH SCROLL PROFIL (hanya di profil.html) ---
    const profilNav = document.getElementById('profil-nav');
    if (profilNav) {
        const links = profilNav.querySelectorAll('.scroll-link');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    links.forEach(l => l.classList.remove('active', 'bg-blue-100', 'text-blue-600', 'font-semibold'));
                    this.classList.add('active', 'bg-blue-100', 'text-blue-600', 'font-semibold');
                    
                    const headerOffset = 120;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            });
        });
    }

    // --- 5. DATABASE BERITA LENGKAP & LOGIKA RENDER ---
    
    // [DATABASE TELAH DISESUAIKAN DENGAN ASET LOKAL ANDA]
    const DB = {
        news: [
            // Halaman 1 (Menggunakan 6 gambar pertama Anda)
            { id: 1, title: "Olimpiade Madrasah Indonesia", date: "11 Sept 2025", category: "Prestasi", img: "/assets/berita-1.jpg", desc: "Peserta didik MTS Sindangraja pada ajang OMI SAINS dan RISET tingkat Kabupaten Tasikmalaya." },
            { id: 2, title: "Selamat dan Sukses'", date: "22 Nov 2024", category: "Prestasi", img: "/assets/berita-2.jpg", desc: "Pengukuhan dan pelantikan pramuka penggalang Garuda oelh ketua Kwartir Ranting Jamanis Bertempat di Gedung PGRI Jamanis." },
            { id: 3, title: "Pemilihan Ketua OSIM 2025/2026", date: "20 Jan 2025", category: "Organisasi", img: "/assets/berita-3.jpg", desc: "Siswa-siswi MTs Sindangraja melaksanakan pemilihan ketua OSIM 2025/2026." },
            { id: 4, title: "Juara 3 Pidato Arab", date: "31 Okt 2024", category: "Prestasi", img: "/assets/berita-4.jpg", desc: "Upacara pelantikan pengurus OSIS baru dipimpin langsung oleh Kepala Sekolah dan berjalan dengan khidmat." },
            { id: 5, title: "Juara 3 Badminton Putri", date: "31 Okt 2024", category: "Prestasi", img: "/assets/berita-5.jpg", desc: "Dalam POSHAB (Pekan Olahraga dan hari Amal Bakti)Kemenag Tingkat KKM se-kabupaten Tasikmlaya Utara." },
            { id: 6, title: "Juara 3 pidato inggris putra", date: "31 Okt 2024", category: "Prestasi", img: "/assets/berita-6.jpg", desc: "Dalam POSHAB ( Pekan Olahraga dan hari amal bakti)Kemenag Tingkat KKM se-Kabupaten Tasikmalaya Utara." },
            
            // Halaman 2 (Menggunakan ulang 6 gambar Anda untuk demo paginasi)
            { id: 7, title: " Juara 1 Kaligrafi Putra", date: "31 Okt 2024", category: "Prestasi", img: "/assets/berita-1-2.jpg", desc: "Dalam POSHAB (Pekan Olahraga dan Hari Amal Bakti)Kemenag Tingkat KKM Se-Kabupaten Tasikmalaya Utara " },
            { id: 8, title: "Juara 1 MTQ Putri", date: "31 Okt 2024", category: "Prestasi", img: "/assets/berita-2-2.jpg", desc: "Dalam POSHAB (Pekan Olahraga dan Hari Amal Bakti)Kemenag Tingkat KKM Se-Kabupaten Tasikmalaya Utara" },
            { id: 9, title: "Juara 1 Atletik Putra", date: "31 Okt 2024", category: "Prestasi", img: "/assets/berita-3-2.jpg", desc: "Dalam POSHAB (Pekan Olahraga dan Hari Amal Bakti)Kemenag Tingkat KKM Se-Kabupaten Utara" },
            { id: 10, title: "Juara 2 Utama Hiking Putra Kompas 9 Se-Jawa Barat", date: "26 Okt 2024", category: "Prestasi", img: "/assets/berita-4-2.jpg", desc: "Dalam Kejuara Kepramuka KOMPAS ( Kompetisi Pramukan Mansatas) Se-Jawa Barat di 1 MAN 1 Kota Tasikmalaya" },
            { id: 11, title: "Juara Mendali Perak", date: "1 Jan 2023", category: "Prestasi", img: "/assets/berita-5-2.jpg", desc: "Dalam Kejuaran Nasional Karate Jenjang Pendidikan Islam Se-Indonesia" },
            { id: 12, title: "Juara Mendali Emas", date: "28 Nov 2023", category: "Prestasi", img: "/assets/berita-6-2.jpg", desc: "Pada Kelas Kata Perorangan Putri Kejuaraan Provinsi Jawa Barat" },
           
            // Halaman 3 (Hanya 1 item, menggunakan gambar pertama lagi)
            { id: 13, title: "Juara Mendali Emas", date: "1 Jan 2023", category: "Prestasi", img: "/assets/berita-1-3.jpg", desc: "Dalam Kejuaraan Nasional Karate Jenjang Pendidikan Islam Se-Idonesia" }
        ]
    };

    // Helper Function untuk membuat HTML Kartu Berita
    function createNewsCard(item) {
        // Path gambar sekarang langsung dari DB
        let imageUrl = item.img; 

        return `
         <div class="glass-card overflow-hidden group h-full flex flex-col">
            <div class="relative h-56 overflow-hidden">
                <img src="${imageUrl}" alt="${item.title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" onerror="this.src='https://placehold.co/600x400/e0e0e0/909090?text=Gagal+Muat';">
                <span class="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">${item.category}</span>
            </div>
            <div class="p-6 flex-grow flex flex-col">
                <span class="text-gray-500 text-xs font-medium mb-2">${item.date}</span>
                <h3 class="font-bold text-xl mb-3 group-hover:text-blue-600 transition">${item.title}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">${item.desc}</p>
                <a href="#" class="mt-auto text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
         </div>
        `;
    }

    // Render Berita di Halaman Utama (index.html)
    const homeNewsContainer = document.getElementById('home-news-container');
    if (homeNewsContainer) {
        homeNewsContainer.innerHTML = DB.news.slice(0, 3).map(createNewsCard).join('');
        lucide.createIcons();
        setTimeout(reveal, 100);
    }

    // Render Berita di Halaman Berita (berita.html) dengan Paginasi
    const newsGrid = document.getElementById('news-grid');
    const pagination = document.getElementById('pagination');
    if (newsGrid && pagination) {
        const ITEMS_PER_PAGE = 6;
        let currentPage = 1;

        function renderPage(page) {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const pageItems = DB.news.slice(start, end);
            
            newsGrid.innerHTML = pageItems.map((item, index) => {
                const card = createNewsCard(item);
                return `<div class="reveal" style="transition-delay: ${index * 100}ms">${card}</div>`;
            }).join('');
            
            renderPagination(page);
            lucide.createIcons();
            setTimeout(reveal, 100);
        }

        function renderPagination(current) {
            const totalPages = Math.ceil(DB.news.length / ITEMS_PER_PAGE);
            pagination.innerHTML = ''; 

            if (current > 1) {
                const prevButton = document.createElement('button');
                prevButton.innerHTML = `<i data-lucide="chevron-left" class="w-5 h-5"></i>`;
                prevButton.className = "w-10 h-10 rounded-full font-bold transition-all bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center";
                prevButton.onclick = () => {
                    currentPage--;
                    renderPage(currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                pagination.appendChild(prevButton);
            }

            for (let i = 1; i <= totalPages; i++) {
                const activeClass = i === current ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100';
                const button = document.createElement('button');
                button.innerHTML = i;
                button.className = `w-10 h-10 rounded-full font-bold transition-all ${activeClass}`;
                button.onclick = () => {
                    currentPage = i;
                    renderPage(i);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                pagination.appendChild(button);
            }

            if (current < totalPages) {
                const nextButton = document.createElement('button');
                nextButton.innerHTML = `<i data-lucide="chevron-right" class="w-5 h-5"></i>`;
                nextButton.className = "w-10 h-10 rounded-full font-bold transition-all bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center";
                nextButton.onclick = () => {
                    currentPage++;
                    renderPage(currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                pagination.appendChild(nextButton);
            }
            
            lucide.createIcons();
        }
        
        renderPage(1);
    }

    // --- 6. FITUR PENCARIAN BERITA (Tambahkan sebelum penutup DOMContentLoaded) ---
    const searchInput = document.getElementById('search-news');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = DB.news.filter(news => 
                news.title.toLowerCase().includes(keyword) ||
                news.desc.toLowerCase().includes(keyword) ||
                news.category.toLowerCase().includes(keyword)
            );
            
            newsGrid.innerHTML = filtered.length > 0 
                ? filtered.map(createNewsCard).join('')
                : '<div class="col-span-full text-center py-12"><p class="text-gray-500 text-lg">Tidak ada berita dengan kata kunci: "<strong>' + keyword + '</strong>"</p></div>';
            
            pagination.innerHTML = '';
            lucide.createIcons();
        });
    }

});