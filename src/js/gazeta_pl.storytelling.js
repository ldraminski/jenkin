/* jshint ignore:start */

jQuery.fn.exists = function () {
    return jQuery(this).length > 0;
};
gazeta_pl.storytelling = {
    init: function () {
        var me = gazeta_pl.storytelling;
        var timeStampLogo = new Date().getTime();

        // sliders
        me.sliders.init();


        // lazyload
        if (dfpParams.dx == '160591') {
            me.lazyload.init();

        }


        // heleprs for lazyload
        me.helpers.init();
        //me.returnToHomePage();
        
    },

    headerUp: {
        init: function () {

            $('body').find('.paralax.header_up .header_inner').each(function (index) {

                $(this).parent().find('.wrapp_content > :first-child').find('.c1').css({
                    'position': 'absolute',
                    'top': '10px',
                    'right': '0'
                })
            });

        }
    },
    fixParalax: {
        observerOpts: {
            threshold: 0
        },
        init: function () {

            var self = gazeta_pl.storytelling.fixParalax,
                entries = $('.paralax'),
                observer;

            observer = new IntersectionObserver(self.onEntry, self.observerOpts);
            entries.each(function (idx, entry) {
                observer.observe(entry);
            });
        },
        onEntry: function (elements, observer) {
            var self = gazeta_pl.storytelling.fixParalax;


            elements.forEach(function (elm) {
                var target = $(elm.target),
                    $header = target.find('header');

                if (elm.intersectionRatio > 0) {
                    var y = '',
                        scrolled = 0,
                        lastScroll = 0,
                        actualScroll = 0;


                    $(window).scroll(function () {

                        actualScroll = $(window).scrollTop();
                        y = (actualScroll > lastScroll) ? 'down' : ((actualScroll === lastScroll) ? 'none' : 'up');

                        if (y == 'up') {
                            if (scrolled > 0) {
                                scrolled = scrolled - (lastScroll - actualScroll);
                            }
                        } else if (y == 'down') {

                            if (lastScroll > 0) {
                                scrolled = scrolled + (actualScroll - lastScroll);
                            }
                        }
                        lastScroll = actualScroll;


                        $header.css('background-position', '50% ' + parseInt(scrolled / 5) * (-1) + 'px');
                    });
                }
            });

        }
    },
    flexGallery: {
        init: function () {
            var $container = $('.galleryFlexV2'),
                $obj = $container.find('.flexElem'),
                me = gazeta_pl.storytelling.flexGallery;


            $obj.click(function () {
                me.showPhoto(this);
            });

            $('.galleryFlexV2 .photoBig').live('mouseleave', function () {
                me.deletePhoto();
            });

        },
        showPhoto: function (e) {
            var $obj = $(e);
            var $container = $('.galleryFlexV2');

            var imgUrl = $obj.attr('data-img');
            var desc = $obj.find('.desc p').text();

            if ($container.find('.photoBig').length > 0) {
                $container.find('.photoBig').remove();
            }
            var htmlObj = '<div style="display: none;" class=\"photoBig\"><img src=\"' + imgUrl + '\"/><div class=\"desc\"><p>' + desc + '</p></div></div>';

            $container.append(htmlObj);
            $container.find('.photoBig').show('500');

        },
        deletePhoto: function () {
            var $container = $('.galleryFlexV2');

            $container.find('.photoBig').hide('500');

        }
    },
    helpers: {
        init: function () {
            var me = gazeta_pl.storytelling;

            // player YT
            $('.mod_uzr_YouTube_RWD').ytvideorwd({holder: '.holder'});

            // fix paralax // wylaczone dla merca
            /*if (($('body').hasClass('responsive') || $('body').hasClass('tablet')) && !$('body').hasClass('ie')) {
                me.fixParalax.init();
            }*/


            // flex gallery
            $('.galleryFlex .flexElem').hover(function () {
                $(this).toggleClass('active');
            });

            // fog for mercedes
            // $('body').find('.story.moto1 header').append('<div class=\"fog_ani\"></div>');
            // $('body').find('.story.moto1 header').append('<div class=\"fog_ani ani_2\"></div>');


            // flex gallery V2 
            me.flexGallery.init();

            // header up
            if (!$('body').hasClass('responsive') || !$('body').hasClass('tablet')) {
                if ($('.header_inner.up').exists())
                    me.headerUp.init();
            }

            // fix bg paralax
            if ($(window).width() > 1350) {
                var paralaxBg = ($(window).width() - 1350) * -0.4;
            } else {
                if ($(window).width() > 1200) {
                    var prop = 800 / $(window).width();
                    var paralaxBg = (1350 - $(window).width()) * -prop;
                }
            }
            $('.paralax.header_up').first().find('header').css('background-position', 'left ' + ((paralaxBg)) + 'px');
            window.addEventListener("resize", function () {
                if ($(window).width() > 1350) {
                    var paralaxBg = ($(window).width() - 1350) * -0.4;
                } else {
                    if ($(window).width() > 1200) {
                        var prop = 800 / $(window).width();
                        var paralaxBg = (1350 - $(window).width()) * -prop;
                    }
                }
                $('.paralax.header_up').first().find('header').css('background-position', 'left ' + ((paralaxBg)) + 'px');

            }, false);


            $('.covered.compareDemo').coveringBad({
                marginY: 30, // margin-top and margin-bottom
                marginX: 30, // margin-left and margin-right
                setX: 545,
                setY: 259,
                direction: "horizontal" // vertical or horizontal
            });

            window.addEventListener("resize", function () {
                $('.mod_uzr_YouTube_RWD').ytvideorwd({holder: '.holder'});
            }, false);
        }
    },
    sliders: {
        init: function () {
            $('.sliderTimelineStory').timeline({
                holder: '.body > div',
                prev: '.prev',
                next: '.next',
                visibleElemes: '1',
                pagination: true,
                effect: true
            });
            $('.sliderFullEmiter').gsliderV2({
                holder: '.body > div',
                prev: '.arrow_l',
                next: '.arrow_r',
                visibleElemes: '1',
                pagination: true,
                loop: '1'
            });
            if ($('body').hasClass('responsive') || $('body').hasClass('tablet')) {
                $('.galleryFlex').gsliderV2({
                    holder: '.galleryInner',
                    prev: '.arrow_l',
                    next: '.arrow_r',
                    visibleElemes: '1',
                    loop: '1'
                });
                $('.galleryFlexV2').gsliderV2({
                    holder: '.galleryInner',
                    prev: '.arrow_l',
                    next: '.arrow_r',
                    visibleElemes: '1',
                    loop: '1'
                });
            }
        }
    },
    lazyload: {
        STORY_LIST: '/aliasy/storytelling/honda/lazyload/config.json',
        DOMAIN: '/',
        LIMIT: 1,
        LOADED_STORIES: 0,
        LOADING: false,
        storiesTab: [],
        init: function () {
            var me = gazeta_pl.storytelling.lazyload,
                $container = $('#holder_101');


            $container.append('<ul class=\"stories_list\"></ul>');

            me.createStoriesList();


        },
        createStoriesList: function () {
            var me = gazeta_pl.storytelling.lazyload,
                urlStory = '',
                search = '',
                searchKey = '';
            $container = $('#holder_101');

            $.getJSON(me.STORY_LIST, function (data) {
                for (i = 0; i < data.elems.length; i++) {
                    $container.find('.stories_list').append('<li></li>');
                }
                $.each(data.elems, function (i, elem) {
                    var alias = elem.alias;
                    var kotwica = elem.kotwica;
                    //me.storiesTab.push(alias);
                    me.storiesTab.push([kotwica, alias]);

                });
                // init first story and check hash


                // var hash = window.location.hash.slice(1);

                // if (hash) {

                //     $.each(me.storiesTab, function (key, value) {
                //         //alert( "The key is '" + key + "' and the value is '" + value + "'" );
                //         var index = value.indexOf(hash);
                //         if (index > -1) {
                //             searchKey = key;
                //             // delete this elem
                //             //me.storiesTab.splice(key, 1);
                //             //urlStory = value.split(',')[1];
                //             //alert(searchKey);
                //             urlStory = value[1];
                //             search = value;

                //         }
                //     });
                //     me.storiesTab.splice(0, 0, search);
                //     //alert(urlStory);
                // } else {
                //     urlStory = me.storiesTab[0][1];
                // }

                $.ajax({
                    url: urlStory,
                    type: 'GET',
                    cache: false,
                    success: function (data) {
                        var story = data;

                        var html_out = story;
                        $container.find('.stories_list li').eq(0).hide();
                        $container.find('.stories_list li').eq(0).append(html_out);


                        if (search !== '') {
                            me.storiesTab.splice(searchKey + 1, 1);
                            //me.storiesTab.splice(0, 1);
                            me.LOADED_STORIES++;
                            me.LOADING = true;
                            $('html,body').animate({scrollTop: $('body').offset().top}, 0);
                        } else {
                            me.LOADED_STORIES++;
                            me.LOADING = true;
                        }
                        $container.find('.stories_list > li').eq(0).find('section:first').attr('id', 'paralax' + parseInt(me.LOADED_STORIES));

                        if (hash) {
                            $container.find('.stories_list li').eq(0).show();
                            setTimeout(function () {
                                $('html,body').scrollTop(0);
                            }, 1200);
                            me.scrollEvent.init();
                        } else {
                            $container.find('.stories_list li').eq(0).show();
                            me.scrollEvent.init();
                        }
                        me.putBans();

                    }
                });
            });
        },
        scrollEvent: {
            observerOpts: {
                threshold: 0
            },
            init: function () {

                var me = gazeta_pl.storytelling.lazyload.scrollEvent,
                    entries = $('.stories_list > li'),
                    observer;

                observer = new IntersectionObserver(me.onEntry, me.observerOpts);
                entries.each(function (idx, entry) {
                    observer.observe(entry);
                });
            },
            onEntry: function (elements, observer) {
                var me = gazeta_pl.storytelling.lazyload,
                    countLoaded = me.LOADED_STORIES;

                elements.forEach(function (elm) {
                    var target = $(elm.target);


                    if (elm.intersectionRatio > 0) {
                        target.find('.story').addClass('active');
                        observer.unobserve(elm.target);
                        if (countLoaded < me.storiesTab.length) {
                            me.getStory();
                            //alert('entry');
                        }
                    }
                });
            }
        },
        getStory: function () {
            var me = gazeta_pl.storytelling.lazyload,
                $container = $('#holder_101'),
                loadingInterval = '',
                countLoaded = me.LOADED_STORIES;
            if (me.LOADING === true) {
                //alert(countLoaded);
                $('body').find('.story').addClass('active');

                if (countLoaded < me.storiesTab.length) {
                    me.LOADING = false;
                    $.ajax({
                        url: me.storiesTab[countLoaded][1],
                        type: 'GET',
                        cache: false,
                        success: function (data) {
                            var story = data;

                            var html_out = story;
                            //me.urlChange(me.storiesTab[countLoaded][0]);
                            $container.find('.stories_list > li').eq(countLoaded).append(html_out);
                            me.LOADED_STORIES++;
                            me.LOADING = true;
                            clearInterval(loadingInterval);
                            $container.find('.stories_list > li').eq(countLoaded).find('section:first').attr('id', 'paralax' + parseInt(me.LOADED_STORIES));

                            me.putBans();

                            gazeta_pl.storytelling.sliders.init();
                            gazeta_pl.storytelling.helpers.init();
                        }
                    });
                }
            } else {
                loadingInterval = setInterval(function () {
                    me.getStory();
                }, 1000);
                //setTimeout(function(){ me.getStory(); }, 1000);
            }

        },
        urlChange: function (anchor) {
            anchor.preventDefault;
            location.hash = '#' + anchor;
            //history.pushState("", "", anchor);
            return false;
        },
        putBans: function () {
            var me = gazeta_pl.storytelling.lazyload;
            var timeStamp = new Date().getTime();
            var banns = {
                "default": {
                    "desktop": "<div class=\"content_inner stylePartner\"><div class=\"partnerContent\"><a target=\"_blank\" href=\"https://ad.doubleclick.net/ddm/jump/N8913.564583AGORA.PL/B20325183.205447354;sz=1x1;ord=" + timeStamp + "\"><img src=\"https://bi.gazeta.pl/i/obrazki/storytelling/honda/Honda_Type_R_1170x300_PL/Honda_Type_R_1170x300_PL.jpg\" /></a><img src=\"https://ad.doubleclick.net/ddm/ad/N8913.564583AGORA.PL/B20325183.205447354;sz=1x1;ord=" + timeStamp + ";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?\" width=1 height=1 border=0 style=\"display: none;\"/></div></div>",
                    "mobile": "<div class=\"content_inner stylePartner\"><div class=\"partnerContent\"><a target=\"_blank\" href=\"https://ad.doubleclick.net/ddm/jump/N8913.564583AGORA.PL/B20325183.205447354;sz=1x1;ord=" + timeStamp + "\"><img src=\"https://bi.gazeta.pl/i/obrazki/storytelling/honda/Honda_Type_R_300x250_PL/Honda_Type_R_300x250_PL.jpg\" /></a><img src=\"https://ad.doubleclick.net/ddm/ad/N8913.564583AGORA.PL/B20325183.205447354;sz=1x1;ord=" + timeStamp + ";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?\" width=1 height=1 border=0 style=\"display: none;\"/></div></div>"
                },
                "paralax1": {
                    "desktop": "<div class=\"content_inner stylePartner\"><div class=\"partnerContent\"><a target=\"_blank\" href=\"https://bs.serving-sys.com/serving/adServer.bs?cn=trd&mc=click&pli=22513875&PluID=0&ord=" + timeStamp + "\"><img src=\"https://bi.gazeta.pl/im/4/22360/m22360214,JEEP-COMPASS-AGORA-1170X300-02.jpg\" /></a><img src=\"https://bs.serving-sys.com/serving/adServer.bs?cn=display&c=19&mc=imp&pli=22513875&PluID=0&ord=" + timeStamp + "&rtu=-1\" width=1 height=1 border=0/></div></div>",
                    "mobile": "<div class=\"content_inner stylePartner\"><div class=\"partnerContent\"><a target=\"_blank\" href=\"https://bs.serving-sys.com/serving/adServer.bs?cn=trd&mc=click&pli=22513872&PluID=0&ord=" + timeStamp + "\"><img src=\"https://bi.gazeta.pl/im/7/22360/m22360217,MOBILE-JEEP-COMPASS-AGORA-600X300-02.jpg\" /></a><img src=\"https://bs.serving-sys.com/serving/adServer.bs?cn=display&c=19&mc=imp&pli=22513872&PluID=0&ord=" + timeStamp + "&rtu=-1\" width=1 height=1 border=0/></div></div>"
                },
                "paralax2": {
                    "desktop": "<div class=\"content_inner stylePartner\"><div class=\"partnerContent\"><a target=\"_blank\" href=\"https://bs.serving-sys.com/serving/adServer.bs?cn=trd&mc=click&pli=22513871&PluID=0&ord=" + timeStamp + "\"><img src=\"https://bi.gazeta.pl/im/5/22360/m22360215,JEEP-COMPASS-AGORA-1170X300-03.jpg\" /></a><img src=\"https://bs.serving-sys.com/serving/adServer.bs?cn=display&c=19&mc=imp&pli=22513871&PluID=0&ord=" + timeStamp + "&rtu=-1\" width=1 height=1 border=0 style=\"display: none;\"/></div></div>",
                    "mobile": "<div class=\"content_inner stylePartner\"><div class=\"partnerContent\"><a target=\"_blank\" href=\"https://bs.serving-sys.com/serving/adServer.bs?cn=trd&mc=click&pli=22513867&PluID=0&ord=" + timeStamp + "\"><img src=\"https://bi.gazeta.pl/im/2/22360/m22360212,MOBILE-JEEP-COMPASS-AGORA-600X300-03.jpg\" /></a><img src=\"https://bs.serving-sys.com/serving/adServer.bs?cn=display&c=19&mc=imp&pli=22513867&PluID=0&ord=" + timeStamp + "&rtu=-1\" width=1 height=1 border=0 style=\"display: none;\"/></div></div>"
                }
            };

            var $story = $('.stories_list').find('#paralax' + me.LOADED_STORIES).parent();
            var storyName = 'paralax' + me.LOADED_STORIES;

            if (!$('#paralax' + me.LOADED_STORIES).hasClass('sliderFullEmiter')) {
                /*if(banns[storyName]){
                    $story.append(banns[storyName].desktop);
                } else {
                    $story.append(banns.default.desktop);
                }*/

                if (!$('body').hasClass('responsive')) {

                    if ($('#paralax' + me.LOADED_STORIES).hasClass('bottomSlider')) {
                        //$story.append(banns[storyName].desktop);
                        //$story.append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.bottomSlider').append(banns.default.desktop);
                    } else if ($('#paralax' + me.LOADED_STORIES).hasClass('moto3') || $('#paralax' + me.LOADED_STORIES).hasClass('moto4') || $('#paralax' + me.LOADED_STORIES).hasClass('moto6') || $('#paralax' + me.LOADED_STORIES).hasClass('moto7') || $('#paralax' + me.LOADED_STORIES).hasClass('moto8') || $('#paralax' + me.LOADED_STORIES).hasClass('moto9')) {
                        //$story.append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.moto3').append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.moto4').append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.moto6').append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.moto7').append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.moto8').append(banns.default.desktop);
                        $('#paralax' + me.LOADED_STORIES + '.moto9').append(banns.default.desktop);
                    }
                } else {
                    if ($('#paralax' + me.LOADED_STORIES).hasClass('bottomSlider')) {
                        //$story.append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.bottomSlider').append(banns.default.mobile);
                    } else if ($('#paralax' + me.LOADED_STORIES).hasClass('moto3') || $('#paralax' + me.LOADED_STORIES).hasClass('moto4') || $('#paralax' + me.LOADED_STORIES).hasClass('moto6') || $('#paralax' + me.LOADED_STORIES).hasClass('moto7') || $('#paralax' + me.LOADED_STORIES).hasClass('moto8') || $('#paralax' + me.LOADED_STORIES).hasClass('moto9')) {
                        //$story.append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.moto3').append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.moto4').append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.moto6').append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.moto7').append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.moto8').append(banns.default.mobile);
                        $('#paralax' + me.LOADED_STORIES + '.moto9').append(banns.default.mobile);
                    }
                }


            }


        }
    }
}

/* jshint ignore: end */
