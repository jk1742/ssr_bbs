/* eslint-disable no-undef */
import './StaticListEditor.css';

/***
 * block:  SortingTable
 ***/
// Describe Layout below
const StaticListEditor = function(id, height, styles) {

  //* View Register

  return $SR.generateHtml `
  <div data-id ="${id}">
    <div class="table-container is-size-7 static-list-editor" style="height:${height};${styles}; overflow-y: auto;">
      <table data-id ="list-editor-table" class="table is-bordered">
        <thead id ="${id + '-Header'}"></thead>
        <tbody id ="${id + '-Body'}" style="overflow-y: auto;"></tbody>
      </table>
    </div>
  </div>
  `; // HTML end
}
export {
  StaticListEditor
}
