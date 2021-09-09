class View {
  //   mode = document.querySelector(".mode-switcher");

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
}
export default new View();
