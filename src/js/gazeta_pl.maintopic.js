const Parallax = require('parallax-js');

gazeta_pl.Maintopic = (() => {

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const mainTopic = body.querySelectorAll('.main-topic');

    function init() {

        console.log('Init Main Topic Module');

        if(mainTopic.length) {
            [].forEach.call(mainTopic, (item) => {
                if(item.classList.contains('main-topic--parallax')) {
                    parallax(item);
                }
            });
        }
    }

    function parallax(mainTopic) {

        const parallaxElements = mainTopic.querySelectorAll('.main-topic__container-bg-img');

        [].forEach.call(parallaxElements, (item) => {
            if(!item.classList.contains('main-topic__container-bg-img--disable')){
                new Parallax(item);
            }
        });
    }
 
    return {
        init: init
    };
})();