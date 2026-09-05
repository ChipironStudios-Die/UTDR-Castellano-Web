// UTDR Castellano — interacciones básicas

document.addEventListener("DOMContentLoaded", () => {
  setHeroEyebrowText();
  setupNavToggle();
  setupAccordion();
});

// El texto de la máquina de escribir necesita el texto real en el DOM
// antes de animarse. El ancho final se calcula aquí (en vez de fijarlo
// a mano en CSS con "ch"), midiendo el ancho ya renderizado con la
// tipografía definitiva. Así la animación siempre encaja con el texto
// exacto, sea cual sea su longitud o el ancho real de cada carácter.
function setHeroEyebrowText() {
  const el = document.getElementById("heroEyebrow");
  if (!el) return;

  const text = "Faltándole el respeto a la visión de Tobías Zorro";
  el.textContent = text;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.style.animation = "none";
    el.style.width = "auto";
    el.style.borderRight = "none";
    return;
  }

  const startTyping = () => {
    // scrollWidth incluye el padding pero no el borde, así que sumamos
    // aparte el grosor del borde-cursor para que el ancho final (en
    // border-box) coincida exactamente con el texto renderizado.
    const borderWidth = parseFloat(getComputedStyle(el).borderRightWidth) || 0;
    const targetWidth = el.scrollWidth + borderWidth;
    el.style.transition = `width 2s steps(${text.length}, end)`;
    requestAnimationFrame(() => {
      el.style.width = `${targetWidth}px`;
    });
  };

  // Esperamos a que las fuentes (UTFont/Silkscreen) estén cargadas para
  // medir sobre el ancho definitivo y no sobre la fuente de reserva.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(startTyping);
  } else {
    startTyping();
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
