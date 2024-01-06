
gazeta_pl.Slider = (() => {

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const sliderMod = document.querySelectorAll('.slider');

    function init() {
        
        if(sliderMod.length) {

            [].forEach.call(sliderMod, function(mod){
                slider(mod);
                haxClick(mod);
            });
        }
    }

    function haxClick(mod) {

        const slides = mod.querySelectorAll('.slider__slide');

        [].forEach.call(slides, function(item){
            let contentWrappers = item.querySelector('.slider__content-wrapper');
            let button = item.querySelector('.slider__button');
            let url = '';

            if(button) {
                url = button.getAttribute('href');

                item.addEventListener('click', () => {
                    window.location.href = url;
                });
            }
        });
    }

    function slider(mod) {

        const container = mod;
        const list = container.querySelector('.slider__list');
        let ver = container.getAttribute('version');
        let allSlides = list.querySelectorAll('.slider__slide');
        let widthElement = allSlides[0].offsetWidth;
        let currentPosition = 0;
        let savedPosition = 0;
        let animationEnd = true;
        let nav;
        let buttonNext;
        let buttonPrev;
        let navDots;

        if(allSlides.length <= 1) {
            console.log('Only one element in slider');
            return;
        }

        switch(ver) {
            case 'simple':
                simpleSlider();
                break;
            case 'infinity':
                if(ifMobile){
                    ver = 'simple';
                    simpleSlider();
                } else {
                    versionInfinity();
                }
                break;
            case 'slideShow':
                if(ifMobile){
                    ver = 'simple';
                    simpleSlider();
                } else {
                    versionSlideShow();
                }
                break;
            case 'storytelling':
                if(ifMobile){
                    ver = 'simple';
                    simpleSlider();
                } else {
                    versionSlideShow();
                }
                break;
            default:
                simpleSlider();
                break;
        }

        function selcetSlide(el) {

            if(!animationEnd) {
                return;
            }

            const id = el.getAttribute('data-id');
            currentPosition = Number(id);

            applyStyles();
        }

        function switchSlide(direction) {

            if(!animationEnd) {
                return;
            }

            if(ver === 'infinity' || ver === 'slideShow' || ver === 'storytelling') {

                if(direction === 'next') {
                    if(currentPosition < allSlides.length - 5) {
                        currentPosition++;
                    } else {
                        currentPosition++;

                        if(ver === 'slideShow' || ver === 'storytelling') {
                            allSlides[currentPosition + 2].classList.remove('slider__slide--active');
                            currentPosition = 0;
                            allSlides[currentPosition + 2].classList.add('slider__slide--active');
                        } else {

                            setTimeout(function(){
                                allSlides[currentPosition + 2].classList.remove('slider__slide--active');
                                currentPosition = 0;
                                allSlides[currentPosition + 2].classList.add('slider__slide--active');
                                applyStyles();
                            }, 2500);
                        }
                    }
                } else if (direction === 'prev') {
                    if(currentPosition > 0) {
                        currentPosition--;
                    } else {
                        currentPosition--;

                        if(ver === 'slideShow' || ver === 'storytelling') {
                            allSlides[currentPosition + 2].classList.remove('slider__slide--active');
                            currentPosition = allSlides.length - 5;
                            allSlides[currentPosition + 2].classList.add('slider__slide--active');
                        } else {

                            setTimeout(function(){
                                allSlides[currentPosition + 2].classList.remove('slider__slide--active');
                                currentPosition = allSlides.length - 5;
                                allSlides[currentPosition + 2].classList.add('slider__slide--active');
                                applyStyles();
                            }, 2500);
                        }
                    }
                }
            }

            if (ver === 'simple') {

                if(direction === 'next') {
                    if(currentPosition < allSlides.length - 1) {
                        currentPosition++;
                    } else {
                        currentPosition = 0;
                    }
                } else if (direction === 'prev') {
                    if(currentPosition > 0) {
                        currentPosition--;
                    } else {
                        currentPosition = allSlides.length - 1;
                    }
                }
            }

            applyStyles();
        }

        function applyStyles(mode) {

            [].forEach.call(navDots, function(item){
                item.classList.remove('slider__nav-dot--active');
            });

            if(ver === 'infinity' || ver === 'slideShow' || ver === 'storytelling') {
                styles = '' +
                '-webkit-transform: translateX(' + (widthElement * currentPosition) * -1 + 'px);' +
                '-moz-transform: translateX(' + (widthElement * currentPosition) * -1 + 'px);' +
                '-ms-transform: translateX(' + (widthElement * currentPosition) * -1 + 'px);' +
                '-o-transform: translateX(' + (widthElement * currentPosition) * -1 + 'px);' +
                'transform: translateX(' + (widthElement * currentPosition) * -1 + 'px);';

                list.classList.add('slider__list--animation');
                
                if( (ver === 'slideShow' || ver === 'storytelling') && mode !== 'miss') {

                    [].forEach.call(allSlides, function(item){
                        item.classList.remove('slider__slide--fadeIn');
                    });

                    allSlides[savedPosition + 1].classList.add('slider__slide--fadeOut');
                    allSlides[savedPosition + 2].classList.add('slider__slide--fadeOut');
                    allSlides[savedPosition + 3].classList.add('slider__slide--fadeOut');

                    setTimeout(function(){

                        [].forEach.call(allSlides, function(item){
                            item.classList.remove('slider__slide--active');
                        });

                        allSlides[currentPosition + 2].classList.add('slider__slide--active');

                        [].forEach.call(allSlides, function(item){
                            item.classList.remove('slider__slide--fadeOut');
                        });

                        allSlides[currentPosition + 1].classList.add('slider__slide--fadeIn');
                        allSlides[currentPosition + 2].classList.add('slider__slide--fadeIn');
                        allSlides[currentPosition + 3].classList.add('slider__slide--fadeIn');

                        list.style.cssText = styles;

                    }, 400);

                } else {

                    allSlides[savedPosition + 2].classList.remove('slider__slide--active');
                    allSlides[currentPosition + 2].classList.add('slider__slide--active');

                    list.style.cssText = styles;
                }

                animationEnd = false;
    
                setTimeout(function(){
                    list.classList.remove('slider__list--animation');
    
                    setTimeout(function(){
                        animationEnd = true;
                    }, 10);
                }, 500);

                navDots[allSlides[currentPosition + 2].getAttribute('data-id')].classList.add('slider__nav-dot--active');

            } else {
                styles = '' +
                '-webkit-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-moz-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-ms-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                '-o-transform: translateX(-' + widthElement * currentPosition + 'px);' +
                'transform: translateX(-' + widthElement * currentPosition + 'px);';

                [].forEach.call(allSlides, function(item){
                    item.style.cssText = styles;
                });

                navDots[allSlides[currentPosition].getAttribute('data-id')].classList.add('slider__nav-dot--active');
            }

            savedPosition = currentPosition;
        }

        function createNav() {
            const htmlNav = '<div class="slider__nav"><div class="slider__nav-button slider__nav-button--prev"></div><div class="slider__nav-button slider__nav-button--next"></div></div>';
            let htmlNavDots = '';

            htmlNavDots += '<div class="slider__nav-dots">';

            [].forEach.call(allSlides, function(item, index){

                if(ver === 'storytelling') {
                    const srcBgPic = item.querySelector('.slider__img-bg').getAttribute('desk-src');
                    htmlNavDots += '<li class="slider__nav-dot" data-id="' + index + '"><img class="slider__nav-thumbnail" src="'+ srcBgPic +'" </li>';
                } else {
                    if(index === 0) {
                        htmlNavDots += '<li class="slider__nav-dot slider__nav-dot--active" data-id="' + index + '"></li>';
                    } else {
                        htmlNavDots += '<li class="slider__nav-dot" data-id="' + index + '"></li>';
                    }
                }
            });

            htmlNavDots += '</div>';

            list.insertAdjacentHTML('beforebegin', htmlNav);
            list.insertAdjacentHTML('afterend', htmlNavDots);
            
            nav = container.querySelector('.slider__nav');
            navDots = container.querySelectorAll('.slider__nav-dot');
            buttonNext = nav.querySelector('.slider__nav-button--next');
            buttonPrev = nav.querySelector('.slider__nav-button--prev');

            buttonNext.addEventListener('click', function() {switchSlide('next');});
            buttonPrev.addEventListener('click', function() {switchSlide('prev');});

            [].forEach.call(navDots, function(item){
                item.addEventListener('click', function(){selcetSlide(this);});
            });
        }

        function cloneElements() {
            const cloneSlide1 = allSlides[0].cloneNode(true);
            const cloneSlide2 = allSlides[1].cloneNode(true);
            const cloneSlideLastButOne = allSlides[allSlides.length -1].cloneNode(true);
            const cloneSlideLast = allSlides[allSlides.length -2].cloneNode(true);
            
            cloneSlide1.classList.remove('slider__slide--active');
            cloneSlideLastButOne.classList.add('slider__slide--clone');
            cloneSlideLast.classList.add('slider__slide--clone');

            list.insertAdjacentElement('afterbegin', cloneSlideLastButOne);
            list.insertAdjacentElement('afterbegin', cloneSlideLast);
            list.insertAdjacentElement('beforeEnd', cloneSlide1);
            list.insertAdjacentElement('beforeEnd', cloneSlide2);

            allSlides = list.querySelectorAll('.slider__slide');
        }

        function versionInfinity() {
            createNav();
            cloneElements();
        }

        function versionSlideShow() {
            createNav();
            cloneElements();

            allSlides[1].classList.add('slider__slide--fadeIn');
        }

        function simpleSlider() {
            createNav();
        }
    }

    return {
        init: init
    };

})();