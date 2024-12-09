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
});