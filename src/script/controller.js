import * as model from "./model.js";
import view from "./view.js";

// select elements
const modeSwitcher = document.querySelector(".mode-switcher");
const search = document.querySelector("#search");
const selectBtn = document.querySelector("#btn-select");
const select = document.querySelector("#select");
const country = document.querySelectorAll(".country");
const borderCountry = document.querySelectorAll("#border-country");
const header = document.querySelector(".header");
const backBtn = document.querySelector(".back-btn");
const mainCountry = document.querySelector(".main-country");

// Dark mode elements
const modeSwitcherSubElements = [header, backBtn, ...borderCountry];
const modeSwitcherMainElements = [
  header,
  search,
  selectBtn,
  select,
  ...country,
];

const init = function () {
  if (!backBtn) {
    view.toggleDarkMode(modeSwitcher, modeSwitcherMainElements);
    view.toggleSelect(selectBtn, "hidden");
  }
  if (!search) view.toggleDarkMode(modeSwitcher, modeSwitcherSubElements);
};
init();
