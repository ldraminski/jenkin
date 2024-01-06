jQuery.fn.exists = function() {
    return jQuery(this).length > 0;
};
gazeta_pl.storytelling = {
    init: function() {
        var me = gazeta_pl.storytelling;
                    
        // header up
        if ($('.header_inner.up').exists()) me.headerUp.init();
        
        // UOM pins edit
        if ($('#EditorContentPreview').exists()) me.uomPins.init();
        
        $('.mod_uzr_YouTube_RWD').ytvideorwd({holder: '.holder'});
        $('.sliderTimelineStory').timeline({holder: '.body > div', prev: '.prev', next: '.next', visibleElemes: '1', pagination: true, effect: true});
        
        $('.covered.compareDemo').coveringBad({
            marginY : 30 , // margin-top and margin-bottom
            marginX : 30 , // margin-left and margin-right
            setX  : 200,
            setY  : 100 ,
            direction : "vertical" // vertical or horizontal
        });

        window.addEventListener("resize",function(){
            $('.mod_uzr_YouTube_RWD').ytvideorwd({holder: '.holder'});
        }, false); 
    },
    headerUp: {
        init: function () {
            var $elem = $('body').find('.paralax .header_inner.up');
            
            $elem.each(function (index) {
                //var heightElem = parseInt($(this).height()-177)*-1;
                $elem.parent().find('.wrapp_content > :first-child').find('.c1').css({'position': 'absolute', 'top': '10px', 'right': '0'})
            });

        }
    },
    uomPins: {
        init: function () {
            if (window.parent.$('#coords').length === 0) {
                window.parent.$('#EditorContentPreview').prepend($('<div id="coords">x: <span id="x"></span>, y: <span id="y" style="margin-right: 100px"></span> klik x: <span id="storex" style="font-weight: bold"></span>, klik y: <span id="storey" style="font-weight: bold; margin-right: 100px"></span> punkt x: <span id="pointx" style="font-weight: bold; color: blue"></span>, punkt y: <span id="pointy" style="font-weight: bold; color: blue; margin-right: 100px"></span> infoBar [SPACE]: <span id="infobar"></span></div><hr/>'));
            }
            $('.pins_body').bind({
                'mousemove': function (e) {
                    var
                            elementOffset = $(this).offset(),
                            relX = e.pageX - elementOffset.left,
                            relY = e.pageY - elementOffset.top;
                    window.parent.$('#x').text(relX + 'px');
                    window.parent.$('#y').text(relY + 'px');
                },
                'click': function (e) {
                    var
                            elementOffset = $(this).offset(),
                            relX = e.pageX - elementOffset.left,
                            relY = e.pageY - elementOffset.top;
                    window.parent.$('#storex').text(relX + 'px');
                    window.parent.$('#storey').text(relY + 'px');
                }
            })
            /*$('.pins_body .point').bind({
                'click': function (e) {
                    var point = $(e.target).data('id').split(',');
                    window.parent.$('#pointx').text(point[0] + 'px');
                    window.parent.$('#pointy').text(point[1] + 'px');
                }
            })
            $('.pins_body .pointGroup').bind({
                'click': function (e) {
                    var point = $(e.target).parent().data('id').split(',');
                    window.parent.$('#pointx').text(point[0] + 'px');
                    window.parent.$('#pointy').text(point[1] + 'px');
                }
            })*/
        }
    }
}
