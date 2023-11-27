import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['list', 'button'];
  connect() {
    this.page = parseInt(this.data.get('initial')) || 0;
    this.perPage = parseInt(this.data.get('range')) || 12;
    this.perRange = parseInt(this.data.get('perPageRange')) || 12;
    this.total = parseInt(this.data.get('total')) || 0;
    console.log(this.page, this.perPage, this.perRange, this.total);
    this.checkRemaining();
  }

  loadMore() {
    this.page++;
    this.fetchData();
  }

  fetchData() {
    let url = this.data.get('url');
    if (url.includes('?')) {
      url += `&page=${this.page}&perPage=${this.perPage}`;
    } else {
      url += `?page=${this.page}&perPage=${this.perPage}`;
    }
    fetch(url, { headers: {
      Accept: "text/vnd.turbo-stream.html",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }})
      .then((response) => response.text())
      .then((html) => {
        Turbo.renderStreamMessage(html);
        this.checkRemaining();
      });
  }

  checkRemaining() {
    if (this.total > ((this.page + 1) * this.perPage)) {
      this.showButton();
    } else {
      this.hideButton();
    }
  }

  hasMorePages(html) {
    const nextPage = this.page + 1;
    return html.includes(`data-page="${nextPage}"`);
  }

  showButton() {
    this.buttonTarget.classList.remove('d-none');
  }

  hideButton() {
    this.buttonTarget.classList.add('d-none');
  }

  appendToList(html) {
    const fragment = document.createElement("template");
    fragment.innerHTML = html.trim();

    const newItems = fragment.content.querySelectorAll("[data-template-item]");
    newItems.forEach((item) => {
      this.listTarget.insertAdjacentHTML("beforeend", item.outerHTML);
    });
  }
};
