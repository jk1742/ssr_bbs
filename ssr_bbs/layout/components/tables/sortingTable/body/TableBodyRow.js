
import { CHART_ICONS } from '/class/static/BasicChartIcons';

/***
 * block:  focusView
 ***/
// Describe Layout below
const TableBodyRow = function(parentId, seq, apxRow, apxData, rowData) {
  // set table row 
  let dom = document.createElement("tr");
  dom.id =  parentId + '-' + apxRow + '_' + seq;
  // select
  let selected = document.createElement("th");
  selected.id = parentId + '-' + apxData + '_' + seq + '_selected';
  if (rowData[0]) selected.innerHTML = CHART_ICONS.CHECK;
  dom.appendChild(selected);
  // num
  let th = document.createElement("th");
  th.id = parentId + '-' + apxData + '_' + seq + '_num';
  th.appendChild(document.createTextNode(seq));
  dom.appendChild(th);
  for (let j = 1; j < rowData.length; j++) {
    const cell = document.createElement("td");
    cell.id = parentId + '-' + apxData + '_' + seq + '_' + j;
    let cellData = rowData[j];
    if (_.isNull(cellData) || cellData == null || cellData == 'null') cellData = '';
    cell.appendChild(document.createTextNode(cellData));
    dom.appendChild(cell);
  }
  return dom;
}
export {
  TableBodyRow
};
