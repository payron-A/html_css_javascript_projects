// function to get Id 
const getId = id => document.getElementById(id);

// ===greeting ===
(function () {
    const greeting = getId('greeting')
    const date = new Date();
    if (date.getHours() < 12) {
        greeting.textContent = 'Good Morning'
    } else if (date.getHours() > 18) {
        greeting.textContent = 'Good Evening'
    } else {
        greeting.textContent = 'Good Afternoon'
    }
})();

// === Theme ===
function toggelTheme() {
    const topbar = document.querySelector('.topbar');
    topbar.style.background = theme.bg;
    topbar.style.color = theme.cl;
    document.body.style.background = theme.bg;
    document.body.style.color = theme.cl;
}

let themeBtn = getId('themeBtn');
let themeIcon = getId('theme-icon');
const moonIcon = 'fa-solid fa-moon'
const sunIcon = 'fa-solid fa-sun'
let themeLabel = getId('theme-label');

const theme = JSON.parse(localStorage.getItem('theme')) || {
    bg: 'var(--black)',
    cl: 'var(--white)'
}
themeIcon.classList = theme.bg == 'var(--black)' ? moonIcon : sunIcon
themeLabel.textContent = theme.bg == 'var(--black)' ? 'dark' : 'light'

toggelTheme()
themeBtn.onclick = () => {
    if (theme.bg == 'var(--black)') {
        theme.bg = 'var(--white)';
        theme.cl = 'var(--black)'
        themeIcon.classList = sunIcon;
        themeLabel.textContent = 'light'
    } else {
        theme.bg = 'var(--black)'
        theme.cl = 'var(--white)'
        themeLabel.textContent = 'dark'
        themeIcon.classList = moonIcon;
    }
    localStorage.theme = JSON.stringify(theme);
    toggelTheme();
}
