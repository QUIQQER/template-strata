
window.addEvent('domready', function()
{
    "use strict";

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
});