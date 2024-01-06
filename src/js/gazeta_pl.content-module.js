const Parallax = require('parallax-js');

gazeta_pl.ContentModule = (() => {

    const mainTopic = document.querySelectorAll('.multiple-content');

    function init() {
        
        [].forEach.call(mainTopic, (item) => {

            const ver = item.getAttribute('version');
            const increaseClicableAreaEnable = item.classList.contains('multiple-content--increaseArea');

            parallax(item);

            if(increaseClicableAreaEnable) {
                increaseClicableArea(item);
            }

            switch(ver) {
                case 'picAndText':
                    if(ifMobile) {
                        picAndText(item);
                    }
                    break;
                default:
                    console.log('I don`t say blebleble ');
                    break;
            }
        });
    }

    function parallax(mod) {

        const parallaxElements = mod.querySelectorAll('.multiple-content__container-parallax');

        [].forEach.call(parallaxElements, (item) => {
            if(!item.classList.contains('multiple-content__parallax-pic--disable')){
                new Parallax(item);
            }
        });
    }

    function increaseClicableArea(mod) {
        const url = mod.querySelector('.multiple-content__button').getAttribute('href');
    
        mod.addEventListener('click', () => {
            window.location.href = url;
        });
    }

    function picAndText(mod) {

        const picContainer = mod.querySelector('.multiple-content__pic-container');
        const logo = mod.querySelector('.multiple-content__logo');

        logo.insertAdjacentElement('afterend', picContainer);
    }

    return {
        init: init
    }
})();