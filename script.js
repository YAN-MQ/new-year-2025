// 翻页动画类
class FlipCard {
    constructor(element) {
        this.element = element;
        this.topNumber = element.querySelector('.top');
        this.bottomNumber = element.querySelector('.bottom');
        this.currentNumber = this.topNumber.textContent;
    }

    flip(newNumber) {
        if (this.currentNumber === newNumber.toString()) return;

        // 创建翻页动画元素
        const flipTop = document.createElement('div');
        flipTop.className = 'top';
        flipTop.textContent = this.currentNumber;
        flipTop.style.transformOrigin = 'bottom';
        flipTop.style.position = 'absolute';
        flipTop.style.zIndex = '2';

        const flipBottom = document.createElement('div');
        flipBottom.className = 'bottom';
        flipBottom.textContent = newNumber;
        flipBottom.style.transformOrigin = 'top';
        flipBottom.style.position = 'absolute';
        flipBottom.style.zIndex = '1';
        flipBottom.style.top = '50%';

        // 添加翻页元素
        this.element.appendChild(flipTop);
        this.element.appendChild(flipBottom);

        // 开始动画
        requestAnimationFrame(() => {
            this.element.classList.add('flip');
            flipTop.style.transform = 'rotateX(-180deg)';
            flipBottom.style.transform = 'rotateX(0)';
        });

        // 动画结束后更新数字
        setTimeout(() => {
            this.topNumber.textContent = newNumber;
            this.bottomNumber.textContent = newNumber;
            this.currentNumber = newNumber.toString();
            this.element.classList.remove('flip');
            flipTop.remove();
            flipBottom.remove();
        }, 600);
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