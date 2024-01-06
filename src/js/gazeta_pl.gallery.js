gazeta_pl.Gallery = (function () {

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const mods = body.querySelectorAll('.gallery');

    function init() {

        console.log('Init Gallery Module');

        if(mods.length) {

            [].forEach.call(mods, function(mod){
                core(mod);
            });
        }
    }

    function core(mod) {

        const galleryList = mod.querySelector('.gallery__list');
        const allElements = galleryList.querySelectorAll('.gallery__el');

        let widthElement = galleryList.offsetWidth;
        let countElements = allElements.length;
        let currentPosition = 0;
        let thumbnails;

        
        if(!ifMobile) {
            widthElement = galleryList.offsetWidth + 184;
        }

        if(mod.classList.contains('gallery--thumbnail')) {

            if(!ifMobile) {
                createThumbnail();
                openGallery();
            } else {
                createNav();
            }
        }

        function createNav() {
            const htmlNav = '<div class="gallery__nav"><div class="gallery__nav-button gallery__nav-button--prev"></div><div class="gallery__nav-button gallery__nav-button--next"></div></div>';
            let nav;
            let buttonNext;
            let buttonPrev;

            mod.insertAdjacentHTML('beforeend', htmlNav);
            
            nav = mod.querySelector('.gallery__nav');
            buttonNext = nav.querySelector('.gallery__nav-button--next');
            buttonPrev = nav.querySelector('.gallery__nav-button--prev');

            buttonNext.addEventListener('click', function() {switchSlide('next');});
            buttonPrev.addEventListener('click', function() {switchSlide('prev');});
        }

        function switchSlide(direction) {

            if(direction === 'next') {

                if(currentPosition < countElements - 1) {
                    currentPosition++;
                } else {
                    currentPosition = 0;
                }

            } else {

                if(currentPosition > 0) {
                    currentPosition--;
                } else {
                    currentPosition = countElements - 1;
                }
            }

            applyStyles();
        }
 
        function createThumbnail() {

            let htmlThumbnailBottom = '<ul class="gallery__thumbnail-list gallery__thumbnail-list--bottom">';
            let htmlThumbnailRight = '<ul class="gallery__thumbnail-list gallery__thumbnail-list--right">';

            let currentElement;
            let imgSrc;

            for(let i = 0; i < 10; i++) {

                let currentElement = allElements[i];
                let imgSrc = currentElement.querySelector('.gallery__img').getAttribute('src');

                if(i < 6) {
                    htmlThumbnailBottom += '<li class="gallery__thumbnail gallery__thumbnail--bottom" data-id="'+ i +'"><img class="gallery__thumbnail-bg" src="'+ imgSrc +'" /></li>';
                } else {
                    htmlThumbnailRight += '<li class="gallery__thumbnail gallery__thumbnail--right" data-id="'+ i +'"><img class="gallery__thumbnail-bg" src="'+ imgSrc +'" /></li>';
                }
            }

            htmlThumbnailBottom += '</div>';
            htmlThumbnailRight += '</div>';

            mod.insertAdjacentHTML('beforeend', htmlThumbnailRight);
            mod.insertAdjacentHTML('beforeend', htmlThumbnailBottom);

            thumbnails = mod.querySelectorAll('.gallery__thumbnail');

            [].forEach.call(thumbnails, function(item){
                item.addEventListener('click', function() {swichElements(this);});
            });
        }

        function swichElements(el) {
            
            const id = el.getAttribute('data-id');

            [].forEach.call(thumbnails, function(item){
                item.classList.remove('gallery__thumbnail--active');
            });

            el.classList.add('gallery__thumbnail--active');
            currentPosition = id;

            applyStyles();
        }

        function applyStyles() {
    
            styles = '' +
            '-webkit-transform: translateX(-' + widthElement * currentPosition + 'px);' +
            '-moz-transform: translateX(-' + widthElement * currentPosition + 'px);' +
            '-ms-transform: translateX(-' + widthElement * currentPosition + 'px);' +
            '-o-transform: translateX(-' + widthElement * currentPosition + 'px);' +
            'transform: translateX(-' + widthElement * currentPosition + 'px);';

            [].forEach.call(allElements, function(item){
                item.style.cssText = styles;
            });
        }

        function openGallery() {

            const iconClose = mod.querySelectorAll('.gallery__icon--close');

            [].forEach.call(allElements, function(item){
                item.addEventListener('click', function(e){
                    if(e.target.classList.contains('gallery__icon--close') === false) {
                        item.classList.add('gallery__el--opend');
                    }
                });
            });


            [].forEach.call(iconClose, function(item){
                item.addEventListener('click', function(){
                    item.parentElement.classList.remove('gallery__el--opend');
                });
            });
        }
    }
 
    return {
        init: init
    };
})();