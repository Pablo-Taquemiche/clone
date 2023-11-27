
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["image"];

  connect() {
    console.log("MAGNIFIER STARTED")
  }

  magnify(event) {
    const targetImage = event.target.closest(".magnifier-container").querySelector("#selected-image");
    const imageUrl = this.getImage(targetImage);
    this.showHiddenModal(imageUrl);
    const galleryBlock = event.target.closest('.gallery-block')
    if (galleryBlock) {
      const container = galleryBlock.querySelector('.gallery-container');
      if (container) {
        const images = container.innerHTML;
        this.addGalleryImages(images);
      }
    }
  }

  unmagnify(event) {
    console.log(event.target.closest('.inner-gallery'))
    const gallery = event.target.closest('.inner-gallery')
    if (gallery) {
      return;
    }
    this.hideModal();
  }

  updateVisibleImage(event) {
    let imageUrl = event.target.src;
    const modal = document.getElementById("image-overlay-magnified");
    const image = modal.querySelector("img");
    image.src = imageUrl;
  }

  getImage(imageElement) {
    return imageElement.src;
  }

  showHiddenModal(imageUrl) {
    const modal = document.getElementById("image-overlay-magnified");
    const image = modal.querySelector("img");
    image.src = imageUrl;
    modal.classList.remove("hidden");
    modal.classList.add("active");
  }

  addGalleryImages(images) {
    console.log(images);
    const modal = document.getElementById("image-overlay-magnified");
    const gallery = modal.querySelector(".inner-gallery");
    gallery.innerHTML = images;
    gallery.querySelectorAll('img').forEach(img => {
      img.dataset.action="click->image-magnifier#updateVisibleImage";
    })
    gallery.querySelectorAll('div').forEach(div => {
      div.style.marginLeft = "10px";
    })
  }

  hideModal() {
    const modal = document.getElementById("image-overlay-magnified");
    const image = modal.querySelector("img");
    const gallery = modal.querySelector(".inner-gallery");
    image.src = "";
    modal.classList.remove("active");
    modal.classList.add("hidden");
    gallery.innerHTML = '';
  }
};
