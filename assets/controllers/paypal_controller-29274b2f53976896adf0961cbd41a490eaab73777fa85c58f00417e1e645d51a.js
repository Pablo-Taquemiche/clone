import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["paypalButton", "paymentForm"];

  connect() {
    console.log('PAYPAL BUTTON CONNECTED');
    this.initializePayPalButton();
  }

  initializePayPalButton() {
    const paypalBtn = this.paypalButtonTarget;

    if (paypalBtn && paypalBtn.children.length < 1) {
      document.getElementById("validateDataBtn").style.display = "none";

      paypal.Buttons({
        onInit: this.onInit.bind(this),
        onClick: this.onClick.bind(this),
        createOrder: this.createOrder.bind(this),
        onApprove: this.onApprove.bind(this),
        onError: this.onError.bind(this),
      }).render(paypalBtn);
    }
  }

  onInit(data, actions) {
    console.log('PAYPAL BUTTON INIT');
  }

  onClick() {
    console.log('PAYPAL BUTTON CLICK');
  }

  createOrder(data, actions) {
    const payload = this.buildOrderPayload();

    var url = new URL(`${this.slug}/api/v1/paypal/orders`);
    return fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.order_id) {
          return data.order_id;
        } else {
          console.log(data.errors);
        }
      });
  }

  async onApprove(data, actions) {
    console.log('PAYPAL BUTTON APPROVED');
    const container = document.getElementById('payment-order-form').closest(".cart-checkout");
    this.paymentWorkingMessage(container);
    try {
      const res = await fetch(`/api/v1/paypal/orders/${data.orderID}/capture`, {
        method: "POST",
      })
      console.log(res)
      if (!res.ok) {
        await this.paymentFailureMessage(container);
      } else {
        await this.paymentSuccessMessage(container);
        const url = `/api/v1/line_items/1`;
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          setTimeout(() => {
            window.location = `/orders/${data.orderID}`;
        }, 2000);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      this.paymentFailureMessage(container);
      console.error(error);
    }
  }

  onError(err) {
    console.log(err);
  }

  buildOrderPayload() {
    const extraFields = JSON.parse(this.data.get("fieldsExtra"));
    const formData = {
      payer_address1: this.payerAddress1,
      payer_address2: this.payerAddress2,
      payer_city: this.payerCity,
      payer_country: this.payerCountry,
      payer_email: this.email,
      payer_name: this.name,
      payer_zip: this.payerZip,
      payer_phone: this.payerPhone,
      fields_extra: this.fieldsExtra,
      coupon: this.currentShoppingCartCoupon,
      products: this.lineItems,
    };
    const payload = {
      order: formData,
      authenticity_token: this.authToken,
    };
    return payload;
  }

  paymentFailureMessage(event) {
    const product = this.paypalButtonTarget.closest(".cart-checkout");
    this.hideAllMessages(product);
    const msg = product.querySelector(".payment-failure");
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 4000);
  }

  paymentGeneralFailureMessage(event) {
    const product = this.paypalButtonTarget.closest(".cart-checkout");
    const message = event.detail.message;
    const msg = product.querySelector(".general-error");
    msg.innerHTML = message;
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 4000);
  }

  paymentSuccessMessage(event) {
    const product = this.paypalButtonTarget.closest(".cart-checkout");
    this.hideAllMessages(product);
    const msg = product.querySelector(".payment-success");
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 4000);
  }

  paymentWorkingMessage(event) {
    const product = this.paypalButtonTarget.closest(".cart-checkout");
    product.querySelector(".payment-working").style.display = "block";
  }

  unprocessableMessage(event) {
    const product = this.paypalButtonTarget.closest(".cart-checkout");
    product.querySelector(".unprocessable-shipping").style.display = "block";
  }

  processableMessage(event) {
    const product = this.paypalButtonTarget.closest(".cart-checkout");
    product.querySelector(".unprocessable-shipping").style.display = "none";
  }

  hideAllMessages(product) {
    const messages = product.querySelectorAll(".row-overlay");
    messages.forEach((msg) => (msg.style.display = "none"));
  }

  get payerAddress1() {
    return this.paymentFormTarget.dataset.payerAddress1;
  }

  get payerAddress2() {
    return this.paymentFormTarget.dataset.payerAddress2;
  }

  get payerCity() {
    return this.paymentFormTarget.dataset.payerCity;
  }

  get payerCountry() {
    return this.paymentFormTarget.dataset.payerCountry;
  }

  get email() {
    return this.paymentFormTarget.dataset.payerEmail;
  }

  get name() {
    return this.paymentFormTarget.dataset.payerName;
  }

  get payerZip() {
    return this.paymentFormTarget.dataset.payerZip;
  }

  get payerPhone() {
    return this.paymentFormTarget.dataset.payerPhone;
  }

  get fieldsExtra() {
    try {
      return JSON.parse(this.paymentFormTarget.dataset.fieldsExtra);
    }
    catch {
      return {};
    }
  }

  get slug() {
    return this.paymentFormTarget.dataset.slug;
  }

  get currentShoppingCartCoupon() {
    return this.paymentFormTarget.dataset.currentShoppingCartCoupon;
  }

  get lineItems() {
    return JSON.parse(this.paymentFormTarget.dataset.products);
  }

  get authToken() {
    return this.paymentFormTarget.dataset.authToken;
  }
};
