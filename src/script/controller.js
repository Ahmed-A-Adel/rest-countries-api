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
const section = document.querySelector(".section");
// _______________________________________________________

// _______________________________________________________
// ----------+++++++++ Functions +++++++++++++------------
// _______________________________________________________

// _______________________________________________________
const showCountry = function (country, visibel = "none") {
  country.addEventListener("click", async function (e) {
    e.preventDefault();
    // hide or show main and section
    main.style.display = visibel;
    section.style.display = visibel;
    // ftech the country by the name
    await model.getCountryByName(e.currentTarget.dataset.name);
    const countryModel = await model.app.countryByName;
    const country = countryModel[0];
    // render the country
    if (document.querySelector(".main-country")) {
      document.querySelector(".main-country").remove();
      document.querySelector("#back-btn").remove();
      console.log("remove country and btn");
    }
    await view.renderCountry(country);
    // clear the border countries block
    const block = document.querySelector(".block");
    block.textContent = "";
    //render only three border countries
    country.borders.forEach(async (border, i) => {
      if (i > 2) return;
      await model.getCountryByCode(border);
      let realName = await model.app.countryByCode[i];
      block.insertAdjacentHTML(
        "afterbegin",
        `  <a href="#" class="country-details__border__country light-mode-bg" id="border-country" data-name='${
          realName.name.split(" ")[0]
        }' >${realName.name.split(" ")[0]}</a>`
      );
    });
  });
};
// _______________________________________________________

// _______________________________________________________
const hideCountriesAndShowCountry = async function (countries) {
  countries.forEach((country) => {
    showCountry(country);
  });
}; // _______________________________________________________

// _______________________________________________________
const countryController = function () {
  const countries = document.querySelectorAll(".country");
  hideCountriesAndShowCountry(countries);
};
// _______________________________________________________

// _______________________________________________________
const toggleCountry = function () {
  const countries = document.querySelectorAll(".country");
  countries.forEach((country) => {
    header.classList.contains("dark-mode-bg")
      ? country.classList.add("dark-mode-bg")
      : country.classList.remove("dark-mode-bg");
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
    countryController();
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
    countryController();
  });
};
// _______________________________________________________

// _______________________________________________________
// intersection observer event with the body root element's (section, mainCountry) sohw and hide
const observeCountry = function () {
  // Select the node that will be observed for mutations
  const target = document.querySelector("body");

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    if (!document.querySelector(".main-country")) return;
    const main = document.querySelector(".main-country");
    const backBtn = document.querySelector(".back-btn");
    const borderCountry = document.querySelectorAll("#border-country");
    hideCountriesAndShowCountry(borderCountry);
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(target, config);

  // Later, you can stop observing
  // observer.disconnect();
};
// ________________________________________________________

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
  countryController();
  observeCountry();
};
init();
// _______________________________________________________
