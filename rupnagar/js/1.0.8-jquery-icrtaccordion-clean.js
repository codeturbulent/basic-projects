(function ($) {
    // Config
    var accExpandGroup = false;      //Set to true to show expand button on groups
    var accStyleMinimal = false;     //Set to true for Minimal style 
    var accStickyHeader = true;     //Set to true for Sticky Header

    // Language Variables
    var accExpandAllText = "Expand all accordions";
    var accCollapseAllText = "Collapse all accordions";
    var faqExpandAllText = "Expand all answers";
    var faqCollapseAllText = "Collapse all answers";
    var titleBeforeTextShow = "Show ";
    var titleBeforeTextHide = "Hide ";
    var titleAfterText = " content";

    if (iCreateObject.lang == "fr") {
        accExpandAllText = "Développer tout accordéons";
        accCollapseAllText = "Tout réduire accordéons";
        faqExpandAllText = "Développer toutes les réponses";
        faqCollapseAllText = "Réduire toutes les réponses";
        titleBeforeTextShow = "Voir le contenu sur ";
        titleBeforeTextHide = "Masquer le contenu sur ";
        titleAfterText = "";
    }

    $.fn.icrt_accordion_clean = function () {
        var _listClasses = $( ".icrtAccordion, .icrtFaq-accordion, .icrtFaq-full, .icrtHowto" );
        var _faqClass;
        var _accCount = 0;
        var _accItemCount = 0;

        if ($(_listClasses).length > 0) {
            _listClasses.map( function(value, index) {
                if (~index.className.indexOf("icrtHowto")) {
                    _faqClass = 'icHowto';
                    $.each($(this), function (i, e) {
                        var _trs = $(e).find("> tbody > tr");
                        for (var i = 0; i < _trs.length; i += 1) {
                            _howToClass = _trs[i].className;
                            // _howToData = _trs[i].firstElementChild.getAttribute("data-name");
                            if (i == 0){
                                _trs.slice(i, i + 1).wrapAll("<h2 " + (_howToClass != "" ? "class=\"" + _howToClass + "\"" : "") + "></h2>");
                            } else {
                            _trs.slice(i, i + 1).wrapAll("<div " + (_howToClass != "" ? "class=\"" + _howToClass + "\"" : "") + "></div>");
                            // _trs.slice(i, i + 1).wrapAll("<div " + (_howToTRClass != "" ? "class=\"" + _howToTRClass + "\"" : "") + " " + (_howToData != "" ? "data-name=\"" + _howToData + "\"" : "") + "></div>");
                            }
                        }

                        $.each($(this).find(" > tbody > h2 > tr > td"), function (i, e) {
                            $(e).contents().unwrap().unwrap();
                        });
                        $.each($(this).find(" > tbody > div > tr > td"), function (i, e) {
                            $(e).contents().unwrap().unwrap();
                        });

                        $(this).find(".totalTimeRow, .toolsResourcesRow").wrapAll('<ul></ul>');
                        $(this).find(".totalTimeRow").wrapInner('<li class="totalTimeRow"></li>').find(' > *').unwrap();
                        $(this).find(".toolsResourcesRow").wrapInner('<li class="toolsResourcesRow"></li>').find(' > *').unwrap();

                        var stepRows = $(this).find(".numberOfStepsRow");
                        for (var i = 0;i < stepRows.length; i += 2){
                            stepRows.filter(':eq('+i+'),:eq('+(i+1)+')').wrapAll("<div class=\"stepRow\"></div>");
                        };
                        stepRows.removeAttr('class');
                        var stepNumRows = $(this).find(".stepRow");
                        for (var i = 0; i < stepNumRows.length; i += 1) {
                            stepNumIndex = i + 1;
                            // stepNumRows[i].setAttribute("data-num", stepNumIndex);
                            titleText = $(this).find("h2").text().replace(/\r?\n/g, "");
                            stepNumRows[i].setAttribute("aria-label", titleText + ' - Step ' + stepNumIndex);
                        }
                        $(this).wrapAll("<div class=\"" + _faqClass + "\"></div>").find(" > tbody > div").unwrap().unwrap();
                    });
                } else {
                    _faqClass = index.className.replace('icrtFaq icrtFaq','icFaq');
                    if (_faqClass != "icFaq-full") {
                        _accCount++;
                    }
                    $.each($(this), function (i, e) {
                        var _trs = $(e).find("> tbody > tr");
                        for (var i = 0; i < _trs.length; i += 2) {
                            _trs.slice(i, i + 2).wrapAll("<div class=\"Accordion " + _faqClass + "\"></div>");
                        }
                    });

                    $.each($("div.Accordion > tr > td"), function (i, e) {
                        if (_faqClass == "icFaq-full") {
                            var _class = i % 2 == 0 ? "AccordionTitle" : "AccordionContent";
                        } else {
                            var _class = i % 2 == 0 ? "AccordionTrigger" : "AccordionContent";
                        }
                        if (_class == "AccordionContent") {
                            _accItemCount++;
                        }
                        var _divContainer = $(e).wrapInner("<div " + (_class == "AccordionContent" && _faqClass != "icFaq-full" ? "role=\"region\" id=\"AccordionPanel-" + _accCount + "-" + _accItemCount + "\" aria-labelledby=\"AccordionTitle-" + _accCount + "-" + _accItemCount + "\" " : "") + "class=\"" + _class + "\" " + (_class == "AccordionContent" && _faqClass != "icFaq-full" ? "aria-hidden=\"true\"" : "") + " " + (_class == "AccordionTrigger" ? "title=\"" + encodeHTML(titleBeforeTextShow + $(e).text() + titleAfterText) + "\"" : "") + ">" + (_class == "AccordionTitle" ? "<h2></h2>" : "") + "</div>").parent();
                        $(e).children().unwrap().unwrap();
                    });

                    _accItemCount = 0;

                    $.each($(".icrtAccordion > tbody > div.Accordion, .icrtFaq-accordion > tbody > div.Accordion, .icrtFaq-full > tbody > div.Accordion").filter(function () {
                        return $(this).index() == 0;
                    }), function (i, e) {
                        $(e).unwrap().unwrap();
                    });
                }
            });
        }
    },
    $.fn.icrt_accordion_run = function () {
        var scrollTarget = null;

        var names = {};           
        $(".AccordionTrigger").each(function () {
            if ($(this).find("a").length == 0) {
                
                var text = $.trim($(this).text()).replace(/(\s|\.|\,|-|=|&|\^|#|\(|\)|\<|\>|\_)+/g, "-").replace(/[^a-z0-9A-Z-]/g, '');
                var accID = $(this).next().attr('id');
                var triggerID = accID.substring(14, accID.length);


                if (names.hasOwnProperty(text)) {
                    names[text]++;
                } else {
                    names[text] = 0;
                }
                if (names.hasOwnProperty(text) && names[text] > 0) {
                    text = text + "_" + names[text]
                }

                var anchor = $("<a href='#' id=\"AccordionTitle" + triggerID + "\" aria-role=\"button\" aria-expanded=\"false\" aria-controls=\"" + accID + "\"></a>").attr("name", text);
                $(this).wrapInner(anchor);
            }

            if ($(this).is(".AccordionContent .AccordionContent .AccordionContent .AccordionContent .AccordionContent .AccordionTrigger") && $(this).find("h1,h2,h3,h4,h5,h6").length <= 0) {
                //break the chain
            } else if ($(this).is(".AccordionContent .AccordionContent .AccordionContent .AccordionContent .AccordionTrigger") && $(this).find("h1,h2,h3,h4,h5,h6").length <= 0) {
                $(this).wrapInner("<h6></h6>");
            } else if ($(this).is(".AccordionContent .AccordionContent .AccordionContent .AccordionTrigger") && $(this).find("h1,h2,h3,h4,h5,h6").length <= 0) {
                $(this).wrapInner("<h5></h5>");
            } else if ($(this).is(".AccordionContent .AccordionContent .AccordionTrigger") && $(this).find("h1,h2,h3,h4,h5,h6").length <= 0) {
                $(this).wrapInner("<h4></h4>");
            } else if ($(this).is(".AccordionContent .AccordionTrigger") && $(this).find("h1,h2,h3,h4,h5,h6").length <= 0) {
                $(this).wrapInner("<h3></h3>");
            } else if ($(this).is(".AccordionTrigger") && $(this).find("h1,h2,h3,h4,h5,h6").length <= 0) {
                $(this).wrapInner("<h2></h2>");
            }
        });

        $(".AccordionTrigger").click(function (e) {
            var _this = $(this);
            var _contentSlider = _this.next().find('div[class*="ic-slider"]');

            //for photogallery
            setTimeout(function () {
                $(_this).siblings(".AccordionContent").find(".ic-gal-container .pause").click();
            }, 1000);


            if (!_this.hasClass("open")) {
                // Hide border
                if (accStyleMinimal == true){
                    $(this).addClass("noBottomBorder");
                }

                $.each(_this.parent().siblings().children(".AccordionTrigger.open"), function (i, e) {
                    $(this).removeClass("open").removeClass("noBottomBorder").next().slideToggle("100");
                });

                // Open nested accordions
                $.each(_this.parents('.AccordionContent').siblings(".AccordionTrigger:not(.open)"), function (i, e) {
                    $(this).addClass('open').next().slideToggle("100");
                });
            } else {
                // Show border
                $(this).removeClass("noBottomBorder");
            }
            _this.next().slideToggle("100", function () {
                if (_contentSlider.length > 0) {
                    _contentSlider.iosSlider('update');
                }

                _this.toggleClass("open");

                var accGroup = new Array(_this);
                _this.parent(".Accordion").prevUntil("*:not(.Accordion)").children('.AccordionTrigger').each(function() {
                    accGroup.push($(this));
                });
                _this.parent(".Accordion").nextUntil("*:not(.Accordion)").children('.AccordionTrigger').each(function() {
                    accGroup.push($(this));
                });

                var openCount = 0;
                $.each(accGroup, function(i) {
                    checkedCount = i + 1;
                    if ($(this).hasClass('open')){
                        if (iCreateObject.lang == "fr") {
                            var title = $(this).attr('title').replace('Voir le contenu sur ',titleBeforeTextHide);
                        } else {
                            var title = $(this).attr('title').replace('Show ',titleBeforeTextHide);
                        }
                        $(this).find('a').attr('aria-expanded', 'true');
                        $(this).siblings('.AccordionContent').attr('aria-hidden', 'false');
                        openCount++;
                    } else {
                        if (iCreateObject.lang == "fr") {
                            var title = $(this).attr('title').replace('Masquer le contenu sur ',titleBeforeTextShow);
                        } else {
                            var title = $(this).attr('title').replace('Hide ',titleBeforeTextShow);
                        }                            
                        $(this).find('a').attr('aria-expanded', 'false');
                        $(this).siblings('.AccordionContent').attr('aria-hidden', 'true');
                    }
                    $(this).attr('title', encodeHTML(title));
                });

                if (openCount <= 1 ){
                    if (_this.parent().hasClass('icFaq-accordion')) {
                        btnText = faqExpandAllText;
                    } else {
                        btnText = accExpandAllText;
                    }
                    _this.parent(".Accordion").prevUntil("*:not(.Accordion)").prev().find('.accordionBtn').removeClass("open").text(btnText);
                }
            });

            //animate scroll to top of accordion.
            var self = scrollTarget == null ? this : scrollTarget;
            if (accStickyHeader == true){
                var header = $('header');
                var headerHeight = header.outerHeight() + 20; //header height + buffer from top
            } else {
                headerHeight = 20;
            }

            setTimeout(function () {
                if (!$(_this).accIsOnScreen(headerHeight)) {
                    theOffset = $(self).offset();
                    $('body,html').stop().animate({ scrollTop: theOffset.top - headerHeight }, 750);
                    scrollTarget = null;
                }
            }, 500);

            if ($(this).find('a').attr('name')) {
                history.replaceState(undefined, undefined, '#' + $(this).find('a').attr('name'))
                return false;
            }

        }).find("a").click(function (e) {
            e.preventDefault();
        });

        $("a[href^='#']").each(function () {
            var target = $(".AccordionTrigger a[name='" + $(this).attr("href").replace(/#/g, '') + "']");
            if (target && target.length > 0) {
                $(this).on("click", function () {
                    scrollTarget = target;
                    triggerFocusOnParent(target);
                    $(target).parent(".AccordionTrigger").not(".open").trigger("click");
                    $(target).trigger("focus");
                });
            }
        });

        // Add expand/collapse controls for each accordion group
        // A group is defined by any 2+ consecutive accordions

        if (accExpandGroup == true) {
            $("#printAreaContent > .Accordion, #printAreaContent .iCreateDynaToken > .Accordion").each(function(){
                if (!$(this).prev(".Accordion").length && $(this).next(".Accordion").length && !$(this).hasClass('icFaq-full')) {

                    if ($(this).hasClass('icFaq-accordion')) {
                        btnTextExpand = faqExpandAllText;
                        btnTextCollapse = faqCollapseAllText;
                    } else {
                        btnTextExpand = accExpandAllText;
                        btnTextCollapse = accCollapseAllText;
                    }
                    $("<div class='accordionButtons'><button class='accordionBtn' aria-expanded='false'>" + btnTextExpand + "</button></div>").insertBefore($(this));
                }
            });

            $(document).on("click", ".accordionButtons .accordionBtn", function() {
                var _this = $(this);

                if (_this.parent(".accordionButtons").next().hasClass('icFaq-accordion')) {
                    btnTextExpandAll = faqExpandAllText;
                    btnTextCollapseAll = faqCollapseAllText;
                } else {
                    btnTextExpandAll = accExpandAllText;
                    btnTextCollapseAll = accCollapseAllText;
                }

                if($(this).is('.open')) {
                    _this.parent(".accordionButtons").nextUntil("*:not(.Accordion)").each(function() {
                        if (iCreateObject.lang == "fr") {
                            var title = $(this).find(".AccordionTrigger").attr('title').replace('Masquer le contenu sur ',titleBeforeTextShow);
                        } else {
                            var title = $(this).find(".AccordionTrigger").attr('title').replace('Hide ',titleBeforeTextShow);
                        }
                        $(this).find(".AccordionTrigger").attr('title', encodeHTML(title));
                        $(this).find(".AccordionTrigger").removeClass("open noBottomBorder");
                        $(this).find(".AccordionTrigger a").attr("aria-expanded", false);
                        $(this).find(".AccordionContent").slideUp("100");
                        $(this).find(".AccordionContent").attr("aria-hidden", true);
                        _this.text(btnTextExpandAll);
                    });
                    _this.attr("aria-expanded", false);
                } else {
                    _this.parent(".accordionButtons").nextUntil("*:not(.Accordion)").each(function() {
                        if (iCreateObject.lang == "fr") {
                            var title = $(this).find(".AccordionTrigger").attr('title').replace('Voir le contenu sur ',titleBeforeTextHide);
                        } else {
                            var title = $(this).find(".AccordionTrigger").attr('title').replace('Show ',titleBeforeTextHide);
                        }
                        $(this).find(".AccordionTrigger").attr('title', encodeHTML(title));
                        $(this).find(".AccordionTrigger").addClass((accStyleMinimal == true) ? "open noBottomBorder" : "open");
                        $(this).find(".AccordionTrigger a").attr("aria-expanded", true);
                        $(this).find(".AccordionContent").slideDown("100");
                        $(this).find(".AccordionContent").attr("aria-hidden", false);
                        _this.text(btnTextCollapseAll);
                    });
                    _this.attr("aria-expanded", true);
                }
                _this.toggleClass('open');
            });
        }
    }

    function triggerFocusOnParent(targetAnchor) {
        var anchor = $(targetAnchor).parents(".AccordionContent").prev(".AccordionTrigger").not(".open");
        if ($(anchor).length > 0) {
            $(anchor).each(function (index, item) {
                $(item).trigger("click");
            });
        }
    }

    $.fn.accIsOnScreen = function(headerHeight) {
        var win = $(window);
    
        var viewport = {
            top: win.scrollTop() + headerHeight,
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        //Accordion Bounds
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        //Test if the entire element is on the screen
        if (!(viewport.right < bounds.right || viewport.left > bounds.left || viewport.bottom < bounds.bottom || viewport.top > bounds.top)) {
            return true;
        }
    }


    function encodeHTML(value) {
        //Workaround to have HTML entities encoded.
        return value.replace(/&amp;/g, "&").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    }
    if (iCreateObject != null && ((iCreateObject.isSiteInPreviewMode && !iCreateObject.isiCreateGeneratedPage) || !iCreateObject.isSiteInICreateMode)) {
        $.fn.icrt_accordion_clean();
        $.fn.icrt_accordion_run();
    }

    if (accStyleMinimal == true) {
        $(".Accordion").each(function () {
            if (!$(this).prev().hasClass("Accordion")) {
                $(this).addClass("forceTopBorder");
            }
            if (!$(this).next().hasClass("Accordion")) {
                $(this).addClass("forceBottomBorder");
            }
        });
        $(".Accordion .Accordion.forceBottomBorder").removeClass("forceBottomBorder");
    }
})(jQuery);
