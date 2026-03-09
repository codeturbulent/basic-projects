// define icreate editor's shortcut key
/*global jQuery, window, document */
jQuery(function ($) {
  var KEYCODE_CTRL = 17;
  var KEYCODE_F9 = 120;
  var KEYCODE_F10 = 121;
  var SHORTCUT_CONF_MAP = {
    'ctrl_ctrl': {
      code: KEYCODE_CTRL,
      delay: 500
    },
    'f9_f9': {
      code: KEYCODE_F9,
      delay: 1000
    },
    'f10_f10': {
      code: KEYCODE_F10,
      delay: 1000
    }
  };
  var DEFAULT_SHORTCUT_KEY = 'ctrl_ctrl';

  var REGEX_ICRT_BASE_URL = /^(\/icreate[^\/]*)\/.*/g;

  var win = window;
  var doc = document;

  /**
   * Initialize shortcutKey based on configuration.
   * @param   {object} options to define shortcutKey (default: 'ctrl_ctrl'), targetWin (optional), redirectUrl (required)
   * @returns {object} jQuery object
   * @example
   *    // Basic initialisation
   *    $(document).ready(function {
   *      $(document).icrtShortcut({ 
   *        shortcutKey: 'ctrl_ctrl', 
   *        redirectUrl: 'https://icreate6.esolutionsgroup.ca/icreate/modules/pageeditor3/page.srv?pageUrl=http%3A//www.domain.com/en/a-page.aspx' 
   *      });
   *    });
   */
  if (!$.fn.icrtShortcut) {
    $.fn.icrtShortcut = function (options) {
      var theDoc = this.context && this.context.ownerDocument || this.context;
      var theRootWin = getIcrtRootWin(theDoc.defaultView);

      var cfg = $.extend({
        shortcutKey: DEFAULT_SHORTCUT_KEY,
        targetWin: theRootWin,
      }, options);

      if (!cfg.redirectUrl) {
        if (win.console) {
          win.console.log('redirectUrl is required');
        }
        return this;
      }

      if (!cfg.targetWin) {
        if (win.console) {
          win.console.log('targetWin is required');
        }
        return this;
      }

      cfg.shortcutKeyConf = SHORTCUT_CONF_MAP[cfg.shortcutKey] || SHORTCUT_CONF_MAP[DEFAULT_SHORTCUT_KEY];

      setUpShortcut(theDoc, cfg.redirectUrl, cfg.shortcutKeyConf, cfg.targetWin);

      return this;

    };

    // for backword compatibility with old page editors / template
    var urlForPageEditing = win.icrtDoubleCtrlShortcut_pageUrlForPreview;
    if (typeof (urlForPageEditing) !== 'undefined') {
      var targetWin = typeof (icrtDoubleCtrlShortcut_window) == 'undefined' ? getIcrtRootWin(win) : win.icrtDoubleCtrlShortcut_window;
      $(doc).icrtShortcut({
        redirectUrl: urlForPageEditing,
        targetWin: targetWin
      });
    }
  }

  ////////

  /*
  function getIcrtBasePath(theWin) {
    var match = REGEX_ICRT_BASE_URL.exec(theWin.location.pathname);
    return (match && match[1]);
  }
  */

  function isIcrtWin(theWin) {
    return REGEX_ICRT_BASE_URL.test(theWin.location.pathname);
  }

  function getIcrtRootWin(theWin) {
    var curWin,
      parentWin = theWin;
    do {
      curWin = parentWin;
      try {
        parentWin = getParentWin(curWin);
      } catch (e) {
        // might reach the window with a different domain
        break;
      }
    } while (parentWin && curWin !== parentWin && isIcrtWin(parentWin));

    return curWin;
  }

  function getParentWin(theWin) {
    return theWin && (!theWin.frameElement && theWin.dialogArguments) || theWin.parent || theWin.top;
  }

  function setUpShortcut(theDoc, redirectUrl, shortcutKeyConf, targetWin) {
    $(theDoc).keyup(function (e) {
      var t = this,
        keyCode;
      if (typeof (e.keyCode) == 'number') {
        keyCode = e.keyCode;
      } else if (typeof (e.which) == 'number') {
        keyCode = e.which;
      } else if (typeof (e.charCode) == 'number') {
        keyCode = e.charCode;
      } else {
        t._icrt_keyPressed_ = -1;
        return;
      }
      if (keyCode == shortcutKeyConf.code) {
        var now = new Date();
        if (t._icrt_keyPressed_ >= 0) {
          var diff = now.getTime() - t._icrt_keyPressed_;
          if (diff > 0 && diff < shortcutKeyConf.delay) {
            try {
              targetWin.location.href = redirectUrl;
            } catch (ex) {
              // might failed because of choosing to stay with current page
            }
          }
        }
        t._icrt_keyPressed_ = now.getTime();
      } else {
        t._icrt_keyPressed_ = -1;
      }
    });
  }

});
