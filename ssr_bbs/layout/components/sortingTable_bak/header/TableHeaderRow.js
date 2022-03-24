/***
 * block:  TableHeaderRow
 ***/
// Describe Layout below
const TableHeaderRow = function(id, array) {
  const headrow = document.createElement("tr");
  // numbering
  const num = document.createElement("th");
  num.style.width = '2%';
  const textNum = document.createTextNode('*');
  num.appendChild(textNum);
  headrow.appendChild(num);
  for (let i = 0; i < array.length; i++) {
    const header = document.createElement("th");
    // add id
    header.id = id + '-' + i;
    header.style.width = array[i].width;
    // add icon
    const icon = document.createElement("i");
    if('undefined' != array[i].icon && '' != array[i].icon) {
      icon.classList.add(...array[i].icon);
      header.appendChild(icon);
    }
    // add name
    const text  = document.createTextNode(array[i].name);
    header.appendChild(text);
    // set width
    headrow.appendChild(header);
  }
  return headrow;
}
export {
  TableHeaderRow
};
