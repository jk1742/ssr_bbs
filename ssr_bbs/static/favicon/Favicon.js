import ico from '/static/favicon/favicon.ico';
export default () => {
    (function () {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = ico;
        document.getElementsByTagName('head')[0].appendChild(link);
    }());
}

