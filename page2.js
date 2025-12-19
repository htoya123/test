const darkness = document.querySelector('.darkness');

function moveLight(x, y) {
    darkness.style.background = `
        radial-gradient(
            circle 140px at ${x}px ${y}px,
            transparent 0%,
            rgba(0,0,0,0.95) 60%
        )
    `;
}

/* Мышь */
document.addEventListener('mousemove', e => {
    moveLight(e.clientX, e.clientY);
});

/* Палец */
document.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    moveLight(touch.clientX, touch.clientY);
});
