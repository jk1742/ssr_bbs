/***
 * block:  TableColgroup
 ***/
// Describe Layout below
const TableColgroup = function(array) {
  let colgroup = document.createElement("colgroup");
  let starCol = document.createElement("col");
  starCol.style.width = '1em';
  colgroup.appendChild(starCol);
  for (let i = 0; i < array.length; i++) {
    let col = document.createElement("col");
    col.style.width = array[i].width;
    colgroup.appendChild(col);
  }
  return colgroup;
}
export {
  TableColgroup
}
