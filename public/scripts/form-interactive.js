const TEXTAREA_MAX = 500;

/* -------- STAGGERED ENTRY -------- */
function animateEntry() {
  const card = document.querySelector(".form-card");
  const groups = document.querySelectorAll(".form-group");

  if (!card) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        card.classList.add("visible");
        observer.disconnect();

        groups.forEach((g, i) => {
          setTimeout(() => g.classList.add("revealed"), 120 + i * 70);
        });
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(card);
}

/* -------- CHARACTER COUNTER -------- */
function initCharCounter() {
  const textarea = document.querySelector("#message");
  if (!textarea) return;

  const wrapper = textarea.parentElement;
  const counter = document.createElement("div");
  counter.className = "char-counter";
  counter.textContent = `0 / ${TEXTAREA_MAX}`;
  wrapper.after(counter);

  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${TEXTAREA_MAX}`;
    counter.classList.remove("warning", "danger");

    if (len >= TEXTAREA_MAX) {
      textarea.value = textarea.value.slice(0, TEXTAREA_MAX);
      counter.textContent = `${TEXTAREA_MAX} / ${TEXTAREA_MAX}`;
    }

    if (len > TEXTAREA_MAX * 0.85) {
      counter.classList.add("danger");
    } else if (len > TEXTAREA_MAX * 0.65) {
      counter.classList.add("warning");
    }
  });
}

/* -------- RIPPLE EFFECT -------- */
function initRipple() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn || btn.disabled) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

/* -------- TOAST -------- */
function showToast(message) {
  const container = document.querySelector(".toast-container");
  if (!container) return;

  const toast = container.querySelector(".toast");
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;
  toast.className = "toast success";

  container.classList.add("visible");
  setTimeout(() => container.classList.remove("visible"), 3000);
}

/* -------- SUBMIT HANDLER -------- */
function initSubmit() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const btn = form.querySelector(".btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.classList.add("loading");

    const data = new FormData(form);
    const message = buildMessage(data);
    const url = "https://wa.me/50588027299?text=" + encodeURIComponent(message);

    await new Promise((r) => setTimeout(r, 400));

    window.open(url, "_blank");

    btn.classList.remove("loading");
    showToast("¡Mensaje enviado con éxito!");
    form.reset();
  });
}

function buildMessage(data) {
  const lines = [
    "*Nuevo contacto - Energy Ingeniería*",
    "",
    "*Nombre:* " + data.get("name"),
    "*Correo:* " + data.get("email"),
    "*Teléfono:* " + data.get("phone"),
    "*Servicio:* " + data.get("service"),
    "*Mensaje:* " + data.get("message"),
  ];
  return lines.join("\n");
}

/* -------- INIT -------- */
document.addEventListener("DOMContentLoaded", () => {
  animateEntry();
  initCharCounter();
  initRipple();
  initSubmit();
});
