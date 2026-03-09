$("#atozBar a").click(function (event) {
    event.preventDefault();

    if (!iCreateObject.isSiteInICreateMode) {
        // exit if anchor Id doesn't exist
        var full_url = iCreateObject.corpHome + "Modules/AtoZ/index.aspx" + (iCreateObject.lang != "en" ? "?lang=" + iCreateObject.lang : "") + "#topone" + $(this).html();

        if (window.location.href.toLowerCase().indexOf("modules/atoz/index.aspx") < 0) {
            window.location.href = full_url;
        } else {
            var whereTo;
            if ($("#box ul.tabs").length) { //multi tab - shared services
                var currentTab = $("#box ul.tabs li.active a:first");
                if(typeof $(currentTab).attr('href') !== 'undefined' && $(currentTab).attr('href').length)
                {
                    whereTo = $($(currentTab).attr('href') + ' .pagination ul li:first a').attr('href').slice(0, -1) + $(this).html();
                } 
            } else {
                whereTo = $('.pagination ul li:first a').attr('href').slice(0, -1) + $(this).html();
            }
            if ($(whereTo).length) {
                //get the full url - like mysitecom/index.htm#home

                //split the url by # and get the anchor target name - home in mysitecom/index.htm#home
                var parts = whereTo.split("#");
                var trgt = parts[1];

                //get the top offset of the target anchor
                var target_offset = jQuery("#" + trgt).offset();
                var target_top = target_offset.top;
                target_top -= ($("header").height() + $('#stickyHeader').outerHeight() + 50);

                //goto that anchor by setting the body scroll top to anchor top
                $('html, body').animate({ scrollTop: target_top }, 500);
                $(whereTo).focus();
            } else {
                var target_top = $("#pagination").offset().top;
                target_top -= ($("header").height() + $('#stickyHeader').outerHeight() + 10);

                $('html, body').animate({ scrollTop: target_top }, 500);

                $("#pagination a:first").focus();
            }
            
        }
    }
});