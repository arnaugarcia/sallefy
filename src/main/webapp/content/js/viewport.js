;(function ($, window, document, undefined) {

    var pluginName = "viewPort",
        dataKey = "plugin_" + pluginName,
        _this = {};

    var Plugin = function (element, options) {

        this.element = element;
        this.options = {
            offset: '80%',
            container: $(document),
        };

        this.triggered = false;
        this.init(options);
    };

    Plugin.prototype = {
        triggerCall: function(_el,_this){
            var _elementTop = _el.scrollTop() + _this.offset();
            if( !$(_this.element).hasClass('triggered') && _elementTop > Math.floor(_this.element.offset().top)){
                $(_this.element).attr('data-top',_this.element.offset().top).addClass('triggered');
                _this.options.callback.call(_this,true);
            }
        },
        Scroll: function (_el) {
            var _this = this;
            _el.on( 'scroll', function(event){
                Plugin.prototype.triggerCall(_el,_this);
            });
        },
        /* function that calculate trigger point*/
        offset: function(){
            var _offset = typeof $(this.element).attr('data-offset') !== 'undefined' ? $(this.element).attr('data-offset') : this.options.offset;
            if(typeof _offset == 'number'){
                return this.options.offset;
            }else if(_offset.indexOf('%')){
                return Math.floor($(window).height() * (parseInt(this.options.offset.match(/[^%]*/i)[0])/100));
            }
        },
        init: function (options) {
            $.extend(this.options, options);
            var _this = this;
            setTimeout(function(){
                Plugin.prototype.triggerCall(_this.options.container,_this);
            },500);
            this.Scroll(this.options.container);
        },
    };

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * return plugin instance.
     */
    $.fn[pluginName] = function (options) {

        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };

}(jQuery, window, document));