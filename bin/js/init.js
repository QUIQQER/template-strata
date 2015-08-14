
window.addEvent('domready', function()
{
    "use strict";

    require.config({
        paths   : {
            'template-strata' : URL_TEMPLATE_DIR +'bin/js'
        }
    });

    // load QUI
    require(['qui/QUI'], function(QUI)
    {
        QUI.addEvent("onError", function(msg, url, linenumber)
        {
            console.error( msg );
            console.error( url );
            console.error( 'LineNo: '+ linenumber );
        });
    });

    require(['template-strata/Parallax'], function(Parallax) {
        new Parallax().load();
    });
});