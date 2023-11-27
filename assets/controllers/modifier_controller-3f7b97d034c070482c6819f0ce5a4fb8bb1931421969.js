import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log('MODIFIER CONNECTED');
  }

  updatePrice(e) {
    console.log('update price', e.target.checked, e.target.dataset.price);
    let element = e.target.closest('.product-container')
    if (e.target.checked) {
      this.addPrice(element, e.target.dataset.price, e.target.dataset.variantId);
      this.addModifier(e.target.dataset.modifierId, e.target.dataset.variantId);
    } else {
      this.subtractPrice(element, e.target.dataset.price, e.target.dataset.variantId);
      this.removeModifier(e.target.dataset.modifierId, e.target.dataset.variantId);
    }
  }

  addPrice(element, price, variantId) {
    let displayPrice = element.querySelector(`.variant-price-${variantId} .display-price`);
    let format = displayPrice.innerText;
    if (displayPrice) {
      let currentPrice = parseFloat(displayPrice.innerText.replace(/[^0-9\.]/g, ''));
      let newPrice = currentPrice + parseFloat(price);
      displayPrice.innerText = format.replace(currentPrice, newPrice);
    }
  }

  subtractPrice(element, price, variantId) {
    let displayPrice = element.querySelector(`.variant-price-${variantId} .display-price`);
    let format = displayPrice.innerText;
    if (displayPrice) {
      let currentPrice = Number(displayPrice.innerText.replace(/[^0-9\.]/g, ''));
      let newPrice = currentPrice - parseFloat(price);
      displayPrice.innerText = format.replace(currentPrice, newPrice);
    }
  }

  addModifier(modifierId, variantId) {
    let field = document.getElementById(`${variantId}-modifiers`);
    console.log(field)
    if (field) {
      if (field.value === "") {
        field.value = modifierId;
      } else {
        field.value = field.value + ',' + modifierId;
      }
    }
  }

  removeModifier(modifierId, variantId) {
    let field = document.getElementById(`${variantId}-modifiers`);
    console.log(field)
    if (field) {
      field.value = field.value.replace(modifierId, '');
    }
  }
};
