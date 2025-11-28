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
            { id: 1, title: "Juara 1 Lomba Robotik Nasional", date: "12 Nov 2025", category: "Prestasi", img: "/assets/berita-1.jpg", desc: "Tim Robotik SMA Kuningan berhasil menyabet medali emas dalam kompetisi robotik tingkat nasional di Jakarta." },
            { id: 2, title: "Pentas Seni Tahunan 2025 'Gelora Karsa'", date: "10 Nov 2025", category: "Kegiatan", img: "/assets/berita-2.jpg", desc: "Kemeriahan pensi tahun ini sukses digelar, menghadirkan bakat-bakat terbaik siswa dan bintang tamu ternama." },
            { id: 3, title: "Kunjungan Studi ke Museum Geologi Bandung", date: "05 Nov 2025", category: "Akademik", img: "/assets/berita-3.jpg", desc: "Siswa kelas X program IPA melakukan studi lapangan untuk belajar langsung tentang sejarah formasi bumi dan fosil." },
            { id: 4, title: "Pelantikan OSIS Masa Bakti 2025/2026", date: "01 Nov 2025", category: "Organisasi", img: "/assets/berita-4.jpg", desc: "Upacara pelantikan pengurus OSIS baru dipimpin langsung oleh Kepala Sekolah dan berjalan dengan khidmat." },
            { id: 5, title: "Workshop Digital Marketing untuk Kelas XII", date: "28 Okt 2025", category: "Workshop", img: "/assets/berita-5.jpg", desc: "Membekali siswa dengan skill kewirausahaan digital sebagai persiapan pasca-kelulusan." },
            { id: 6, title: "Tim Basket Putra Lolos ke Final DBL", date: "25 Okt 2025", category: "Olahraga", img: "/assets/berita-6.jpg", desc: "Perjuangan sengit tim basket membuahkan hasil manis, melaju ke final DBL Series Jawa Barat." },
            
            // Halaman 2 (Menggunakan ulang 6 gambar Anda untuk demo paginasi)
            { id: 7, title: "Sosialisasi Bahaya Narkoba oleh BNN", date: "20 Okt 2025", category: "Penyuluhan", img: "/assets/berita-1-2.jpg", desc: "Bekerjasama dengan BNN Kabupaten Kuningan, sekolah mengadakan penyuluhan anti-narkoba untuk seluruh siswa." },
            { id: 8, title: "Aksi Donor Darah Sukarela PMR", date: "15 Okt 2025", category: "Sosial", img: "/assets/berita-2-2.jpg", desc: "Aksi kemanusiaan yang diinisiasi oleh PMR Wira SMA Kuningan berhasil mengumpulkan 150 kantong darah." },
            { id: 9, title: "Upacara Peringatan Hari Kesaktian Pancasila", date: "01 Okt 2025", category: "Upacara", img: "/assets/berita-3-2.jpg", desc: "Memperingati jasa pahlawan revolusi dan meneguhkan komitmen terhadap nilai-nilai Pancasila." },
            { id: 10, title: "Lomba Kebersihan Antar Kelas Dimulai", date: "28 Sep 2025", category: "Lingkungan", img: "/assets/berita-4-2.jpg", desc: "Menciptakan lingkungan belajar yang nyaman, bersih, dan asri melalui kompetisi sehat antar kelas." },
            { id: 11, title: "Rapat Koordinasi Orang Tua Siswa Kelas XII", date: "25 Sep 2025", category: "Rapat", img: "/assets/berita-5-2.jpg", desc: "Sinergi antara sekolah dan orang tua untuk mempersiapkan kesuksesan Ujian Nasional dan Seleksi PTN." },
            { id: 12, title: "Pelatihan Guru Inovatif Era AI", date: "20 Sep 2025", category: "Diklat", img: "/assets/berita-6-2.jpg", desc: "Meningkatkan kompetensi pengajar dalam mengintegrasikan teknologi Artifical Intelligence dalam pembelajaran." },
           
            // Halaman 3 (Hanya 1 item, menggunakan gambar pertama lagi)
            { id: 13, title: "Renovasi dan Perluasan Masjid Sekolah", date: "15 Sep 2025", category: "Fasilitas", img: "/assets/berita-1.jpg", desc: "Proses renovasi masjid sekolah dimulai untuk menambah daya tampung dan kenyamanan ibadah siswa." }
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
});