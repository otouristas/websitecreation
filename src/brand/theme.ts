/** The existing dark-default/light choice, shared by normal and error roots. */
export function initializeStoredTheme() {
  let theme: "dark" | "light" = "dark";
  try { if (localStorage.getItem("theme") === "light") theme = "light"; } catch { /* Dark remains the default. */ }
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.dataset.asgTheme = theme;
}

/** Pre-paint equivalent; error documents may omit the locale layout's head. */
export const THEME_INIT_SCRIPT = `(function(){var theme='dark';try{if(localStorage.getItem('theme')==='light')theme='light';}catch(e){}document.documentElement.classList.toggle('light',theme==='light');document.documentElement.dataset.asgTheme=theme;})();`;
