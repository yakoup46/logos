$(function(){
    jtip = $.jTip();
});

(function($, f){

    if(!$) return false; //no jQuery

    var jTIP = function(){

        var _ = this; //preserve state!

        //our elements
        this.el = f;
        this.tips = {};

        this.opts = {
            class : 'jtip'
        };

        init = function(el, opts){
            this.el = $('<div />', {
                'class' : this.opts.class,
                'style' : 'position: absolute'
            });

            //additional options
            this.opts = $.extend(this.opts, opts);

            this.setup();
            this.binds();

            return this;
        };

        this.setup = function(){
            this.el.appendTo('body');
            this.el.hide();

            var tips = $('jtip');
            var len = tips.length;

            for(var i=0; i < len; i++){
                _.tips[i] = {
                    text : tips.eq(i).attr('text'),
                    side : tips.eq(i).attr('side')
                }
            }
        };

        this.binds = function(){
            var lastSide;

            $('jtip').on('mousemove', function(e){
                var el = _.el;
                var t = $(this);
                var ind = t.index();
                var text = _.tips[ind].text;
                var side = _.tips[ind].side;

                var focusHeight = t.outerHeight();
                var focusWidth = t.outerWidth();

                var focusX = Math.round(t.offset().left);
                var focusY = Math.round(t.offset().top);

                //so we can get the correct width
                el.html(text);
                lastSide == undefined ? el.addClass(side) : el.removeClass(lastSide).addClass(side); 
                lastSide = side;

                var elHeight = el.outerHeight();
                var elWidth = el.outerWidth();

                var centerY = (focusHeight - elHeight) / 2;
                var centerX = (focusWidth - elWidth) / 2;

                var drawX = focusX - elWidth - 4;
                var drawY = focusY + centerY;

                switch(side){
                    case 'right':
                        drawX = focusX + focusWidth + 4
                        break;
                    case 'top':
                        drawY = focusY - elHeight - 5;
                        drawX = focusX + centerX;
                        break;
                    case 'bottom':
                        drawY = focusY + focusHeight + 5;
                        drawX = focusX + centerX;
                        break;
                }

                el.css({
                    'left' : drawX,
                    'top' : drawY
                }).show()
            })
            .on('mouseout', function(){
                _.el.hide();
            });
        }

    };

    $.jTip = function(o) {
        var instance = (new jTIP).init(this, o);
        return instance;
    }

})(window.jQuery, false);
