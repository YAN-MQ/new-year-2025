// 倒计时功能
function updateCountdown() {
    // 设置目标时间为北京时间2025年1月1日0点
    const newYear = new Date('2025-01-01T00:00:00+08:00').getTime();
    // 获取当前时间
    const now = new Date().getTime();
    // 计算时间差（毫秒）
    const gap = newYear - now;

    // 如果时间到了，显示新年快乐
    if (gap <= 0) {
        document.querySelector('.message').innerText = '新年快乐！';
        clearInterval(countdownTimer);
        return;
    }

    // 计算天、时、分、秒
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    // 计算剩余的天数、小时、分钟和秒数
    const days = Math.floor(gap / DAY);
    const hours = Math.floor((gap % DAY) / HOUR);
    const minutes = Math.floor((gap % HOUR) / MINUTE);
    const seconds = Math.floor((gap % MINUTE) / SECOND);

    // 更新显示，使用padStart确保数字始终占据固定位数
    document.getElementById('days').innerText = days.toString().padStart(3, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

// 页面加载时立即更新一次
updateCountdown();

// 每秒更新一次倒计时
const countdownTimer = setInterval(updateCountdown, 1000);