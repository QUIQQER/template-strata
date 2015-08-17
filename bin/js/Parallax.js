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
            this.$Main   = document.id('main');
            this.$Wrapper = document.id('header_wrapper');

            this.$FX = moofx(this.$Wrapper);

            this.$recalc();


            window.addEvent('scroll', QUIFunctionUtils.debounce(this.$onScroll, 17));
            window.addEvent('resize', QUIFunctionUtils.debounce(this.$recalc, 10));


            console.log('Contenthöhe (Main): ' + this.$Main.getSize().y + 'px');
            console.log('Nicht sichtbarer Teil des Contents (Main) ' + (this.$Main.getSize().y - window.getSize().y) +'px');

            console.log('Footerhöhe (Wrapper): ' + this.$Wrapper.getSize().y + 'px');
            console.log('Nicht sichtbarer Teil des Footers (Wrapper) ' + (this.$Wrapper.getSize().y - window.getSize().y) +'px');

            console.log('Fensterhöhe (Window): ' + window.getSize().y + 'px');
        },



        /**
         * recalc of the main size data
         */
        $recalc : function()
        {
            this.$pos = window.getScroll().y;
            this.$MainSize = this.$Main.getSize().y;
            this.$winSize = window.getSize().y;
            this.$wrapperSize = this.$Wrapper.getSize();



        },
        /**
         * on scroll event
         */
        $onScroll : function()
        {
            var winPos = window.getScroll().y,
                diff   = winPos - this.$pos;
            console.log('-----------------------')


            console.log('Differenz in px ' + diff);

            console.log('Fenster position ' + winPos );


            this.$FooterPos = this.$Wrapper.getStyle('top');
            console.log('Footer position ' + this.$FooterPos);

            //var percent = QUIUtilsMath.percent(diff, this.$winSize);
            //console.log(percent + '%');
            // Neue Berechnung
            //console.log('um wieviel px soll Footer verschoben werden: ' + ((this.$Wrapper.getSize().y * diff) / this.$Main.getSize().y));
            console.log('um wieviel px soll Footer verschoben werden (NEU): ' + ((this.$Wrapper.getSize().y * diff) / (this.$MainSize - window.getSize().y)));

            this.$pos = winPos;

            if (this.$wrapperSize.y > this.$winSize){

                //var scrollTo = (percent / 100) * this.$wrapperSize.y * (-1);

                // Neue Berechnung
                scrollTo = (((this.$Wrapper.getSize().y - window.getSize().y) * diff) / (this.$MainSize - window.getSize().y) * (-1));

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