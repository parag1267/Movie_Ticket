// Sidebar active color change Admin Panel
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});