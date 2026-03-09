/*======================================================
  responsiveScripts.js
  ======================================================

    1.  SET JAVASCRIPT BREAKPOINTS AND ENTER/EXIT SCRIPTS
    2.  ADD MOBILE DEVICE CLASSES
    3.  NAVIGATION SCRIPTS (TRIGGER CLICK FUNCTIONS AND CLONING/APPENDING NAVS)
    4.  SCROLL FUNCTIONS
    5.  RESPONSIVE IFRAME
    6.  Sticky Header 
    7.  BROWSER DETECTION SCRIPT
    8. LIGHT YOUTUBE EMBEDS SCRIPT

  ===================================================== */

  var mobile = false;
  var dropDownContainerVisible = false;
  var navOpened = false;
  
  /*==========================================================
    1. SET JAVASCRIPT BREAKPOINTS AND ENTER/EXIT SCRIPTS
  ==========================================================*/
  
  function jsMediaQueries() {
      if (Modernizr.mq('only screen and (min-width: 992px)')) {
          $('html').removeClass('tablet').addClass('desktop');
  
      }
  
      if (Modernizr.mq('only screen and (max-width: 991px)') && (Modernizr.touch) || Modernizr.mq('only all and (max-width: 991px)')) {
  
          $('html').removeClass('desktop mobile').addClass('tablet');
          $('html').removeClass('mobile');
  
          mobile = false;
      }
      if (Modernizr.mq('only screen and (min-width: 768px)')) {
  
      }
      if (Modernizr.mq('only screen and (max-width: 767px)')) {
          $('html').removeClass('tablet').addClass('mobile');
          document.addEventListener("touchstart", function() {}, true) // ADD 'ACTIVE' STATE TO TOUCH LINKS
  
          mobile = true;
      }
      if (Modernizr.mq('only screen and (max-width: 991px)')) {
          $("#nav").superfish('destroy');
      } else {
          $('#nav > li').removeClass('mobile-open');
          $("#nav").superfish({
              cssArrows: false,
              speed: "normal",
              speedOut: "fast"
          });
      }
  }
  
  function moveForMobile() {
      if (!$('#uber').hasClass('landing')) {
          if (window.innerWidth < 992) {
              if (!$('#topNavContainer').parent('#mainNav').length > 0) {
                  $('#topNavContainer').appendTo('#mainNav');
              }
              if (!$('#logo').parent('#header-top .ic-container-fluid').length > 0) {
                  $('#logo').prependTo('#header-top .ic-container-fluid');
              }
              if (!$('#header-bottom .searchContainer').parent('#mainNav').length > 0) {
                  $('#header-bottom .searchContainer').insertAfter('#mainNav #topNavContainer');
              }
  
              $('#subNavWrapper').insertBefore('#contentInt');
  
              if (!$('#contactMainContainer').parent('#printAreaContent').length > 0) {
                  $('#contactMainContainer').appendTo('#printAreaContent');
              }
          } else {
              if ($('#topNavContainer').parent('#mainNav').length > 0) {
                  $('#mainNav #topNavContainer').prependTo('#header-top .ic-container-fluid');
              }
  
              if ($('#logo').parent('#header-top .ic-container-fluid').length > 0) {
                  $('#header-top #logo').prependTo('#header-bottom .ic-container-fluid');
              }
              if ($('.searchContainer').parent('#mainNav').length > 0) {
                  $('#mainNav .searchContainer').appendTo('#header-bottom .ic-container-fluid');
              }
  
              $('#subNavWrapper').insertAfter('#contentInt');
  
              if ($('#contactMainContainer').parent('#printAreaContent').length > 0) {
                  $('#contactMainContainer').appendTo('#subNavWrapper');
              }
          }
      }
  }
  
  function moveForMobileLanding() {
      if ($('#uber').hasClass('fullWidth') || $('#uber').hasClass('landing')) {
          if (window.innerWidth < 992) {
              if (!$('#topNavContainer').parent('#landingNav').length > 0) {
                  $('#topNavContainer').appendTo('#landingNav');
              }
          } else {
              if ($('#topNavContainer').parent('#landingNav').length > 0) {
                  $('#landingNav #topNavContainer').appendTo('#header-top .ic-container-fluid');
              }
          }
      }
  }
  
  function moveForMobileLandingInterior() {
      if (!$('#uber').hasClass('fullWidth') && $('#uber').hasClass('landingInterior')) {
          if (window.innerWidth < 992) {
  
              $('#subNavWrapper').insertBefore('#contentInt');
  
              if (!$('#contactMainContainer').parent('#printAreaContent').length > 0) {
                  $('#contactMainContainer').appendTo('#printAreaContent');
                  //move the contact module on Landing interior pages but not the main landing page
              }
          } else {
  
              $('#subNavWrapper').insertAfter('#contentInt');
  
              if ($('#contactMainContainer').parent('#printAreaContent').length > 0) {
                  $('#contactMainContainer').appendTo('#subNavWrapper');
              }
          }
      }
  }
  
  function moveQuickLinks() {
      if (window.innerWidth < 768) {
          if (!$('#quickLinksContainer').parent('#mainContent').length > 0) {
              $('#quickLinksContainer').prependTo('#mainContent');
          }
      } else {
          if ($('#quickLinksContainer').parent('#mainContent').length > 0) {
              $('#mainContent #quickLinksContainer').insertAfter('#backgroundVideoWrapper');
          }
      }
  }
  
  
  function mainNavMobile() {
      // ADD EXPANDER FOR MAIN NAV
      var mobileNavButton = '<div class="mainNavItem_expander" tabindex="0" role="button"></div>';
      $(mobileNavButton).insertBefore('#mainNav > ul > li > .dropDownContainer')
      $('.mainNavItem_expander').on('click', function(event) {
          event.preventDefault()
          event.stopPropagation()
  
          if ($(this).parent().hasClass('mobile-open')) {
              $(this).parent().removeClass("mobile-open");
              $(this).next().slideToggle(240);
          } else {
              $('.mainNavItem_expander').parent().removeClass("mobile-open");
  
              $(this).parent().toggleClass('mobile-open');
              $(this).next().slideToggle(240);
              $('.mainNavItem_expander').parent().each(function(index) {
                  if (!$(this).hasClass('mobile-open')) {
                      $(this).find('.dropDownContainer').slideUp(240);
                  }
              });
          }
      })
  }
  
  /*==========================================================
      HOMEPAGE FLICKITY CAROUSEL FUNCTIONS AND INITIALIZATION
  ==========================================================*/
  var $carousel = $('.carousel');
  
  // set to allow tabbing into visible content links only
  function carouselLinkTabbing() {
      if ($("#uber").hasClass('homepage')) {
          $('#flickityCarousel .carousel-cell:not(.is-selected)').each(function(i, obj) {
              $(this).removeClass('is-visible');
          });
  
          $('#flickityCarousel .carousel-cell').each(function(i, obj) {
              if ($(this).hasClass('is-selected')) {
                  $(this).find('a').removeAttr('tabindex');
                  if (window.matchMedia("(min-width: 992px)").matches) {
                      $(this).next().next().find('a').removeAttr('tabindex');
                      $(this).next().find('a').removeAttr('tabindex');
                      $(this).next().next().addClass('is-visible');
                      $(this).next().addClass('is-visible');
                  } else if (window.matchMedia("(min-width: 480px)").matches) {
                      $(this).next().find('a').removeAttr('tabindex');
                  }
              }
          });
          $('#flickityCarousel .carousel-cell:not(.is-selected):not(.is-visible)').each(function(i, obj) {
              $(this).find('a').attr('tabindex', '-1');
          });
      }
  }
  
  // Initialize Flickity
  if ($("#uber").hasClass('homepage')) {
      $carousel.on('ready.flickity', function() {
          $('.carousel .carousel-cell .content').matchHeight({
              byRow: false
          });
          $('.flickity-page-dots li').attr("role", "button").attr("tabindex", "0");
      });
  
      // select cell on button click
      $carousel.on('keyup', '.flickity-page-dots li', function(event) {
          var code = event.keyCode || event.which;
          if (code == 13) { //Enter keycode
              var index = $(this).index();
              $carousel.flickity( 'select', index );
          }
      });
  
      var carousel = new Flickity('.carousel', {
          autoPlay: false,
          cellSelector: '.carousel-cell',
          lazyLoad: true,
          cellAlign: 'left',
          pauseAutoPlayOnHover: false,
          prevNextButtons: false,
          setGallerySize: true,
          accessibility: true,
          freeScroll: true,
          wrapAround: true
      });
  }
  
  
  
  
  //trigger resize event (cross browser compatible)
  function triggerResizeEvent() {
      if (typeof(Event) === 'function') {
          // modern browsers
          window.dispatchEvent(new Event('resize'));
  
      } else {
          //This will be executed on old browsers and especially IE
          var resizeEvent = window.document.createEvent('UIEvents');
          resizeEvent.initUIEvent('resize', true, false, window, 0);
          window.dispatchEvent(resizeEvent);
      }
  }
  
  //debounce resize 
  (function($, sr) {
      var debounce = function(func, threshold, execAsap) {
          var timeout;
          return function debounced() {
              var obj = this,
                  args = arguments;
  
              function delayed() {
                  if (!execAsap)
                      func.apply(obj, args);
                  timeout = null;
              };
              if (timeout)
                  clearTimeout(timeout);
              else if (execAsap)
                  func.apply(obj, args);
              timeout = setTimeout(delayed, threshold || 100);
          };
      }
      jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
  })(jQuery, 'debounceResize');
  
  $(function() {
  
      if ($('#uber').hasClass('landingReducedBanner')) {
          $('.mobileBannerText').appendTo('#ic-gal-slider-home');
      }
  
      mainNavMobile();
      // Fix Gallery not visible in Accordion on expand
      $('.AccordionTrigger').on('click', function() {
          triggerResizeEvent();
      });
  
      // Mobile nav open/close
      $('.mobileNav').find('.menuTrigger').on('click', function(event) {
          event.preventDefault();
          $(this).toggleClass('open');
          $('#mainNav').slideToggle('fast');
          $('#landingNav').slideToggle('fast');
          $('header').toggleClass('navOpen');
      });
  
      $('#subNavBtn').click(function() {
          if ($(this).find('span').text() === 'More') {
              $(this).find('span').text('Less');
          } else {
              $(this).find('span').text('More');
          }
          $('#subNavWrapper').slideToggle();
      });
  
      // Hide Mobile subNav trigger if subnav is empty
      if (!$('#subNavWrapper #subNavContainer .subNav li').first().children().length) {
          $('#subNavBtn').addClass('hiddenBtn');
      } else {
          $('#subNavBtn').removeClass('hiddenBtn');
      }
  
      jsMediaQueries()
      moveForMobile()
      moveForMobileLanding()
      moveForMobileLandingInterior()
      moveQuickLinks()
  
      if ($('#uber').hasClass('interior') && !$('#uber').hasClass('landing')) {
          $('.lb-imageBox_header').matchHeight();
          $('.interior .fbg-row.lb-imageBox a, .interior .bannerImage a').each(function() {
              if ($(this).attr('href') == "" | !$(this).attr('href')) {
                  $(this).contents().unwrap("a");
              }
          });
      }
  
      //debounce resize instead of standard resize
      $(window).debounceResize(function() {
          jsMediaQueries();
          moveForMobile()
          moveForMobileLanding()
          moveForMobileLandingInterior()
          moveQuickLinks()
          carouselLinkTabbing()
          if ($("#uber").hasClass('landing')) {
              // $('#stickyHeaderRight #mainNav').detach().appendTo('#header-mid .ic-container-fluid');
          }
      });
  
      // $(window).resize(function () {
  
      // });
  
      $(window).load(function() {
          $('body').addClass('loaded');
          jsMediaQueries();
          moveForMobile()
          moveForMobileLanding()
          moveForMobileLandingInterior()
          moveQuickLinks()
          carouselLinkTabbing()
          $('#flickityCarousel').on('change.flickity', function(event, index) {
              carouselLinkTabbing();
          });
  
              if ($('.homepage').length) {
                  triggerResizeEvent();
              }
  
          if ($("#uber").hasClass("theme-01") && $("#idLikeToModal").is("*")){
              $("#idLikeToModal").addClass("theme-01");
          } else if ($("#uber").hasClass("theme-02") && $("#idLikeToModal").is("*")){
              $("#idLikeToModal").addClass("theme-02");
          } else if ($("#uber").hasClass("theme-03") && $("#idLikeToModal").is("*")){
              $("#idLikeToModal").addClass("theme-03");
          } else if ($("#uber").hasClass("theme-04") && $("#idLikeToModal").is("*")){
              $("#idLikeToModal").addClass("theme-04");
          }
  
      });
  
      /*==========================================================
        2. ADD MOBILE DEVICE CLASSES
      ==========================================================*/
  
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
          $('html').addClass('x-apple');
      }
      if (navigator.userAgent.match(/(Android)/i)) {
          $('html').addClass('x-android');
      }
      if (navigator.userAgent.match(/(blackberry)/i)) {
          $('html').addClass('x-blackberry');
      }
      if (navigator.userAgent.match(/(bb10)/i)) {
          $('html').addClass('x-bb10');
      }
  
      /*==========================================================
        3. NAVIGATION SCRIPTS
      ==========================================================*/
  
      //HOMEPAGE BANNER VIDEO 
      function onViewFullMenuClick() {
          $('.extendedMenu').click(function(e) {
              e.preventDefault()
              $('#extendedMenu').toggleClass('hidden')
          })
      }
  
      $(document).ready(function() {
          onViewFullMenuClick();
  
          $(".pauseButton").click(function() {
              var vid = $("#backgroundVideo")[0];
              if (!vid.paused) {
                  vid.pause();
                  $(".pauseButton").addClass("paused");
              } else {
                  vid.play();
                  $(".pauseButton").removeClass("paused");
              }
          })
  
          $(".toggleSound").click(function () {
              var vid = $("#backgroundVideo")[0];
              if (!vid.muted) {
                  vid.muted = true;
                  $(".toggleSound").removeClass("sound");
              }
              else {
                  vid.muted = false;
                  $(".toggleSound").addClass("sound");
              }
          })
      });
  
      if ($('#subNavContainer > ul.subNav.top').length == 0) {
          $('.showAllWrapper.subNav').click();
          $('a.extendedMenu').hide();
          $('#extendedMenu').removeClass('hidden')
      }
  
      $('#subNavWrapper .showAllWrapper')
          .find('a.extendedMenu')
          .on('click', function(event) {
              event.preventDefault()
              $('#subNavContainer ul#extendedMenu.open').slideToggle('fast').removeClass('hidden')
              if ($("#subNavContainer a.extendedMenu:contains('Close')").length > 0) {
                  $('#subNavContainer a.extendedMenu').removeClass('open').text(function(index, text) {
                      return text.replace('Close', 'View')
                  })
              } else {
                  $('#subNavContainer a.extendedMenu').addClass('open').text(function(index, text) {
                      return text.replace('View', 'Close')
                  })
              }
          })
  
      $('.subNav')
          .find('div[role="button"]')
          .keypress(function() {
              if (event.which == 13) {
                  $(this)
                      .next('ul')
                      .slideToggle()
                      .parent('li')
                      .toggleClass('open')
              }
          })
  
      // Expanding sub nav
      $('.subNav')
          .find('div[role="button"]')
          .click(function(e) {
              e.stopPropagation()
  
              $(this)
                  .next('ul')
                  .slideToggle()
                  .parent('li')
                  .toggleClass('open')
          })
  
      /*==========================================================
        4.SCROLL FUNCTIONS
      ==========================================================*/
  
      // Scroll to Anchor links when link to anchor is clicked on the same page
      $('#printAreaContent a[href*=#]:not([href=#]), #printAreaContentDotNet a[href*=#]:not([href=#]), #skipContentLink').click(function() {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash)
              var headerHeight = $("header").height() + 60; // Get fixed header height
  
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              if (target.parents('.AccordionContent').length || target.parents('.AccordionTrigger').length) {  //if clicking accordion link or link in accordion
                  if (target.parents('.AccordionTrigger').length) { 
                     target.closest('.AccordionTrigger').addClass('open');
                     target.closest('.AccordionTrigger').next().slideUp("100");                     
                     target.focus();
                  } else if (target.parents('.AccordionContent').length){
                      $('.AccordionContent:visible').slideUp("100");
                      $('.AccordionTrigger').removeClass('open');
                      target.parents('.AccordionContent').slideDown("100");
                      target.parents('.AccordionContent').prev().addClass('open');
                      if (target.length) {
                          $('html,body').animate({
                              scrollTop: target.offset().top - headerHeight //Offset scroll position of anchor link for sticky header
                          }, 1000);
                          target.focus();
                          return false;
                      }
                  }
              } else if (target.length) {
                  $('html,body').animate({
                      scrollTop: target.offset().top - headerHeight //Offset scroll position of anchor link for sticky header
                  }, 1000);
                  target.focus();
                  return false;                
              }
          }
      });
  
      $(window).load(function() {
  
          // Ignore if page is using ScrollTo functionality from URL (facility module)
          var pageURL = window.location.href;
          var headerHeight = $("header").height() + 60; // Get fixed header height
  
          if (pageURL.indexOf("ScrollTo=") == -1){
  
              //Scroll to Anchor links on page load when anchor hash is part of URL
              if (window.location.hash) {
                  var hash = window.location.hash.substring(1),
                      hashIsEl = true;
                  if (hash != '') {
                      if ($('[name=' + hash + ']').length > 0) {
                          hash = $('[name=' + hash + ']');
                      } else if ($('#' + hash).length > 0) {
                          hash = $('#' + hash);
                      } else {
                          hashIsEl = false;
                      }
                      if (hashIsEl) {
                          var offsetTop = hash.offset().top - 0;
                          $('html, body').animate({
                              scrollTop: offsetTop - headerHeight
                          }, 1000);
                          if ($(hash).parents('.AccordionTrigger').length) {
                              $(hash).parents('.AccordionTrigger').trigger("click");
                          } 
                          $(hash).focus();
                      }
                  }
              } else if (false != true && $('#intBg').length && !$('.hideBanner').length) {
                  // Scroll to #pageHeading and by pass interior banner if loading a page from the same/current vertical
                  if ($('.landingInterior').length) {
                      offsetSticky = 220;
                  } else {
                      offsetSticky = 160;
                  }
  
                  var offsetTop = $('#pageHeading').offset().top - offsetSticky;
  
                  if ($(this).scrollTop() < offsetTop) { // if scroll is less than the scroll to position.
                  var loc = window.location.pathname;
                  var referrer = document.referrer.replace(/^.*\/\/[^\/]+/, '');
  
                  var currentDir = loc.substring(0, loc.lastIndexOf('/'));
                  var referrerDir = referrer.substring(0, referrer.lastIndexOf('/'));
  
  
                      if ($('#uber').hasClass('interior')) {
                          if (referrerDir.toLowerCase() == currentDir.toLowerCase()) {
                              $('html, body').animate({
                                  scrollTop: offsetTop
                              }, 1000);
                          }
                      }
                  }
              }
  
          }
      });
  
      // Set Tab focus to appear below sticky header
      $('body').on('keyup', 'a', function(e) {
          var code = (e.keyCode ? e.keyCode : e.which);
          if (code == 9 && $('a:focus').length && !$(e.currentTarget).closest("#stickyHeader").length) {
              headerHeight = $("header").height() + 60; // Get fixed header height
              var ele = $(e.currentTarget).offset().top;
              var eleTop = ele - $(window).scrollTop();
              var newPos = ele - headerHeight;
  
              if (eleTop < headerHeight) {
                  $('html, body').stop().animate({
                      scrollTop: newPos
                  }, 500);
              }
          }
      });
  
      /*==========================================================
        5.RESPONSIVE IFRAME
      ==========================================================*/
  
      if (!iCreateObject.isSiteInICreateMode || iCreateObject.isSiteInPreview) {
          if ($('iframe').length > 0) {
              $('iframe').each(function(index) {
                  var patternVideo = /(youtube\.com|youtu\.be|vimeo\.com)/,
                      video = patternVideo.test($(this).attr('src'));
                  var patternIssuu = /(issuu\.com)/,
                      issuu = patternIssuu.test($(this).attr('src'));
                  if (video) {
                      var iframeWidth = $(this).outerWidth(),
                          iframeHeight = $(this).outerHeight(),
                          iframePadding = iframeHeight / iframeWidth * 100;
                      if ($(this).parent('.iframe-container').length == 0) {
                          $(this).wrap('<div class="iframe-container" />');
                      }
  
                      $(this).parent('.iframe-container').css('padding-bottom', iframePadding + '%');
                      if ($(this).attr('width')) {
                          if (!$(this).attr('width').match('%$')) {
                              $(this).parent('.iframe-container').wrap('<div style="max-width:' + $(this).attr('width') + 'px"></div>');
                          }
                      }
                  } else if (issuu) {
                      var iframeWidth = $(this).outerWidth(),
                          iframeHeight = $(this).outerHeight(),
                          iframePadding = iframeHeight / iframeWidth * 100;
                      $(this).parent('.issuuembed').addClass('iframe-container').css('padding-bottom', iframePadding + '%');
                  }
              });
          }
      }
  });
  
  
  /*==========================================================
    I'D LIKE TO AND SEARCH MODAL INITS
  ==========================================================*/
  
  function modalClose(target) {
      $('.modal-box').fadeOut('fast').next('.modal-cover').fadeOut();
      if (typeof target !== 'undefined' && target != null && target.length > 0) $(target).focus();
  }
  
  function modalHandling() {
      $(window).load(function() {
          $("[data-modal-id]").click(function(event) {
  
              event.preventDefault();
  
              var modalBox = $(this).attr("data-modal-id");
              $("#" + modalBox).fadeIn();
              $(".modal-cover").fadeIn("fast");
              $('#uber').addClass('modalPopup');
              $('#header-bottom .searchContainer').appendTo('#search-popup #modal-body');
  
              var inputs = $('#' + modalBox).find('select, input, textarea, button, a').filter(':visible');
              var modalFirstInput = inputs.first();
              var modalLastInput = inputs.last();
  
              /*set focus on first input*/
              if (modalBox == ("idLikeToModal")) {
                  $("#idLikeToModal .close").focus();
              } else {
                  inputs.eq(0).focus();
              }
  
  
              /*redirect last tab to first input*/
              modalLastInput.on('keydown', function(e) {
                  if ((e.which === 9 && !e.shiftKey)) {
                      e.preventDefault();
                      modalFirstInput.focus();
                  }
              });
  
              /*redirect first shift+tab to last input*/
              modalFirstInput.on('keydown', function(e) {
                  if ((e.which === 9 && e.shiftKey)) {
                      e.preventDefault();
                      modalLastInput.focus();
                  }
              });
              return false;
  
          });
          $('#idLikeToModal .close').click(function() {
              modalClose($('#idLikeTo > a'));
              $('#uber').removeClass('modalPopup');
              $('#search-popup .searchContainer').appendTo('#header-bottom .ic-container-fluid');
  
          });
          $('#search-popup .close').click(function() {
              modalClose($('#quickLinks a:first'));
              $('#uber').removeClass('modalPopup');
              $('#search-popup .searchContainer').appendTo('#header-bottom .ic-container-fluid');
          });
      });
  }
  
  
  modalHandling()
      /*==========================================================
          6. Sticky Header 
      ==========================================================*/
  
  //topBar Hide on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.header-background').outerHeight();
  
  function pageHasScrolled() {
      var st = $(this).scrollTop();
      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
          return;
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
          // Scroll Down
          $('.header-background').removeClass('nav-down').addClass('nav-up');
  
          $('#header-bottom #logo').prependTo('#header-mid .ic-container-fluid').addClass('moved');
  
      } else {
          // Scroll Up
          if (st + $(window).height() < $(document).height()) {
              $('.header-background').removeClass('nav-up').addClass('nav-down');
          }
      }
      lastScrollTop = st;
  }
  
  $(window).scroll(function(event) {
      didScroll = true;
      var $this = $(this);
      if ($this.scrollTop() === 0) {
          $('.header-background').removeClass('nav-bottom').addClass('nav-top');
          $('#header-mid .ic-container-fluid #logo').prependTo('#header-bottom .ic-container-fluid').removeClass('moved');
  
      } else {
          $('.header-background').removeClass('nav-top').addClass('nav-bottom');
          $('#header-bottom #logo').prependTo('#header-mid .ic-container-fluid').addClass('moved');
      }
  });
  
  setInterval(function() {
      if (didScroll) {
          pageHasScrolled();
          didScroll = false;
      }
  }, 250);
  
  
  
  /*==========================================================
      7. BROWSER DETECTION SCRIPT
  ==========================================================*/
  
  (function(factory) {
      if (typeof define === 'function' && define.amd) {
          define(['jquery'], function($) {
              return factory($);
          });
      } else if (typeof module === 'object' && typeof module.exports === 'object') {
          module.exports = factory(require('jquery'));
      } else {
          factory(window.jQuery);
      }
  }(function(jQuery) {
      "use strict";
  
      function uaMatch(ua) {
          if (ua === undefined) {
              ua = window.navigator.userAgent;
          }
          ua = ua.toLowerCase();
  
          var match = /(edge)\/([\w.]+)/.exec(ua) || /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(iemobile)[\/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
  
          var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || /(playbook)/.exec(ua) || /(bb)/.exec(ua) || /(blackberry)/.exec(ua) || [];
  
          var browser = {},
              matched = {
                  browser: match[5] || match[3] || match[1] || "",
                  version: match[2] || match[4] || "0",
                  versionNumber: match[4] || match[2] || "0",
                  platform: platform_match[0] || ""
              };
  
          if (matched.browser) {
              browser[matched.browser] = true;
              browser.version = matched.version;
              browser.versionNumber = parseInt(matched.versionNumber, 10);
          }
  
          if (matched.platform) {
              browser[matched.platform] = true;
          }
  
          if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"]) {
              browser.mobile = true;
          }
  
          if (browser.cros || browser.mac || browser.linux || browser.win) {
              browser.desktop = true;
          }
  
          if (browser.chrome || browser.opr || browser.safari) {
              browser.webkit = true;
          }
  
          if (browser.rv || browser.iemobile) {
              var ie = "msie";
              matched.browser = ie;
              browser[ie] = true;
          }
  
          if (browser.edge) {
              delete browser.edge;
              var msedge = "msedge";
              matched.browser = msedge;
              browser[msedge] = true;
          }
  
          if (browser.safari && browser.blackberry) {
              var blackberry = "blackberry";
              matched.browser = blackberry;
              browser[blackberry] = true;
          }
  
          if (browser.safari && browser.playbook) {
              var playbook = "playbook";
              matched.browser = playbook;
              browser[playbook] = true;
          }
  
          if (browser.bb) {
              var bb = "blackberry";
              matched.browser = bb;
              browser[bb] = true;
          }
  
          if (browser.opr) {
              var opera = "opera";
              matched.browser = opera;
              browser[opera] = true;
          }
  
          if (browser.safari && browser.android) {
              var android = "android";
              matched.browser = android;
              browser[android] = true;
          }
  
          if (browser.safari && browser.kindle) {
              var kindle = "kindle";
              matched.browser = kindle;
              browser[kindle] = true;
          }
  
          if (browser.safari && browser.silk) {
              var silk = "silk";
              matched.browser = silk;
              browser[silk] = true;
          }
  
          browser.name = matched.browser;
          browser.platform = matched.platform;
          return browser;
      }
  
      window.jQBrowser = uaMatch(window.navigator.userAgent);
      window.jQBrowser.uaMatch = uaMatch;
  
      if (jQuery) {
          jQuery.browser = window.jQBrowser;
      }
  
      return window.jQBrowser;
  }));
  
  
  $(function() {
      if ($.browser.name == 'msie') {
          $('html').addClass('ie');
      }
      if ($.browser.name == 'msedge') {
          $('html').addClass('msedge');
      }
      if ($.browser.name == 'opera') {
          $('html').addClass('opera');
      }
      if ($.browser.name == 'mozilla') {
          $('html').addClass('moz');
      }
      if ($.browser.name == 'safari') {
          $('html').addClass('safari');
      }
      if ($.browser.name == 'chrome') {
          $('html').addClass('chrome');
      }
  });
  
  /*==========================================================
  8. LIGHT YOUTUBE EMBEDS SCRIPT w/ lazy load (jquery.lazy.js)
  ==========================================================*/
  document.addEventListener("DOMContentLoaded",
      function() {
          var div, n,
              v = document.getElementsByClassName("youtube-player");
          for (n = 0; n < v.length; n++) {
              div = document.createElement("div");
              div.setAttribute("data-id", v[n].dataset.id);
              div.setAttribute("tabindex", '0');
              div.setAttribute("role", 'button');
              div.setAttribute("class", 'youtube-player-thumb');
              div.innerHTML = youTubeLazyThumb(v[n].dataset.id);
              div.onclick = youTubeLazyIframe;
              div.onkeyup = youTubeLazyIframe;
              v[n].appendChild(div);
          }
      });
  
  function youTubeLazyThumb(id) {
      var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
          play = '<div class="play"></div>';
      return thumb.replace("ID", id) + play;
  }
  
  function youTubeLazyIframe(event) {
      var code = event.keyCode || event.which;
      if (code == 1 || code == 13) { //Mouse click or enter keycode
          var iframe = document.createElement("iframe");
          var embed = "https://www.youtube.com/embed/ID?autoplay=1";
          iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowfullscreen", "1");
          this.parentNode.replaceChild(iframe, this);
      }
  }
  
  