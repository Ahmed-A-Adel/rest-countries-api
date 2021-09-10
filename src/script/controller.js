import * as model from "./model.js";
import view from "./view.js";

// _______________________________________________________
// ----------++++++++ Select elements +++++++++++---------
// _______________________________________________________
const modeSwitcher = document.querySelector(".mode-switcher");
const search = document.querySelector("#search");
const selectBtn = document.querySelector("#btn-select");
const select = document.querySelector("#select");
const borderCountry = document.querySelectorAll("#border-country");
const header = document.querySelector(".header");
const backBtn = document.querySelector(".back-btn");
const mainCountry = document.querySelector(".main-country");
const main = document.querySelector(".main");

// _______________________________________________________
// ----------+++++++++ Functions +++++++++++++------------
// _______________________________________________________

// _______________________________________________________
const init = async function () {
  if (!backBtn) {
    const countries = await model.app.countries;
    await view.renderCountries(countries);
    const country = document.querySelectorAll(".country");
    // Dark mode elements
    const modeSwitcherMainElements = [
      header,
      search,
      selectBtn,
      select,
      ...country,
    ];
    view.toggleDarkMode(modeSwitcher, modeSwitcherMainElements);
    view.toggleSelect(selectBtn, "hidden");
  }
  if (!search) {
    const modeSwitcherSubElements = [header, backBtn, ...borderCountry];
    view.toggleDarkMode(modeSwitcher, modeSwitcherSubElements);
  }
};
init();
// _______________________________________________________
