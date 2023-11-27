import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [];

  connect() {
    console.log('PRODUCTS CLASSIC CONNECTED');
  }

  changeVariant(event) {
    console.log('change variant', event);
  }

  magnifyImage(event) {
    console.log('magnify image', event);
  }
};
