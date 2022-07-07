const Input = function () {
    const input = document.createElement("input");
    input.style.width = '100%';
    input.type = "text";
    input.setAttribute('data-class','input-field');
    return input;
}
export {
    Input
}
