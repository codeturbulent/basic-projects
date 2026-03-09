
ICVPUtils.onReady(function () {
    $(".icrtyoutubeplayer").each(function (index, element) {

        var id = $(element).attr("data-icrtyoutube-id");
        var type = $(element).attr("data-icrtyoutube-type");

        $.ajax({
            url: iCreateObject.corpRoot + "Common/Services/YouTube.ashx?id=" + id + "&type=" + type,
            success: youTubeCallback,
            error: youTubeError,
            dataType: "json"
        });

        function youTubeCallback(data) {
            if (data.Error && iCreateObject.isSiteInICreateMode) {
                $(element).text(iCreateObject.languageResources["Common_scripts_youTubePlayer_ChannelUserErrorText"]);
            }
            if (data.items && data.items.length > 0) {
                var playerId = $(element).attr("id");
                var title = $(element).attr("data-icrtyoutube-title");
                $(element).empty();

                //add the playlists element
                var playlistList = $("<ul id=\"playlists-" + playerId + "\" style=\"display:none;\"><li data-source=\"video-playlist-" + playerId + "\" data-playlist-name=\"" + title + "\" data-thumbnail-path=\"\"><p class=\"minimalDarkCategoriesTitle\"><span class=\"minimialDarkBold\">" + iCreateObject.languageResources["Common_scripts_youTubePlayer_TitleText"] + ": " + title + " </span></p><p class=\"minimalDarkCategoriesType\"><span class=\"minimialDarkBold\">Type: </span>YOUTUBE</p><p class=\"minimalDarkCategoriesDescription\"><span class=\"minimialDarkBold\">" + iCreateObject.languageResources["Common_scripts_youTubePlayer_DescriptionTitleText"] + ": </span>" + iCreateObject.languageResources["Common_scripts_youTubePlayer_DescriptionText"] + "</p></li></ul>");

                $(element).append(playlistList);

                //create this playlist
                var playlist = $("<ul id=\"video-playlist-" + playerId + "\" style=\"display:none;\"></ul>");
                $(data.items).each(function (index, item) {
                    var li = $("<li data-video-source=\"" + item.videoId + "\" data-thumb-source=\"" + item.thumbs["medium"].url + "\"><div data-video-short-description=\"\"><div><p class=\"minimalDarkThumbnailTitle\">" + item.title + "</p><p class=\"minimalDarkThumbnailDesc\">" + item.description + "</p></div></div></li>");
                    $(playlist).append(li);
                });
                $(element).append(playlist);

                $(element).attr("id", "video-player-container-" + playerId);

                initPlayer(playerId);
            }
        }
        function youTubeError(jqXHR, textStatus, errorThrown) {
            console.log(iCreateObject.languageResources["Common_scripts_youTubePlayer_FeedErrorText"] + ": " + errorThrown);
        }

        //Start Playlist
        /********************************************************************/
        function initPlayer(id) {
            
                ICVPPlayer.useYoutube = "yes";				//Enable YouTube support

                new ICVPPlayer({
                    //main settings
                    instanceName: "player-" + id, 				// The player instance name.  API call player1.play();
                    parentId: "video-player-container-" + id,				// The id of the div into which the player is added.
                    playlistsId: "playlists-" + id,				// The id of the ul html element that represents the playlists
                    mainFolderPath: iCreateObject.corpRoot+"Common/styles/video_playlist_player/",				// The main folder path, which contains CSS theme.
                    skinPath: "playlist_theme",			// Theme path
                    displayType: "responsive",				// This can be responsive or fullscreen. Set to responsive to embed the player inside a div. 
                    addKeyboardSupport: "yes",				// Enable or disable the keyboard space bar to pause or play the video.
                    autoScale: "yes",						// If set to yes the player height will always be proportional to the player width, if set to no the height will be fixed based on the maxHeight property.
                    showButtonsToolTip: "yes",				// Control bar tooltips
                    stopVideoWhenPlayComplete: "no",			// Stop video when it completes
                    autoPlay: "no",							// Auto play video(s)
                    loop: "no",								// Loop video(s)
                    shuffle: "no",							// Shuffle video(s)
                    maxWidth: 4000,							// Max player width
                    maxHeight: 2250,							// Max player height
                    buttonsToolTipHideDelay: 1.5,			// How long to show controller tooltips
                    volume: .8,								// Default volume level
                    backgroundColor: "#000000",				// video player container background
                    buttonsToolTipFontColor: "#5a5a5a",		// Tooltip font colour
                    //playlists settings
                    startAtPlaylist: 0,						// Select the playlist to start at
                    showPlaylistButtonAndPlaylist: "yes",	// Show playlist button in controller and playlist section
                    playlistPosition: "right",				// Position of the playlist section
                    showPlaylistByDefault: "yes",			// Show playlist section by default
                    showPlaylistName: "yes",					// Show playlist title on top of playlist section
                    showSearchInput: "yes",					// Show playlist search box
                    showLoopButton: "yes",					// Show playlist loop button
                    showShuffleButton: "yes",				// Show playlist shuffle button
                    showNextAndPrevButtons: "yes",			// Show playlist previous and next buttons
                    addMouseWheelSupport: "yes",				// Enable mouse wheel support for playlist section
                    startAtRandomVideo: "no",				// Start random video
                    playlistRightWidth: 310,					// Playlist section width when located on right side
                    playlistBottomHeight: 599,				// Playlst section height when located on bottom
                    startAtVideo: 0,							// Select the video to start at
                    maxPlaylistItems: 50,					// Maximum number of playlist items to show or import
                    thumbnailWidth: 70,						// Playlist section thumbnail width
                    thumbnailHeight: 70,						// Playlist section thumbnail height
                    spaceBetweenControllerAndPlaylist: 2,	// Controller and playlist section padding
                    spaceBetweenThumbnails: 2,				// Thumbnail padding
                    scrollbarOffestWidth: 8,					// The width to remove from the playlist section total width to make room for the playlist scrollbar
                    scollbarSpeedSensitivity: .5,			// Scroll bar sensitivity from 0.1 to 1.0
                    playlistBackgroundColor: "#222222",		// Playlist section background
                    playlistNameColor: "#FFFFFF",			// Playlist section title colour
                    thumbnailNormalBackgroundColor: "#1b1b1b",	// Thumbnail background colour
                    thumbnailHoverBackgroundColor: "#313131",	// Thumbnail background colour on hover
                    thumbnailDisabledBackgroundColor: "#272727",	// Thumbnail background disabled colour 
                    searchInputBackgroundColor: "#000000",		// Search input background colour
                    searchInputColor: "#999999",					// Search input font colour
                    youtubeAndFolderVideoTitleColor: "#FFFFFF",	// Video title colour
                    youtubeOwnerColor: "#888888",				// Youtube Owner colour
                    youtubeDescriptionColor: "#888888",			// YouTube description colour
                    //controller settings
                    showControllerWhenVideoIsStopped: "yes",		// Show controller when video is stopped
                    showNextAndPrevButtonsInController: "no",	// Show previous and next buttons in controller
                    showVolumeButton: "yes",						// Show volume button
                    showTime: "yes",								// Show video time
                    showYoutubeQualityButton: "yes",				// Show YouTube quality button.  Will be disabled for videos without quality settings.
                    showFullScreenButton: "yes",					// Show fullscreen button
                    repeatBackground: "yes",						// Repeat the control bar background
                    controllerHeight: 37,						// Control bar height
                    controllerHideDelay: 3,						// Control bar hide delay
                    startSpaceBetweenButtons: 7,					// Start and end button group spacing
                    spaceBetweenButtons: 8,						// Space in between each button
                    scrubbersOffsetWidth: 2,						// Remove space at the end of scrubber bar.  Required for some themes.
                    mainScrubberOffestTop: 0,					// Number of pixels to push the scrubber up when controller is hidden
                    timeOffsetLeftWidth: 5,						// Space to the left of time
                    timeOffsetRightWidth: 3,						// Space to the right of time
                    timeOffsetTop: 0,							// Adjusts vertical position of time
                    volumeScrubberHeight: 80,					// Volume scrubber height that's visible on volume hover
                    volumeScrubberOfsetHeight: 12,				// Additional adjustment for Volume scrubber background container
                    timeColor: "#888888",						// Time colour
                    youtubeQualityButtonNormalColor: "#888888",	// YouTube quality button default colour
                    youtubeQualityButtonSelectedColor: "#FFFFFF",	// YouTube quality button selected colour
                });
                registerAPI(id);
        }

        // REGISTER API
        var registerAPIInterval;  // setInterval is required because the player is not available until the youtube API is loaded
        function registerAPI(id) {
            clearInterval(registerAPIInterval);
            if (window["player-" + id]) {
                window["player-" + id].addListener(ICVPPlayer.READY, readyHandler);
                window["player-" + id].addListener(ICVPPlayer.ERROR, errorHandler);
                window["player-" + id].addListener(ICVPPlayer.PLAY, playHandler);
                window["player-" + id].addListener(ICVPPlayer.PAUSE, pauseHandler);
                window["player-" + id].addListener(ICVPPlayer.STOP, stopHandler);
                window["player-" + id].addListener(ICVPPlayer.UPDATE, updateHandler);
                window["player-" + id].addListener(ICVPPlayer.UPDATE_TIME, updateTimeHandler);
                window["player-" + id].addListener(ICVPPlayer.UPDATE_VIDEO_SOURCE, updateVideoSourceHandler);
                window["player-" + id].addListener(ICVPPlayer.START_TO_LOAD_PLAYLIST, startToLoadPlaylistHandler);
                window["player-" + id].addListener(ICVPPlayer.LOAD_PLAYLIST_COMPLETE, loadPlaylistCompleteHandler);
                window["player-" + id].addListener(ICVPPlayer.PLAY_COMPLETE, playCompleteHandler);
            } else {
                registerAPIInterval = setInterval(registerAPI, 100);
            }
        };

        //API EVENT LISTENERS
        function readyHandler(e) {
            //console.log("API -- ready to use");
        }

        function errorHandler(e) {
            console.log(e.error);
        }

        function playHandler(e) {
            //console.log("API -- play");
        }

        function pauseHandler(e) {
            //console.log("API -- pause");
        }

        function stopHandler(e) {
            //console.log("API -- stop");
        }

        function updateHandler(e) {
            //console.log("API -- update video, percent played: " + e.percent);
        }

        function updateTimeHandler(e) {
            //console.log("API -- update time: " + e.currentTime + "/" + e.totalTime);
        }

        function updateVideoSourceHandler(e) {
            //console.log("API -- video source update: " + player1.getVideoSource());
        }

        function updatePosterSourceHandler(e) {
            //console.log("API -- video source update: " + player1.getPosterSource());
        }

        function startToLoadPlaylistHandler(e) {
            //console.log("API -- start to load playlist: " + player1.getCurCatId());
        }

        function loadPlaylistCompleteHandler(e) {
            //console.log("API -- playlist load complete: " + player1.getCurCatId());
        }

        function playCompleteHandler(e) {
            //console.log("API -- play complete");
        }


        //API METHOD EXAMPLES
        function play() {
            player1.play();
        }

        function playNext() {
            player1.playNext();
        }

        function playPrev() {
            player1.playPrev();
        }

        function playShuffle() {
            player1.playShuffle();
        }

        function playVideo(videoId) {
            player1.playVideo(videoId);
        }

        function pause() {
            player1.pause();
        }

        function stop() {
            player1.stop();
        }

        function scrub(percent) {
            player1.scrub(percent);
        }

        function setVolume(percent) {
            player1.setVolume(percent);
        }

        function goFullScreen() {
            player1.goFullScreen();
        }


    });//END scope functions to particular div.
});









