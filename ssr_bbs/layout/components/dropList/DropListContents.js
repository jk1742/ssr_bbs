

/***
 * block:  focusView
 ***/
// Describe Layout below
const DropListContents = function(id, array) {
  const dom = document.createElement("div");
  dom.id = id;
  dom.className = 'dropdown-list-content';
  for (let i = 0; i < array.length; i++) {
    const row = array[i];
    const link = document.createElement("a");
    link.id = id + '-Link-' + i;
    const text = document.createTextNode(row);
    link.appendChild(text);
    link.setAttribute('data-value', row);
    dom.appendChild(link);
  }
  return dom;
}
export {
  DropListContents
};
