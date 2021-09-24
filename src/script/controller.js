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
const loading = document.querySelector(".loading");
// _______________________________________________________

// _______________________________________________________
// ----------+++++++++ Functions +++++++++++++------------
// _______________________________________________________

// _______________________________________________________
const showCountry = function (country, display = "none") {
  country.addEventListener("click", async function (e) {
    e.preventDefault();

    // hide or show main and section
    main.style.display = display;
    section.style.display = display;

    if (display === "") {
      e.currentTarget.style.display = "none";
      document.querySelector(".main-country").style.display = "none";
      // toggle darkmode
      const elements = view.elements();
      view.toggleCountriesDarkmode(elements, header);
      return;
    }
    // add loading spinner

    loading.style.display = "";

    // ftech the country by the name
    await model.getCountryByName(e.currentTarget.dataset.name);
    const countryModel = await model.app.countryByName;
    const country = countryModel[0];
    // remove main country and back button
    if (document.querySelector(".main-country")) {
      document.querySelector(".main-country").remove();
      document.querySelector("#back-btn").remove();
    }
    // remove loading spinner
    loading.style.display = "none";

    // render the country
    await view.renderCountry(country);
    // toggle darkmode
    const elements = view.elements();
    view.toggleCountriesDarkmode(elements, header);
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
const getCountry = function () {
  const darkmodeElements = [header, search, selectBtn, select];
  view.toggleDarkMode(modeSwitcher, darkmodeElements);
  view.toggleSelect(selectBtn, "hidden");
};
// _______________________________________________________

// _______________________________________________________
const searchController = async function () {
  search.addEventListener("input", async function (e) {
    const value = e.currentTarget.value;
    if (!value || value > 1) return;

    // add loading spinner
    loading.style.display = "";

    await model.getCountryByName(value);
    const modelCountries = await model.app.countryByName;

    // remove loading spinner
    loading.style.display = "none";

    await view.renderCountries(modelCountries);
    const countries = document.querySelectorAll(".country");

    view.toggleCountriesDarkmode(countries, header);
    countryController();
  });
};
// _______________________________________________________

// _______________________________________________________
const selectController = async function () {
  select.addEventListener("click", async function (e) {
    const value = e.target.textContent;
    if (!value || value > 1) return;

    // add loading spinner
    loading.style.display = "";

    await model.getCountriesByRegion(value);
    const modelCountries = await model.app.countryByRegion;

    // remove loading spinner
    loading.style.display = "none";

    await view.renderCountries(modelCountries);
    const countries = document.querySelectorAll(".country");

    view.toggleCountriesDarkmode(countries, header);
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
  const callback = function () {
    if (!document.querySelector(".main-country")) return;
    const borderCountries = document.querySelectorAll("#border-country");
    const backBtn = document.querySelector("#back-btn");
    hideCountriesAndShowCountry(borderCountries);
    showCountry(backBtn, "");
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
  await model.getCountries();
  const countries = await model.app.countries;
  loading.style.display = "none";
  await view.renderCountries(countries);
  selectController();
  searchController();
  getCountry();
  countryController();
  observeCountry();
};
init();
// _______________________________________________________
