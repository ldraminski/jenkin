jQuery.fn.timeline = function(options) {
    var defaults = {           
        slider: $(this),
        holder: null,
        prev: null,
        next: null,
        visibleElemes: 0
    };
    options =  $.extend(defaults, options);
    
    return this.each(function() {
            var position = 0,
                $slider = jQuery(this),
                $holder = $slider.find(options.holder).css({ 'overflow': 'hidden' }),
                $item = jQuery($holder).find('li'),
                itemWidth = $item.outerWidth(),
                $sliderList = jQuery($holder).find('ul'),
                countItems = $item.length,
                $prev = $slider.find(options.prev),
                $next = $slider.find(options.next),
                visibleElems = options.visibleElemes = typeof options.visibleElemes == 'undefined' ? 0 : parseInt(options.visibleElemes, 10) > 0 ? parseInt(options.visibleElemes, 10) : 0,
                pagination = options.pagination = typeof options.pagination == 'undefined' ? false : options.pagination,
                effect = options.effect = typeof options.effect == 'undefined' ? false : options.effect,
                loop = options.loop = typeof options.loop == 'undefined' ? false : options.loop,
                sliderReelWidth = itemWidth * countItems;
                
                
                if(!$slider.attr('data-lazyload')){
                $slider.attr('data-lazyload', 'loaded');
                
                $sliderList.find('li').eq(position).addClass('active');

                if(effect==false){
                    $sliderList.css({ 'transition': 'all 0.4s linear', 'position': 'relative', 'left': '0' })
                    $sliderList.css({width: sliderReelWidth+'px'});
                } else {
                    $sliderList.css({ 'position': 'relative', 'left': '0' });
                }
                
            
            
            // count steps/pages
            if($('.responsive.rwd').length){
                if (visibleElems!== 0 && visibleElems!== 1){
                    visibleElems = Math.floor($(window).width() / itemWidth);
                }
            }
            var visibleAreaView = options.visibleElems == 0 ? itemWidth : Math.floor(visibleElems * itemWidth);
            var steps = Math.floor((sliderReelWidth - visibleAreaView) / itemWidth);
            
            //alert(visibleElems);
            
            
            
            if(pagination == true){
                $slider.find('.body').append(createPages(countItems,$item));
                
                var pages = $slider.find('.sliderDots li'); 
                
                pages.live("click", function() {
                    pages.removeClass('active');
                    $(this).addClass('active');
                    gotoPage(pages.index($(this)));
                });
            }

            
            function slideLeft() {
                
                var actualPos = $sliderList.css('left');

                if(actualPos !== '0px' && position > 0){
                    position--;
                } else {
                    position = 0;
                } 
                
                    if(actualPos=='0px' && loop==1){
                        if(effect==false){
                            $sliderList.css({'left': -(steps * itemWidth)});
                        }
                        position = steps;
                    } else {
                        if(effect==false){
                            $sliderList.css({'left': -(position * itemWidth)});
                        }
                    }
                    $sliderList.find('li').removeClass('active');
                    $sliderList.find('li').eq(position).addClass('active');
                    if(pagination == true){
                        pages.removeClass('active');
                        pages.eq(position).addClass('active');
                    }

            }
            
            function slideRight() {
                var actualPos = $sliderList.css('left');
                
                if (position < countItems-1 && position+1 <= steps) {
                    position++;
                    if(effect==false){
                        $sliderList.css({'left': -(position * itemWidth)});
                    }
                    $sliderList.find('li').removeClass('active');
                    $sliderList.find('li').eq(position).addClass('active');
                } else if (loop){
                    position = 0;
                    if(effect==false){
                        $sliderList.css({'left': -(position * itemWidth)});
                    }
                    $sliderList.find('li').removeClass('active');
                    $sliderList.find('li').eq(position).addClass('active');
                }
                if(pagination == true){
                    pages.removeClass('active');
                    pages.eq(position).addClass('active');
                }
                
            }
            
            function createPages(countItems,$item) {
                var $buttonsContainer = jQuery("<ul class='sliderDots'></ul>");
                for (var i = 0; i < countItems; i++) {
                    var classes = "dot";
                    if (i === 0) {
                        classes += " active";
                    }

                    var img = $item.eq(i).find('img').attr('src');
                    var data = $item.eq(i).attr('data-date');
                    var dot = jQuery("<li class='" + classes + "' ><div><img src="+img+"/></div><span>"+data+"</span></li>");
                    jQuery.data(dot[0], "index", i);
                    $buttonsContainer.append(dot);
                }
                return $buttonsContainer;
            }
            
            function gotoPage(page){
                position = page;
                if(effect==false){
                    $sliderList.css({'left': -(position * itemWidth)});
                }
                $sliderList.find('li').removeClass('active');
                $sliderList.find('li').eq(position).addClass('active');
            }
            
            $prev.click(function(e) {
                e.preventDefault();
                return slideLeft();
            });
            $next.click(function(e) {
                e.preventDefault();
                return slideRight();
            });
       
        $(this).bind('goto', function(_, page) {
            gotoPage(page);
        });
    }
    });
     
}