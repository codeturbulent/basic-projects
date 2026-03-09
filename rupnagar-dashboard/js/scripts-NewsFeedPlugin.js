

$(document).ready(function () {

    $(".homepage .newsFeed-wrapperInner .icrtnewsfeed").each(function (index, element) {
        var divElement = $(this);
        var data = $.parseJSON($(this).attr("data-icrtnewsfeed").replace(/'/g, "\""));
        var categories = data.newsCategories;
        var limit = data.numberOfItems == '' ? '4' : data.numberOfItems;
        divElement.html(iCreateObject.languageResources["Modules_News_controls_Global_LoadingText"]);

        var NewsFeedString = $("<ul></ul>");

        $.ajax({
            url: iCreateObject.corpRoot + "Modules/NewsModule/services/getTopFiveNews.ashx?limit=" + limit + (categories != "" ? "&categories=" + categories : "") + "&lang=" + iCreateObject.lang, //TODO: NEWS: put in the proper feed id FEATURE: make dynamic
            async: false,
            dataType: 'jsonp',
            crossDomain: true,
            cache: false,
            success: function (data) {

                if (data == '') {
                    $(NewsFeedString).append("<li><p>No News</p></li>");
                } else {
                    $.each(data, function (index, element) {
                        var newsImage = (element.featuredImage != undefined && element.featuredImage != "" && $(element.featuredImage).find('img').length && $(element.featuredImage).find('img').get(0).outerHTML != '' ? $(element.featuredImage).find('img').get(0).outerHTML : "<img src='" + iCreateObject.corpRoot + iCreateObject.lang + "/images/structure/news_default.jpg' alt=''");

                        $(NewsFeedString).append("<li><a href=\"" + element.link + "\" title=\"View news article: " + element.title + "\"><p>" + newsImage + "</p><p>" + element.title + "<span>" + element.postedDate + "</span></p></a></li>");
                    });
                }

                $(divElement).addClass('newsContent');
                $(divElement).parent().removeClass('ic-container-fluid').addClass('newsContent-container');
                $(divElement).empty().append(NewsFeedString);

                $(divElement).append("<div class='viewAll'><a id=\"newsViewAll\" href='" + iCreateObject.corpRoot + "Modules/News/en' title=\"" + iCreateObject.languageResources["Modules_News_controls_Global_ViewMoreLinkTitle"] + "\">" + iCreateObject.languageResources["Modules_News_controls_Global_ViewMoreText"] + "</a></div>");
            }

        });

    });

    $(".landing .newsFeed-wrapperInner .icrtnewsfeed").each(function (index, element) {
        var divElement = $(this);
        var data = $.parseJSON($(this).attr("data-icrtnewsfeed").replace(/'/g, "\""));
        var categories = data.newsCategories;
        var limit = data.numberOfItems == '' ? '4' : data.numberOfItems;
        divElement.html(iCreateObject.languageResources["Modules_News_controls_Global_LoadingText"]);

        var NewsFeedString = $("<ul></ul>");

        $.ajax({
            url: iCreateObject.corpRoot + "Modules/NewsModule/services/getTopFiveNews.ashx?limit=" + limit + (categories != "" ? "&categories=" + categories : "") + "&lang=" + iCreateObject.lang, //TODO: NEWS: put in the proper feed id FEATURE: make dynamic
            async: false,
            dataType: 'json',
            crossDomain: true,
            cache: false,
            success: function (data) {

                if (data == '') {
                    $(NewsFeedString).append("<li><p>No News</p></li>");
                } else {
                    $.each(data, function (index, element) {
                        
                        var newsImage = (element.featuredImage != undefined && element.featuredImage != "" ? element.featuredImage : "<img src='" + iCreateObject.corpRoot + iCreateObject.lang + "/images/structure/logo_print.svg'");
                        
                        $(NewsFeedString).append("<li><a href=\"" + element.link + "\" title=\"View news article: " + element.title + "\"><p>" + element.title + "<span>" + element.postedDate + "</span></p></a></li>");
                    });
                }

                $(divElement).addClass('newsContent');
                $(divElement).parent().removeClass('ic-container-fluid').addClass('newsContent-container');
                $(divElement).empty().append(NewsFeedString);

                $(divElement).append("<div class='viewAll'><a href='" + iCreateObject.corpRoot + "Modules/News/en' title=\"" + iCreateObject.languageResources["Modules_News_controls_Global_ViewMoreLinkTitle"] + "\">" + iCreateObject.languageResources["Modules_News_controls_Global_ViewMoreText"] + "</a></div>");
            }

        });

    });
});


