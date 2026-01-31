
const getId = id => document.getElementById(id);

const firstName = getId("firstName");
const lastName = getId("lastName");
const email = getId("email");
const createBtn = getId("createBtn");
const deleteAllIcon = getId("deleteAllIcon");
const errorMsg = getId("error_message");
const tbody = getId("tbody");
const themeIcon = getId("ThemeIcon");

const searchIpt = document.querySelector(".searchIpt");
const navbar = document.querySelector(".navbar");
const bars = document.querySelector(".bars");
const navLinks = document.querySelector(".nav-links");
const container = document.querySelector(".container");


// ========== Data ==========
let users = JSON.parse(localStorage.getItem("dataUser")) || [];
let mode = "create";
let editId = null;


// ========== save data ==========
let save = () => {
    localStorage.setItem("dataUser", JSON.stringify(users));
}

//========== Clear Inputs ==========
const clear = () => {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
};

const valid = () => {
    const name = /^[A-Za-z\s]+$/;
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        name.test(firstName.value) &&
        name.test(lastName.value) &&
        mail.test(email.value)
    );
};
// ========== Create / Update ==========
createBtn.onclick = () => {

    if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim()) {
        return alert("Please fill all fields ");
    } else if (!valid()) {
        return errorMsg.innerHTML = `
                                        invalid Data <i class="fa-solid fa-triangle-exclamation"></i>
                                       <br>
                                       <div> please use letters only [a-z] for the name and enter a valid email addres</div>
        `;
    }

    const user = {
        fullName: `${firstName.value.trim()} ${lastName.value.trim()}`.toLowerCase(),
        email: email.value.trim().toLowerCase()
    };
    if (mode === "create") {
        users.push(user);
    } else {
        users[editId] = user;

        mode = "create";
        createBtn.textContent = "Create Account";
        createBtn.style.background = "linear-gradient(45deg,var(--red),var(--light_red))";
    }


    save();
    clear();
    showData();
    errorMsg.textContent = "";
};

// ========== Show Data (Render)==========

function showData(list = users) {
    tbody.innerHTML = list.map((u, i) => `
        <tr>
            <td>${u.fullName}</td>
            <td>${u.email}</td>

            <td>
                <i data-edit="${i}" class="fa-solid fa-pen updateIcon"></i>
            </td>

            <td>
                <i data-del="${i}" class="fa-solid fa-trash deleteIcon"></i>
            </td>
        </tr>
    `).join("");

    deleteAllIcon.style.display = users.length > 0 ? "block" : "none";
    searchIpt.style.display = users.length > 0 ? "block" : "none";

    deleteAllIcon.textContent = `(${users.length})`;
} showData();

// ========== Table Actions(Update Users and Delete Them) ==========
tbody.onclick = e => {

    const del = e.target.dataset.del;
    const edit = e.target.dataset.edit;

    // Delete
    if (del !== undefined) {
        users.splice(del, 1);
        save();
        showData();
    }
    // Edit
    if (edit !== undefined) {

        const [f, l] = users[edit].fullName.split(" ");

        firstName.value = f;
        lastName.value = l;
        email.value = users[edit].email;

        mode = "update";
        editId = edit;

        createBtn.textContent = "Update";
        createBtn.style.background = "var(--green)";

        scroll({ top: 0, behavior: "smooth" });
    }
};


// ========== Delete All ==========
deleteAllIcon.onclick = () => {

    if (!confirm("Delete all users?")) return;

    users = [];
    save();
    showData();
};


// ========== Search ==========
searchIpt.onkeyup = e => {

    const v = e.target.value.trim().toLowerCase();

    const result = users.filter(u =>
        u.fullName.includes(v)
    );

    showData(result);
};


// ========== Navbar ==========
window.onscroll = () => {
    navbar.classList.toggle("scrolled", scrollY > 50);
};
// ========== Smooth scroll ===========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== Mobile Menu ==========
bars.onclick = () => {
    bars.classList.toggle("active");
    navLinks.classList.toggle("active");
};

document.querySelectorAll(".nav-links a").forEach(a => a.onclick = () => {
    bars.classList.remove("active");
    navLinks.classList.remove("active");
});


// ========== Theme ==========
const theme = JSON.parse(localStorage.getItem("theme")) || {
    bg: "black",
    text: "white"
};

applyTheme();

function applyTheme() {

    container.style.background = theme.bg;
    tbody.style.color = theme.text;

    themeIcon.className =
        theme.bg === "black"
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
}

themeIcon.onclick = () => {

    if (theme.bg === "black") {
        theme.bg = "gray";
        theme.text = "black";
    } else {
        theme.bg = "black";
        theme.text = "white";
    }

    localStorage.setItem("theme", JSON.stringify(theme));
    applyTheme();
};