import { Cursor } from "./common/cursor";
import { Pointer } from "./common/pointer";
import { Screen } from "./common/screen";
import { Swiper } from "./common/swiper";
import { Touch } from "./common/touch";

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

function createSwipers(pointer: Pointer, screen: Screen) {
  const swipers: Swiper[] = [];

  document.querySelectorAll<HTMLElement>(".swiper").forEach((root) => {
    swipers.push(new Swiper(root, pointer, screen, { gap: "1.5rem" }));
  });

  return swipers;
}

const IS_TOUCH_SUPPORTED = Boolean(
  "ontouchstart" in window || window.navigator.maxTouchPoints,
);

const pointer = IS_TOUCH_SUPPORTED ? new Touch() : new Cursor();
const screen = new Screen();

createSwipers(pointer, screen);

const header = document.querySelector(".header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
