// 更新数字显示
function updateDisplay(id, number) {
    const element = document.getElementById(id);
    if (!element) return;
    const numbers = element.querySelectorAll('.number');
    numbers.forEach(num => num.textContent = number);
}

// 倒计时功能
function updateCountdown() {
    const newYear = new Date('January 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = newYear - now;

    if (gap <= 0) {
        clearInterval(countdownTimer);
        document.querySelector('.message').innerText = '新年快乐！';
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

    // 更新天数（三位数）
    const daysStr = d.toString().padStart(3, '0');
    updateDisplay('days-hundreds', daysStr[0]);
    updateDisplay('days-tens', daysStr[1]);
    updateDisplay('days-ones', daysStr[2]);

    // 更新时分秒
    updateDisplay('hours-tens', Math.floor(h / 10));
    updateDisplay('hours-ones', h % 10);
    updateDisplay('minutes-tens', Math.floor(m / 10));
    updateDisplay('minutes-ones', m % 10);
    updateDisplay('seconds-tens', Math.floor(s / 10));
    updateDisplay('seconds-ones', s % 10);
}

// 立即更新一次
updateCountdown();
// 设置定时器
const countdownTimer = setInterval(updateCountdown, 1000); 