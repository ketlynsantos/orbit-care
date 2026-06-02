const sidebar = document.querySelector(".sidebar");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--collapsed");
});