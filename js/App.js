document.getElementById("btnNavMenu").addEventListener("click", toggleNavMenu);

function toggleNavMenu() {
    let navMenu = document.getElementById("navMenu");
    if (navMenu.classList.contains("header__nav--hidden")) {
        navMenu.classList.remove("header__nav--hidden");
    } else {
        navMenu.classList.add("header__nav--hidden");
    }
}