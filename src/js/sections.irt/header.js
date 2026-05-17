
(() => {
  const header = document.querySelector(".header");
  if (!header) return;

  const burger = header.querySelector(".header__burger");
  const bar = header.querySelector(".header__bar");
  if (!burger || !bar) return;

  burger.addEventListener("click", () => {
    const opened = header.classList.toggle("header--opened");
    burger.setAttribute("aria-expanded", String(opened));
    document.body.classList.toggle("_lock", opened);
  });

  bar.addEventListener("click", (e) => {
    if (e.target.closest(".menu__link")) {
      header.classList.remove("header--opened");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("_lock");
    }
  });
})();
