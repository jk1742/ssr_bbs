const Textarea = function () {
    const textarea = document.createElement("textarea");
    textarea.style.width = '100%';
    textarea.setAttribute('data-class','input-field');
    return textarea;
}
export {
    Textarea
}
