(function (global) {
    var optionStorage = {},
        storage = chrome.storage.sync;

    global.AtCoderSampleExtension = global.AtCoderSampleExtension || {};
    global.AtCoderSampleExtension.optionStorage = optionStorage;

    optionStorage.defaultOptions = {
        enabled: true,
        filename: {
            input: 'input_{num}.txt',
            output: 'answer_{num}.txt'
        },
        buttonStyle: {
            viewIcon: true,
            viewText: true
        }
    };

    optionStorage.storage = storage;

    optionStorage.set = function (options, callback) {
        storage.set({options: options}, function () {
            callback(options);
        });
    };

    optionStorage.get = function (callback) {
        storage.get({options: optionStorage.defaultOptions}, function (res) {
            callback(!res ? null : !res.options ? null : res.options);
        });
    };

    optionStorage.reset = function (callback) {
        optionStorage.set(optionStorage.defaultOptions, callback);
    };

}(window));