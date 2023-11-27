import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["background"];

  connect() {
    console.log('SETTING HEADER IMAGE');
    this.setHeaderImage();
  }

  setHeaderImage() {
    const template = this.data.get("template");
    const url = this.data.get("url");
    const internalUrl = this.data.get("internalUrl");

    const elements = this.backgroundTargets;

    for (const element of elements) {
      if (template === "custom_template") {
        if (url) {
          element.style.backgroundImage = `url('${url}')`;
        }
      } else {
        element.style.backgroundColor = "#45929b";
        if (internalUrl) {
          element.style.backgroundImage = `url('${internalUrl}')`;
        }
      }
    }
  }
};
