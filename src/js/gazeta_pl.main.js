/*jshint -W087 */

jQuery.fn.exists = function () {
    return jQuery(this).length > 0;
};

gazeta_pl.Main = (function () {

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const partnersMod = document.querySelectorAll('.partners');
    const sponsors = document.querySelectorAll('.mod.mod_sponsors');

    function init() {

        console.log('Niemcy 2020');

        replaceRsc();

        if(sponsors.length){
            [].forEach.call(sponsors, function(item, index){
                if(ifMobile){
                    console.group('Sponsors Mobile', index, item);
                    sponsorsTopMobile(item);
                    console.groupEnd();
                }
            });
        }
    }

    function sponsorsTopMobile(mod) {

        var container = mod.querySelector('ul');
        var allElements = container.querySelectorAll('li');
        var widthSlider = container.offsetWidth;
        var positionOfSlide = 0;

        var slideSpeed = setInterval(function(){
            next();
        }, 3000);

        function next() {

            if(positionOfSlide < allElements.length - 1) {
                positionOfSlide++;
            } else {
                positionOfSlide = 0;
            }
            
            container.style.cssText = '' +
                '-webkit-transform: translateX(-' + widthSlider * positionOfSlide + 'px);' +
                '-moz-transform: translateX(-' + widthSlider * positionOfSlide + 'px);' +
                '-ms-transform: translateX(-' + widthSlider * positionOfSlide + 'px);' +
                '-o-transform: translateX(-' + widthSlider * positionOfSlide + 'px);' +
                'transform: translateX(-' + widthSlider * positionOfSlide + 'px);';
        }
    }

    function replaceRsc() {

        console.log('Init Replace Rsc Module');

        if(ifMobile) {

            var allElementsMobile = document.querySelectorAll('[mobile-src]');

            if(allElementsMobile.length) {
                replaceSource(allElementsMobile, 'mobile');
            }

        } else {

            var allElementsDesk = document.querySelectorAll('[desk-src]');

            if(allElementsDesk.length) {
                replaceSource(allElementsDesk, 'desk');
            }
        }

        function replaceSource(listNode, version) {

            var srcElement = '';
            var currentEl;

            for(var i = 0, len = listNode.length; i < len; i++) {

                currentEl = listNode[i];
                srcElement = currentEl.getAttribute(version + '-src');

                if( currentEl && srcElement.length) {
                    currentEl.setAttribute('src', srcElement);
                }
            }
        }
    }


 
    return {
        init: init
    };
})();