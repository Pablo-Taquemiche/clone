import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["couponInput", "addCouponButton", "hideCouponButton"];

  hideCoupon(event) {
    event.preventDefault();
    this.couponInputTarget.style.display = "none";
    this.addCouponButtonTarget.style.display = "block";
    this.hideCouponButtonTarget.style.display = "none";
  }

  addCoupon(event) {
    event.preventDefault();
    this.couponInputTarget.style.display = "block";
    this.addCouponButtonTarget.style.display = "none";
    this.hideCouponButtonTarget.style.display = "block";
  }
};
