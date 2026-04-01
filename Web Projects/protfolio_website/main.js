
//======= navbar =======
const container = document.querySelector('.container')
const bars = document.querySelector('.bars')
const links = document.querySelector(".links");
bars.onclick = () => {
    links.classList.toggle('active')
    bars.classList.toggle('active')
}
links.onclick = () => {
    links.classList.remove('active')
    bars.classList.remove('active')
}

// ========= smooth scroll =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.onclick = (e) => {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }
})
