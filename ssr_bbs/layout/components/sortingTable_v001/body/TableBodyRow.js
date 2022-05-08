
import { CHART_ICONS } from '/class/static/BasicChartIcons';

/***
 * block:  focusView
 ***/
// Describe Layout below
const TableBodyRow = function(parentId, seq, apxRow, apxData, rowData) {
  // set table row 
  let dom = document.createElement("tr");
  dom.id =  parentId + '-' + apxRow + '_' + seq;
  let th = document.createElement("th");
  th.id = parentId + '-' + apxData + '_' + seq + '_num';
  th.appendChild(document.createTextNode(seq));
  dom.appendChild(th);
  for (let j = 0; j < rowData.length; j++) {
    const cell = document.createElement("td");
    cell.id = parentId + '-' + apxData + '_' + seq + '_' + j;
    if(0 === j) {
      // isSelected parts, serperate by boolean
      if(rowData[j]) cell.innerHTML = CHART_ICONS.CHECK;
    } else cell.appendChild(document.createTextNode(rowData[j]));
    dom.appendChild(cell);
  }
  return dom;
}
export {
  TableBodyRow
};
