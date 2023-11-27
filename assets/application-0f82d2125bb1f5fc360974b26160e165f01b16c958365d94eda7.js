// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//
import "bootstrap"

Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

document.addEventListener('turbo:before-visit', () => {
  let siteBody = document.getElementById("page-content-body");
  let allCloseSlideoutBtn = document.querySelectorAll("[id^='slideoutCloseButton-']");
  siteBody.classList.remove('slideout-open');
  allCloseSlideoutBtn.forEach(closeBtn => {
    if (closeBtn.closest('#slideout')) {
      slideout.style.transform = 'translateX(-100)';
    }
    closeBtn.closest('.slideout-block').classList.add("hidden");
    closeBtn.closest('.slideout-block').classList.remove('slideout-block-open');
  })
  let navbarIsShowing = document.querySelector('.navbar-collapse.show');
  let collapseBtn = document.querySelector('.navbar-toggler');
  if (navbarIsShowing) {
    collapseBtn.click();
  }
})

function reloadPermanent() {
  let permanentsToReload = document.querySelectorAll("[data-turbo-permanent=initial-value]");
  let reloadPermanents = document.querySelectorAll("[data-reload-permanent=true]");
  reloadPermanents.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      permanentsToReload.forEach(reloadEl => {
        reloadEl.setAttribute("data-turbo-permanent", 'reload');
        reloadEl.setAttribute("data-turbo-cache", 'false');
        reloadEl.removeAttribute('complete');
      });
      Turbo.visit(button.href)
    })
  })
}

document.addEventListener("DOMContentLoaded", function() {
  reloadPermanent();
  loadFooter();
});
document.addEventListener('turbo:render', () => {
  loadFooter();
})

document.addEventListener('turbo:frame-render', (event) => {
  let trixContent = event.target.querySelector('.trix-content');
  if (trixContent) {
    checkForTrixAnchors(trixContent);
  }
})
document.addEventListener('turbo:before-stream-render', () => {
  reloadCart();
})
document.addEventListener('turbo:visit', () => {
  reloadPermanent();
  reloadCart();
})

function reloadCart() {
  document.querySelectorAll('#current-cart').forEach(el => {
    el.reload();
  })
}

function loadFooter() {
  if (document.querySelector('.footer-nav')) {
    setFooterHeight();
  } else {
    setTimeout(loadFooter, 1000);
  }
}

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function checkForTrixAnchors(content) {
  content.querySelectorAll('.trix-content a').forEach(el => {
    el.dataset.turboFrame = '_top';
  })
}

document.addEventListener("turbo:before-cache", function() {
})

document.addEventListener("turbo:load", function() {
  reloadPermanent();
  var pdfs = document.querySelectorAll(".attachment--pdf iframe");
  var intervals = [];
  setTimeout(() => {
    pdfs.forEach((pdf, index) => {
      intervals[index] = setInterval(() => {
        console.log("Interval" + index);
        var errors = 0;
        console.log(`Errors de ${index}:`,errors);
        if (pdf.contentDocument && pdf.contentDocument.location) {
          console.log(`pdf ${index} not loaded`);
          console.log(pdf.contentDocument);
          console.log("before change");
          console.log(pdf.contentDocument.location.href);
          console.log("source");
          console.log(pdf.src);
          pdf.contentWindow.location.replace(pdf.src);
          errors++;
          console.log("after change");
          console.log(pdf.contentDocument.location);
        }
        if (errors == 0) {
          clearInterval(intervals[index]);
        }

      }, 500);
    });
  }, 1000);

  let siteBody = document.getElementById("page-content-body");
  let productsBtn = document.getElementById("slideout-products");
  //let productsAnchor = document.getElementById("slideout-anchor");
  let closeDrawer = document.getElementById("slideoutCloseButton");
  let drawerMask = document.getElementById("slideoutMask");
  let bacMenuBtn = document.getElementById("slideoutBackButton");
  let drawers = document.querySelectorAll("[id^='slideout-anchor']")
  let allSlideouts = document.querySelectorAll("[id^='slideout-']");
  let allCloseSlideoutBtn = document.querySelectorAll("[id^='slideoutCloseButton-']");

  drawers.forEach((drawer) => {
    drawer.addEventListener('click', openSlideoutDrawer, false);
  })

  allCloseSlideoutBtn.forEach(btn => {
    btn.addEventListener('click', closeSlideoutDrawer, false);
  });

  function openSlideoutDrawer(e) {
    e.preventDefault();
    closeAllSlideouts();
    setTimeout(() => {
      var slideout = document.getElementById(e.target.dataset.drawerId);
      if (slideout) {
        slideout.classList.remove("hidden");
        siteBody.classList.add("slideout-open");
        slideout.classList.add('slideout-block-open');
      } else {
        var slideout = document.getElementById('slideout');
        slideout.classList.remove("hidden");
        siteBody.classList.add("slideout-open");
        slideout.classList.add('slideout-block-open');
        slideout.style.transform = 'translateX(0)';
      }
    }, 300);
  }

  function closeSlideoutDrawer(e) {
    if (e.target.closest('#slideout')) {
      console.log('in')
      e.target.closest('#slideout').style.transform = 'translateX(-100)';
      e.target.closest('#slideout').classList.add('hidden');
      e.target.closest('#slideout').classList.remove('slideout-block-open');
    } else {
      siteBody.classList.remove('slideout-open');
      e.target.closest('.slideout-block').classList.add('hidden');
      e.target.closest('.slideout-block').classList.remove('slideout-block-open');
    }
  }

  function closeAllSlideouts() {
    siteBody.classList.remove('slideout-open');
    allCloseSlideoutBtn.forEach(closeBtn => {
      if (closeBtn.closest('#slideout')) {
        slideout.style.transform = 'translateX(-100)';
      }
      closeBtn.closest('.slideout-block').classList.add("hidden");
      closeBtn.closest('.slideout-block').classList.remove('slideout-block-open');
    })
  }



  if (productsBtn) {
    productsBtn.addEventListener('click', openSlideoutDrawer, false);
  }
  //if (productsAnchor) {
  //  productsAnchor.addEventListener('click', openSlideoutDrawer, false);
  //}
  if (closeDrawer) {
    closeDrawer.addEventListener('click', closeSlideoutDrawer, false);
  }
  if (drawerMask) {
    drawerMask.addEventListener('click', closeSlideoutDrawer, false);
  }
});

function setFooterHeight() {
  var footerEl = document.querySelector(".footer");
  var footerHeight = footerEl.getBoundingClientRect().height;
  var termsEl = document.getElementById("terms-link-section");
  var newStyle = { marginBottom: `${footerHeight}px` };
  document.querySelectorAll('.footer-nav').forEach(footer => {
    footer.style.minHeight = `${footerHeight}px`;
  });
}
  
import "@hotwired/turbo-rails"
import "controllers";
