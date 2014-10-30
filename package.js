Package.describe({
    name: "frozeman:storage",
    summary: "A reactive wrapper for localStorage, which will use chrome.storage if used in a chrome packaged app",
    version: "0.1.8",
    git: "https://github.com/frozeman/meteor-storage.git"
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.0');

    // core
    api.use('underscore', 'client');
    api.use('localstorage', 'client');

    // EXPORT
    api.export('LocalStore');

    // FILES
    api.addFiles('LocalStore.js', 'client');
});