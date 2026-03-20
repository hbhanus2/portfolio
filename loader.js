// loader.js

// --- 1. The Particle Animation ---
function animateSignal(targetSelector, pathSelector, duration, delay, direction = 'normal') {
    const path = anime.path(pathSelector);
    anime({
        targets: targetSelector,
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'easeInOutSine',
        duration: duration,
        loop: true,
        direction: direction,
        delay: delay,
        opacity: [
            {value: 1, duration: 100, easing: 'linear'},
            {value: 1, duration: duration - 200},
            {value: 0, duration: 100, easing: 'linear'}
        ]
    });
}

// Start animations
document.addEventListener('DOMContentLoaded', () => {
    animateSignal('.s1', '#p_main_curve1', 4000, 0);
    animateSignal('.s2', '#p_main_curve2', 4500, 1000, 'alternate');
    animateSignal('.s3', '#p_center_v', 3000, 500);
    animateSignal('.s4', '#p_diag_tl', 2500, 200);
    animateSignal('.s5', '#p_diag_tr', 2600, 800, 'alternate');
    animateSignal('.s6', '#p_diag_bl', 2700, 1500);
    animateSignal('.s7', '#p_edge_top', 5000, 0, 'alternate');
    animateSignal('.s8', '#p_center_h', 3500, 2000);
});

// --- 2. The Zoom Sequence Logic ---
const wrapper = document.querySelector('.loader-wrapper');

function triggerZoomOut() {
    wrapper.classList.add('zooming');
    
    // After animation completes (1.8s in css), remove/hide
    setTimeout(() => {
        wrapper.classList.add('hidden');
        wrapper.style.display = 'none'; // Ensure it's gone
    }, 1800); 
}

// Wait for full page load
window.addEventListener('load', () => {
    // Optional: minimum visible time for loader (e.g., 2000ms)
    // If page loads fast, we still see the cool animation for a bit
    setTimeout(() => {
        triggerZoomOut();
    }, 2000);
});
