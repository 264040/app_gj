// 切换黑夜白天模式
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-switch');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌞'; // 白天模式图标
    } else {
        themeIcon.textContent = '🌙'; // 夜间模式图标
    }
}