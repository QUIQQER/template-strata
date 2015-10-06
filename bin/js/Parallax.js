/**
 * Parallax function
 *
 * @module template-strata/Parallax
 * @author www.pcsg.de (Michael Danielczok)
 *
 * @require qui/QUI
 * @require qui/classes/DOM
 * @require qui/utils/Functions
 */
define('template-strata/Parallax', [

    'qui/QUI',
    'qui/classes/DOM',
    'qui/utils/Functions'

], function(QUI, QDOM, QUIFunctionUtils)
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

            this.$__resize = false;


        },

        /**
         *
         */
        load : function()
        {
            var self = this;

            this.$Header = document.id('header');
            this.$Main   = document.id('main');
            this.$Wrapper = document.id('header_wrapper');
            this.$MainSize = this.$Main.getSize().y;

            this.$wrapperSize = this.$Wrapper.getSize();
            this.$FX = moofx(this.$Wrapper);

            new Fx.Scroll(window,{
                onComplete : function() {
                    self.$recalc();
                }
            }).toTop();


            window.addEvent(
                'scroll',
                QUIFunctionUtils.debounce(this.$onScroll, 20)
            );

            window.addEvent('resize', QUIFunctionUtils.debounce(function() {
                new Fx.Scroll(window,{
                    duration : 20,
                    onComplete : function() {
                        self.$__resize = false;
                        self.$recalc();
                    }
                }).toTop();

                (function() {
                    self.$__resize = false;
                    self.$recalc();
                }).delay(200);

            }, 200));

            window.addEvent('resize', function() {
                self.$__resize = true;
            });
        },


        /**
         * recalc of the main size data
         */
        $recalc : function()
        {
            this.$pos = window.getScroll().y;
            this.$winSize = window.getSize().y;

            // New position after browser sizing
            this.$newPosSizing = ( (window.getScroll().y / this.$MainSize) * (this.$Wrapper.getSize().y) ) * (-1);
            this.$Wrapper.setStyle('top', this.$newPosSizing);

            this.$onScroll();

            /**
             * if content higher than footer: display the vertical scroll bar
             */
            if (window.getSize().x < 960 ) // for mobile devices never display the scrollbar
            {
                this.$Header.setStyle('overflow', 'hidden');
            }
            else {

                if (this.$wrapperSize.y > window.getSize().y)
                {
                    if (this.$Header.getSize().y > this.$MainSize)
                    {
                        this.$Header.setStyle('overflow-y', 'scroll');
                    }
                    else
                    {
                        this.$Header.setStyle('overflow', 'hidden');
                    }
                }
                else { // if the footer smaller than content, hide the scrollbar
                    this.$Header.setStyle('overflow', 'hidden');
                }
            }
        },

        /**
         * on scroll event
         */
        $onScroll : function()
        {
            if(window.getSize().x < 960) {
                return;
            }

            if (this.$__resize) {
                return;
            }

            var winPos = window.getScroll().y,
                diff   = winPos - this.$pos;

            this.$pos = winPos;

            if (this.$wrapperSize.y > this.$winSize)
            {
                var scrollTo = (
                    ((this.$wrapperSize.y - this.$winSize) * diff) /
                    (this.$MainSize - this.$winSize) * (-1)
                );

                this.$FX.animate({
                    top: this.$Wrapper.getStyle('top').toInt() + scrollTo
                });

                return;
            }

        }
    });
});