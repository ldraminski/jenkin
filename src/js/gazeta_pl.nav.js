
gazeta_pl.Nav = (function () {

    const body = document.querySelector('body');
    const ifMobile = body.classList.contains('responsive');
    const nav = body.querySelectorAll('.nav');

    function init() {

        console.log('Init Navigation Module');

        if(nav.length) {
            [].forEach.call(nav, function(item){
                switchNav(item);
            });
        }
    }

    function switchNav(nav) {

        const button = nav.querySelector('.nav__icon');

        button.addEventListener('click', function(){
            nav.classList.toggle('nav--opend');
        });
        
    }
 
    return {
        init: init
    };
})();