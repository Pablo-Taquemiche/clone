import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {}

  variantChange(event) {
    event.target.closest('form').requestSubmit();
  }
};
