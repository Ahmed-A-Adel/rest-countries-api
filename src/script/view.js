class View {
  main = document.querySelector(".main");
  mainCountry = document.querySelector(".main-country");
  header = document.querySelector(".header");
  countries;
  countryNames;
  name;

  elements() {
    const search = document.querySelector("#search");
    const selectBtn = document.querySelector("#btn-select");
    const select = document.querySelector("#select");
    const borderCounties = document.querySelectorAll("#border-country");
    const backBtn = document.querySelector(".back-btn");
    let elements;
    if (backBtn) elements = [backBtn, ...borderCounties];
    if (search) elements = [select, selectBtn, search];
    if (search && backBtn)
      elements = [select, selectBtn, search, backBtn, ...borderCounties];
    console.log(elements);
    return elements;
  }

  toggleDarkMode() {
    const modeSwitcher = document.querySelector(".mode-switcher");
    modeSwitcher.addEventListener("click", this.darkmodeHelper.bind(this));
  }

  darkmodeHelper(e) {
    // select mode icon and toggle it
    e.currentTarget.classList.toggle("dark-mode");
    const countries = document.querySelectorAll(".country");
    const icon = e.currentTarget.querySelector(".fas");

    // switch between sun icon and moon icon
    icon.classList.toggle("fa-sun");
    // toggle the dark and the light mode text content
    icon.parentElement.nextElementSibling.textContent === "dark mode"
      ? (icon.parentElement.nextElementSibling.textContent = "light mode")
      : (icon.parentElement.nextElementSibling.textContent = "dark mode");
    // select element background and toggle it with the dark mode class
    this.header.classList.toggle("dark-mode-bg");
    // toggle darkmode class depandes on the header element
    this.toggleCountriesDarkmode(countries, this.header);
    this.toggleCountriesDarkmode(this.elements(), this.header);

    // select the body and toggle it with the .dark-mode-body class
    document.body.classList.toggle("dark-mode-body");
    // ________________________________________________________________
  }
  toggleSelect(element, className) {
    element.addEventListener("click", function (e) {
      const el = e.currentTarget.nextElementSibling;
      el.classList.toggle(className);
    });
  }

  countriesName(countries, string) {
    try {
      const names = [];
      countries.forEach((country) => {
        const code = country.alpha3Code;
        const name = country.name;
        names.push([code, name]);
      });

      return names.find((a) => a[0] === string)[1];
    } catch (err) {
      console.log(err);
    }
  }
  renderThreeBorderCountries(borders) {
    const borderCountries = [];
    // render only three countries
    borders?.forEach((border, i) => {
      if (i > 2) return;
      let realName = this.countriesName(this.countries, border);

      borderCountries.push(
        `<a href="#" class="country-details__border__country light-mode-bg" id="border-country" data-name='${
          realName.split(" ")[0]
        }'>${realName.split(" ")[0]}</a>`
      );
    });
    return borderCountries;
  }
  renderCountries(countries) {
    this.countries = countries;
    this.main.textContent = "";
    const countryNames = [];
    countries.forEach((country) => {
      countryNames.push(country.name.toLowerCase());
      const number = new Intl.NumberFormat("de-DE").format(
        Number(country.population)
      );
      const markup = `<a href="country.html" >
          <article class="country light-mode-bg " data-name='${country.name}'>
            <div class="country__image-container">
              <img
              class="country__image-container__img"
              src="${country.flags[0]}"
              alt="${country.name} flag"
              />
            </div>
            <div class="country__info">
            <h2 class="country__info__heading">${country.name}</h2>
            <h3 class="country__info__subHeading">
              population:
              <p class="country__info__subHeading__paragraph">${number}</p>
            </h3>
            <h3 class="country__info__subHeading">
              region:
              <p class="country__info__subHeading__paragraph">${country.region}</p>
            </h3>
            <h3 class="country__info__subHeading">
              language:
              <p class="country__info__subHeading__paragraph">${country.languages[0].name}</p>
            </h3>
          </div>
        </article>
        </a>
  `;
      this.main.insertAdjacentHTML("beforeend", markup);
    });
    this.countryNames = countryNames;
  }
  renderCountry(country) {
    const borders = this.renderThreeBorderCountries(country.borders);
    const population = new Intl.NumberFormat("de-DE").format(
      Number(country.population)
    );
    const markup = `<!-- back button -->
    <div class="back-btn__container " id="back-btn">
      <a href="index.html" class="back-btn light-mode-bg"><span class="back-icon">←</span> back</a>
    </div>
    <!-- back button -->
    <!-- Country -->
    <main class="main-country">
    <!-- single column -->
      <article class="country-image ">
      
          <img
          class="country-image__img"
          src="${country.flags[0]}"
          alt="${country.name} flag"
          />
      </article>
      <!-- single column -->

      <!-- single column -->
      <article class="country-details ">
        <h2 class="country-details__heading">${country.name}</h2>
        <div class="country-details__info">
          <h3 class="country-details__info__subHeading">
                native name:
            <p class="country-details__info__subHeading__paragraph">${
              country.nativeName
            }</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            population:
            <p class="country-details__info__subHeading__paragraph">${population}</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            region:
            <p class="country-details__info__subHeading__paragraph">${
              country.region
            }</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            sub region:
            <p class="country-details__info__subHeading__paragraph">${
              country.subregion
            }</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            capital:
            <p class="country-details__info__subHeading__paragraph">${
              country.capital
            }</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            top level domain:
            <p class="country-details__info__subHeading__paragraph">${
              country.topLevelDomain
            }</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            currencies:
            <p class="country-details__info__subHeading__paragraph">${
              country.currencies[0].name
            }</p>
          </h3>
          <h3 class="country-details__info__subHeading">
            language:
            <p class="country-details__info__subHeading__paragraph">${
              country.languages[0].name
            }</p>
          </h3>
         
        </div>
       <!-- border countries -->
        <div class="country-details__border">
        <h3 class="country-details__border__heading">
        border countries:
          </h3>
          <div class="block">
          ${!borders[0] ? "" : borders[0]}
          ${!borders[1] ? "" : borders[1]}
          ${!borders[2] ? "" : borders[2]}
         </div>
        </div>
        <!-- border countries -->
      </article>
      <!-- single column -->
      </main>
  `;
    document.body.insertAdjacentHTML("beforeend", markup);
  }

  toggleCountriesDarkmode(elements, header) {
    elements.forEach((element) => {
      header.classList.contains("dark-mode-bg")
        ? element.classList.add("dark-mode-bg")
        : element.classList.remove("dark-mode-bg");
    });
  }

  //
  // ____________________________________________________________________
  // implament search countries by filtering the main children elements
  // ____________________________________________________________________
  // renderSearchCountry(search, main) {
  //   const countryNames = this.countryNames;
  //   const children = Array.from(main.children);

  //   search.addEventListener("input", function (e) {
  //     children.forEach((child) => child.classList.remove("hidden"));
  //     const value = e.currentTarget.value;
  //     const real = countryNames.find((country) => country === value);

  //     if (value.length < 4 || !real) return;
  //     const element = document.querySelector(`.${real}`);
  //     children.forEach((child) => child.classList.add("hidden"));
  //     element.parentElement.classList.remove("hidden");
  //   });
  // }
  // ____________________________________________________________________
}
export default new View();
