gazeta_pl.swiper = {
    init() {
        var firstPhoto = document.querySelector('.content_inner .wrapp_content .content_story.photo')
        firstPhoto && firstPhoto.classList.add('first-photo');
        var swiperType = 1;

        function myFunction(x) {
            if (x.matches) {
                swiperType = 1;
            } else {
                swiperType = 2;
            }
        }
        var x = window.matchMedia("(max-width: 419px)");
        var y = window.matchMedia("(min-width: 1000px)");

        myFunction(x);
        x.addListener(myFunction);
        var rwd = document.querySelector('.responsive');
        var modPseudoIndex = document.querySelectorAll('.mod_pseudo_index');
        modPseudoIndex.forEach(function (el) {
            el.classList.add('swiper-container');
            el.insertAdjacentHTML('beforeend', '<div class="swiper-button swiper-button-prev"></div>');
            el.insertAdjacentHTML('beforeend', '<div class="swiper-button swiper-button-next"></div>');
        })
        var swiperContainer = document.getElementById('mySwiper');
        var prevButton = document.createElement('div');
        var nextButton = document.createElement('div');
        rwd ? prevButton.classList.add('swiper-button-next') : prevButton.classList.add('swiper-button-next2');
        rwd ? nextButton.classList.add('swiper-button-prev') : nextButton.classList.add('swiper-button-prev2');
        prevButton.classList.add('swiper-button');
        nextButton.classList.add('swiper-button');
        swiperContainer && swiperContainer.parentNode.appendChild(prevButton);
        swiperContainer && swiperContainer.parentNode.appendChild(nextButton);

        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: rwd ? swiperType : 4,
        });

        var mySwiper2 = new Swiper('.swiper-container2', {
            direction: 'horizontal',
            loop: true,
            navigation: {
                nextEl: rwd ? '.swiper-button-next' : '.swiper-button-next2',
                prevEl: rwd ? '.swiper-button-prev' : '.swiper-button-prev2',
            },
            slidesPerView: rwd ? (y.matches ? 2 : 1) : 2,
        });

        var backgroundMenu = document.querySelector('.responsive.rwd .mod_hat2014 .more');
        var menu = document.querySelector('.mod_hat2014 .more input.menu');
        menu.addEventListener('click', function () {
            backgroundMenu.classList.toggle('menu-belt');
        });

        if (!rwd) {
            var slides = document.querySelectorAll('.slider__slide');
            for (var i = 0; i < slides.length; i++) {
                var myButtonHref = slides[i].querySelector('.slider__button').href;
                var newLink = document.createElement('a');
                newLink.classList.add('slider__img-link');
                newLink.href = myButtonHref;
                slides[i].appendChild(newLink);
            }
            var customSliders = document.querySelectorAll('.custom-slider');
            var swiperWrapper;
            var newSwiperContainer;
            for (var i = 0; i < customSliders.length; i++) {
                newSwiperContainer = document.createElement('div');
                newSwiperContainer.classList.add('swiper-container2');
                swiperWrapper = customSliders[i].querySelector('.swiper-wrapper');
                newSwiperContainer.appendChild(swiperWrapper);
                customSliders[i].appendChild(newSwiperContainer);
            }
        }
    }
}