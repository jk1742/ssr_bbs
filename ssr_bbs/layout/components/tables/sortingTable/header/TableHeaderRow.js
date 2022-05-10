/***
 * block:  TableHeaderRow
 ***/
// Describe Layout below
const TableHeaderRow = function(id, array) {

  const headRow = document.createElement("tr");

  // selecting
  const selected = document.createElement("th");
  selected.id = id + '-selected';
  selected.style.width = array[0].width;
  const icon = document.createElement("i");
  icon.classList.add(...array[0].icon);
  selected.appendChild(icon);
  headRow.appendChild(selected);

  // numbering
  const num = document.createElement("th");
  num.id = id + '-num';
  num.style.width = '2%';
  const textNum = document.createTextNode('*');
  num.appendChild(textNum);
  headRow.appendChild(num);

  // data
  for (let i = 1; i < array.length; i++) {
    const header = document.createElement("th");
    // add id
    header.id = id + '-' + i;
    header.style.width = array[i].width;
    // display
    if ('undefined' !== array[i].display && 'none' === array[i].display) header.style.display = "none";
    // add icon
    if('undefined' != array[i].icon && '' != array[i].icon) {
      const _icon = document.createElement("i");
      _icon.classList.add(...array[i].icon);
      header.appendChild(_icon);
    }
    // add name
    const text  = document.createTextNode(array[i].name);
    header.appendChild(text);
    // set width
    headRow.appendChild(header);
  }
  return headRow;
}
export {
  TableHeaderRow
};
