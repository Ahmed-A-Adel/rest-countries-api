class View {
  main = document.querySelector(".main");
  countryNames;
  toggleDarkMode(element, elements) {
    element.addEventListener("click", function (e) {
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
      elements.forEach((el) => {
        el.classList.toggle("dark-mode-bg");
      });
      // toggle darkmode class depandes on the header element
      countries.forEach((el) => {
        elements[0].classList.contains("dark-mode-bg")
          ? el.classList.add("dark-mode-bg")
          : el.classList.remove("dark-mode-bg");
      });
      // select the body and toggle it with the .dark-mode-body class
      document.body.classList.toggle("dark-mode-body");
    });
  }

  toggleSelect(element, className) {
    element.addEventListener("click", function (e) {
      const el = e.currentTarget.nextElementSibling;
      el.classList.toggle(className);
    });
  }
  renderCountries(countries) {
    this.main.textContent = "";
    const countryNames = [];
    countries.forEach((country) => {
      countryNames.push(country.name.toLowerCase());
      const number = new Intl.NumberFormat("de-DE").format(
        Number(country.population)
      );
      const markup = `<a href="#">
          <article class="country light-mode-bg ">
            <div class="country__image-container">
              <img
              class="country__image-container__img"
              src="${country.flag}"
              alt="the ${country.name} flag"
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
