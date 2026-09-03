// UTDR Castellano — interacciones básicas

document.addEventListener("DOMContentLoaded", () => {
  setHeroEyebrowText();
  setupNavToggle();
  setupAccordion();
});

// El texto de la máquina de escribir se pinta por CSS (steps),
// pero necesita el texto real en el DOM antes de animarse.
function setHeroEyebrowText() {
  const el = document.getElementById("heroEyebrow");
  if (!el) return;
  el.textContent = "Un equipo de fans, un montón de diálogos";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.style.animation = "none";
    el.style.width = "auto";
    el.style.borderRight = "none";
  }
}

function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupAccordion() {
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    if (!panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });
}
