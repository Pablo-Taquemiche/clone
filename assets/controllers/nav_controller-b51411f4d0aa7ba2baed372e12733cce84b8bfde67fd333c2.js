import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log('NAV CONNECTED');
    let urlSearchParams = new URLSearchParams(window.location.search);
    let lang = urlSearchParams.get('lang');
    if (lang) {
      document.querySelectorAll(`.mh-translation-text`).forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll(`.mh-translation-text.language-${lang}`).forEach(el => {
        el.style.display = 'block';
      });
    }

    window.addEventListener("scroll", () => {
      var scrollPosition = document.body.getBoundingClientRect().top;
      console.log(scrollPosition)
      if (scrollPosition < -100) {
        document.querySelector('.navbar').classList.add('navbar-scrolled');
      } else {
        document.querySelector('.navbar').classList.remove('navbar-scrolled');
      }
    });
  }

  openSubMenu(event) {
    let submenu = event.target.closest("li").querySelector(".sub-section-list")
    if (submenu) {
      submenu.classList.add('sub-section-open');
      document.getElementById("slideoutBackButton").classList.add("show");
    }
  }

  closeSubMenu() {
    let submenu = document.querySelectorAll(".sub-section-list")
    if (submenu) {
      submenu.forEach(el => {
        el.classList.remove('sub-section-open');
      })
      document.getElementById("slideoutBackButton").classList.remove("show");
    }
  }
};
