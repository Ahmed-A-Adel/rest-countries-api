import * as model from "./model.js";
import view from "./view.js";

// select elements
const modeSwitcher = document.querySelector(".mode-switcher");
const search = document.querySelector("#search");
const select = document.querySelector("#btn-select");
const country = document.querySelectorAll(".country");
const borderCountry = document.querySelectorAll("#border-country");
const header = document.querySelector(".header");
const backBtn = document.querySelector(".back-btn");
const mainCountry = document.querySelector(".main-country");

// Dark mode elements
const modeSwitcherSubElements = [header, backBtn, ...borderCountry];
const modeSwitcherMainElements = [header, search, select, ...country];

const init = function () {};

// view.toggle(modeSwitcher, modeSwitcherMainElements, "dark-mode");

// console.log(document.body.classList.toggle("dark-mode-body"));
// modeSwitcherMainElements.forEach((el) => {
//   el.classList.toggle("dark-mode-bg");
//   console.log(el);
// });
if (!backBtn) view.toggle(modeSwitcher, modeSwitcherMainElements);
if (!search) view.toggle(modeSwitcher, modeSwitcherSubElements);

document.querySelector(".select-container__btn");
