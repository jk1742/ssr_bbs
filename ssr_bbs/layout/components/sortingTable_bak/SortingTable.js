/* eslint-disable no-undef */
import '/layout/components/sortingTable/SortingTable.css';

/***
 * block:  SortingTable
 ***/
// Describe Layout below
const SortingTable = function(id, height) {
  return $SR.generateHtml `
  <div class="sorting-table" id ="${id}" style="height: ${height};">
    <table>
      <thead id ="${id + '-Header'}"></thead>
      <tbody id ="${id + '-Body'}"></tbody>
    </table>
    <div class="sorting-table-temp"></div>
  </div>
  `; // HTML end
};//SortingTable()
export {
  SortingTable
};
