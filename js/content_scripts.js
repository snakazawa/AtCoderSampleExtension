(function (global) {
    var optionStorage = global.AtCoderSampleExtension.optionStorage,
        options,
        parts = document.getElementsByClassName('part'),
        titlePattern = /^\s*(出力|入力|Out|Input).*?(\d+)\s*$/i,
        inputTitlePrefixPattern = /^入力|Input$/i,
        wrapClassName = 'atcoder-sample-extension-wrap';

    init();
    chrome.storage.onChanged.addListener(function () {
        removeAll();
        init();
    });

    function init() {
        optionStorage.get(function (_options) {
            options = _options;
            if (!options.enabled) { return; }

            Array.prototype.forEach.call(parts, function (part) {
                var pres = part.getElementsByTagName('pre');
                var sections = part.getElementsByTagName('section');
                var h3s = part.getElementsByTagName('h3');
                var buttons;
                if (pres.length && sections.length && h3s.length) {
                    if (titlePattern.test(h3s[0].innerText)) {
                        buttons = createExtension(h3s[0].innerText, pres[0].innerText);
                        sections[0].insertBefore(buttons, pres[0]);
                    }
                }
            });

            initClipboard();
        });
    }

    function createExtension(title, text) {
        var div = document.createElement('div');
        div.className = wrapClassName;
        div.appendChild(createCopyButton(text));
        div.appendChild(createDownloadButton(title, text));
        return div;
    }

    function createCopyButton(text) {
        var button = createButton('Copy', 'icon-file');
        button.className += ' btn-clipboard';
        button.setAttribute('data-clipboard-text', text);

        return button;
    }

    function createDownloadButton(title, text) {
        var button = createButton('Download', 'icon-download-alt');
        button.className += ' btn-download';
        var blob = new Blob([text], {type : "text/plain;charset=UTF-8"});
        button.href = window.URL.createObjectURL(blob);
        button.download = transFilename(title);

        return button;
    }

    function createButton(text, iconName) {
        var button = document.createElement('a');
        button.setAttribute('type', 'button');
        button.className = 'btn btn-small btn-default';
        button.style.marginRight = "4px";
        button.style.marginBottom = "4px";
        button.style.paddingLeft = button.style.paddingRight = "4px";
        button.style.paddingTop = button.style.paddingBottom = "2px";

        if (options.buttonStyle.viewIcon) {
            var icon = document.createElement('icon');
            icon.className = iconName;
            button.appendChild(icon);
        }

        if (options.buttonStyle.viewText) {
            var textNode = document.createTextNode(text);
            button.appendChild(textNode);
        }

        return button;
    }

    function transFilename(title) {
        var matches = titlePattern.exec(title);
        if (!matches) { return title; }
        var type = inputTitlePrefixPattern.test(matches[1]) ? 'input' : 'output';
        return options.filename[type].replace('{num}', matches[2]);
    }

    function initClipboard() {
        var clipboard = new Clipboard('.btn-clipboard');
    }

    function removeAll() {
        var doms = document.getElementsByClassName(wrapClassName);
        while (doms.length) {
            doms[0].parentNode.removeChild(doms[0]);
        }
    }

}(window));