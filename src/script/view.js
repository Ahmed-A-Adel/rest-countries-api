class View {
  main = document.querySelector(".main");

  toggleDarkMode(element, elements) {
    element.addEventListener("click", function (e) {
      // select mode icon and toggle it
      e.currentTarget.classList.toggle("dark-mode");
      const icon = e.currentTarget.querySelector(".fas");
      icon.classList.toggle("fa-sun");
      // toggle the dark and the light mode text content
      icon.parentElement.nextElementSibling.textContent === "dark mode"
        ? (icon.parentElement.nextElementSibling.textContent = "light mode")
        : (icon.parentElement.nextElementSibling.textContent = "dark mode");
      // select element background and toggle it with the dark mode class
      elements.forEach((el) => {
        // el.classList.toggle(".dark-mode-bg");
        if (el.classList.contains("light-mode-bg")) {
          el.classList.remove("light-mode-bg");
          el.classList.add("dark-mode-bg");
        } else {
          el.classList.remove("dark-mode-bg");
          el.classList.add("light-mode-bg");
        }
      });
      // select the body and 9toggle it with the .dark-mode-body class
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

    countries.forEach((country) => {
      const markup = `<a href="#">
          <article class="country light-mode-bg">
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
              <p class="country__info__subHeading__paragraph">${country.population}</p>
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
  }
  renderCountry(country, element) {
    this.main.textContent = "";
    element.addEventListener("input", function (e) {
      const value = e.currentElement.value;
    });

    const markup = `<a href="#">
          <article class="country light-mode-bg">
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
              <p class="country__info__subHeading__paragraph">${country.population}</p>
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
  }
}
export default new View();
