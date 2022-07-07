/* eslint-disable no-undef */

/***
 * block:  SortingTable
 ***/
// Describe Layout below
const SpaceRow = function(styles) {
  let dom = document.createElement("tr");
  let cell = document.createElement("td");
  cell.innerText = "End of Contents";
  cell.style = styles;
  dom.append(cell)
  return dom
};//SortingTable()
export {
  SpaceRow
};
