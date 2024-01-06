gazeta_pl.renSwipe = (function(){

    console.log('Ren Sipe module Installed');

    function init(conf) {

        var config = {
            $element: {},
            functionExecuteSwipeRight: { f: {}, a: {} },
            functionExecuteSwipeLeft: { f: {}, a: {} },
            sensitivity: 40
        };
    
        var touches = '';
        var touchesInAction = [];
        var theTouchInfo = '';

        if (conf.$element.length) {
            config.$element = conf.$element;

            if(conf.functionExecuteSwipeRight.f !== undefined) {
                config.functionExecuteSwipeRight.f = conf.functionExecuteSwipeRight.f;
            } else {
                config.functionExecuteSwipeRight = conf.functionExecuteSwipeRight;
            }

            if(conf.functionExecuteSwipeLeft.f !== undefined) {
                config.functionExecuteSwipeLeft.f = conf.functionExecuteSwipeLeft.f;
            } else {
                config.functionExecuteSwipeLeft = conf.functionExecuteSwipeLeft;
            }

            if(conf.functionExecuteSwipeRight.a !== undefined){
                config.functionExecuteSwipeRight.a = conf.functionExecuteSwipeRight.a;
            }

            if(conf.functionExecuteSwipeLeft.a !== undefined){
                config.functionExecuteSwipeLeft.a = conf.functionExecuteSwipeLeft.a;
            }

            if (conf.sensitivity) {
                config.sensitivity = conf.sensitivity;
            }

            config.$element.bind('touchstart', touchStartHandler);
            config.$element.bind('touchend', touchEndHandler);
        } else {
            console.log('Failed loaded Config');
        }

        function touchStartHandler(event) {
            touches = event.originalEvent.changedTouches;
    
            for (var j = 0; j < touches.length; j++) {
    
                touchesInAction["$" + touches[j].identifier] = {
    
                    identifier: touches[j].identifier,
                    pageY: touches[j].page,
                    pageX: touches[j].pageX,
                };
            }
        }
    
        function touchEndHandler(event) {
            touches = event.originalEvent.changedTouches;
    
            for (var j = 0; j < touches.length; j++) {
    
                theTouchInfo = touchesInAction["$" + touches[j].identifier];
                theTouchInfo.dx = touches[j].pageX - theTouchInfo.pageX;
                /* x-distance moved since touchstart */
                theTouchInfo.dy = touches[j].pageY - theTouchInfo.pageY;
                /* y-distance moved since touchstart */
            }
    
            if (theTouchInfo.dx > config.sensitivity) {
                if(config.functionExecuteSwipeLeft.a !== undefined){
                    config.functionExecuteSwipeLeft.f(config.functionExecuteSwipeLeft.a);
                } else {
                    config.functionExecuteSwipeLeft();
                }
            } else if (theTouchInfo.dx < config.sensitivity * -1) {
                if(config.functionExecuteSwipeRight.a !== undefined){
                    config.functionExecuteSwipeRight.f(config.functionExecuteSwipeRight.a);
                } else {
                    config.functionExecuteSwipeRight();
                }
            }
        }
    }

    return {
        init: init,
    };

})();