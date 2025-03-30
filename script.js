// script.js
const container = document.querySelector('.simulation-container');
const nucleus = document.querySelector('.nucleus');
const alphaParticlesContainer = document.querySelector('.alpha-particles');

const numParticles = 50;
const speed = 2;
const nucleusRadius = 10; // Radius of the nucleus
const alphaRadius = 5; // Radius of alpha particles

function createAlphaParticle() {
    const alpha = document.createElement('div');
    alpha.classList.add('alpha-particle');
    alphaParticlesContainer.appendChild(alpha);
    return alpha;
}

function getRandomPosition() {
    return Math.random() * window.innerWidth;
}

function moveAlphaParticle(alpha) {
    let x = getRandomPosition();
    let y = 0;

    alpha.style.left = `${x}px`;
    alpha.style.top = `${y}px`;

    function animate() {
        y += speed;
        alpha.style.top = `${y}px`;

        // Check for collision with the nucleus
        const nucleusRect = nucleus.getBoundingClientRect();
        const alphaRect = alpha.getBoundingClientRect();

        const dx = nucleusRect.left + nucleusRect.width / 2 - (alphaRect.left + alphaRect.width / 2);
        const dy = nucleusRect.top + nucleusRect.height / 2 - (alphaRect.top + alphaRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < nucleusRadius + alphaRadius) {
            // Simulate scattering by changing direction
            x += (Math.random() - 0.5) * 20;
        }

        alpha.style.left = `${x}px`;

        if (y < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            alpha.remove();
        }
    }

    requestAnimationFrame(animate);
}

for (let i = 0; i < numParticles; i++) {
    const alpha = createAlphaParticle();
    moveAlphaParticle(alpha);
}