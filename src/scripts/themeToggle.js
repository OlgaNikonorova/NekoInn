document.addEventListener("DOMContentLoaded", () => {
  
  const themeToggle = document.getElementById("navigation__theme-checkbox");

  const navLogoImg = document.querySelector(".navigation__logo-img");

  const pricingBenefitIcons = Array.from(
    document.querySelectorAll(
      ".pricing__card:not(.pricing__card--imperial) .pricing__card-benefit img"
    )
  );

  const html = document.documentElement;

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      html.setAttribute("theme", "day");
      navLogoImg.src = "./assets/navigation__logo--day.svg";
      pricingBenefitIcons.forEach((icon) => {
        icon.src = "./assets/benefit-icon--day.svg";
      });
    } else {
      html.setAttribute("theme", "night");
      navLogoImg.src = "./assets/navigation__logo--night.svg";
      pricingBenefitIcons.forEach((icon) => {
        icon.src = "./assets/benefit-icon--night.svg";
      });
    }
  });
});