Installation
-----------

    $ mrt add storage


Description
-----------

This is a simple wrapper for localstorage, which will use chrome.storage.local if its used in a chrome packaged app.

To set an item just use:

    Storage.set('myKey', {my: 'Object'});

    // or

    Storage.set('myKey', 'myString');

To get:

    var value = Storage.get('myKey');
