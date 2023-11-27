import { Controller } from "@hotwired/stimulus"
import pdfjsLib from 'pdfjs-dist';

export default class extends Controller {
  static targets = ['prevbtn', 'nextbtn']
  static values = {
    url: String,
    id: String,
    document: String,
    pdfValue: { type: Object, default: {} },
    page: { type: Number, default: 1 },
    pageNumber: { type: Number, default: 1 },
    pageRendering: { type: Boolean, default: false },
    pageNumPending: { type: Number, default: null },
  }

  initialize() {
    this.pdfDoc = {};
  }

  connect() {
    this.renderPDF();
  }

  renderPDF() {
    var url = this.urlValue;

    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    // Asynchronous download of PDF
    this.loadingTask = pdfjsLib.getDocument(url);
    this.loadingTask.promise.then(function(pdfDoc) {
      this.hideLoader();
      this.pdfValue = pdfDoc;
      this.pageNumberValue = this.pdfValue.numPages;
      if (this.pageNumberValue == 1) {
        this.hideButton(this.nextbtnTarget);
        this.hideButton(this.prevbtnTarget);
      }
      this.toggleButtons();
      this.renderPage();
    }.bind(this));
  }

  renderPage() {
    this.pageRenderingValue = true;
    var id = this.idValue;
    this.pdfValue.getPage(this.pageValue).then(function(page) {
      var scale = 1.2;
      var viewport = page.getViewport({scale: scale});
      var canvas = document.getElementById(id);
      var context = canvas.getContext('2d');
      var resolution = 2
      canvas.height = resolution * viewport.height;
      canvas.width = resolution * viewport.width;
      canvas.style.width = '100%';
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
        transform: [resolution, 0,0, resolution, 0,0]
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        this.pageRenderingValue = false;
        if (this.pageNumPending !== null) {
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
      }.bind(this));
    }.bind(this));
    this.pageValue;
  }

  queueRenderPage(num) {
    if (this.pageRenderingValue) {
      this.pageNumPending = num;
    } else {
      this.renderPage();
    }
  }

  onPrevPage() {
    if (this.pageValue <= 1) {
      return;
    }
    this.pageValue--;
    this.toggleButtons()
    this.queueRenderPage(this.pageValue);
  }

  onNextPage() {
    if (this.pageValue >= this.pageNumberValue) {
      return;
    }
    this.pageValue++;
    this.toggleButtons()
    this.queueRenderPage(this.pageValue);
  }

  toggleButtons() {
    if (this.pageNumberValue > 1) {
      this.showButton(this.nextbtnTarget);
      this.showButton(this.prevbtnTarget);
    }
    if (this.pageValue >= this.pageNumberValue) {
      this.hideButton(this.nextbtnTarget);
    } else {
      this.showButton(this.nextbtnTarget);
    }
    if (this.pageValue <= 1) {
      this.hideButton(this.prevbtnTarget);
    } else {
      this.showButton(this.prevbtnTarget);
    }
  }

  hideButton(button) {
    button.classList.add('d-none');
  }

  showButton(button) {
    button.classList.remove('d-none');
  }

  showLoader() {
    console.log(this.element)
    this.element.querySelector('.loading').classList.remove('d-none');
    this.element.querySelector('.pdf-viewer').classList.add('d-none');
    this.element.querySelector('.pdf-controls').classList.add('d-none');
  }

  hideLoader() {
    this.element.querySelector('.loading').classList.add('d-none');
    this.element.querySelector('.pdf-viewer').classList.remove('d-none');
    this.element.querySelector('.pdf-controls').classList.remove('d-none');
  }
};
