var adonisObj = {};

jQuery(document).ready(function($){
  "use strict";

  /**
   * Site preloader
   */
  adonisObj.InlinePreloaderHtml = '<div class="inline-preloader"><div class="adonis-rotate adonis-sm dark"><div><div></div></div></div></div>'


  // viewport animation
  adonisObj.viewportAnimate = function(_el){
    _el.each(function(){
      var _el = $(this),
          _container = _el.parents('.scroll-y').length > 0 ? _el.parents('.scroll-y:first') : $(document),
          _offset = typeof $(this).attr('data-offset') === 'undefined' ? '100%' : $(this).attr('data-offset');

      _el.css('opacity','0');
      _el.viewPort({
        offset: _offset,
        container: _container,
        callback : function(data){
          adonisObj.effect(_el);
        }
      });
    });
  }

  /**
   * animate element using anime.js
   * eg. div class="adonis-animate" data-animation-item=".item" data-animation="zoomIn"
   * @param _selector
   */
  adonisObj.effect = function(_selector){
    function animate(_el){
      _el.css('opacity','0');
      _el.imagesLoaded(function(){
        setTimeout(function(){
          _el.css('opacity','1');
        },150);

        var _itemSelector = _el.attr('data-animation-item'),
            _animation = _el.attr('data-animation');
        var Targets = [];

        _el.find(_itemSelector).each(function(){
          Targets.push($(this)[0]);

          if( adonisGridEffects.effects[_animation].perspective != undefined ) {
            Targets.forEach(function(item) {
              item.parentNode.style.WebkitPerspective = item.parentNode.style.perspective = adonisGridEffects.effects[_animation].perspective + 'px';
            });
          }
          if( adonisGridEffects.effects[_animation].origin != undefined ) {
            Targets.forEach(function(item) {
              item.style.WebkitTransformOrigin = item.style.transformOrigin = adonisGridEffects.effects[_animation].origin;
            });
          }
        });

        var _animeSettings = adonisGridEffects.effects[_animation],
            _animeOptions = typeof _animeSettings !== 'undefined' ? _animeSettings.animeOpts : adonisGridEffects.effects['slideUp'],
            _target = {targets: Targets};

        _animeSettings = Object.assign(_animeOptions,_target);
        var Anime = anime(_animeSettings);
      });
    }

    $(_selector).each(function(){
      var _el = $(this);
      animate(_el);
    });
  }

  adonisObj.animate = function(_el,_animation){
    var _animeSettings = Object.assign(adonisGridEffects.effects[_animation].animeOpts,_el);
    var Anime = anime(_animeSettings);
  }


  /**
   * section preloader
   */
  adonisObj.preloaderPlayHtml = '<span class="shadow"></span><div class="icons"><span class="animate-loading"><span class="adonis-icon icon-5x"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><use xlink:href="#icon-brand-play-gradient"></use></svg></span></span><span class="adonis-icon icon-5x"><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><use xlink:href="#icon-brand-play"></use></svg></span></div>';

  adonisObj.rotatorPreloaderHtml = '<div class="preloader preloader-static spinner-holder d-flex justify-content-center"><div class="adonis-rotate dark adonis-x"><div><div></div></div></div></div>';
  /**
   * function to append preloader inside a div or section
   * @param el
   */
  adonisObj.addPlayPreloader = function(el){
    el.css('position','relative');
    $('.section-loader').html('<div class="preloader-overlay"></div><div class="loader-icon"><div class="tab-loader">'+adonisObj.preloaderPlayHtml+'</div></div>');
    $('.section-loader:first').fadeIn('fast',function(){
      el.css('position','');
    });
  }

  adonisObj.addSectionPreloader = function(el){
    el.css('position','relative').append('<div class="preloader section-loader text-center"><div class="preloader-overlay"></div><div class="d-inline-block"> '+adonisObj.preloaderPlayHtml+'</div></div>');
    el.find('.preloader:first').fadeIn('fast');
  }

  adonisObj.removeSectionPreloader = function(el){
    el.siblings().css('position','');
    el.fadeOut('fast',function(){
      el.find('.loader-icon').remove();
    });
  }

  /**
   * Function to add inline preloader
   * @param _el
   */
  adonisObj.addInlinePreloader = function(_el){
    _el.append(adonisObj.InlinePreloaderHtml);
  }

  /**
   * Function to remove inline preloader
   * @param _el
   */
  adonisObj.removeInlinePreloader = function(_el){
    _el.find('.inline-preloader').remove();
  }

  /**
   * Function to parse attributes
   * @param $value
   * @param $default
   * @returns {*}
   */
  adonisObj.parse_attributes = function ( $value, $default ) {
    if( typeof $default == 'undefined') {$default = [];}
    if (typeof $value == 'undefined') return ;
    var $result = $default;
    var $params_pairs = $value.split( '|' );
    if ( $params_pairs ) {
      $params_pairs.forEach ( function(element) {
        var $param = element.split( ':' );
        if (  $param[0]  && $param[1] ) {
          $result[ $param[0] ] = $param[1];
        }
      });
    }
    return $result;
  }

  /**
   * load content to targeted folder via ajax
   * @param This
   * @returns {boolean}
   * @constructor
   */
  adonisObj.LoadAjaxURL = function (This){
    var ContentURL = This.attr('data-content'),
        ajaxResponse;
    if(!ContentURL) return;
    ajaxResponse = $.ajax({
      url: ContentURL,
      context: document.body,
      async: false
    }).done(function(response) {
      // do something
    }).fail(function(jqXHR, textStatus){
      return false;
    });
    return ajaxResponse;
  }


  /**
   * owl carousel
   * @param $this
   */
  adonisObj.carousel = function(_el){
    var _items = typeof _el.attr('data-items') !== 'undefined' ? parseInt(_el.attr('data-items')) : 4,
        _dots = typeof _el.attr('data-dots') !== 'undefined' && _el.attr('data-dots') == 'yes' ? true : false,
        _responsiveItems = typeof _el.attr('data-items-responsive') != 'undefined' ? _el.attr('data-items-responsive') : '',
        $autoWidth = typeof _el.attr('data-auto-width') !== 'undefined' && _el.attr('data-auto-width') == 'yes' ? true : false,
        $slideBy = typeof _el.attr('data-slideby') == 'undefined' ? 'page' : _el.attr('data-slideby') ,
        $loop = typeof _el.attr('data-loop') !== 'undefined' && _el.attr('data-loop') == 'yes' ? true : false,
        $nav = typeof _el.attr('data-nav') !== 'undefined' && _el.attr('data-nav') == 'yes' ? true : false,
        $navTextPrev = _el.find('.data-prev').length > 0 ? _el.find('.data-prev').html() : 'Prev',
        $navTextNext = _el.find('.data-next').length > 0 ? _el.find('.data-next').html() : 'Next',
        $mousewheel = typeof _el.attr('data-mousewheel') !== 'undefined' && _el.attr('data-mousewheel') == 'yes' ? true : false,
        $autoheight = typeof _el.attr('data-auto-height') !== 'undefined' && _el.attr('data-auto-height') == 'yes' ? true : false,
        $center = typeof _el.attr('data-center') !== 'undefined' && _el.attr('data-center') == 'yes' ? true : false,
        $lazyLoad = typeof _el.attr('data-lazy') !== 'undefined' && _el.attr('data-lazy') == 'no' ? false : true,
        $stagePadding = typeof _el.attr('data-stagePadding') !== 'undefined' ? parseInt(_el.attr('data-stagePadding')) : 0;

    var responsiveItemArr = adonisObj.parse_attributes( _responsiveItems), responsiveObj = {};

    var responsiveObj = {};
    if(responsiveItemArr && responsiveItemArr.length > 0){
      responsiveItemArr.forEach(function(index,val){
        var obj = [];
        responsiveObj[val] = {items: parseInt(index) };
      });
    }

    _el.imagesLoaded(function(){
      if($autoWidth == true){
        _autoWidth();
        setTimeout(function(){
          _autoWidth();
        },1000);
      }
      _init();
    });


    $(window).resize(function(){
      setTimeout(function(){
        if($autoWidth == true){
          _autoWidth();
        }
        _init();
      },500);
    });
    var owl = _el.find('.owl-carousel');
    function _init(){

      if($autoheight && $autoWidth){
        owl.on('translated.owl.carousel', function (event) {
          var _activeItems = owl.find('.owl-item.active');
          var _autoHeight = [];
          _activeItems.each(function(){
            _autoHeight.push($(this).height());
          });
          var max = _autoHeight.reduce(function(a, b) {
            return Math.max(a, b);
          });
          if(max)owl.find('.owl-height').animate({maxHeight: max+'px'});
        })
      }
      owl.owlCarousel({
        items : _items,
        loop: $loop,
        margin: 0,
        nav: $nav,
        dots : _dots,
        responsive : responsiveObj,
        autoWidth : $autoWidth,
        slideBy : $slideBy, // page or numbers
        autoHeight : $autoheight,
        navText: [$navTextPrev,$navTextNext],
        center: $center,
        lazyLoad: $lazyLoad,
        onInitialized : owlonInitialized // initiated,
      });

      if(_el.hasClass('auto-fit-columns')){ // give time auto fit column to work first
        setTimeout(function(){
              owl.trigger('refresh.owl.carousel');
            },
            1000);
      }

      $(window).resize(function(){
        setTimeout(function(){
          owl.trigger('refresh.owl.carousel');
        },1000);
      });

      owl.find('.owl-stage').css('padding-left',$stagePadding).css('padding-right',$stagePadding);


      // mouse wheel
      if($mousewheel === true){
        owl.on('mousewheel', '.owl-stage', function (e) {
          if (e.originalEvent.wheelDelta > 0) {
            owl.trigger('prev.owl');
          } else {
            owl.trigger('next.owl');
          }
          e.preventDefault();
        });
      }


      function owlonInitialized(e){

        if($lazyLoad){
          owl.find('.adonis-lazy').parents('.item').addClass('adonis-lazy-item');
          setTimeout(function(){
            var _el = owl.find('.owl-item.active');
            lazy(_el);
          },500);
        }
        autoHieghtOverride(e);
      }

      // Lazy Load
      if($lazyLoad){
        owl.on('changed.owl.carousel', function(e) {
          setTimeout(function(){
            var _el = owl.find('.owl-item.active');
            lazy(_el);
          },50);
        });
      }

      function lazy(_el){
        _el.each(function(){
          var _img =  $(this).find('.adonis-lazy');
          _img.each(function(){
            var _src = typeof $(this).attr('data-src') !== 'undefined' && typeof $(this).attr('src') === 'undefined' ? $(this).attr('data-src') : '';

            if(_src){
              $(this).attr('src',_src);
              var _item = _img.parents('.item');
              _item.append(adonisObj.preloaderPlayHtml);
              _item.imagesLoaded(function(){
                _item.find('.preloader').fadeOut('slow');
                _item.removeClass('adonis-lazy-item');
              });
            }
          });

        });
      }

      function midddleNav(){
        //
      }


      /* override auto height function */
      function autoHieghtOverride(e){
        if($autoheight && $autoheight == true && $autoWidth == true){
          owl.imagesLoaded(function() {
            var maxHeight = 0;
            setTimeout(function(){
              owl.find('.owl-item.active').each(function(){
                maxHeight = $(this).outerHeight() > maxHeight ? $(this).outerHeight() : maxHeight;
              });
              owl.find('.owl-height').css('max-height',maxHeight+'px');
            },500);
          });
        }
      }
    }

    function _autoWidth(){
      var responsiveWidthParent = typeof _el.attr('data-responsive-width') !== 'undefined' ? adonisObj.parse_attributes(_el.attr('data-responsive-width')) : false ;
      if(responsiveWidthParent){
        var width = adonisObj.columnWidth(responsiveWidthParent,_el.children());

        if(typeof width !== 'undefined'){
          _el.find('.item').css('width',width);
        }
      }else{
        if($autoWidth === true){
          _el.find('.item').each(function(){
            /* eg. 1000:200|1600:300 */
            var responsiveWidth = typeof $(this).attr('data-responsive-width') !== 'undefined' ? adonisObj.parse_attributes($(this).attr('data-responsive-width')) : false ;
            var width = adonisObj.columnWidth(responsiveWidth,_el.children());
            if(typeof width !== 'undefined'){
              $(this).css('width',adonisObj.columnWidth(responsiveWidth,_el.children()));
            }
          });
        }
      }
      // trigger refresh
      owl.trigger('refresh.owl.carousel');
    }
  }

  /**
   * Function to extract column width from parent attribute
   * @param responsiveWidth. Parameter to pass responsive width string. Format data-responsive-width="0:300px|400:350px"
   * @param $this . element of the parent to calculate it's width
   * @returns {*}
   */
  adonisObj.columnWidth = function (responsiveWidth,_el){
    var _return;

    if(responsiveWidth){
      var width;
      responsiveWidth.forEach(function(element,value){
        if(_el.width() > parseInt(value) ){
          width = element;
        }
      });
    }else{
      var width = typeof $(this).data('width') != 'undefined' && parseInt($(this).data('width')) > _el.width() ? _el.width() : $(this).data('width');
    }
    if(width){
      if( typeof width !== 'number' && width.indexOf('%') > 0){
        var percentWidth = parseFloat(width.substr(0,width.length -1));
        var width = _el.width()*(percentWidth/100);
      }
      if($.isNumeric(width)){
        _return = width+'px';
      }else{
        _return = width;
      }
      return _return;
    }
  }



  /**
   * show or hide off canvas
   * @param target html element that need to toogle
   * @returns show or hide
   */
  adonisObj.toggleOffCanvas = function (target){
    var _return = $(target).hasClass('show') ? 'hide' : 'show';
    if(_return == 'show'){
      $(target).addClass('show');
      $('body').addClass('off-canvas-overlay-on');
    }else{
      $(target).removeClass('show');
      $('body').removeClass('off-canvas-overlay-on');
    }
    $('.off-canvas-overlay').attr('data-target') == '' || typeof  $('.off-canvas-overlay').attr('data-target') == 'undefined' ? $('.off-canvas-overlay').attr('data-target',target) : $('.off-canvas-overlay').removeAttr('data-target');
    return _return;
  }

  /**
   * hide off canvas
   * @param target html element that need to toogle
   * @returns show or hide
   */
  adonisObj.hideOffCanvas = function (target){
    $('#primary-menu-offcanvas').removeClass('show');
    $('.off-canvas-overlay').removeAttr('data-target');
    $('body').removeClass('off-canvas-overlay-on');
  }

  /**
   * Animation for full screen menu
   * @param toggle
   * @param _target
   */
  adonisObj.menuAnime = function (toggle,_target){
    toggle = typeof toggle == 'undefined' ? 'hide' : toggle;
    var _el = $(_target);
    if(toggle == 'show'){
      adonisObj.effect(_el);
    }
  }


  /**
   * function to create column width automatically
   * class="auto-column" data-responsive-width="0:200px|500:400px"
   */
  adonisObj.autoColumn = function(el){
    el.each(function(){
      _autocolumn($(this));

      $(window).resize(function(){
        setTimeout(_autocolumn(el),1000);
      });
    });

    function _autocolumn(el){
      var _el = $(el),
          _items = typeof _el.attr('data-auto-columns-items') == 'undefined' ?  _el.children() : _el.find(_el.attr('data-auto-columns-items'));
      _el.imagesLoaded(function(){
        setTimeout(function(){
          var _responsiveWidth = typeof _el.attr('data-responsive-width') !== 'undefined' ? adonisObj.parse_attributes(_el.attr('data-responsive-width')) : false ;
          var _width = adonisObj.columnWidth(_responsiveWidth,_el);
          _items.css('width',_width);
        },300);
      });
      return true;
    }
  }

  /**
   * Make fit columns
   * @param _el
   * @example class="auto-fit-columns" data-item-width="230" data-item-max-width="250"(optional) data-auto-fit-items=".item"(optional)  data-item-parent=".row"(optional)
   */
  adonisObj.autoFitColumn = function(_el){
    _el.each(function(){
      autoFit($(this));
      var _this = $(this);
      $(window).resize(function(){
        setTimeout(autoFit(_this),1000);
      });
    });

    function autoFit(_el){
      var _fitItems = typeof _el.attr('data-auto-fit-items') !== 'undefined' ? _el.find(_el.attr('data-auto-fit-items')) : _el.children();
      var _width = typeof _el.attr('data-item-width') !== 'undefined' ? parseInt(_el.attr('data-item-width')) : null ;
      var _parent = typeof _el.attr('data-auto-fit-item-parent') !== 'undefined' ? $(_el).find($(_el.attr('data-auto-fit-item-parent'))) : _fitItems.parent();

      if(_width == null) return;

      var _maxwidth = typeof _el.attr('data-item-max-width') !== 'undefined' ? parseInt(_el.attr('data-item-max-width')) : null ;

      setTimeout(function(){
        var _numItems = _maxwidth !== null && (_parent.width() / Math.floor(_parent.width()/_width) > _maxwidth) ? Math.floor(_parent.width()/_width) + 1 : Math.floor(_parent.width()/_width),
            _finalWidth =   _parent.width() / _numItems;

        _fitItems.each(function(){
          $(this).css('width',_finalWidth + 'px');
        });
      },300);
    }
  }


  /**
   * give a row columns class.
   * example usage <div class="row" data-item-width="200" data-item-max-width="300"
   * @param _el
   * @param _selector
   */
  adonisObj.autoColumnsRow = function(_el){
    _el.each(function(){
      columnClass($(this));
      var _this = $(this);
      $(window).resize(function(){
        setTimeout(function(){
          columnClass(_this);
        },1000);

      });
    });
    function columnClass(_el){
      var _width = typeof _el.attr('data-item-width') !== 'undefined' ? parseInt(_el.attr('data-item-width')) : null ;
      var _parent = _el;
      if(!_parent.is(':visible'))_parent = _parent.parent();
      if(!_parent.is(':visible'))_parent = _parent.parent();
      if(!_parent.is(':visible'))_parent = _parent.parent();
      if(_width == null) return;

      var _maxwidth = typeof _el.attr('data-item-max-width') !== 'undefined' ? parseInt(_el.attr('data-item-max-width')) : null ;

      var _numItems = _maxwidth !== null && (_parent.width() / Math.floor(_parent.width()/_width) > _maxwidth) ? Math.floor(_parent.width()/_width) + 1 : Math.floor(_parent.width()/_width);
      var currClass =  _el.attr('class').match(/columns-[^\s]+/);
      if(currClass !== null && typeof currClass[0]!== 'undefined'){
        _el.removeClass(currClass[0]);
      }

      _el.addClass('columns-'+_numItems);
    }
  }


  /**
   * Touch handler for player
   * @param event
   */
  adonisObj.touchHandler = function (event)
  {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)
    {
      case "touchstart": type = "mousedown"; break;
      case "touchmove":  type="mousemove"; break;
      case "touchend":   type="mouseup"; break;
      default: return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }

  adonisObj.touchInit = function (_class)
  {
    var el = document.getElementsByClassName(_class);
    Array.prototype.forEach.call(el, function(_index) {
      _index.addEventListener("touchstart", adonisObj.touchHandler, true);
      _index.addEventListener("touchmove", adonisObj.touchHandler, true);
      _index.addEventListener("touchend", adonisObj.touchHandler, true);
      _index.addEventListener("touchcancel", adonisObj.touchHandler, true);
    });
  }

  /**
   * Multi level menu for full screen or mobile off canvas menu
   * @param selector
   */
  adonisObj.multiLevelSideMenu = function(selector){
    var $this = $(selector);
    $this.attr('data-class', $this.attr('class'));

    $(document).on('click',selector+' .has-dropdown > a',function(e){
      $this = $(this).parents(selector);
      var _class = $this.attr('class');
      var _level = _class.match(/active-level-./);

      if(_level !== null) {
        $this.removeClass(_level[0]);
      }
      $this.addClass('active-level-'+$(this).data('level'));

      $(this).parent().addClass('open');
      $(this).parent().siblings('open').removeClass('open');
      e.preventDefault();
    });


    $(document).on('click',selector+' .go-back',function(e){
      e.preventDefault();
      $this = $(this).parents(selector);
      var _class = $this.attr('class');
      var _level = _class.match(/active-level-./);

      if(_level !== null) {
        $this.removeClass(_level[0]);
      }

      $this.addClass('active-level-'+$(this).data('level'));

      var _parent =  $(this).parents('.has-dropdown.open');

      setTimeout(function(){
        _parent.removeClass('open');
      },500);
    });
  }


  /**
   * Close notification function for header
   * @param selector
   */
  adonisObj.closeNotificatoin = function(selector){
    $(selector).click(function(){
      var thisNotification = $(this).parents('.notification:first');
      if( thisNotification.siblings('.notification').length < 1){
        thisNotification.remove();
        return true;
      }else{
        thisNotification.remove();
        return false;
      }
    });
  }

  adonisObj.search = function(_style){

    switch (_style){
      case 'style3':
        if( $('.search-box-3').length > 0 && $('#btn-search').length > 0 ) {
          style3('.main-wrap','btn-search','btn-search-close','.search-box-3','.search__input');
        }
        break;

      case 'style4':
        if( $('#search-box-4').length > 0 && $('#btn-search-4').length > 0 ) {
          style4();
        }
        break;

      case 'absolute':
        if( $('.search-style-absolute').length > 0 ){
          styleAbsolute('.search-style-absolute')
        }
        break;
    }

    function styleAbsolute(_selector){
      var _el = $(_selector);
      $(document).on('click',_selector + ' .search-icon' ,function(){
        if(_el.hasClass('active')){
          _el.removeClass('active');
        }else{
          _el.addClass('active');
          _el.find('.form-control').focus();
        }
      });
      _el.find('.form-control').focusin(function(){
        _el.addClass('active');
      });
      _el.find('.form-control').focusout(function(){
        _el.removeClass('active');
      });

    }

    function style3(_mainContainer,_openCtrl,_closeCtrl,_searchContainer,_inputSearch){
      var mainContainer = document.querySelector(_mainContainer),
          openCtrl = document.getElementById(_openCtrl),
          closeCtrl = document.getElementById(_closeCtrl),
          searchContainer = document.querySelector(_searchContainer),
          body = document.querySelector('body'),
          inputSearch = searchContainer.querySelector(_inputSearch);


      function initEvents() {
        $(document).on('click','#' + _openCtrl, openSearch);
        $(document).on('click','#' + _closeCtrl, closeSearch);
        document.addEventListener('keyup', function(ev) {
          // escape key.
          if( ev.keyCode == 27 ) {
            closeSearch();
          }
        });
      }

      function openSearch() {
        body.classList.add('search-open-body');
        mainContainer.classList.add('main-wrap--move');
        mainContainer.classList.add('max-height');
        searchContainer.classList.add('search--open');
        inputSearch.focus();
      }

      function closeSearch() {
        mainContainer.classList.remove('main-wrap--move');
        searchContainer.classList.remove('search--open');
        inputSearch.blur();
        inputSearch.value = '';
        setTimeout(function(){
          body.classList.remove('search-open-body');
          mainContainer.classList.remove('max-height');
        },300);
      }
      initEvents();
    }

    function style4(){
      function initEvents(){
        $(document).on('click','#btn-search-4', openSearch);
        $(document).on('click','#btn-search-close', closeSearch);
        document.addEventListener('keyup', function(ev) {
          // escape key.
          if( ev.keyCode == 27 ) {
            closeSearch();
          }

          if($("#search-box-4 .search-input").val() == ''){
            closeResult();
          }else{
            openResult();
          }
        });
      }

      function openSearch(e){
        e.preventDefault();
        $("#wrap").addClass('search-open');
        $("#search-box-4").addClass('search-active');
        $("#search-box-4 .search-input").focus();

        var _placeholder = $("#search-box-4 .search-input").attr('placeholder'),
            _placeholderChars = _placeholder.split('');
        var _ps = 0, _place = '';

        $("#search-box-4 .search-input").attr('placeholder','');

        setTimeout(function(){
          for (var i = 0; i < _placeholder.length; i++) {
            setTimeout(function(){
              _place += _placeholderChars[_ps];
              $("#search-box-4 .search-input").attr('placeholder',_place);
              _ps ++;
            },i*80);
          }
        },200);
      }

      function openResult(){
        $("#search-box-4 .search-inner-down").addClass('open');
      }
      function closeResult(){
        $("#search-box-4 .search-inner-down").removeClass('open');
      }

      function closeSearch(e){
        e.preventDefault();
        $("#wrap").removeClass('search-open');
        $("#search-box-4").removeClass('search-active');
        // $("#search-box-4 .search-inner-down").removeClass('open');
      }
      initEvents();
    }
  }


  // scroll
  adonisObj.scroll = function(_el){
    _el.find('.scroll-x').each(function(){
      new PerfectScrollbar($(this)[0],{
        useBothWheelAxes : 'horizontal'
      });
    });

    _el.find('.scroll-y').each(function(){
      new PerfectScrollbar($(this)[0],{
        //  useBothWheelAxes : 'vertical'
      });
    });

    _el.find('.scroll-x-alt').each(function(){
      new PerfectScrollbar($(this)[0],{
        // useBothWheelAxes : 'horizontal'
      });
    });
  }

  var timerXScroll,
      wheelNum = 0,
      animateEl,
      _scrollingX = false;

  adonisObj.scrollAnimate = function (_scroll){
    timerXScroll = setTimeout(function(){
      _scrollLeft();
    },70);

    function _scrollLeft(){
      _scrollingX = true;
      var _remaining = (animateEl[0].scrollWidth - (animateEl[0].scrollLeft + animateEl.width()) + 50),
          _scrollLeft = _remaining + _scroll < 0 ? _remaining*-1 : _scroll;

      var _speed = Math.floor((Math.abs(_scrollLeft)*2) - (Math.abs(_scrollLeft)* (Math.abs(_scrollLeft)/1200)));


      animateEl.animate({scrollLeft: "-="+_scrollLeft},_speed,'swing',function(){
        wheelNum -= _scroll;
        _scrollingX = false;
        if(wheelNum !== 0 ){
          adonisObj.scrollAnimate(wheelNum);
        }
      });
    }
  }

  adonisObj.viewportAjax = function(_el,_selector){
    _el.find(_selector).each(function(){
      var _el = $(this);
      _el.css('min-height','125px');

      _el.viewPort({
        offset: '100%',
        callback : function(data){

          _el.css('position','relative').append('<div class="preloader section-loader text-center"><div class="preloader-overlay"></div><div class="d-inline-block"> '+adonisObj.preloaderPlayHtml+'</div></div>');
          _el.find('.preloader:first').fadeIn('fast',function(){
            _el.removeClass(_selector);
            var ContentURL = _el.attr('data-content'),
                ajaxResponse;
            if(!ContentURL) return;

            $.ajax({
              url: ContentURL,
              context: document.body,
              async: false
            }).done(function(response) {
              _el.append(response); // insert new content
              _el.imagesLoaded(function(){
                adonisObj.afterAjaxContent(_el);
                setTimeout(function(){
                  _el.find('.preloader').fadeOut('slow',function(){
                    _el.find('.preloader').remove();
                  });
                },200);

              });
            }).fail(function(jqXHR, textStatus){
              return false;
            });
          });

        }
      });
    });
  }

  /**
   * prevent normal page load and uses ajax instead
   */
  adonisObj.ajaxify = function(){
    var _footerID = 'site-footer',
        _contentID = 'site-content-inner',
        _headerID = 'site-header';

    // give external links an class
    urlExternal($('body'));

    // push html5 history api and prevent reload
    $(document).on("click", "a:not(.external):not(.no-history)", function(e) {
      var _url = typeof $(e.target).attr('href') !== 'undefined' ?  $(e.target).attr('href') : null ;
      if(_url == null && typeof $(this).attr('href') !== 'undefined'){
        _url = $(this).attr('href');
      }

      if (filterlinks(_url) === true) {

        // close parent off canvas
        if($(this).parents('.off-canvas').length > 0){
          var _offcanvas = $(this).parents('.off-canvas'),
              _offcanvasClose = typeof _offcanvas.attr('data-close-offcanvas-below') !== 'undefined' ? _offcanvas.attr('data-close-offcanvas-below') : '';
          if($(window).outerWidth() < parseInt(_offcanvasClose)){
            adonisObj.toggleOffCanvas(_offcanvas);
          }
        }

        e.preventDefault();
        // hide off canvas if active
        adonisObj.hideOffCanvas();

        // push history state with no content
        History.pushState('', '', _url);
      }
    });

    // url change event. triggered when url changes either by click on link or back button
    window.onstatechange = function(){
      var _state = History.getState();
      var _parent = $('#'+_contentID).parent();
      $('#'+_contentID).css('min-height',$('#'+_contentID).height()+'px');
      if($('.section-loader').length < 1){
        _parent.append('<div class="section-loader preloader"><div class="preloader-overlay"></div></div>');
      }
      _parent.addClass('site-content-loading');
      $('.section-loader').append('<div class="loader-icon top-50-vh">'+adonisObj.preloaderPlayHtml+'</div>');
      $('.section-loader:first').fadeIn('fast',function(){
        ajaxLoading(_state.url);
      });
    }

    function filterlinks(_url){
      if(_url == null)return false;
      if(_url.substr(0,1) == '#')return false;
      if(_url.length >= 10 && _url.substr(0,10).toLowerCase() == 'javascript') return false;
      if(_url.length < 1) return false;
      return true;
    }
    /**
     * function to give external url a class
     * @param _el
     */
    function urlExternal(_el){
      _el.find('a').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
      }).addClass("external");
    }

    /**
     * Main ajax loading
     * @param _url
     */
    function ajaxLoading(_url){
      $.ajax({
        url: _url,
        context: document.body,
      }).done(function(response) {

        var _newContent = $('<div>' + response + '</div>');

        // change title
        changetitle(_newContent);

        // give external links an class
        urlExternal(_newContent);

        // replace header
        _replaceHeader(_newContent);

        // replace content
        _replaceContent(_newContent);

        // replace footer
        _replaceFooter(_newContent);

      }).fail(function(jqXHR, textStatus){
        console.log('Something went wrong. Please try again');
        $('.site-preloader').fadeOut('fast');
        return false;
      });
    }

    function changetitle(_newContent){
      $('head title').html(_newContent.find('title').html());
    }

    /**
     * replace header
     * @param _newContent
     * @private
     */
    function _replaceHeader(_newContent){
      var _el = $('#'+_headerID);
      _el.html(_newContent.find('#'+_headerID).html());
      adonisObj.afterAjaxContent(_el);
    }

    /**
     * replace content
     * @param _newContent
     * @private
     */
    function _replaceContent(_newContent){
      var _el = $('#'+_contentID);
      _el.html(_newContent.find('#'+_contentID).html());
      _el.imagesLoaded(function(){
        adonisObj.afterAjaxContent(_el);
        // scroll to top
        $('html, body').animate({scrollTop:0}, 'fast');
        $('.scroll-y').animate({scrollTop:0}, 'fast');

        setTimeout(function(){
          var _preloader = $('.section-loader');
          _el.parent().removeClass('site-content-loading');
          _preloader.fadeOut('slow',function(){
            $('#'+_contentID).css('min-height','');
          });
        },200);
      });
    }

    /**
     * replace Footer
     * @param _newContent
     * @private
     */
    function _replaceFooter(_newContent){
      var _el = $('#'+_footerID);
      _el.html(_newContent.find('#'+_footerID).html());
      adonisObj.afterAjaxContent(_el);
    }
  }

  /**
   *  Masonry Item
   * @param _selector
   * example usage <div class="adonis-masonry" data-column-width=".masonry-item"><article class="masonry-item">
   */
  adonisObj.masonry = function(_selector){
    var _el = typeof _selector == 'object' ? _selector : $(_selector);
    _el.each(function(){
      var _masonryContainer = $(this),
          _columnWidth = typeof $(this).attr('data-column-width') !== 'undefined' ?  $(this).attr('data-column-width') : 200 ;
      _masonryContainer.imagesLoaded(function(){
        _masonryContainer.masonry({
          itemSelector: '.masonry-item',
          columnWidth: _columnWidth,
          percentPosition: true,
          gutter: 0,
        });
      });
    })
  }

  /* stylish radio and checkbox */
  adonisObj.stylishRadioCheckbox = function(_input){
    $(_input).each(function(){
      var label = $(this).parent().children('label');
      $(this).parent().addClass('adonis-'+$(this).attr('type'));
      label.html('<span class="label">'+label.html()+'</span>');
    });
  }


  /* Navigtion moving underline
   * example usage <ul class="moving-border"><li><a class="m-item">
   * */
  adonisObj.movingBorder = function(){
    adonisObj.movingBorder.active = function (_el){
      if(typeof _el === 'object' && _el.length > 0) {
        _el.each(function(){
          var _width  = $(this).hasClass('m-item-block') ? $(this).outerWidth() : $(this).width(),
              _left   = $(this).hasClass('m-item-block') ? $(this).parent('li').position().left : parseInt($(this).css('padding-left')) + $(this).parent('li').position().left;

          $(this).parents('.moving-border').next('.border-hr').css({
            'width' : _width + 'px',
            'margin-left'  : _left + 'px',
          });
        });
      }
    }

    adonisObj.movingBorder.active($('.moving-border .active .m-item'));

    $(document).on({
      mouseenter: function(event){
        adonisObj.movingBorder.active($(this));
      },
      mouseleave: function(){
        var activeItem = typeof $(this).parents('.moving-border').children('.active').children('a') === 'undefined' ? null : $(this).parents('.moving-border').children('.active').children('a');
        if(activeItem){
          adonisObj.movingBorder.active($(this).parent().siblings('.active').children('a'));
        }
      },
    },'.moving-border .m-item');

  }

  /* Tabs: Load tabs content via ajax
  * ajax tab
   * */

  adonisObj.ajaxTab = function(_selector){
    $(document).on('click',_selector,function(e){
      e.preventDefault();

      var _this = $(this),
          _target = $(_this.attr('data-target')),
          oldActiveMenu = _this.parent().siblings('.active').find('a'),
          oldTarget = oldActiveMenu.attr('data-target');

      if(_this.parents('.off-canvas').length > 0){
        var _offcanvas = _this.parents('.off-canvas'),
            _offcanvasClose = typeof _offcanvas.attr('data-close-offcanvas-below') !== 'undefined' ? _offcanvas.attr('data-close-offcanvas-below') : '';
        if($(window).outerWidth() < parseInt(_offcanvasClose)){
          adonisObj.toggleOffCanvas(_offcanvas);
        }
      }
      if(!_this.hasClass('loaded') && _this.attr('data-content')){

        _target.css('position','relative');

        if($('.tab-preloader').length < 1){
          $('#site-content-inner').append('<div class="preloader tab-preloader"><div class="preloader-overlay"></div></div>');
        }
        $('.tab-preloader').append('<div class="loader-icon"><div class="tab-loader">'+adonisObj.preloaderPlayHtml+'</div></div>');

        adonisObj.activateTabNav(_this,_target);

        $('.tab-preloader:first').fadeIn('fast',function(){
          _target.css('position','');
          var ContentURL = _this.attr('data-content');
          if(!ContentURL) return;

          $.ajax({
            url: ContentURL,
            context: document.body,
          }).done(function(response) {

            _target.append(response); // insert new content

            _this.addClass('loaded');

            _target.imagesLoaded(function(){
              adonisObj.afterAjaxContent(_target);

              $(oldTarget).css('opacity','0');

              // scroll to top
              $('html, body').animate({scrollTop:0}, 'fast');
              $('.scroll-y').animate({scrollTop:0}, 'fast');

              setTimeout(function(){
                _target.siblings().css('position','');
                /* show/hide target content */

                var oldHeight = $(oldTarget).height();

                $(oldTarget).removeClass('active').css('opacity','');
                $(_target).addClass('active').css('min-height',oldHeight+'px');

                adonisObj.removeSectionPreloader($('.tab-preloader'));

                _target.css('min-height','');
              },500);
            });

          }).fail(function(jqXHR, textStatus){
            return false;
          });

        });



      }else if(_this.attr('data-target')){
        adonisObj.activateTabNav(_this,_target);
        _target.css('min-height','');
      }
    });

    // activate tab
    adonisObj.activateTabNav = function (This,Target){

      /* Menu: change active class to menu*/
      if(!This.hasClass('active')){
        var Parent = This.parents('.js-parent').length > 0 ? This.parents('.js-parent') : This.parent().parent(),
            oldActiveMenu = Parent.find('li.active .active'),
            oldTarget = oldActiveMenu.attr('data-target');
        Parent.find('.active').removeClass('active');
        This.addClass('active');
        This.parent('li').addClass('active');

        /* Toggle class to a target element on activate or deactivate. eg. make header absolute or relative for a menu */
        if(typeof This.attr('data-toggle-target') !== 'undefined' && typeof This.attr('data-toogle-class') !== 'undefined'){
          $(This.attr('data-toggle-target')).toggleClass(This.attr('data-toogle-class'));
        }else if(typeof oldActiveMenu.attr('data-toggle-target') !== 'undefined' && typeof oldActiveMenu.attr('data-toogle-class') !== 'undefined'){
          $(oldActiveMenu.attr('data-toggle-target')).toggleClass(oldActiveMenu.attr('data-toogle-class'));
        }
      }

      if(! $(Target).hasClass('active') && $(This).hasClass('loaded')){
        var oldHeight = $(oldTarget).height();
        $(Target).addClass('active').css('min-height',oldHeight+'px');
        $(oldTarget).removeClass('active');
      }
    }
  }


  /**
   * Fix content after ajax load. Run after ajax load
   * @param _el. newly inserted html dom element object
   */
  adonisObj.afterAjaxContent = function(_el){
    // carousel
    _el.imagesLoaded(function(){
      _el.find(".adonis-carousel").each(function(){
        adonisObj.carousel($(this));
      });
    });

    // perfect scroll
    adonisObj.scroll(_el);

    // attr width
    adonisObj.attrWidth(_el.find('[data-width]'));

    // auto columns
    adonisObj.autoColumn(_el.find('.auto-columns'));

    // auto fit column
    adonisObj.autoFitColumn(_el.find(".auto-fit-columns"));

    // columns row
    adonisObj.autoColumnsRow(_el.find('.auto-cols-row'));

    // masonry column
    adonisObj.masonry(_el.find('.adonis-masonry'));

    // efect
    if(_el.find('.adonis-animate').length > 0){
      setTimeout(function(){
        adonisObj.effect(_el.find('.adonis-animate'));
      },100);
    }

    // load ajax content on ajax
    adonisObj.viewportAjax(_el,'.viewport-ajax-content');

    // viewport animation
    adonisObj.viewportAnimate(_el.find('.viewport-animate'));

    // moving border
    if(_el.find('.moving-border .active .m-item').length > 0){
      adonisObj.movingBorder.active(_el.find('.moving-border .active .m-item'));
    }

    return 'true';
  }

  adonisObj.shadowEffect = function(_selector){
    $(document).on('click',_selector,function(){
      var _this = $(this);
      _this.addClass('shadow-out animated');
      setTimeout(function(){
        _this.removeClass('shadow-out animated');
      },500);
    });
  }

  /* convert data-width="40%" to css style style="width:40%" */
  adonisObj.attrWidth = function(_selector){
    _selector.each(function(){
      $(this).css('width',$(this).attr('data-width'));
    })
  }

  /**
   * Make a section sticky on scroll by toggling class
   * @param _selector. selector
   * @param offset
   * @param toggleClass
   */
  adonisObj.stickySection = function(_selector,_offset,_toggleClass){
    _selector = $(_selector);

    if(_selector.length < 1) return false;

    //check if page is already scrolled
    if ($(this).scrollTop() > _offset) {
      topMenu.addClass(_toggleClass);
    }

    $(window).scroll(function() {

      if ($(this).scrollTop() > _offset && !_selector.hasClass(_toggleClass)) {
        _selector.addClass(_toggleClass);
      } else if(_selector.hasClass(_toggleClass) && $(this).scrollTop() < _offset) {
        _selector.removeClass(_toggleClass);
      }
    });
  }

  /* object end here */
  /* start using the object */

  $('body').imagesLoaded(function(){
    adonisObj.effect('.adonis-animate');
    setTimeout(function(){
      $('.site-preloader').fadeOut('fast');
    },300);
  });


  adonisObj.touchInit('jp-progress');

  // general off canvas windows
  $(document).on('click','.toggle-off-canvas,.off-canvas-overlay,.close-offcanvas',function(e){
    e.preventDefault();
    adonisObj.toggleOffCanvas($(this).attr('data-target'));
  });

  // animation for full screen navigatoin menu

  // off canvas/full screen for main menu
  $(document).on('click','.toggle-off-canvas-main-menu,.close-offcanvas-main-menu',function(e){
    e.preventDefault();
    var toggle = $($(this).attr('data-target')).hasClass('show') ? 'hide' : 'show';
    adonisObj.menuAnime(toggle,"#site-side-nav");
    adonisObj.toggleOffCanvas($(this).attr('data-target'));
  });

  adonisObj.closeNotificatoin('.close-notification');
  adonisObj.multiLevelSideMenu('#site-side-nav');

  // search
  adonisObj.search('style3');
  adonisObj.search('absolute');

  // attr width
  adonisObj.attrWidth($('[data-width]'));

  // auto column
  adonisObj.autoColumn($(".auto-columns"));

  // auto fit column
  adonisObj.autoFitColumn($('.auto-fit-columns'));

  // stylish checkbox and radio
  adonisObj.stylishRadioCheckbox('input[type="radio"],input[type="checkbox"]');

  /**
   * bootstrap dropdown hover
   */
  $('[data-hover="dropdown"]').dropdownHover({
    event: 'hover',
    selector: '[data-hover="dropdown"]'
  });


  // top search
  var topSearchOutside = function(e){
    var target = e.target;
    if(jQuery(target).hasClass('top-search') === false && jQuery(e.target).parents('.top-search').length < 1) {
      if( $('#top-search').hasClass('show')){
        $('#top-search').removeClass('show');
        jQuery( document ).off( "click",'body', adonisObj.topSearchOutside );
      }
    }
  }

  $(document).on('focus blur', '.form-group-g-style input', function (e) {
    $(this).parents('.form-group-g-style').toggleClass('active',(e.type === 'focusin' || this.value.length > 0));
  }).trigger('blur');

  $('.toggle-top-search').click(function(e){
    e.preventDefault();
    var Target = $(this).data('target');
    if($(Target).hasClass('show')){
      $(Target).removeClass('show');
    }else{
      $(Target).addClass('show').find('.form-control').focus();
      setTimeout(function(){
        $(document).on('click','body', topSearchOutside);
      },500)
    }
  });

  // initiate scroll
  adonisObj.scroll($('body'));

  $('.scroll-x-alt').on('mousewheel', function(event) {
    event.preventDefault();

    wheelNum += event.originalEvent.wheelDelta;
    animateEl = $(this);
    clearTimeout(timerXScroll);
    if(_scrollingX == false){
      adonisObj.scrollAnimate(wheelNum);
    }
  });

  $('.scroll-x-alt').each(function(){
    new PerfectScrollbar($(this)[0],{
      // useBothWheelAxes : 'horizontal'
    });
  });

  // Initiate carousel using owl carousel
  $(".adonis-carousel").each(function(){
    adonisObj.carousel($(this));
  });

  // tabs
  adonisObj.ajaxTab('.adonis-ajax-load');

  $('[data-toggle="tab"]').click(function(){
    $(this).parent('li').addClass('active').siblings('.active').removeClass('active');
  });

  // animate on view port
  adonisObj.viewportAnimate($('.viewport-animate'));

  // viewport ajax content
  adonisObj.viewportAjax($('body'),'.viewport-ajax-content');

  // load ajax content on ajax
  adonisObj.ajaxify();

  // navigation mooving border
  adonisObj.movingBorder();

  // masonry
  adonisObj.masonry('.adonis-masonry');

  // auto columns row
  adonisObj.autoColumnsRow($('.auto-cols-row'));

  // search
  adonisObj.search('style4');

  adonisObj.shadowEffect('.adonisbounceIn');

  // sticky player. example usage class="adonis-player-wrap" data-sticky-offset="150"
  var StickyPlayerOffset = typeof $('.adonis-player-wrap').attr('data-sticky-offset') !== 'undefined' ? $('.adonis-player-wrap').attr('data-sticky-offset') : null ;
  if(StickyPlayerOffset){
    adonisObj.stickySection('.adonis-player-wrap', StickyPlayerOffset, 'fixed-player');
  }

}); // jquery end
