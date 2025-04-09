document.querySelectorAll(".rules__list-item").forEach((el) => {
  el.addEventListener("click", () => {
    const content = el.querySelector(".accordion__description") as HTMLElement;
    const plusIcon = el.querySelector(".acordion__button") as HTMLElement;
    const isOpen = content.style.maxHeight;

    document
      .querySelectorAll(".accordion__description")
      .forEach((contentEl) => {
        (contentEl as HTMLElement).style.maxHeight = "";
        (contentEl as HTMLElement).style.paddingBlock = "";
      });

    document.querySelectorAll(".acordion__button").forEach((icon) => {
      icon.classList.remove("rotated");
    });

    if (!isOpen) {
      content.style.maxHeight = content.style.maxHeight + "500px";
      content.style.paddingBlock = "3.125rem";
      plusIcon.classList.add("rotated");
    }
  });
});
