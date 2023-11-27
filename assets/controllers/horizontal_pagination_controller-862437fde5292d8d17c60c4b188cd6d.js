import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['list', 'buttonleft', 'buttonright', 'count'];
  static values = {
    loading: { type: Boolean, default: false },
  }

  connect() {
    console.log('HORIZONTAL PAGINATION LOADED');
    this.page = parseInt(this.data.get('initial')) || 0;
    this.perPage = parseInt(this.data.get('range')) || 12;
    this.perRange = parseInt(this.data.get('perPageRange')) || 12;
    this.total = parseInt(this.data.get('total')) || 0;
    console.log(this.page, this.perPage, this.perRange, this.total);
    this.checkRemaining();
  }

  nextPage() {
    if (!this.loadingValue) {
      this.page++;
      this.fetchData();
    }
  }

  previousPage() {
    if (!this.loadingValue) {
      this.page--;
      this.fetchData();
    }
  }

  scroll(event) {
    let el = event.target;
    let scrollPercentage = 100 * el.scrollLeft / (el.scrollWidth-el.clientWidth)
    if (this.total > ((this.page + 1 ) * this.perPage)) {
      if (scrollPercentage > 75.0 && !this.loadingValue) {
        this.page++;
        this.fetchData(true);
      }
    }
  }

  fetchData(append=false) {
    this.loadingValue = true;
    let url = this.data.get('url');
    if (append) {
      if (url.includes('?')) {
        url += `&append=true`;
      } else {
        url += `?append=true`;
      }
    }
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
        this.updatePageCount();
        this.loadingValue = false;
      });
  }

  checkRemaining() {
    if (this.total > ((this.page + 1 ) * this.perPage)) {
      this.showRightButton();
    } else {
      this.hideRightButton();
    }
    if (this.page == 0) {
      this.hideLeftButton();
    } else {
      this.showLeftButton();
    }
  }

  updatePageCount() {
    this.countTarget.innerHTML = `${this.page + 1}`
  }

  showRightButton() {
    this.buttonrightTarget.classList.remove('d-none');
  }

  hideRightButton() {
    this.buttonrightTarget.classList.add('d-none');
  }

  showLeftButton() {
    this.buttonleftTarget.classList.remove('d-none');
  }

  hideLeftButton() {
    this.buttonleftTarget.classList.add('d-none');
  }
};
