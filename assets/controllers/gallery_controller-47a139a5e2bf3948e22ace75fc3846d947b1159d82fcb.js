import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["gallery"]
  connect() {
    console.log('GALLERY CONNECTED');
    this.hideVariantScroller(0);
  }

  updateVisibleImage(event) {
    console.log(event.target.closest('.row'));
    let imageUrl = event.target.src;
    let selectedImage = event.target.closest('.row').querySelector('#selected-image')
    selectedImage.src = imageUrl;
  }

  scrollDown(event) {
    var container = event.target.closest('.variant-gallery').querySelector('.gallery-container');
    var current = container.scrollTop;
    container.scrollTo({top: current + 70, behavior: 'smooth'});
  }

  scrollUp(event) {
    var container = event.target.closest('.variant-gallery').querySelector('.gallery-container');
    var current = container.scrollTop;
    container.scrollTo({top: current - 70, behavior: 'smooth'});
  }


  hideVariantScroller(retry = 0) {
    console.log('running scroller', this.galleryTarget.dataset, retry);
    var galleryContainer = document.getElementById(this.galleryTarget.dataset.variantId)
    if (galleryContainer) {
      var galleryNode = galleryContainer.querySelector('.gallery-container');
      var variantNode = galleryContainer.querySelector('.variant-gallery');
      var scrollers = galleryContainer.querySelectorAll('.scroller');
      if (galleryNode && variantNode) {
        var imageHeight = 0
        Array.from(galleryNode.children).forEach(child => {
          imageHeight += child.clientHeight;
        })
        if (galleryNode.clientHeight < imageHeight) {
          scrollers.forEach(scroller => {
            scroller.classList.remove('hidden-scroller');
          })
        }
      } else {
        if (retry > 10) {
          this.hideVariantScroller(variantId, retry++);
        }
      }
    } else {
      if (retry > 10) {
        this.hideVariantScroller(variantId, retry++);
      }
    }
  }
};
