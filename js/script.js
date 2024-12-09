document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section, header");
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Função para rolar até uma seção
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: "smooth" });
            currentSectionIndex = index;
        }
    }

    // Detectar o rolamento do mouse
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return; // Evitar múltiplos eventos simultâneos
        isScrolling = true;

        if (e.deltaY > 0) {
            // Rolamento para baixo
            scrollToSection(currentSectionIndex + 1);
        } else {
            // Rolamento para cima
            scrollToSection(currentSectionIndex - 1);
        }

        setTimeout(() => {
            isScrolling = false; // Permitir outro evento após a animação
        }, 1000); // Tempo da animação
    });

    // Rolagem suave ao clicar nos links do menu
    document.querySelectorAll(".navbar a[href^='#']").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Atualizar o índice da seção atual
            currentSectionIndex = Array.from(sections).indexOf(targetSection);
        });
    });

    // Animação ao aparecer no viewport
    const projectItems = document.querySelectorAll(".project-item");

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateProjects() {
        projectItems.forEach((item) => {
            if (isInViewport(item)) {
                item.classList.add("animate");
            }
        });
    }

    // Verificar animações no scroll
    window.addEventListener("scroll", animateProjects);

    // Verificar inicialmente
    animateProjects();
});

// Função para redirecionar à página "about.html"
function goToAbout() {
    window.location.href = "about.html"; // Direcione para a página "about.html"
}
