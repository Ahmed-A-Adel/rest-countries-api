export const app = {
  countries: [],
  countryByRegion: [],
  countryByName: [],
  countryByCode: [],
  borders: [],
  codes: [],
  names: [],
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
// _________________________________________________________________________________

// get countries by region
// _________________________________________________________________________________
export const getCountriesByRegion = async function (region) {
  app.countryByRegion = getJson(
    `https://restcountries.eu/rest/v2/region/${region}`
  );
};
// _________________________________________________________________________________

// get country by name
// _________________________________________________________________________________
export const getCountryByName = async function (countryName) {
  app.countryByName = getJson(
    `https://restcountries.eu/rest/v2/name/${countryName}`
  );
};
// _________________________________________________________________________________

// get country by code
// _________________________________________________________________________________
export const getCountryByCode = async function (code) {
  app.countryByCode.push(
    getJson(`https://restcountries.eu/rest/v2/alpha/${code}`)
  );
};
// _________________________________________________________________________________
