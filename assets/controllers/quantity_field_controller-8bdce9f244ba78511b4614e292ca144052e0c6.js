import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["increaseBtn", "decreaseBtn", "quantity"]
  connect() {
    this.csrfToken = this.getMetaContent("csrf-token");
  }

  decrease() {
    this.sendUpdateRequest(this.decreaseBtnTarget.dataset.url, -1);
  }

  increase() {
    this.sendUpdateRequest(this.increaseBtnTarget.dataset.url, 1);
  }

  getMetaContent(name) {
    const metaTag = document.querySelector(`meta[name="${name}"]`);
    return metaTag ? metaTag.getAttribute("content") : null;
  }

  sendUpdateRequest(url, delta) {
    const quantity = parseInt(this.quantityTarget.textContent);
    const newQuantity = quantity + delta;
    const data = new FormData();
    data.append("quantity", newQuantity);

    fetch(url, {
      method: "PUT",
      body: data,
      headers: { "X-Requested-With": "XMLHttpRequest", "X-CSRF-Token": this.csrfToken, Accept: "text/vnd.turbo-stream.html" }
    })
      .then((response) => response.text())
      .then((html) => {
        Turbo.renderStreamMessage(html);
      });
  }
};
