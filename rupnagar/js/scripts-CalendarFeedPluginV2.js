function parseData(data, divElement) {

    var charLimit = 35;
    var descCharLimit = 128;
    divElement.empty();
    var html = "";
    var htmlFeature = "";

    $.each(data, function (index, item) {

        var id = item.Id;
        var title = item.Title != null ? item.Title : "",
            startDate = item.StartDate,
            description = item.Description != null ? item.Description : ""
            , calendarPath = item.ViewPath + "/Detail/"

        if (title.length > charLimit) {
            if (title.indexOf(' ', charLimit) >= 0) {
                title = title.substring(0, title.indexOf(' ', charLimit)) + "...";
            }
        }

        if (description.length > descCharLimit) {
            if (description.indexOf(' ', descCharLimit) >= 0) {
                description = description.substring(0, description.indexOf(' ', descCharLimit)) + "...";
            }
        }
        var startM = item.StartMonth.substring(0, 3),
            startD = item.StartDay;
        html += "<a class=\"listItem\" href=\"" + iCreateObject.calendarUrl + calendarPath + id + "\" title=\"" + iCreateObject.languageResources["Modules_Calendar_controls_Global_EventLinkTitleText"] + ": " + title.replace(/'/g, "&#39;").replace(/"/g, "&quot;") + "\" ><div class=\"listItem-Container\"><div class=\"listItem-DateContainer\"><span class=\"listItem-Date\"><span class=\"listItem-Month\">" + startM + "</span>" + startD + "</span></div><div class=\"listItem-Title\"><p>" + title + "</p></div></div><\/a>";

    })
    divElement.html(html);
}
$(function () {
    $(".homepage .calendarFeed .feedList .icrtcalendarpluginv2").each(function (index, element) {

        var divElement = $(this);
        var feed = $(this).attr("data-icrtcalendarpluginv2-calendars");
        var itemsToDisplay = $(this).attr("data-icrtcalendarpluginv2-itemstodisplay") || "3";
        var categories = $(this).attr("data-icrtcalendarpluginv2-calendars-categories") || "";
        var featuredOnly = $(this).attr("data-icrtcalendarpluginv2_enablefeatured") || "";

        divElement.html("Loading...");
        var params = $.param(
            {
                Calendars: feed,
                Categories: categories,
                limit: itemsToDisplay,
                featuredOnly: featuredOnly,
            });

        var request =
            $.ajax({
                url: iCreateObject.corpRoot + 'Modules/Calendar/services/GetCalendarEventV2.ashx',
                type: "POST",
                data: params,
                async: true,
                dataType: 'json',
                crossDomain: true,
                cache: false,

            });
        $.when(request).done(function (data) {
            if (data != "") {
                parseData(data, divElement);
            } else {
                divElement.empty();
                divElement.append("<p><div class=\"listItem-Container\"><div class=\"listItem-Title\"><p>" + iCreateObject.languageResources["Modules_Calendar_controls_Global_NoEventsText"] + "</p></div></div></p>");
            }
            divElement.addClass('feedList-Items');
            divElement.parent().addClass('calendarFeed-Inner');


        }).fail(function (jqXHR, textStatus) {
            divElement.html("An error occured");
        })
            .always(function () {
                function adjustViewAll() {
                    setTimeout(function () {
                        if ($('#uber').hasClass('homepage')) {
                            if (window.matchMedia("(min-width: 1200px)").matches) {
                                var height = Math.max($('.newsContent').innerHeight(), $('.calendarFeed-Inner').innerHeight()) + $('.feed-title').innerHeight() + $('#section-newsEvents .viewAll').innerHeight();
                                if ($('html').hasClass('ie')) {
                                    $('#section-newsEvents .viewAll').height(Math.max($('.newsFeed-wrapperInner .viewAll').height(), $('.calendarFeed-wrapper .viewAll').height()));
                                    $('.newsFeed-wrapperInner,.calendarFeed-wrapper').innerHeight(height);
                                } else {
                                    $('#section-newsEvents .viewAll').height(Math.max($('.newsFeed-wrapperInner .viewAll').height(), $('.calendarFeed-wrapper .viewAll').height()));
                                    $('.newsFeed-wrapperInner,.calendarFeed-wrapper').innerHeight(height);
                                }
                                $('.calendarFeed-Inner').css('padding-bottom', '');
                            } else if (window.matchMedia("(max-width: 1199px)").matches) {
                                $('#section-newsEvents .viewAll,.newsFeed-wrapperInner,.calendarFeed-wrapper').height('auto');
                                if ($('html').hasClass('chrome')) {
                                    $('.calendarFeed-Inner').css('padding-bottom', $('.calendarFeed-wrapper .viewAll').height());
                                } else {
                                    $('.calendarFeed-Inner').css('padding-bottom', $('.calendarFeed-wrapper .viewAll').innerHeight());
                                }
                            }
                        }
                    }, 1000);
                }
                adjustViewAll();
                $(window).bind("load resize", function(){
                    adjustViewAll();
                });
                $(document).ready(function () {
                    adjustViewAll();
                });
            });



    });
});