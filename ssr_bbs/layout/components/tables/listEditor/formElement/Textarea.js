const Textarea = function () {
    const textarea = document.createElement("textarea");
    textarea.className = 'textarea has-fixed-size is-small';
    textarea.rows = 1;
    textarea.setAttribute('data-class','input-field');
    return textarea;
}
export {
    Textarea
}
