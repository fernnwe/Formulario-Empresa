const STORAGE_KEY = "theme";
const ATTR = "data-theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute(ATTR, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute(ATTR);
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
}

export function initTheme() {
  applyTheme(getPreferredTheme());

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (btn) toggleTheme();
  });
}
