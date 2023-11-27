import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log('FOOTER CONNECTED');
    this.setFooterHeight();
  }

  setFooterHeight() {
    var footerEl = document.querySelector(".footer");
    var footerHeight = footerEl.getBoundingClientRect().height;
    var termsEl = document.getElementById("terms-link-section");
    var newStyle = { marginBottom: `${footerHeight}px` };
    document.querySelectorAll('.footer-nav').forEach(footer => {
      footer.style.minHeight = `${footerHeight}px`;
    }); 
  }
};
