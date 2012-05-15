/*!
* jQuery Before After Slide Plugin v0.1
* 
* Copyright 2012, Christopher Jacobsen
* http://github.com/chrisjacobsen/before-after-slide/
* 
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
*/
;(function ($) {
    var pluginName = 'beforeAfter',
        defaults = {
            wrapClass: "wrap_after",   // class for after image wrap element
            lineClass: "slide_line",   // class for line element
            lineStyle: {},             // custom styling for the line
            moveSelector: null,        // custom element for mousemove binding
            moveAdjust: 0,             // compensate for padding and border
            fixSizes: true             // can fix sizes to match first image
        };
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype.init = function () {
        var eId = "#"+this.element.id,
            wrapClass = this.options.wrapClass,
            lineClass = this.options.lineClass,
            lineStyle = this.options.lineStyle,
            moveSelector = this.options.moveSelector,
            moveAdjust = this.options.moveAdjust,
            fixSizes = this.options.fixSizes,
            imgHeight = getImgProps("height"),
            imgWidth = getImgProps("width"),
            imgHeight2 = getImgProps("height", "last"),
            imgWidth2 = getImgProps("width", "last");
        moveSelector = (moveSelector === null) ? eId : moveSelector;
        // get height or width of image
        function getImgProps(prop, n) {
            var img;
            n = n || "first";
            img = $(eId+">img:"+n);
            return img[prop]();
        }
        // there can be only 2 images
        if ($(eId+" img").length !== 2) {
            return;
        }
        // if needed fix image sizes
        if (fixSizes && (imgWidth !== imgWidth2 || imgHeight !== imgHeight2)) {
            $(eId+" img:last").css({
                "width": imgWidth+"px",
                "height": imgHeight+"px"
            });
        }
        // move the "after" image and seperation line
        function move_after(x) {
            x -= moveAdjust;
            if (x < 0) {
                x = 0;
            }
            else if (x >= imgWidth) {
                x = imgWidth - 1;
            }
            $(eId +" ."+wrapClass).css("width", x+"px");
            $(eId +" ."+lineClass).css("left", x+"px");
        }
        // set up mouse move binding
        $("html").delegate(moveSelector, "mousemove", function(e) {
            var mPos = {
                x: e.pageX - $(eId)[0].offsetLeft,
                y: e.pageY - $(eId)[0].offsetTop
            };
            move_after(mPos.x);
        });
        // set up the html elements required for slide effect
        $(eId).css({
            "height": imgHeight + "px",
            "width": imgWidth + "px",
            "overflow": "hidden"
        });
        // remove extra spacing from images
        $(eId+" img").css({
            "margin": "0",
            "padding": "0",
            "border": "0",
            "vertical-align": "bottom"
        });
        // add the extra wrap and line elements
        $(eId+" img:last").wrap('<div class="'+wrapClass+'" style="overflow:hidden; width:0;" />');
        $(eId +" ."+wrapClass).css({
            "position": "relative",
            "top": "-"+imgHeight+"px"
        });
        $(eId).append('<div class="'+lineClass+'" />');
        $(eId+" ."+lineClass).css({
            "position": "relative",
            "top": "-"+(imgHeight*2)+"px",
            "height": imgHeight+"px",
            "width": "1px",
            "background": "#999"
        }).css(lineStyle);
    };
    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery);