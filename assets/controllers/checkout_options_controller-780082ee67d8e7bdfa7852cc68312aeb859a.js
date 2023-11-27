import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log('Checkout Options CONNECTED');
  }

  reserveNow() {
    var checkoutOptions = document.getElementById("checkout-options");
    checkoutOptions.querySelector(".payment").classList.remove("active");
    checkoutOptions.querySelector(".reservation").classList.add("active");
    var paymentOrderForm = document.getElementById("payment-order-form");
    var reservationOrderForm = document.getElementById("reservation-order-form");
    paymentOrderForm.classList.add("d-none");
    reservationOrderForm.classList.remove("d-none");
  }

  payNow() {
    var checkoutOptions = document.getElementById("checkout-options");
    checkoutOptions.querySelector(".payment").classList.add("active");
    checkoutOptions.querySelector(".reservation").classList.remove("active");
    var paymentOrderForm = document.getElementById("payment-order-form");
    var reservationOrderForm = document.getElementById("reservation-order-form");
    paymentOrderForm.classList.remove("d-none");
    reservationOrderForm.classList.add("d-none");
  }

};
