// --- Canvas setup ---
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// --- Particles ---
let particles = [];
const MAX_PARTICLES = 69;
let activeFireworks = 0; // счетчик активных салютов
const MAX_FIREWORKS = 1;  // максимум одновременно

function spawnExplosion(x, y, count = 50) {
    if (activeFireworks >= MAX_FIREWORKS) return; // ограничение
    activeFireworks++;

    for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) break;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 80 + Math.random() * 20,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360},100%,60%)`,
            heart: false,
            parentFirework: activeFireworks
        });
    }

    // Снимаем салют через ~1.5 сек
    setTimeout(() => { activeFireworks--; }, 1500);
}

function spawnHearts(count = 10) {
    for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) break;
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            vx: (Math.random() - 0.5) * 1,
            vy: -Math.random() * 2 - 1,
            life: 200,
            size: Math.random() * 6 + 4,
            heart: true
        });
    }
}

// --- Animation ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.heart) {
            ctx.font = `${p.size * 3}px Arial`;
            ctx.fillStyle = `rgba(255,0,100,${p.life/200})`;
            ctx.fillText("❤️", p.x, p.y);
        } else {
            ctx.fillStyle = `hsla(${Math.random() * 360},100%,60%,${p.life/100})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // удаляем мёртвые частицы
    particles = particles.filter(p => p.life > 0);

    requestAnimationFrame(draw);
}
draw();

// --- Эффекты с лимитом ---
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    spawnExplosion(x, y, 50);
    spawnHearts(8);
}, 1000);

// Салют в центре с лимитом
setInterval(() => {
    spawnExplosion(canvas.width / 2, canvas.height / 2, 80);
}, 3000);
