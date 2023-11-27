import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { url: String }
  connect () {
    window.open(this.urlValue, '_blank');
  }
};
