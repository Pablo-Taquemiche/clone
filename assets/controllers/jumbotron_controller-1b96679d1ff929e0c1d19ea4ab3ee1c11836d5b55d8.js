
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log("JUMBOTRON STARTED")
    this.setBackground();
    this.setOpacity();
    this.setTextShadow();
    this.checkSvg();
  }

  setBackground() {
    let image = this.element.dataset.image;
    let elements = document.querySelectorAll(".top-background");
    if (image) {
      elements.forEach(element => {
        element.style.backgroundImage = `url(${image})`;
      })
    }
  }

  setOpacity() {
    let hasBackgroundOpacity = this.element.dataset.hasOpacity;
    let isRootPath = this.element.dataset.isRootPath
    let backgroundElement = document.querySelector(".top-background");
    let customElement = document.querySelectorAll("#custom-background-element");
    let style = {
      background: "transparent"
    }
    if (hasBackgroundOpacity === "true") {
      style = {
        background: "rgba(20,20,20,0.3)",
        transitionProperty: 'background',
        transitionTimingFunction: 'linear',
        transitionDuration: '0.5s'
      }
    }

    if (backgroundElement) {
      let darkerNode = backgroundElement.querySelector('main');
      Object.assign(darkerNode.style, style);
    }
    if (customElement.length > 0 && !isRootPath) {
      customElement.forEach(element => {
        let div = document.createElement("div");
        div.style.background = style.background;
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.position = "absolute";
        div.style.top = "0";
        element.append(div);
      })
    }
  }

  setTextShadow() {
    let hasTextShadow = this.element.dataset.hasTextShadow;
    let textElement = document.querySelector(".header");
    let jumboElement = document.querySelectorAll(".jumbotron_title");
    let style = {
      texthShadow: 'none'
    }
    if (hasTextShadow == "true") {
      style = {
        textShadow: '-1px 1px 1px #000'
      }
    }
    if (textElement) {
      textElement.style.textShadow = style.textShadow;
    }
    if (jumboElement) {
      jumboElement.forEach(element => {
        Object.assign(element.style, style);
      })
    }
  }

  checkSvg() {
    let isRootPage = this.element.dataset.rootPage;
    let bgImages = document.querySelectorAll('.background-element-image')
    bgImages.forEach(bgImage => {
      if (bgImage) {
        let svg = bgImage.querySelector('svg');
        if (svg) {
          if (isRootPage == 'true') {
              svg.style.display = "block";
          } else {
              svg.style.display = "none";
          }

        }
      }
    })
  }
};
