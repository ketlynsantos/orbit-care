const sidebar = document.querySelector(".sidebar");
const menuToggle = document.getElementById("menuToggle");
const backdrop = document.querySelector(".sidebar-backdrop");

menuToggle.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle("sidebar--opened");
        backdrop.classList.toggle("sidebar-backdrop--active");
    } else {
        sidebar.classList.toggle("sidebar--collapsed");
    }
});

backdrop.addEventListener("click", () => {
    sidebar.classList.remove("sidebar--opened");
    backdrop.classList.remove("sidebar-backdrop--active");
});