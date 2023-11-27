import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['form', 'filterOptions'];
  connect() {
    console.log('FILTERS CONNECTED');
  }

  openModal() {
    this.filterOptionsTarget.classList.remove("d-none");
  }

  closeModal() {
    console.log(this.filterOptionsTarget.classList);
    this.filterOptionsTarget.classList.add("d-none");
  }


  handleFilter(event) {
    console.log('FILTER')
    const url = this.formTarget.dataset.url;
    // this.closeModal();
  }

  removeFilter(event) {
    event.preventDefault();
    let filterBtn = event.target.closest('a');
    let filterToRemove = filterBtn.dataset.selectedFilter
    if (filterToRemove == 'by_category') { 
      this.element.querySelectorAll('input[name="by_category"]').forEach(input => {
        input.checked = false
      })
      this.element.querySelectorAll('input[name="by_subcategory[subcategory_ids][]"]').forEach(input => {
        input.checked = false
      })
    } else if (filterToRemove == 'by_price') {
      this.element.querySelectorAll('input[name="by_price"]').forEach(input => {
        input.checked = false
      })
    }
    this.element.querySelector('input[type="submit"]').click();
  }

  triggerLoader() {
    let event = new CustomEvent('custom-loading-injection', {
      detail: { selector: '.products-display' }
    })
    document.getElementById('loading-organizer').dispatchEvent(event);
  }

  dismissLoader() {
    let event = new CustomEvent('custom-loading-removal', {
      detail: { selector: '.products-display' }
    })
    document.getElementById('loading-organizer').dispatchEvent(event);
  }
};
