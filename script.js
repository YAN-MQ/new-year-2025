// 倒计时功能
function updateCountdown() {
    const newYear = new Date('January 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = newYear - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');

    if (gap <= 0) {
        clearInterval(countdownTimer);
        document.querySelector('.message p').innerText = '新年快乐！';
        createFireworks();
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// 烟花效果
function createFireworks() {
    const fireworks = document.getElementById('fireworks');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight;
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 3;
        const lifetime = 1000 + Math.random() * 1000;
        
        let x = startX;
        let y = startY;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        
        fireworks.appendChild(particle);
        
        const start = Date.now();
        
        function update() {
            const elapsed = Date.now() - start;
            if (elapsed > lifetime) {
                particle.remove();
                return;
            }
            
            vy += 0.1; // 重力
            x += vx;
            y += vy;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = 1 - elapsed / lifetime;
            
            requestAnimationFrame(update);
        }
        
        update();
    }
    
    function createFirework() {
        for (let i = 0; i < 50; i++) {
            createParticle();
        }
    }
    
    setInterval(createFirework, 2000);
    createFirework();
} 