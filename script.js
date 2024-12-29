// 翻页动画类
class FlipCard {
    constructor(element) {
        this.element = element;
        this.topNumber = element.querySelector('.number:first-child');
        this.bottomNumber = element.querySelector('.number:last-child');
        this.currentNumber = this.topNumber.textContent;
    }

    flip(newNumber) {
        if (this.currentNumber === newNumber.toString()) return;

        // 创建翻页动画元素
        const flipTop = document.createElement('div');
        flipTop.className = 'number flip-top';
        flipTop.textContent = this.currentNumber;

        const flipBottom = document.createElement('div');
        flipBottom.className = 'number flip-bottom';
        flipBottom.textContent = newNumber;

        // 添加翻页元素
        this.element.appendChild(flipTop);
        this.element.appendChild(flipBottom);

        // 开始动画
        requestAnimationFrame(() => {
            flipTop.style.transform = 'rotateX(-180deg)';
            flipBottom.style.transform = 'rotateX(0)';
        });

        // 动画结束后更新数字
        setTimeout(() => {
            this.topNumber.textContent = newNumber;
            this.bottomNumber.textContent = newNumber;
            this.currentNumber = newNumber.toString();
            flipTop.remove();
            flipBottom.remove();
        }, 300);
    }
}

// 初始化所有翻页卡片
const flipCards = {};
['days-hundreds', 'days-tens', 'days-ones', 
 'hours-tens', 'hours-ones', 
 'minutes-tens', 'minutes-ones', 
 'seconds-tens', 'seconds-ones'].forEach(id => {
    flipCards[id] = new FlipCard(document.getElementById(id));
});

// 更新数字显示
function updateDisplay(id, number) {
    if (id === 'days') {
        const hundreds = Math.floor(number / 100);
        const tens = Math.floor((number % 100) / 10);
        const ones = number % 10;
        
        flipCards['days-hundreds'].flip(hundreds);
        flipCards['days-tens'].flip(tens);
        flipCards['days-ones'].flip(ones);
    } else {
        const tens = Math.floor(number / 10);
        const ones = number % 10;
        
        flipCards[`${id}-tens`].flip(tens);
        flipCards[`${id}-ones`].flip(ones);
    }
}

// 倒计时功能
function updateCountdown() {
    const newYear = new Date('January 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = newYear - now;

    if (gap <= 0) {
        clearInterval(countdownTimer);
        document.querySelector('.message p').innerText = '新年快乐！';
        createFireworks();
        playNewYearMusic();
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    updateDisplay('days', d);
    updateDisplay('hours', h);
    updateDisplay('minutes', m);
    updateDisplay('seconds', s);
}

// 立即更新一次
updateCountdown();
// 设置定时器
const countdownTimer = setInterval(updateCountdown, 1000);

// 播放新年音乐
function playNewYearMusic() {
    const audio = new Audio('https://music.163.com/song/media/outer/url?id=865632948.mp3');
    audio.play();
}

// 烟花效果
function createFireworks() {
    const fireworks = document.getElementById('fireworks');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
    
    function createParticle(startX, startY) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${6 + Math.random() * 4}px ${particle.style.background}`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 5;
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
            
            vy += 0.08;
            x += vx;
            y += vy;
            
            particle.style.opacity = (1 - elapsed / lifetime) * (0.8 + Math.random() * 0.2);
            particle.style.transform = `translate(${x}px, ${y}px) scale(${1 - elapsed / lifetime})`;
            
            requestAnimationFrame(update);
        }
        
        update();
    }
    
    function createFirework() {
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const targetY = window.innerHeight * 0.2 + Math.random() * window.innerHeight * 0.3;
        
        const trail = document.createElement('div');
        trail.style.position = 'absolute';
        trail.style.width = '2px';
        trail.style.height = '2px';
        trail.style.background = '#fff';
        trail.style.borderRadius = '50%';
        trail.style.boxShadow = '0 0 6px #fff';
        
        fireworks.appendChild(trail);
        
        let y = startY;
        const speed = 15;
        
        function ascend() {
            if (y > targetY) {
                y -= speed;
                trail.style.transform = `translate(${startX}px, ${y}px)`;
                requestAnimationFrame(ascend);
            } else {
                trail.remove();
                for (let i = 0; i < 80; i++) {
                    createParticle(startX, y);
                }
            }
        }
        
        ascend();
    }
    
    function startFireworks() {
        createFirework();
        const delay = 200 + Math.random() * 1000;
        setTimeout(startFireworks, delay);
    }
    
    startFireworks();
} 