(function () {
    var parts = document.getElementsByClassName('part');

    Array.prototype.forEach.call(parts, function (part) {
        var pres = part.getElementsByTagName('pre');
        var sections = part.getElementsByTagName('section');
        var h3s = part.getElementsByTagName('h3');
        var buttons;
        if (pres.length && sections.length && h3s.length) {
            if (h3s[0].innerText.indexOf('入力例') !== -1 || h3s[0].innerText.indexOf('出力例') !== -1) {
                buttons = createExtension(h3s[0].innerHTML, pres[0].innerHTML);
                sections[0].insertBefore(buttons, pres[0]);
            }
        }
    });

    initClipboard();

    function createExtension(title, text) {
        var div = document.createElement('div');
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

        var icon = document.createElement('icon');
        icon.className = iconName;
        button.appendChild(icon);

        if (text) {
            button.appendChild(document.createTextNode(text));
        }

        return button;
    }

    function transFilename(title) {
        return title.replace('入力例', 'input_').replace('出力例', 'asnwer_');
    }

    function initClipboard() {
        var clipboard = new Clipboard('.btn-clipboard');
    }

}());