jQuery.fn.ytvideorwd = function(options) {
    var defaults = {           
        videoElem: $(this),
        holder: null
    };
    options =  $.extend(defaults, options);
    
    return this.each(function() {
        
            var win_size = $(window).width(),
                ratio = 0.562,
                $videoElem = jQuery(options.videoElem),
                videoId = $videoElem.attr("data-idvideo"),
                playerId = $videoElem.attr("data-playerid"),
                autoplay = $videoElem.attr("data-autoplay"),
                controls = $videoElem.attr("data-controls"),
                $playBtn = jQuery(options.videoElem).find('button')
                $holder = jQuery(options.videoElem).find(options.holder),
                itemWidth = win_size;

            /*if(win_size > 1264){
                var heightVideo = parseInt($videoElem.attr("data-height"));
            } else {
                var heightVideo = parseInt(win_size*ratio);
            }*/
            var heightVideoFix = parseInt(win_size*ratio);
            
            $videoElem.css({"z-index": "2"});
            $videoElem.find('iframe').css({"height": heightVideoFix, "width": win_size});
            $holder.css({"height": heightVideoFix, "width": win_size, "overflow": 'hidden'});
            //$videoElem.next().css({"padding-top": heightVideoFix+70, "z-index": "1"});
            
        // nowe 
        var tag = document.createElement('script');
        tag.src = "//www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        
        function onYouTubeIframeAPIReady(playerId,heightVideoFix,win_size,videoId,autoplay,controls) {
            var $divPlayer = playerId;

            player = new YT.Player($divPlayer, {
                height: heightVideoFix,
                width: win_size,
                videoId: videoId, // youtube video id
                playerVars: {
                    'autoplay': autoplay,
                    'rel': 0,
                    'showinfo': 0,
                    'controls' : controls,
                    'autohide' : 0,
                    'modestbranding' : 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
        window.setTimeout(function() {onYouTubeIframeAPIReady(playerId,heightVideoFix,win_size,videoId,autoplay,controls);}, 1500);
        
        onPlayerReady = function (event) {
            $playBtn.show();
        }
        onPlayerStateChange = function (event) {
            if (event.data == 0 || event.data == 2) {
                $playBtn.fadeIn('fast');
            } else {
                $playBtn.fadeOut('fast');
            }
        }
        $playBtn.click(function(e) {
            $(this).fadeOut('normal');
            player.playVideo();
        });
        //
        
    });
     
}