import { Cursor } from "./common/cursor";
import { Pointer } from "./common/pointer";
import { Screen } from "./common/screen";
import { Swiper } from "./common/swiper";
import { Touch } from "./common/touch";

document.querySelectorAll(".accordion-item").forEach((el) => {
  el.addEventListener("click", () => {
    const accordion = el.querySelector(
      ".accordion__description",
    ) as HTMLElement;
    const plusIcon = el.querySelector(".acordion__button") as HTMLElement;
    const button = el.querySelector(".accordion_link-button") as HTMLElement;
    const isOpen = accordion.classList.contains("open");
    const content = el.querySelector(
      ".accordion__description-container",
    ) as HTMLElement;

    document
      .querySelectorAll(".accordion__description")
      .forEach((contentEl) => {
        const el = contentEl as HTMLElement;
        el.style.maxHeight = "0px";
        el.style.paddingBlock = "0px";
        el.classList.remove("open");
      });

    document.querySelectorAll(".acordion__button").forEach((icon) => {
      icon.classList.remove("rotated");
    });

    document.querySelectorAll(".accordion_link-button").forEach((btn) => {
      (btn as HTMLElement).classList.remove("visible");
    });

    if (!isOpen) {
      accordion.classList.add("open");

      content.style.paddingBlock =
        window.innerWidth <= 1224 ? "1.5rem" : "3.125rem";

      requestAnimationFrame(() => {
        const fullHeight = accordion.scrollHeight;
        accordion.style.maxHeight = fullHeight * 2 + 100 + "px";
      });

      plusIcon.classList.add("rotated");
      button.classList.add("visible");
    }
  });
});

document.querySelectorAll(".accordion_link-button").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
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

const createBurger = () => {
  let active = false;

  const burger = document.querySelector<HTMLElement>(".burger-button")!;
  const menu = document.querySelector<HTMLElement>(".header__content")!;

  const links = menu.querySelectorAll("a");

  burger.addEventListener("click", () => {
    if (!active) {
      burger.dataset.open = "";
      menu.dataset.open = "";
      active = true;
    } else {
      delete burger.dataset.open;
      delete menu.dataset.open;
      active = false;
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      delete burger.dataset.open;
      delete menu.dataset.open;
      active = false;
    });
  });
};

createBurger();

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll<HTMLAnchorElement>('.modal__trigger');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const modalId = button.dataset.modal;
      if (!modalId) return;

      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.classList.add('active');
    });
  });

  const modals = document.querySelectorAll<HTMLElement>('.modal');

  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (
        target.classList.contains('modal__overlay') ||
        target.closest('.modal__close')
      ) {
        modal.classList.remove('active');
      }
    });
  });
});
