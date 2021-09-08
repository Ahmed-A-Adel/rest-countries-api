export const app = {
  countries: [],
  countryByRegion: [],
  countryByName: [],
  countryByCode: [],
};

export const getJson = async function (url) {
  const fetchD = await fetch(url);
  const data = await fetchD.json();
  return await data;
};

// -----------+++++++++ Fetching data ++++++++++++--------------

// get all countries
// _________________________________________________________________________________
export const getCountries = async function () {
  app.countries = getJson("https://restcountries.eu/rest/v2/all");
};
getCountries();
// _________________________________________________________________________________

// get countries by region
// _________________________________________________________________________________
export const getCountriesByRegion = async function (region) {
  app.countryByRegion = getJson(
    `https://restcountries.eu/rest/v2/region/${region}`
  );
};
getCountriesByRegion("Africa");
// _________________________________________________________________________________

// get country by name
// _________________________________________________________________________________
export const getCountryByName = async function (countryName) {
  app.countryByName = getJson(
    `https://restcountries.eu/rest/v2/name/${countryName}`
  );
};
getCountryByName("egypt");
// _________________________________________________________________________________
// get country by code
// _________________________________________________________________________________
export const getCountryByCode = async function (code) {
  app.countryByCode = getJson(`https://restcountries.eu/rest/v2/alpha/${code}`);
};
getCountryByCode("jor");
// _________________________________________________________________________________

console.log(app);
