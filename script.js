document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Content
    loadMessage();
    loadTimeline();
    loadGallery();

    // 2. Floating Elements
    createBalloons(15);
    createHearts(15);

    // 3. Fade-in on Scroll
    initScrollAnimations();

    // 4. Hero Button
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        document.getElementById('message-section').scrollIntoView({ behavior: 'smooth' });
        burstConfetti();
    });

    // 5. Candle Interaction
    const flame = document.getElementById('flame');
    flame.addEventListener('click', blowOutCandle);

    // 6. Baby Reveal
    setupBabyReveal();

    // Initial Confetti
    setTimeout(burstConfetti, 1000);
});

async function loadMessage() {
    try {
        const response = await fetch('message.txt');
        const text = await response.text();
        const container = document.getElementById('message-content');
        
        const paragraphs = text.split('\n\n');
        container.innerHTML = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
    } catch (error) {
        console.error('Error loading message:', error);
    }
}

function loadTimeline() {
    const events = [
        {
            year: "11 Birthdays Together",
            text: "Eleven beautiful years of celebrating you. Year after year, your day keeps getting better because we keep building a life worth celebrating.",
            side: "left"
        },
        {
            year: "2024: Our First Home",
            text: "The year we turned a dream into reality. Buying our home together was the start of our forever sanctuary.",
            side: "right"
        },
        {
            year: "2025: Renovating with Love",
            text: "Poured our hearts into every corner of our house. Hand in hand, we built the foundation for our future.",
            side: "left"
        },
        {
            year: "2026: Our Greatest Adventure",
            text: "Embarking on our most significant chapter yet—welcoming our child together. You are going to be the most incredible mother.",
            side: "right"
        }
    ];

    const timeline = document.getElementById('timeline');
    events.forEach(event => {
        const item = document.createElement('div');
        item.className = `timeline-item ${event.side} fade-in`;
        
        const content = document.createElement('div');
        content.className = 'timeline-content';
        
        const h3 = document.createElement('h3');
        h3.textContent = event.year;
        
        const p = document.createElement('p');
        p.textContent = event.text;
        
        content.appendChild(h3);
        content.appendChild(p);
        item.appendChild(content);
        timeline.appendChild(item);
    });
}

function loadGallery() {
    const images = [
        '1c9b5d20-2202-4a5d-9045-eff513a979a3.jpg',
        'IMG_0433.jpg',
        'IMG_0656.jpg',
        'IMG_0793.jpg',
        'IMG_1093.jpg',
        'IMG_1272.jpg',
        'IMG_1519.jpg',
        'IMG_1602.jpg',
        'IMG_2009.jpg',
        'IMG_20200813_222443.jpg',
        'IMG_20211216_182254.jpg',
        'IMG_20220412_192807.jpg',
        'IMG_2865.jpg',
        'IMG_3405.jpg',
        'IMG_3661.jpg',
        'IMG_4561.jpg',
        'IMG_4914.jpg',
        'IMG_5653.jpg',
        'IMG_6209.JPG',
        'IMG_8057.JPG',
        'IMG_9964.JPG'
    ];

    const grid = document.getElementById('gallery-grid');
    images.forEach(imgName => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = `images/${imgName}`;
        img.alt = 'Memory with Paulina';
        img.loading = 'lazy';
        
        item.appendChild(img);
        grid.appendChild(item);
    });
}

function createHearts(count) {
    const container = document.getElementById('balloons-container');
    const hearts = ['❤️', '💖', '💗', '💓', '💕'];

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * (30 - 15) + 15}px`;
        
        const duration = Math.random() * (15 - 8) + 8;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(heart);
    }
}

function createBalloons(count) {
    const container = document.getElementById('balloons-container');
    const colors = ['#ff4d94', '#ff80bf', '#ffccd5', '#d63384', '#ffb3d9'];

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        const size = Math.random() * (60 - 30) + 30;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;
        
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = Math.random() * (20 - 10) + 10;
        balloon.style.animationName = 'float-up';
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(balloon);
    }
}

function initScrollAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.01,
        rootMargin: '0px 0px 100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeEls.forEach(el => observer.observe(el));

    // Force reveal elements after a delay if they haven't appeared (mobile fix)
    setTimeout(() => {
        fadeEls.forEach(el => el.classList.add('appear'));
    }, 2000);
}

function burstConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d94', '#ffccd5', '#d63384', '#ffffff', '#d4af37']
    });
}

function blowOutCandle() {
    const flame = document.getElementById('flame');
    if (!flame.classList.contains('out')) {
        flame.classList.add('out');
        
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4d94', '#ffccd5']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#d63384', '#d4af37']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        setTimeout(() => {
            flame.classList.remove('out');
        }, 5000);
    }
}

function setupBabyReveal() {
    const babyBtn = document.getElementById("babyBtn");
    const babyOverlay = document.getElementById("babyOverlay");
    const babyClose = document.getElementById("babyClose");
    const floatingHeartsEl = document.getElementById("floatingHearts");

    if (!babyBtn || !babyOverlay) return;

    babyBtn.addEventListener("click", openOverlay);
    babyClose.addEventListener("click", closeOverlay);
    babyOverlay.addEventListener("click", (e) => {
        if (e.target === babyOverlay) closeOverlay();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeOverlay();
    });

    function openOverlay() {
        babyOverlay.classList.add("active");
        babyOverlay.setAttribute("aria-hidden", "false");
        spawnHearts();
    }

    function closeOverlay() {
        babyOverlay.classList.remove("active");
        babyOverlay.setAttribute("aria-hidden", "true");
        floatingHeartsEl.innerHTML = "";
    }

    function spawnHearts() {
        floatingHeartsEl.innerHTML = "";
        const icons = ["💙", "⭐", "🌟", "💫", "👶", "💙", "💙", "✨"];
        const count = window.innerWidth < 600 ? 16 : 28;
        for (let i = 0; i < count; i += 1) {
            const el = document.createElement("span");
            el.className = "fh";
            el.setAttribute("aria-hidden", "true");
            el.textContent = icons[Math.floor(Math.random() * icons.length)];
            const size = Math.random() * 18 + 16;
            const dur = Math.random() * 4 + 4;
            const delay = Math.random() * 3;
            el.style.cssText = `--left: ${(Math.random() * 94).toFixed(1)}%; --fs: ${size.toFixed(0)}px; --dur: ${dur.toFixed(1)}s; --delay: ${delay.toFixed(1)}s`;
            floatingHeartsEl.appendChild(el);
        }
    }
}
