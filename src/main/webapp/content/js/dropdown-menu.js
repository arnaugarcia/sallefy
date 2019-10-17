(function($, undefined) {
    openMenu = '';
    adonisPopup = function(options) {
        var settings = $.extend({
            // These are the defaults.
            menu: {},
            parent: '.has-drop',
            selector: '',
            direction: 'left',
            width: 206,
            dropdownContainer: "body",
        }, options );

        var el = this;
        var dropdownOpen = false;
        var style,position,html='',elTarget,htmlCont,oldTarget;
        var _container = '#adonis-popup-menu';

        if(settings.menu.length > 0){
            html += '<ul class="list-unstyled">';
            settings.menu.forEach(function(element) {
                var Class = element.class ? ' '+element.class: '';
                if(typeof element.submenu != 'undefined'){
                    html += '<li class="has-dropdown"><a class="dropdown-item'+Class+'" href="#">'+element.text+'</a>';
                    html += '<ul class="dropdown-menu">';
                    element.submenu.forEach(function(element){
                        html += '<li><a class="dropdown-item'+Class+'" href="#">'+element.text+'</a>';
                    });
                    html += '</ul>';
                }else{
                    html += '<li><a class="dropdown-item'+Class+'" href="#">'+element.text+'</a>';
                }
                html += '</li>';
            });
            html += '</ul>';
        }

        var e = null;


        $(document).on('click',settings.selector,function(event){
            e = event;

            settings.direction = typeof $(this).attr('data-direction') != 'undefined' ? $(this).attr('data-direction') : 'left';
            clickEvent($(this));
        });

        function clickEvent(el){
            e.preventDefault();
            elTarget = el;
            position = elTarget.offset();
            var Left = _left(settings.direction);
            var Top = _top();
            var _class = '';
            if(Math.floor($(settings.dropdownContainer).width() - (Left + settings.width*2)) < 0){
                _class += ' dropdown-reverse';
            }
            style = 'top:'+(Top)+'px;Left:'+Left+'px;width:'+settings.width+'px';
            htmlCont = '<div id="adonis-popup-menu" style="'+style+'" class="dropdown-show dropdown-menu dropdown-menu-right'+_class+'">'+html+'</div>';

            if(!elTarget.hasClass('dropdown-show')){
                add();
            }
        }

        function _left(direction){
            position = elTarget.offset();
            var Left;

            if(direction === 'left'){
                Left = Math.round(position.left - settings.width + elTarget.outerWidth());
                if(Left < 0){
                    Left = _left('right')
                }
            }else{
                Left = Math.round(position.left);
                if(Left+settings.width > $(window).innerWidth()){
                    Left = _left('left')
                }
            }
            return Left
        }

        function _top(){
            position = elTarget.offset();
            var Height = settings.menu.length * 30 + 30,
                top = Height + position.top + elTarget.height()  > $(document).outerHeight() ? position.top - (Height + elTarget.height()) : position.top + elTarget.outerHeight() ;
            return Math.round(top);
        }

        function outside(e){
            var target = e.target;
            elTarget = $('.dropdown-show.adonisToggle');
            if(jQuery(target).hasClass('dropdown-menu-toggle') === false && jQuery(e.target).parents('.dropdown-menu-toggle').length < 1){
                if (!jQuery(target).is(_container) && typeof elTarget !== 'undefined' && !jQuery(target).is(elTarget.find('*')) ) {
                    remove();
                    jQuery( document ).off( "click",'body', outside );
                }
            }
        }
        adonisPopup.outside = outside;

        function add(){
            if(remove() == true){
                openMenu = elTarget;
                elTarget.addClass('dropdown-show adonisToggle').parents(settings.parent).addClass('dropdown-show');
                jQuery(htmlCont).appendTo(settings.dropdownContainer);
            }
            jQuery(document).on('click','body', outside);
        }

        function remove(){
            elTarget.removeClass('dropdown-show').parents('.dropdown-show:first').removeClass('dropdown-show');
            jQuery(_container).remove();
            jQuery('.adonisToggle').removeClass('dropdown-show adonisToggle').parents(settings.parent).removeClass('dropdown-show');
            openMenu = '';
            return true;
        }
    }
})(jQuery);




jQuery(document).ready(function($){

    $('.nav-item').on('show.bs.dropdown', function (e) {
       adonisPopup.outside(e);
    });
    // dropdown menu any where
    var albumMenu = [
        {
            text: 'Add to Playlist',
        },
        {
            text: 'Add to Next Up',
        },
        {
            text: 'Save to Your Library',
        },
        {
            text: 'Love',
        },
        {
            text: 'Share Album',
        },
    ];


    new adonisPopup({
        selector: '.dropdown-menu-toggle',
        menu: albumMenu,
        parent: '.music-img-box',
    });



    var playlistTrackMenu = [{
        text: '<i class="icon-heart"></i> Like',
    },{
        text: '<i class="icon-share-2"></i> Share',
    },{
        class: 'remove-track-item-playlist',
        text: '<i class="icon-x"></i> Remove',
    },{
        text: '<i class="icon-list2"></i> Add to playlist',
    }];

    new adonisPopup({
        selector: '.track-menu-playlist',
        menu: playlistTrackMenu,
        parent: '.song-poster',
    });


    var trackMenuCurrent = [{
        text: '<i class="icon-heart"></i> Like',
    },{
        text: '<i class="icon-share-2"></i> Share',
    },{
        class: 'remove-track-item-current',
        text: '<i class="icon-x"></i> Remove',
    },{
        text: 'Add to playlist',
    }];

    new adonisPopup({
        selector: '.current-track-menu',
        menu: trackMenuCurrent,
        parent: '.song-poster',
    });

});
