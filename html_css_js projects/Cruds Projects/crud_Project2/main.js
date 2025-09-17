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
