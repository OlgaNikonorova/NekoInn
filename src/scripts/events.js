const mediaQuery = window.matchMedia("(max-width: 1000px)");

// Функция для закрытия меню
function handleMenuStyleChange(e) {
  const menu = document.querySelector(".navigation__menu-wrapper");
  if (e.matches) {
    menu.style.transform = "translateX(100%)";
  } else {
    menu.style.transform = "none";
  }
}

handleMenuStyleChange(mediaQuery);

mediaQuery.addEventListener("change", handleMenuStyleChange);

document.addEventListener("DOMContentLoaded", () => {

  // Функция для закрытия меню и прокручивания к нужному разделу
  function addCloseMenuAndScrollEventListener(trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();

      const targetClass = trigger.dataset.target;
      const targetElement = document.querySelector(targetClass);

      if (mediaQuery.matches) {
        menu.style.transform = "translateX(100%)";
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  const reviewsList = document.querySelector(".testimonial__cards-list");
  const prevButton = document.querySelector(".btn-left");
  const nextButton = document.querySelector(".btn-right");


  // Функция для вычисления ширины одного отзыва
  const calculateReviewWidth = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const reviewsGap = parseFloat(
      rootStyles.getPropertyValue("--reviews-gap-size").replace("vw", "")
    );
    const reviewsOnScreen = parseInt(
      rootStyles.getPropertyValue("--reviews-on-screen-count")
    );

    return (
      (reviewsList.offsetWidth + (reviewsGap / 100) * window.innerWidth) /
      reviewsOnScreen
    );
  };

  let reviewWidth = calculateReviewWidth();

  window.addEventListener("resize", () => {
    reviewWidth = calculateReviewWidth();
  });

  //Прокрутка отзывов
  prevButton.addEventListener("click", () => {
    reviewsList.scrollBy({
      left: -reviewWidth,
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    reviewsList.scrollBy({
      left: reviewWidth,
      behavior: "smooth",
    });
  });

  //Раскрытие календаря
  const dateInput = document.querySelector(".custom-date-input");
  const calendarButton = document.querySelector(".custom-calendar-button");

  calendarButton.addEventListener("click", () => {
    dateInput.showPicker();
  });

  //Раскрытие подразделов в разделе Rooms
  const buttons = document.querySelectorAll(".rooms__text-list-element-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const listItem = button.closest(".rooms__text-list-element");
      const text = listItem.querySelector(".rooms__text");
      const img = button.querySelector("img");

      if (text.classList.contains("hidden")) {
        text.classList.remove("hidden");
        img.src = "./assets/rooms__button-up.svg";
      } else {
        text.classList.add("hidden");
        img.src = "./assets/rooms__button-down.svg";
      }
    });
  });

  //Обработчики событий кнопок меню
  const menu = document.querySelector(".navigation__menu-wrapper");

  document
    .querySelectorAll(".navigation__link")
    .forEach((link) => addCloseMenuAndScrollEventListener(link));

  addCloseMenuAndScrollEventListener(
    document.querySelector(".navigation__book-button")
  );

  const menuButton = document.querySelector(".navigation__hamburger-button");
  const closeButton = document.querySelector(".navigation__menu-close-button");

  menuButton.addEventListener("click", () => {
    menu.style.transform = "translateX(0)";
  });

  closeButton.addEventListener("click", () => {
    menu.style.transform = "translateX(100%)";
  });

  document
    .getElementById("navigation__theme-checkbox")
    .addEventListener("change", () => {
      if (mediaQuery.matches) {
        menu.style.transform = "translateX(100%)";
      }
    });
});
