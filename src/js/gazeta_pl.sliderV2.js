import Glide from '@glidejs/glide';

gazeta_pl.SliderV2 = (function (){

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const sliderMod = document.querySelectorAll('.sliderV2:not(.sliderV2--video)');
    const sliderStorytelling = document.querySelectorAll('.sliderV2-storytelling');

    function init() {
        console.log('TTTTTT: TTTT');

     
        const options = {
            focusAt: '1',
            type: 'carousel',
            perView: 1,
            startAt: 0,
           
            gap: '40px',
            breakpoints: {
                620: {
                    perView: 1,
                    gap: '5px'
                },
            },
            classes: {
                activeSlide: 'sliderV2__slide--active'
            }
        }

        const optionsStorytelling = {
            type: 'carousel',
            perView: 3,

            breakpoints: {
                620: {
                    perView: 1,
                    gap: '5px'
                },
            },
            classes: {
                activeNav: 'sliderV2-storytelling__controls-bullet--activo'
            }
        }

        sliderMod.forEach((element) => {
            const allElements = element.querySelectorAll('.sliderV2__slide');
            createBullet(element, allElements);
            const glide = new Glide(element, options).mount({'CustomActiveClass': CustomActiveClass});
        });


        setTimeout( () => {
            sliderStorytelling.forEach((element) => {
                const allElements = element.querySelectorAll('.sliderV2-storytelling__slide');
                createBulletStorytelling(element, allElements);
                const glide = new Glide(element, optionsStorytelling).mount();
            });
        }, 200);
    }

    function createBullet(slider, allElements) {
        const controls = slider.querySelector('.sliderV2__controls');
        let html = '';
 
        if(controls) {
            for(let i = 0, len = allElements.length; i < len ; i++) {
                html += '<button class="sliderV2__controls-bullet" data-glide-dir="=' + i + '"></button>';
            }
            controls.insertAdjacentHTML('beforeEnd', html);
        }
    }

    function createBulletStorytelling(slider, allElements) {
        const controls = slider.querySelector('.sliderV2-storytelling__controls');
        const controlsWidth = controls.offsetWidth;
        const buttonSize = controlsWidth / allElements.length - 20;
        let html = '';
 
        if(controls) {
            for(let i = 0, len = allElements.length; i < len ; i++) {
                html += '<button style="width:' + buttonSize + 'px" class="sliderV2-storytelling__controls-bullet" data-glide-dir="=' + i + '"></button>';
            }
            controls.insertAdjacentHTML('beforeEnd', html);
        }
    }

    function CustomActiveClass(Glide, Components, Events) {
        var Component = {
            mount() {
                this.changeActiveSlide();
            },
    
            changeActiveSlide() {
                let slide = Components.Html.slides[Glide.index];
                slide.classList.remove('sliderV2__slide--next', 'sliderV2__slide--prev');
                slide.classList.add('sliderV2__slide--active');
     
                getSiblings(slide).forEach((sibling) => {
                    sibling.classList.remove('sliderV2__slide--active', 'sliderV2__slide--next', 'sliderV2__slide--prev');
                });
    
                if(slide.nextElementSibling) {
                    slide.nextElementSibling.classList.add('sliderV2__slide--next');
                }
    
                if(slide.previousElementSibling) {
                    slide.previousElementSibling.classList.add('sliderV2__slide--prev');
                }
            },
        };
    
        Events.on('run', () => {
            Component.changeActiveSlide();
        });
    
        return Component;
    };

    function getSiblings(elem) {

        // Setup siblings array and get the first sibling
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
    
        // Loop through each sibling and push to the array
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling
        }
    
        return siblings;
    
    };

    return {
        init: init
    }

})();