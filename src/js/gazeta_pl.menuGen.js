jQuery.fn.menuGen = function(options) {
    var defaults = {
        body: $(this),
        logo: null,
        logoLink: null,
        share: null,
        json: null,
        opt: 1
    };
    options =  $.extend(defaults, options);
    return this.each(function () {
            var $body = options.body,
                $list = $body.find('.paralax'),
                countElems = $list.length,
                logo = options.logo = typeof options.logo == 'undefined' ? false : options.logo,
                logoLink = options.logoLink = typeof options.logoLink == 'undefined' ? false : options.logoLink,
                share = options.share = typeof options.share == 'undefined' ? false : options.share,
                like = options.like = typeof options.like == 'undefined' ? false : options.like,
                json = options.json = typeof options.json == 'undefined' ? false : options.json,
                opt = options.opt = typeof options.opt == 'undefined' ? 1 : options.opt,
                lazyload = '';
                
        if (opt === '1') {
            $body.prepend('<nav class="js-menuGen mainNav"><ul></ul></nav>');
            var $menu = $body.find('.js-menuGen ul');
            
            if (json) {
                $list.each(function (index) {
                    var item = $(this);
                    if (!item.hasClass('mod_zr_story_3')) {
                        
                        item.attr('id', 'paralax' + parseInt(index + 1));
                        

                    }
                });
                var urlJson = json;
                $.getJSON(urlJson, function (data) {
                    var html_out = "";
                    $.each(data.elems, function (i, elem) {
                        if(elem.alias){
                            lazyload = 1;
                        }

                        html_out += "<li><a data-xxRoot=\""+elem.xxRoot+"\" data-kotwica=\""+elem.kotwica+"\" href=\"" + elem.urlElem + "\"><span>" + elem.name + "</span></a></li>";
                    });
                    
                    $menu.append(html_out);
                    
                    $menu.find('li a').click(function (event) {
                        var href = $(this).attr('href');
                        var xxRoot = $(this).attr('data-xxRoot');
                        var kotwica = $(this).attr('data-kotwica');
                        
                        if(dfpParams.dx === xxRoot){
                            event.preventDefault();
                            if(lazyload==1){

                                if($('.story #'+kotwica).length==0){
                                    var URL = href.split("#");
                                    var buildURL= URL[0]+'#'+kotwica;
                                    window.location.href = buildURL;
                                    location.reload();
                                } else {
                                    /*alert('slow');
                                    //window.location.href = buildURL;
                                    $('html,body').animate({scrollTop: $('#'+kotwica).offset().top}, 500);
                                    $menu.parent().toggleClass('active');*/
                                }
                                
                            }
                        } else {
                            event.preventDefault();
                            //var buildURL = window.location.hostname + window.location.pathname;
                            var URL = href.split("#");
                            var buildURL= URL[0]+'#'+kotwica;
                            window.location.href = buildURL;
                        }

                        $('html,body').animate({scrollTop: $(this.hash).parent().parent().parent().parent().offset().top}, 500);
                        $menu.parent().toggleClass('active');
                    });
                });
            } else {
                $list.each(function (index) {
                    var item = $(this);
                    if (!item.hasClass('mod_zr_story_3')) {
                        var txt = item.find('h2').text();

                        item.attr('id', 'paralax' + parseInt(index + 1));
                        $menu.append('<li><a href="#paralax' + parseInt(index + 1) + '"><span>' + txt + '</span></a></li>');
                    }

                });
            }
        }
        if (opt === '2') {
            $body.prepend('<nav class="js-menuGen mainNav2"><ul></ul></nav>');
            var $menu = $body.find('.js-menuGen ul');
            var htmlHamb = '<svg class="hamb" width="42" height="47" viewBox="0 0 42 47"><line class="l1" fill="none" x1="0" y1="18" x2="42" y2="18" stroke="#fff" stroke-width="6"></line><line class="l2" fill="none" x1="0" y1="30" x2="42" y2="30" stroke="#fff" stroke-width="6"></line><line class="l3" fill="none" x1="0" y1=42 x2="42" y2=42 stroke="#fff" stroke-width="6"></line></svg>';
            var htmlCloseHamb = '<svg class="hamb close" width="42" height="47" viewBox="0 0 42 47"><line class="l1" fill="none" x1="0" y1="0" x2="42" y2="42" stroke="#fff" stroke-width="3"></line><line class="l3" fill="none" x1="0" y1="42" x2="42" y2="0" stroke="#fff" stroke-width="3"></line></svg>';
            $menu.parent().prepend(htmlHamb);
            $menu.parent().prepend(htmlCloseHamb);

            

            if(logo){
                if(logoLink){
                    var htmlLogo = '<a href="'+logoLink+'" target="_blank"><img class="logoNav" src="'+logo+'"/></a>';
                } else {
                    var htmlLogo = '<img class="logoNav" src="'+logo+'"/>';
                }
                
                $menu.parent().append(htmlLogo);
            }
            
            if (json) {
                $list.each(function (index) {
                    var item = $(this);
                    if (!item.hasClass('mod_zr_story_3')) {
                        
                        item.attr('id', 'paralax' + parseInt(index + 1));
                        

                    }
                });
                var urlJson = json;
                $.getJSON(urlJson, function (data) {
                    var html_out = "";
                    $.each(data.elems, function (i, elem) {
                        if(elem.alias){
                            lazyload = 1;
                        }
                        html_out += "<li><div class=\"inner\"><div class=\"imgW\"><a data-xxRoot=\""+elem.xxRoot+"\" data-kotwica=\""+elem.kotwica+"\" href=\"" + elem.urlElem + "\"><img src=\"" + elem.img + "\" /></a></div><a data-xxRoot=\""+elem.xxRoot+"\" data-kotwica=\""+elem.kotwica+"\" href=\"" + elem.urlElem + "\"><span>" + elem.name + "</span></a></div></li>";
                    });
                    
                    $menu.append(html_out);
                    
                    $menu.find('li a').click(function (event) {
                        var href = $(this).attr('href');
                        var xxRoot = $(this).attr('data-xxRoot');
                        var kotwica = $(this).attr('data-kotwica');
                        
                        if(dfpParams.dx === xxRoot){
                            event.preventDefault();
                            if(lazyload==1){

                                if($('.story #'+kotwica).length==0){
                                    var URL = href.split("#");
                                    var buildURL= URL[0]+'#'+kotwica;
                                    window.location.href = buildURL;
                                    location.reload();
                                } else {
                                    /*alert('slow');
                                    //window.location.href = buildURL;
                                    $('html,body').animate({scrollTop: $('#'+kotwica).offset().top}, 500);
                                    $menu.parent().toggleClass('active');*/
                                }
                                
                            }
                        } else {
                            event.preventDefault();
                            //var buildURL = window.location.hostname + window.location.pathname;
                            var URL = href.split("#");
                            var buildURL= URL[0]+'#'+kotwica;
                            window.location.href = buildURL;
                        }

                        $('html,body').animate({scrollTop: $(this.hash).parent().parent().parent().parent().offset().top}, 500);
                        $menu.parent().toggleClass('active');
                    });
                });
                /*$.getJSON(urlJson, {
                    format: "json",
                    cache: false
                }).done(function (data) {
                    var html_out = "";
                    $.each(data.elems, function (i, elem) {
                        html_out += "<li><div class=\"inner\"><div class=\"imgW\"><a href=\"" + elem.urlElem + "\"><img src=\"" + elem.img + "\" /></a></div><a href=\"" + elem.urlElem + "\"><span>" + elem.name + "</span></a></div></li>";
                    });

                    $menu.append(html_out);

                });*/
            } else {
                $list.each(function (index) {
                    var item = $(this);
                    if (item.hasClass('mod_zr_story_1')) {
                        var txt = item.find('.title').text();
                                img = item.find('header').attr('style') || item.find('.header__pic').attr('src'),
                                img = img.split('\''),
                                img2 = img[1];
                        item.attr('id', 'paralax' + parseInt(index + 1));
                        $menu.append('<li><div class="inner"><div class="imgW"><a href="#paralax' + parseInt(index + 1) + '"><img src="' + img[1] + '" /></a></div><a href="#paralax' + parseInt(index + 1) + '"><span>' + txt + '</span></a></div></li>');
                    }

                    else if (!item.hasClass('mod_zr_story_3')) {
                        var txt = item.find('h2').text(),
                                img = item.find('header').attr('style') || item.find('.header__pic').attr('src'),
                                img = img.split('\''),
                                img2 = img[1];
                        item.attr('id', 'paralax' + parseInt(index + 1));
              
                        $menu.append('<li><div class="inner"><div class="imgW"><a href="#paralax' + parseInt(index + 1) + '"><img src="' + img[1] + '" /></a></div><a href="#paralax' + parseInt(index + 1) + '"><span>' + txt + '</span></a></div></li>');
                    }

                });
            }

            if (window.location.hash === '') {
                $('.js-menuGen').addClass('disabled');
            } else {
                $('.js-menuGen').removeClass('disabled');
            }

            $('.js-menuGen .hamb').click(function() {
                $('.js-menuGen').toggleClass('active');
            });

            $('.js-menuGen span').hover(function() {
                $(this).closest('.inner').toggleClass('showTitle');
            });
        }
        $menu.find('li a').click(function (event) {
            // event.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
            $menu.parent().toggleClass('active');
        });
        if (share) {
            var htmlShare = '<div class="fb-share-button" data-href="'+share+'" data-layout="button" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+share+'">Udostepnij</a></div>';
            $menu.parent().append(htmlShare);
        }
        if (like) {
            var htmlLike = '<div class="fb-like" data-href="'+like+'" data-layout="button_count" data-action="like" data-size="large" data-show-faces="true" data-share="false"></div>';
            $menu.parent().append(htmlLike);
        }
    }); 
};