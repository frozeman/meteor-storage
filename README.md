Installation
-----------

    $ mrt add storage


Description
-----------

This is a simple wrapper for localstorage, which will use chrome.storage.local if its used in a chrome packaged app.

To set an item just use:

    LocalStore.set('myKey', {my: 'Object'});

    // or

    LocalStore.set('myKey', 'myString');

To get:

    var value = LocalStore.get('myKey');
