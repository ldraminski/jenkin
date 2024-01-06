import Glide from '@glidejs/glide';

gazeta_pl.lazyload = (function (){

    const body = document.querySelector('body');
    const allPictures = body.querySelectorAll('img[data-src]');

    function init() {

        console.log('%c LAZY LOAD', 'background-color: red; color: white; padding: 2px 5px;');

        let src;

        let observer = new IntersectionObserver((entries, observer) => {
            console.log('ENTIRES: ', entries);
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0) {
                    entry.target.src = entry.target.getAttribute('data-src');
                    console.log('entry: ', entry.target);
                }
              });
        });

        allPictures.forEach(img => { 
            observer.observe(img) 
        });
    }

    return {
        init: init
    }

})();