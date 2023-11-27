import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['indicator'];

  connect() {
    console.log('LOADING CONNECTED');
    this.element.addEventListener("custom-loading-injection", this.findAndInject.bind(this));
    this.element.addEventListener("custom-loading-removal", this.findAndRemove.bind(this));
  }

  disconnect() {
    console.log('LOADING DISCONNECTED');
    this.element.removeEventListener("custom-loading-injection", this.findAndInject.bind(this));
    this.element.removeEventListener("custom-loading-removal", this.findAndRemove.bind(this));
  }

  findAndInject(event) {
    let componentsToShimmer = document.querySelectorAll(event.detail.selector);
    componentsToShimmer.forEach(componentToShimmer => {
      this.injectLoader(componentToShimmer);
    })
  }

  findAndRemove(event) {
    let componentsToShimmer = document.querySelectorAll(event.detail.selector);
    componentsToShimmer.forEach(componentToShimmer => {
      this.removeLoader(componentToShimmer);
    })
  }

  injectLoader(element) {
    element.querySelectorAll('.shimmable').forEach(shimmableElement => {
      if (!shimmableElement?.firstChild?.classList?.contains('shimmer')) {
        let shimmerElement = document.createElement('div');
        shimmerElement.classList.add('shimmer');
        shimmableElement.insertBefore(shimmerElement, shimmableElement.firstChild);
      }
    })
  }

  removeLoader(element) {
    element.querySelectorAll('.shimmer').forEach(shimmableElement => {
      shimmableElement.remove();
    })
  }

};
