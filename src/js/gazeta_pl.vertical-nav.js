
gazeta_pl.verticalNav = (() => {

    function init() {
        console.log('Inital Module Vertical Nav');

        var allStory = document.querySelectorAll('.story');
        $nav = $('.js-menuGen.mainNav2');

        if(allStory.length) {
            checkIfNavExist($nav);
        }

    }

    function checkIfNavExist($nav) {

        if($nav.length) {
            initialNav($nav);
        } else {
            setTimeout(() => {
                $nav = $('.js-menuGen.mainNav2');
                checkIfNavExist($nav);
            }, 500)
        }
    }

    function initialNav($nav) {
        var
            $allElInNav = $nav.find('li'),
            htmlLine = '<div class="progres"><div class="line"></div></div>',
            $holder = $('#holder_101'),
            heightPage = $holder.height(),
            $allStory = $('.story'),
            positionsAllStory = [],
            htmlPoints = '',
            $progres,
            $line,
            $allPoints,
            progresHeight;

        $nav.find('ul').append(htmlLine);
        $progres = $nav.find('.progres');
        $line = $progres.find('.line');
        progresHeight = $progres.height();

        // $allElInNav.find('.inner').hover((el) => {
        //     el.addClass('showTitle');
        // }, (el) => {
        //     el.removeClass('showTitle');
        // });

        $('.js-menuGen span').hover(function() {
            $(this).closest('.inner').toggleClass('showTitle');
        });

        $(window).bind({
            scroll: calculateScrollingProgress
        });

        calculateScrollingProgress();
        setUpPointsOnNav();

        $allPoints = $progres.find('.point');

        function setUpPointsOnNav() {
            var 
                percentHeightPage;

            for(var i = 0, len = $allStory.length; i < len; i++) {
                percentHeightPage = ($allStory.eq(i).offset().top * 100) / heightPage;
                positionsAllStory.push($allStory.eq(i).offset().top);
                percentHeightPage = (percentHeightPage * progresHeight) / 100 + 'px';
                $allElInNav.eq(i).css('top', percentHeightPage);
                htmlPoints += '<span class="point" style="top: ' + percentHeightPage + '"></span>';
            }

            $progres.append(htmlPoints);
            returnToHomePage();
        }

        function calculateScrollingProgress() {
            var 
                scrollTop = $(window).scrollTop(),
                offsetFromTop = (scrollTop * 100) / heightPage;

            $line.css('max-height', parseInt(offsetFromTop) + '%');

            for(var i = 0, len = positionsAllStory.length; i < len; i++) {
                if(scrollTop >= positionsAllStory[i] ) {
                    $allPoints.eq(i).addClass('point--big');
                } else {
                    $allPoints.eq(i).removeClass('point--big');
                }
            }
        }

        function returnToHomePage() {

            if (document.querySelector('.mod_zr_story_1')) {
                $('.js-menuGen ul').append('<li class="home"><div class="inner"><a href="https://posasiedzku.gazeta.pl/posasiedzku/0,0.html"></a></div></li>');
            }
        }

        setInterval(function(){ 
            heightPage = $holder.height();
        }, 1000);
    }

    return {
        init
    }

})();