/* jQuery Star Rating Plugin
 * 
 * @Author
 * Copyright Nov 02 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.3b
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Visit the plugin page for more information.
 * http://irfandurmus.com/projects/jquery-star-rating-plugin/
 *
 */

;(function($){
    $.fn.rating = function(callback){

        callback = callback || function(){};

        // each for all item
        this.each(function(i, v){

            $(v).data('rating', {callback:callback})
                .bind('init.rating', $.fn.rating.init)
                .bind('set.rating', $.fn.rating.set)
                .bind('hover.rating', $.fn.rating.hover)
                .trigger('init.rating');
        });
    };

    $.extend($.fn.rating, {
        init: function(){
            var el = $(this),
                list = '',
                isChecked = null,
                children = el.children(),
                i = 0,
                l = children.length;

            for (; i < l; i++) {
                list = list + '<a class="star" title="' + $(children[i]).val() + '" />';
                if ($(children[i]).is(':checked')) {
                    isChecked = $(children[i]).val();
                }
            }

            children.hide();

            el
                .append('<div class="stars">' + list + '</div>')
                .trigger('set.rating', isChecked);

            $('a', el).bind('click', $.fn.rating.click);
            el.trigger('hover.rating');
        },
        set: function(e, val) {
            var el = $(this),
                item = $('a', el),
                input = undefined;

            if (val) {
                item.removeClass('fullStar');

                input = item.filter(function(){
                    if ($(this).attr('title') == val)
                        return $(this);
                    else
                        return false;
                });

                input
                    .addClass('fullStar')
                    .prevAll()
                    .addClass('fullStar');
            }
        },
        hover: function(){
            var el = $(this),
                stars = $('a', el);

            stars.bind('mouseenter', function(){
                // add tmp class when mouse enter
                $(this)
                    .addClass('tmp_fs')
                    .prevAll()
                    .addClass('tmp_fs');

                $(this).nextAll()
                    .addClass('tmp_es');
            });

            stars.bind('mouseleave', function(){
                // remove all tmp class when mouse leave
                $(this)
                    .removeClass('tmp_fs')
                    .prevAll()
                    .removeClass('tmp_fs');

                $(this).nextAll()
                    .removeClass('tmp_es');
            });
        },
        click: function(e){
            e.preventDefault();
            var el = $(e.target),
                container = el.parent().parent(),
                inputs = container.children('input'),
                rate = el.attr('title');

            var matchInput = inputs.filter(function(){
                return $(this).val() == rate;
            });

            matchInput
                .attr('checked', true)
                .siblings('input').attr('checked', false);

            container
                .trigger('set.rating', matchInput.val())
                .data('rating').callback(rate, e);
        }
    });

})(jQuery);
