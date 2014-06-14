Package.describe({
    summary: "A wrapper for localStorage, which will use chrome.storage if used in a chrome packaged app"
});

Package.on_use(function (api) {
    api.use('underscore', 'client');
    api.use('localstorage', 'client');

    // EXPORT
    api.export('LocalStore');

    // FILES
    api.add_files('LocalStore.js', 'client');
});