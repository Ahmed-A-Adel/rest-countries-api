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
const toggleCountry = function () {
  const countries = document.querySelectorAll(".country");
  countries.forEach((el) => {
    header.classList.contains("dark-mode-bg")
      ? el.classList.add("dark-mode-bg")
      : el.classList.remove("dark-mode-bg");
  });
};
// _______________________________________________________
// _______________________________________________________
const getCountry = function (first = true) {
  if (first) {
    const modeSwitcherMainElements = [header, search, selectBtn, select];
    view.toggleDarkMode(modeSwitcher, modeSwitcherMainElements);
    view.toggleSelect(selectBtn, "hidden");
  } else {
    const modeSwitcherSubElements = [header, backBtn, ...borderCountry];
    view.toggleDarkMode(modeSwitcher, modeSwitcherSubElements);
  }
};
// _______________________________________________________
// _______________________________________________________
const searchController = async function () {
  search.addEventListener("input", async function (e) {
    const value = e.currentTarget.value;
    if (!value || value > 1) return;
    await model.getCountryByName(value);
    const countries = await model.app.countryByName;
    await view.renderCountries(countries);
    toggleCountry();
  });
};
// _______________________________________________________

// _______________________________________________________
const selectController = async function () {
  select.addEventListener("click", async function (e) {
    const value = e.target.textContent;
    if (!value || value > 1) return;
    await model.getCountriesByRegion(value);
    const countries = await model.app.countryByRegion;
    await view.renderCountries(countries);
    toggleCountry();
  });
};
// _______________________________________________________

// _______________________________________________________
const init = async function () {
  if (!backBtn) {
    await model.getCountries();
    const countries = await model.app.countries;
    await view.renderCountries(countries);
    selectController();
    searchController();
    getCountry();
  }
  if (!search) {
    getCountry(false);
  }
};
init();
// _______________________________________________________
