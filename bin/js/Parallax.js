/**
 * Parallax function
 *
 * @module template-strata/Parallax
 * @author www.pcsg.de
 *
 * @require qui/QUI
 * @require qui/classes/DOM
 */
define('template-strata/Parallax', [

    'qui/QUI',
    'qui/classes/DOM',
    'qui/utils/Functions',
    'qui/utils/Math'

], function(QUI, QDOM, QUIFunctionUtils, QUIUtilsMath)
{
    "use strict";

    return new Class({

        Extends : QDOM,
        Type : 'template-strata/Parallax',

        Binds : ['$onScroll', '$recalc'],

        initialize : function(options)
        {
            this.parent(options);

            this.$Header = null;

            this.$pos = 0;
            this.$winSize = false;
            this.$wrapperSize = false;
        },

        /**
         *
         */
        load : function()
        {
            this.$Header = document.id('header');
            //this.$Main   = document.id('main');
            this.$Wrapper = document.id('header_wrapper');

            this.$FX = moofx(this.$Wrapper);

            this.$recalc();

            window.addEvent('scroll', QUIFunctionUtils.debounce(this.$onScroll, 20));
            window.addEvent('resize', QUIFunctionUtils.debounce(this.$recalc, 10));
        },

        /**
         * recalc of the main size data
         */
        $recalc : function()
        {
            this.$pos = window.getScroll().y;
            this.$winSize = window.getSize();
            this.$wrapperSize = this.$Wrapper.getSize();
        },

        /**
         * on scroll event
         */
        $onScroll : function()
        {
            var winPos = window.getScroll().y,
                diff   = winPos - this.$pos;


            var percent = QUIUtilsMath.percent(diff, this.$winSize.y);

            this.$pos = winPos;

            if (this.$wrapperSize.y > this.$winSize.y){

                var scrollTo = (percent / 100) * this.$wrapperSize.y * (-1);

                this.$FX.animate({
                    top: this.$Wrapper.getStyle('top').toInt() + scrollTo
                });

            } else
            {
                var scrollToFix;

                if ( diff > 0 ) {

                    scrollToFix = (diff - (diff - 4)) * (-1);

                    this.$FX.animate({
                        top: this.$Wrapper.getStyle('top').toInt() + scrollToFix
                    });

                } else
                {
                    scrollToFix = (diff - (diff - 4));

                    this.$FX.animate({
                        top: this.$Wrapper.getStyle('top').toInt() + scrollToFix
                    });
                }
            }
        }
    });
});