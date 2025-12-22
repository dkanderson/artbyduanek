/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 * ======================================================================== */

import data from "./data.js";
console.log(data);

(function ($) {
  var $D = {},
    el = "",
    ppl = "",
    artworkWidth = 0,
    menuOpenFlag = false;

  let spaceState = {
    width: window.innerWidth,
    height: window.innerHeight,
    fps: 30,
    canvas: document.getElementById("stars"),
    minVelocity: 15,
    maxVelocity: 30,
    stars: 130,
    intervalId: 0,
  };

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  $D = {
    // All pages

    sliderInnerWidth: 0,

    scrollPosition: 0,

    common: {
      init: function () {
        // JavaScript to be fired on all pages
        /**
         * Copyright 2012, Digital Fusion
         * Licensed under the MIT license.
         * http://teamdf.com/jquery-plugins/license/
         *
         * @author Sam Sehnert
         * @desc A small plugin that checks whether elements are within
         *     the user visible viewport of a web browser.
         *     only accounts for vertical position, not horizontal.
         */

        $.fn.visible = function (partial) {
          var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

          return compareBottom <= viewBottom && compareTop >= viewTop;
        };

        $("#mob-trigger")
          .unbind("click")
          .click(function (ev) {
            $("#mob-trigger").addClass("open");
            $("body").append(
              '<div class="menu-bg-cover"><div class="menu-container"></div></div><div class="overlayW"></div>'
            );

            $(".screen-nav")
              .clone()
              .appendTo(".menu-container")
              .removeClass("screen-nav")
              .addClass("mobi-nav");

            setTimeout(function () {
              $(".menu-container").addClass("in");
              $(".overlayW").addClass("active");
            }, 100);

            $(".menu-bg-cover").click(function () {
              menuOpenFlag = false;

              $(".menu-container").removeClass("in").addClass("out");
              $("#mob-trigger").removeClass("open");

              setTimeout(function () {
                $(".menu-bg-cover").remove();
                $(".overlayW").remove();
              }, 1000);
            });
          });
      },
    },
    // Home page
    home: {
      init: function () {
        // JavaScript to be fired on the home page
        // Starfield
        // -----------------------------------------------------------
      },
    },

    blog: {
      init: function () {
        // bog page only
      },
    },

    bio: {
      init: function () {
        // bio page only
      },
    },

    resume: {
      init: function () {
        $(".progress").each(function (i, el) {
          el = $(el);

          if (el.visible(true)) {
            el.css("width", el.text());
          }
        });

        $(window).scroll(function (event) {
          $(".progress").each(function (i, el) {
            el = $(el);

            if (el.visible(true)) {
              el.css("width", el.text());
            }
          });
        });
      },
    },

    artgallery: {
      init: function () {
        el = $(".intro.art-gallery");
        el.addClass("animate-in");

        $D.slideRight = $(".slide-right");
        $D.slideLeft = $(".slide-left");
        $D.slideWrapper = $(".slide-wrapper");
        $D.slideInner = [];
        $D.sliderInnerWidth = 0;
        $D.scrollPosition = 0;

        var hammertime = new Hammer(document.getElementById("gallery-inner"));

        $.featherlight.defaults.afterOpen = function () {
          if (this.$source.context.classList[1]) {
            this.$instance
              .children()[0]
              .classList.add(this.$source.context.classList[1]);
          }
        };

        $.each($D.slideWrapper.children(), function (i, child) {
          if (artworkWidth <= 0) {
            artworkWidth =
              parseInt($(child).css("marginRight").replace("px", "")) * 2 +
              $(child).outerWidth();
          }

          $D.slideInner.push($(child).outerWidth());
          $D.sliderInnerWidth += artworkWidth;
        });

        $D.slideRight.click(function (event) {
          slideright();
        });

        $D.slideLeft.click(function (event) {
          slideleft();
        });

        function slideleft() {
          if ($D.scrollPosition < 0) {
            $D.scrollPosition = $D.scrollPosition + artworkWidth;
            $D.slideWrapper.css("left", $D.scrollPosition + "px");
          }
        }

        function slideright() {
          if (
            $D.scrollPosition >=
            ($D.sliderInnerWidth - artworkWidth * 2) * -1
          ) {
            $D.scrollPosition = $D.scrollPosition - artworkWidth;
            $D.slideWrapper.css("left", $D.scrollPosition + "px");
          }
        }

        hammertime.on("swipeleft", function (ev) {
          slideright();
        });

        hammertime.on("swiperight", function (ev) {
          slideleft();
        });
      },
    },

    thanks: {
      init: function () {},
    },
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event

  var UTIL = {
    fire: function (func, funcname, args) {
      var namespace = $D;
      funcname = funcname === undefined ? "init" : funcname;

      if (
        func !== "" &&
        namespace[func] &&
        typeof namespace[func][funcname] === "function"
      ) {
        namespace[func][funcname](args);
      }
    },

    loadEvents: function () {
      UTIL.fire("common");

      $.each(
        document.body.className.replace(/-/g, "_").split(/\s+/),
        function (i, classnm) {
          UTIL.fire(classnm);
        }
      );
    },
  };

  $(document).ready(UTIL.loadEvents);
})(jQuery);
