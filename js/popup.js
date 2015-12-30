(function (global) {
    var $ = document.getElementById.bind(document),
        doms = {
            options: {
                enabled: $('enabled'),
                filename: {
                    input: $('input-filename'),
                    output: $('output-filename')
                },
                buttonStyle: {
                    viewIcon: $('view-icon'),
                    viewText: $('view-text')
                }
            },
            save: $('save'),
            default: $('default'),
            output: $('output')
        },
        optionStorage = global.AtCoderSampleExtension.optionStorage,
        outputSetTimeoutId = null,
        outputRemoveWait = 3000;

    optionStorage.get(function (options) {
        reflect(options);
        doms.save.addEventListener('click', function () {
            save();
        }, false);
        doms.default.addEventListener('click', function () {
            reflect(optionStorage.defaultOptions);
        }, false);
    });

    function reflect(src) {
        doms.options.enabled.checked = src.enabled;
        doms.options.filename.input.value = src.filename.input;
        doms.options.filename.output.value = src.filename.output;
        doms.options.buttonStyle.viewIcon.checked = src.buttonStyle.viewIcon;
        doms.options.buttonStyle.viewText.checked = src.buttonStyle.viewText;
    }

    function save() {
        var values = {
            enabled: doms.options.enabled.checked,
            filename: {
                input: doms.options.filename.input.value,
                output: doms.options.filename.output.value
            },
            buttonStyle: {
                viewIcon: doms.options.buttonStyle.viewIcon.checked,
                viewText: doms.options.buttonStyle.viewText.checked
            }
        };
        optionStorage.set(values, function () {
            saveResponse();
        });
    }

    function saveResponse() {
        clearTimeout(outputSetTimeoutId);
        doms.output.innerHTML = '<span style="color:green">saved</span>';
        outputSetTimeoutId = setTimeout(function () {
            doms.output.innerHTML = '';
        }, outputRemoveWait);
    }


}(window));