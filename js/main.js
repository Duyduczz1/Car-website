/* =============================================
   BMW DARK THEME — main.js
   ============================================= */

// ── Custom cursor ──
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .car-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '54px';
        ring.style.height = '54px';
        ring.style.marginLeft = '-9px';
        ring.style.marginTop = '-9px';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.marginLeft = '0';
        ring.style.marginTop = '0';
    });
});

// ── Speed lines khi load trang ──
const sl = document.getElementById('speedLines');

function makeSpeedLines() {
    for (let i = 0; i < 14; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.cssText = `
      top: ${20 + Math.random() * 60}%;
      left: 0; right: 0;
      width: ${120 + Math.random() * 200}px;
      animation-delay: ${Math.random() * 0.8}s;
      animation-duration: ${0.6 + Math.random() * 0.6}s;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
        sl.appendChild(line);
    }
}

makeSpeedLines();

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .car-card, .review-card').forEach(el => {
    revealObserver.observe(el);
});

// Stagger delay cho car cards
document.querySelectorAll('.car-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
});

// Stagger delay cho review cards
document.querySelectorAll('.review-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
});

// ── Stats counter animation ──
const statNums = document.querySelectorAll('.stat-num');
const targets = [109, 7, 600, 5];
const suffixes = ['+', '+', '+', '★'];

const statObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = targets[idx];
            const suffix = suffixes[idx];
            let current = 0;
            const step = Math.ceil(target / 40);

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.innerHTML = `${target}<span>${suffix}</span>`;
                    clearInterval(timer);
                } else {
                    el.innerHTML = `${current}<span>${suffix}</span>`;
                }
            }, 30);

            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));