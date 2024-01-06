const Parallax = require('parallax-js');

gazeta_pl.Partners = (() => {

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const partnerMod = document.querySelectorAll('.partners');

    function init() {

        if(partnerMod.length) {

            [].forEach.call(partnerMod, (mod) => {
                partners(mod);
                createParallax(mod);
            });
        }
    }

    function createParallax(mod) {

        const titlePic = 'https://bi.gazeta.pl/im/5/24619/m24619285,REN-NESTLE-2019-PARTNER-TITTLE.png';
        let bgPic = 'https://bi.gazeta.pl/im/0/24619/m24619280,REN-NESTLE-2019-PARTNER-BG.png';
        const bottleLeftBluePic = 'https://bi.gazeta.pl/im/2/24619/m24619282,REN-NESTLE-2019-BOTTLE-LEFT-BLUE.png';
        const bottleLeftOrangePic = 'https://bi.gazeta.pl/im/1/24619/m24619281,REN-NESTLE-2019-BOTTOLE-LEFT-ORANGE.png';
        const bottleRightSmallPic = 'https://bi.gazeta.pl/im/3/24619/m24619283,REN-NESTLE-2019-BOTTLE-RIGHT-SMALL.png';
        const bottleRightBigPic = 'https://bi.gazeta.pl/im/4/24619/m24619284,REN-NESTLE-2019-BOTTOLE-RIGHT-BIG.png';

        if(ifMobile) {
            bgPic = 'https://bi.gazeta.pl/im/0/24627/m24627550,REN-NESTLE-2019-PARTNERS-BG2-MOBILE.png';
        }

        let html = `
                    <div class="partners__parallax-wrapper">
                        <div class="partners__parallax-container partners__parallax-container--disable" data-id="0">
                            <img class="partners__parallax-image" src="${bgPic}" />
                        </div>
                        <div class="partners__parallax-container" data-id="1">
                            <img class="partners__parallax-image" data-depth="0.3" src="${titlePic}" />
                        </div>
                        <div class="partners__parallax-container" data-id="2">
                            <img class="partners__parallax-image" data-depth="0.2" src="${bottleLeftBluePic}" />
                        </div>
                        <div class="partners__parallax-container" data-id="3" data-invert-x="false" data-invert-y="false">
                            <img class="partners__parallax-image" data-depth="0.2" src="${bottleLeftOrangePic}" />
                        </div>
                        <div class="partners__parallax-container" data-id="4">
                            <img class="partners__parallax-image" data-depth="0.3" src="${bottleRightSmallPic}" />
                        </div>
                        <div class="partners__parallax-container" data-id="5" data-invert-x="false" data-invert-y="false">
                            <img class="partners__parallax-image" data-depth="0.3" src="${bottleRightBigPic}" />
                        </div>
                    </div>
                `
        mod.insertAdjacentHTML('beforeend', html);

        const parallaxElements = mod.querySelectorAll('.partners__parallax-container');

        [].forEach.call(parallaxElements, (item) => {
            if(!item.classList.contains('partners__parallax-container--disable')){
                new Parallax(item);
            }
        });
    }
 
    function partners(mod) {

        let list = mod.querySelector('.partners__list');
        let elements = list.querySelectorAll('.partners__partner');
        let widthElement = list.offsetWidth;
        let currentPosition = 0;
        let nav;
        let navDots;
        let buttonNext;
        let buttonPrev;
    
        createNav();
    
        function createNav() {
            const htmlNav = '<div class="partners__nav"><div class="partners__nav-button partners__nav-button--prev"></div><div class="partners__nav-button partners__nav-button--next"></div></div>';
    
            let htmlNavDots = '';
    
            htmlNavDots += '<div class="partners__nav-dots">';
    
            [].forEach.call(elements, function(item, index){
    
                if(index === 0) {
                    htmlNavDots += '<li class="partners__nav-dot partners__nav-dot--active" data-id="' + index + '"></li>';
                } else {
                    htmlNavDots += '<li class="partners__nav-dot" data-id="' + index + '"></li>';
                }
            });
    
            htmlNavDots += '</div>';
    
            mod.insertAdjacentHTML('beforeend', htmlNav);
            mod.insertAdjacentHTML('beforeend', htmlNavDots);
            
            nav = mod.querySelector('.partners__nav');
            navDots = mod.querySelectorAll('.partners__nav-dot');
            buttonNext = nav.querySelector('.partners__nav-button--next');
            buttonPrev = nav.querySelector('.partners__nav-button--prev');
    
            buttonNext.addEventListener('click', function() {switchPartners('next');});
            buttonPrev.addEventListener('click', function() {switchPartners('prev');});

            gazeta_pl.renSwipe.init({
                $element: $(mod),
                functionExecuteSwipeRight: {f: switchPartners, a: 'next'},
                functionExecuteSwipeLeft: {f: switchPartners, a: 'prev'},
                sensitivity: 80
            });
    
            [].forEach.call(navDots, function(item){
                item.addEventListener('click', function(){selectPartners(this);});
            });
        }
    
        function switchPartners(direction) {
    
            let helper = elements.length - 1;
    
            if(direction === 'next') {
    
                if(currentPosition < helper) {
                    currentPosition++;
                } else {
                    currentPosition = 0;
                }
                
            } else if(direction === 'prev') {
    
                if(currentPosition > 0) {
                    currentPosition--;
                } else {
                    currentPosition = helper;
                }
            }
    
            styles = '' +
                '-webkit-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-moz-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-ms-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-o-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                'transform: translateX(-' + widthElement * currentPosition + 'px);';
    
            [].forEach.call(elements, function(item, index){
                item.style.cssText = styles;
                navDots[index].classList.remove('partners__nav-dot--active');
            });
    
            navDots[currentPosition].classList.add('partners__nav-dot--active');
        }
    
        function selectPartners(el) {
            
            currentPosition = Number(el.getAttribute('data-id'));
    
            styles = '' +
                '-webkit-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-moz-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-ms-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-o-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                'transform: translateX(-' + widthElement * currentPosition + 'px);';
    
            [].forEach.call(elements, function(item, index){
                item.style.cssText = styles;
                navDots[index].classList.remove('partners__nav-dot--active');
            });
    
            navDots[currentPosition].classList.add('partners__nav-dot--active');
        }
    }

    return {
        init: init
    };

})();